import React from "react";
import { auth, db } from "./shared/firebase";
//auth 임포트
import { createUserWithEmailAndPassword } from "firebase/auth";
//이메일이랑 비번 가입 임포트
import { collection, addDoc } from "firebase/firestore";
//firebase에 유저정보 바로 업데이트 위한 임포트
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const id_ref = React.useRef(null);
  const name_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  const repw_ref = React.useRef(null);
  const emailCheck = (email) => {
    let _reg =
      /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
    return _reg.test(email);
  };

  const signupFB = async () => {
    //올바른 값인지 확인 -> 벨리데이션
    //벨리데이션 필수!
    if (id_ref.current.value === "" || pw_ref.current.value === "") {
      window.alert("이메일 혹은 비밀번호가 공란! 입력해주세요!");
      return;
    }
    if (!emailCheck(id_ref.current.value)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }
    if (pw_ref.current.value !== repw_ref.current.value) {
      window.alert("비밀번호가 일치하지 않습니다.");
      return;
    } else {
      navigate("/");
    }

    const user = await createUserWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
    //(auth, "e-mail", "pw")로 유저추가
    console.log(user);

    const user_data = await addDoc(collection(db, "users"), {
      //db에 users에 user_id랑 이름 추가해서 함께 저장
      user_id: user.user.email,
      name: name_ref.current.value,
    });
    console.log(user_data.id);
  };
  return (
    <>
      <h1>Sign Up</h1>
      <SignUpWrap>
        <h3>Email</h3>
        <Input placeholder="이메일을 입력해주세요!" ref={id_ref} /> <br />
        <h3>닉네임</h3>
        <Input placeholder="닉네임을 입력해주세요!" ref={name_ref} /> <br />
        <h3>비밀번호</h3>
        <Input
          placeholder="여섯글자 이상 비밀번호를 입력해주세요!"
          ref={pw_ref}
        />
        <h3>비밀번호 확인</h3>
        <Input placeholder="비밀번호를 다시 입력해주세요!" ref={repw_ref} />
        <Btn onClick={signupFB}>Sign Up</Btn>
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
export default SignUp;

// import { auth } from "./shared/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";

//   const signup = async () => {
//     const user = await createUserWithEmailAndPassword(
//       auth,
//       "test123@dev.com",
//       "test123"
//     );
//     //auth, id, pw
//     console.log(user);
//   };
//   return (
//     <div className="App">
//       <button onClick={signup}>회원가입</button>
//     </div>
//   );
// }
