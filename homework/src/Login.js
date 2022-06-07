import React from "react";
import styled from "styled-components";
import { auth, db } from "./shared/firebase";
//만든 auth 임포트
import { signInWithEmailAndPassword } from "firebase/auth";
//파이어베이스의 auth의 로그인 임포트
import { getDocs, where, query, collection } from "firebase/firestore";
//getDocs를 이용해서 닉네임 가져옴, 근데 id가 임의값이여서 where을 사용해야함, query와 collection도 필요!
import { Link } from "react-router-dom";

const Login = () => {
  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  const loginFB = async () => {
    //벨리데이션 필수!
    console.log(id_ref.current.value, pw_ref.current.value);
    const user = await signInWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
    // (auth, "id", "pw")
    console.log(user);
    const user_docs = await getDocs(
      query(collection(db, "users"), where("user_id", "==", user.user.email))
    );
    //쿼리 : 어떤 데이터베이스에서 어떤 조건을 가지고 어떤 것을 가져와! // 조건: where(user_id가 같으면 좋겠어, user안에 user에 이메일이랑 같으면 좋겠어)
    user_docs.forEach((u) => {
      //배열로 오는데 forEach를 통해서 얻음
      console.log(u.data());
      //이걸 리덕스에 저장해서 사용하자
    });
  };
  return (
    <>
      <h1>Log In</h1>
      <SignUpWrap>
        <h3>Email</h3>
        <Input placeholder="이메일을 입력해주세요!" ref={id_ref} />
        <h3>비밀번호</h3>
        <Input placeholder="비밀번호를 입력해주세요!" ref={pw_ref} />
        <Link to="/">
          <Btn onClick={loginFB}>Log In</Btn>
        </Link>
      </SignUpWrap>
    </>
  );
};

const SignUpWrap = styled.div`
  min-width: 30vw;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  height: 30px;

  &:hover {
    color: grey;
  }
`;
const Btn = styled.button`
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  margin-top: 50px;
  height: 30px;
  font-size: 20px;
  background-color: white;
  &:hover {
    background-color: lightgrey;
  }
`;
export default Login;
