//homework.js
//주석으로 이름 지어주기
import { db } from "../../shared/firebase";
//firebase에서 만들었던 db가져오기
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
// const word_db = db.collection("homework");

// Actions -> 사용할 액션들 만들어줌! (LOAD,CREATE,UPDATE,REMOVE 중 만들어줌!)
const CREATE = "homework/CREATE";
const LOAD = "homework/LOAD";
const MODIFY = "homework/MODIFY";
const DELETE = "homework/DELETE";

//초기값 설정
const initialState = {
  list: [],
};

// Action Creators
export function loadContent(content_list) {
  return { type: LOAD, content_list };
}
export function createContent(content) {
  return { type: CREATE, content };
}
export function modifyContent(content_index, content_id, content_data) {
  return { type: MODIFY, content_index, content_id, content_data };
}
export function deleteContent(content_index) {
  return { type: DELETE, content_index };
}

//middlewares
export const loadContentFB = () => {
  return async function (dispatch) {
    //비동기 통신이여서 async 붙이기
    const content_data = await getDocs(collection(db, "homework"));
    // firebase에서 받아 올때까지 기다려주고            db에서 "만든 폴더"
    // console.log(word_data);
    //데이터 가져와지나 콘솔찍고 useEffect로 확인!
    let content_list = [];
    //받은 정보 넣어줄 배열 만들어주고
    content_data.forEach((doc) => {
      //forEach로 데이터 가져옴
      // console.log(doc.data());
      // 보기 쉬운 데이터 형식으로 콘솔찍어 useEffect로 확인!
      content_list.push({ id: doc.id, ...doc.data() });
      //가져온거 넣어주기, id도 같이 나중에 수정하고 할 때 필요!
    });
    // console.log(word_list);
    // 배열에 잘 담겼나 확인!
    dispatch(loadContent(content_list));
  };
};
//추가하기
export const createContentFB = (content) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "homework"), content);
    //    이름붙여서                            넣을 위치        넣을정보
    const contentlist = await getDoc(docRef);
    const content_data = { id: docRef.id, ...contentlist.data() };
    // 리덕스에 넣기위해
    dispatch(createContent(content_data));
  };
};
//수정하기
export const modifyContentFB = (content_id) => {
  return async function (dispatch, getState) {
    console.log(content_id.id, "id");
    const newContent = {
      content: content_id.content,
      image_url: content_id.image_url.url,
    };
    // console.log(newContent, "새로들어갈 content");
    const docRef = doc(db, "homework", content_id.id);
    await updateDoc(docRef, {
      content: content_id.content,
      image_url: content_id.image_url,
    });
    // console.log(getState().homework.list);
    const _content_list = getState().homework.list;
    //                            스토어.list
    const content_index = _content_list.findIndex((c) => {
      return c.id === content_id.id;
    });
    // console.log(word_index, "요거확인!");
    dispatch(modifyContent(content_index, content_id.id, newContent)); // 수정할 아이디와 수정할 데이터를 전송해야 리덕스를 수정할 수 있음
    // 항해강의에서 하는거는 우리가 선택한 값을 true
  };
};
//DELETE
export const deleteContentFB = (content_id) => {
  return async function (dispatch, getState) {
    if (!content_id) {
      window.alert("아이디가 없네요!");
      return;
    }
    const docRef = doc(db, "content", content_id);
    await deleteDoc(docRef);

    const _content_list = getState().homework.list;
    const content_index = _content_list.findIndex((b) => {
      return b.id === content_id;
    });

    dispatch(deleteContent(content_index));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "homework/LOAD": {
      return { list: action.content_list };
      //case 추가!
    }
    case "homework/CREATE": {
      const new_content_list = [...state.list, action.content];
      return { ...state, list: new_content_list };
    }

    case "homework/MODIFY": {
      console.log(action); // action.id, action.data
      const new_content_list = state.list.map((l, index) => {
        // 원하는 id의 데이터를 찾고 그 데이터만 우리가 교체하고 싶은 데이터로 교체
        if (parseInt(action.content_index) === index) {
          //문자열을 수로 바꿔줌
          //   console.log(action.content_data.image_url, "이건데");
          return {
            ...l,
            content: action.content_data.content,
            image_url: action.content_data.image_url,
            // id: action.word_index.id,
          };
          // idx가 같은 것만 true로 변경 후 리턴
        } else {
          return l;
          // 나머진 그대로 리턴
        }
      });
      return { ...state, list: new_content_list };
    }

    case "homework/DELETE": {
      const new_content_list = state.list.filter((l, idx) => {
        return parseInt(action.content_index) !== idx;
      });
      return { ...state, list: new_content_list };
    }
    // do reducer stuff

    default:
      return state;
  }
}
