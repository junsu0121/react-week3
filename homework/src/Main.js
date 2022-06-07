import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { auth, db } from "./shared/firebase";
//만든 auth 임포트
import { onAuthStateChanged } from "firebase/auth";

const Main = (props) => {
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
  const post = props.post;

  return (
    <>
      {post.map((list, index) => {
        console.log(list.user_info.user_profile);
        return (
          <ContentsWrap key={index}>
            <div>
              <span>
                <Profile src={list.user_info.user_profile} />
              </span>
              <UserName>{list.user_info.user_name}.</UserName>{" "}
              <Date>{list.insert_dt}</Date>
            </div>
            <hr />
            <Contents>{list.contents}</Contents>
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
      {is_login ? (
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
      ) : (
        <></>
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
