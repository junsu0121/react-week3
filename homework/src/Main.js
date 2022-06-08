import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "./shared/firebase";
//만든 auth 임포트
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { deleteContentFB } from "./redux/modules/homework";

const Main = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = props.post;
  const content_list = useSelector((state) => state.homework.list);
  console.log(content_list, "글구나");
  // firestore 데이터 불러오기
  const [is_login, setIsLogin] = React.useState(false);
  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  }, []);

  return (
    <>
      {content_list.map((list, index) => {
        console.log(index);
        return (
          <ContentsWrap key={index}>
            <div>
              <span>
                <Profile src="https://firebasestorage.googleapis.com/v0/b/authex-bbc58.appspot.com/o/images%2Ftest.jpeg?alt=media&token=22e64495-e33c-447f-9e29-29ec390d89d7" />
              </span>
              <UserName>name</UserName> <Date>2022.06.09</Date>
              {is_login && (
                //&& 앞에 것이 참이면 뒤에 실행!
                <Btn
                  onClick={() => {
                    navigate(`modify/${index}`);
                  }}
                >
                  수정하기
                </Btn>
              )}
              {is_login && (
                //&& 앞에 것이 참이면 뒤에 실행!
                <DeleteBtn
                  onClick={() => {
                    // console.log(삭제하기 버튼을 눌렀어!);
                    // dispatch(deleteWord(idx));
                    dispatch(deleteContentFB(content_list[index].id));
                  }}
                >
                  삭제하기
                </DeleteBtn>
              )}
            </div>
            <hr />
            <Contents>{list.content}</Contents>
            <ContentImgWrap>
              <ContentImg src={list.image_url} />
            </ContentImgWrap>
            <LikeWrap>
              <Like>좋아요 0개</Like>
              <Comment>댓글 0개</Comment>

              <FontAwesomeIcon icon={faHeart} />
            </LikeWrap>
            <hr />
          </ContentsWrap>
        );
      })}
      {is_login && (
        //&& 앞에 것이 참이면 뒤에 실행!
        <Link to="/upload">
          <FontAwesomeIcon
            icon={faCirclePlus}
            style={{
              height: "70px",
              opacity: "60%",
              position: "fixed",
              bottom: "30px",
              right: "100px",
            }}
          />
        </Link>
      )}
    </>
  );
};

export default Main;

const Profile = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin-right: 20px;
`;
const UserName = styled.span`
  margin-right: 20px;
`;
const Date = styled.span``;

const Contents = styled.div`
  margin-bottom: 20px;
`;

const ContentImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const ContentImg = styled.img`
  height: 500px;
  width: 500px;
`;

const LikeWrap = styled.div`
  min-width: 90vh;
  display: flex;
  flex-direction: row;
`;

const Like = styled.div`
  margin-right: 20px;
`;

const Comment = styled.div`
  margin-right: 600px;
`;

const ContentsWrap = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Btn = styled.button`
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  margin-left: 430px;
  height: 20px;
  font-size: 15px;
  background-color: white;
  &:hover {
    background-color: lightgrey;
  }
`;
const DeleteBtn = styled.button`
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  margin-left: 20px;
  height: 20px;
  font-size: 15px;
  background-color: white;
  &:hover {
    background-color: lightgrey;
  }
`;
