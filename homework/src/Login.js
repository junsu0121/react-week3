import React from "react";
import styled from "styled-components";
import { auth, db } from "./shared/firebase";
//만든 auth 임포트
import { signInWithEmailAndPassword } from "firebase/auth";
//파이어베이스의 auth의 로그인 임포트
import { getDocs, where, query, collection } from "firebase/firestore";
//getDocs를 이용해서 닉네임 가져옴, 근데 id가 임의값이여서 where을 사용해야함, query와 collection도 필요!
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  const emailCheck = (email) => {
    let _reg =
      /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
    return _reg.test(email);
  };

  const loginFB = async () => {
    //벨리데이션 필수!
    if (id_ref.current.value === "" || pw_ref.current.value === "") {
      window.alert("이메일 혹은 비밀번호가 공란! 입력해주세요!");
      return;
    }
    if (!emailCheck(id_ref.current.value)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    } else {
      navigate("/");
    }

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
        <Btn onClick={loginFB}>Log In</Btn>
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

// const Login = (props) => {
// const dispatch = useDispatch();

// const [id, setId] = useState("");
// const [pwd, setPwd] = useState("");

// const login = () => {
//   if (!emailCheck(id)) {
//     window.alert("이메일 형식이 올바르지 않습니다!");
//   }

//   dispatch(userActions.loginFB(id, pwd));
// };

// return (
//   <Grid padding="16px">
//     <Title>로그인</Title>
//     <Input
//       value={id}
//       label="아이디"
//       placeholder="아이디를 입력해주세용!"
//       _onChange={(e) => {
//         setId(e.target.value);
//       }}
//     />
//     <Input
//       value={pwd}
//       type="password"
//       label="비밀번호"
//       placeholder="비밀번호를 입력해주세용!"
//       _onChange={(e) => {
//         setPwd(e.target.value);
//       }}
//       is_submit
//       _onSubmit={login}
//     />
//     <Button
//       margin="30px 0"
//       _onClick={login}
//       _disabled={id === "" || pwd === "" ? true : false}
//     >
//       로그인하기
//     </Button>
//   </Grid>
