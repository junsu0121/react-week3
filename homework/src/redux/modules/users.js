// // import React from "react";
// // import styled from "styled-components";
// // import { useHistory } from "react-router-dom";
// // import Fab from "@mui/material/Fab";
// // import AddIcon from "@mui/icons-material/Add";
// // import { deleteWordFB } from "./redux/modules/word";
// // import { useDispatch, useSelector } from "react-redux";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import IconButton from "@mui/material/IconButton";

// // import Spinner from "./Spinner";

// // const Main = (props) => {
// //   const history = useHistory();
// //   const dispatch = useDispatch();

// //   const word_list = useSelector((state) => state.word.list);
// //   // let word_index = parseInt(props.match.params.index);
// //   return (
// //     <Wrap>
// //       <Title>MY DICTIONARY</Title>
// //       <CardWrap>
// //         {word_list &&
// //           // React 는 렌더링이 화면에 커밋 된 후에야 모든 효과를 실행하기 때문이다.
// //           // 즉 React는 return에서 articles.map(...)을 반복실행할 때 첫 턴에 데이터가 아직 안들어와도 렌더링이 실행되며 당연히 그 데이터는 undefined로 정의되어 오류가 나는 것이다.
// //           // 따라서 && 붙여서  true && expression은 항상 expression으로 실행되고 false && expression은 항상 false로 실행된다. 따라서 조건이 참이면 && 바로 뒤의 요소가 출력에 나타난다
// //           word_list.map((list, idx) => {
// //             return (
// //               <CardBox key={idx}>
// //                 <div>
// //                   <IconButton
// //                     aria-label="delete"
// //                     style={{
// //                       position: "absolute",
// //                       right: "550px",
// //                     }}
// //                     onClick={() => {
// //                       // console.log(삭제하기 버튼을 눌렀어!);
// //                       // dispatch(deleteWord(idx));
// //                       dispatch(deleteWordFB(word_list[idx].id));
// //                     }}
// //                   >
// //                     <DeleteIcon />

// //                     {/* --------------------- */}

// // // Action
// // const LOAD = "word/LOAD";
// // const CREATE = "word/CREATE";
// // const DELETE = "word/DELETE"

// // // Action Creators
// // export function deleteWord(word_index){
// //   // console.log("지울 버킷 인덱스", word_index);
// //   return {type:DELETE, word_index};
// // }

// // // middlewares

// // export const deleteWordFB = (word_id) => {
// //   return async function (dispatch, getState) {
// //     if (!word_id) {
// //       window.alert("아이디가 없네요!");
// //       return;
// //     }
// //     const docRef = doc(db, "word", word_id);
// //     await deleteDoc(docRef);

// //     const _word_list = getState().word.list;
// //     const word_index = _word_list.findIndex((b) => {
// //       return b.id === word_id;
// //     });

// //     dispatch(deleteWord(word_index));
// //   };
// // };

// // // Reducer
// // export default function reducer(state = initialState, action = {}) {
// //   switch (action.type) {

// //        case "word/DELETE": {
// //       const new_word_list = state.list.filter((l, idx) => {
// //         return parseInt(action.word_index) !== idx;
// //       });

// //       return { ...state, list: new_word_list };

// //     }

// import React from "react";
// import styled from "styled-components";
// import { useHistory } from "react-router-dom";
// import Fab from "@mui/material/Fab";
// import AddIcon from "@mui/icons-material/Add";
// import { deleteWordFB } from "./redux/modules/word";
// import { useDispatch, useSelector } from "react-redux";
// import DeleteIcon from "@mui/icons-material/Delete";
// import IconButton from "@mui/material/IconButton";

// import Spinner from "./Spinner";

// const Main = (props) => {
//   const history = useHistory();
//   const dispatch = useDispatch();

//   const word_list = useSelector((state) => state.word.list);
//   // let word_index = parseInt(props.match.params.index);
//   return (
//     <Wrap>
//       <Title>MY DICTIONARY</Title>
//       <CardWrap>
//         {word_list &&
//           // React 는 렌더링이 화면에 커밋 된 후에야 모든 효과를 실행하기 때문이다.
//           // 즉 React는 return에서 articles.map(...)을 반복실행할 때 첫 턴에 데이터가 아직 안들어와도 렌더링이 실행되며 당연히 그 데이터는 undefined로 정의되어 오류가 나는 것이다.
//           // 따라서 && 붙여서  true && expression은 항상 expression으로 실행되고 false && expression은 항상 false로 실행된다. 따라서 조건이 참이면 && 바로 뒤의 요소가 출력에 나타난다
//           word_list.map((list, idx) => {
//             return (
//               <CardBox key={idx}>
//                 <div>
//                   <IconButton
//                     aria-label="delete"
//                     style={{
//                       position: "absolute",
//                       right: "550px",
//                     }}
//                     onClick={() => {
//                       // console.log(삭제하기 버튼을 눌렀어!);
//                       // dispatch(deleteWord(idx));
//                       dispatch(deleteWordFB(word_list[idx].id));
//                     }}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                   <CardContent>
//                     <CardTitle>단어</CardTitle>
//                     <CardText>{list.word}</CardText>
//                   </CardContent>
//                   <CardContent>
//                     <CardTitle>설명</CardTitle>
//                     <CardText>{list.desc}</CardText>
//                   </CardContent>
//                   <CardContent>
//                     <CardTitle>예시</CardTitle>
//                     <CardText style={{ color: "blue" }}>{list.ex}</CardText>
//                   </CardContent>
//                 </div>
//               </CardBox>
//             );
//           })}
//       </CardWrap>

//       <Fab
//         onClick={() => {
//           history.push("/addpage");
//         }}
//         color="primary"
//         aria-label="add"
//       >
//         <AddIcon />
//       </Fab>
//       <Spinner />
//     </Wrap>
//   );
// };
