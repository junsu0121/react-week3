import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Main from "./Main";
import MainLogin from "./MainLogin";
import SignUp from "./SignUp";
import Login from "./Login";
import Upload from "./Upload";
import Modify from "./Modify";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "./shared/firebase";
//만든 auth 임포트
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
//파이어베이스의 auth의 로그인 임포트
import { getDocs, where, query, collection } from "firebase/firestore";
import { async } from "@firebase/util";

function App() {
  const post = [
    {
      user_info: {
        user_name: "test01",
        user_profile:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXGxD-ND0d9Ekmpwd0jOmgPfXpAlUzFbcnQg&usqp=CAU",
      },
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXGxD-ND0d9Ekmpwd0jOmgPfXpAlUzFbcnQg&usqp=CAU",
      contents: "엉엉! 나스닥 파멸적 반등 좀 주세요ㅜㅠ",
      comment_cnt: 10,
      insert_dt: "2021-02-27 10:00:00",
    },
    {
      user_info: {
        user_name: "test02",
        user_profile:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXGxD-ND0d9Ekmpwd0jOmgPfXpAlUzFbcnQg&usqp=CAU",
      },
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXGxD-ND0d9Ekmpwd0jOmgPfXpAlUzFbcnQg&usqp=CAU",
      contents: "엉엉! 나스닥 파멸적 반등 좀 주세요ㅜㅠ",
      comment_cnt: 10,
      insert_dt: "2021-02-27 10:00:00",
    },
  ];
  const [is_login, setIsLogin] = React.useState(false);
  //로그인 여부 확인, 처음에는 false로 초기값
  console.log(auth.currentUser);
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
    <div className="App">
      <Container>
        <MenuWrap>
          <Menu>
            <Link to="/">
              <span>
                <FontAwesomeIcon icon={faHouse} />
              </span>
            </Link>
            <Link to="signup">
              <div>Sign Up</div>
            </Link>

            {is_login ? (
              <button
                onClick={() => {
                  signOut(auth);
                  //누르면 로그아웃까지
                }}
              >
                Log Out
              </button>
            ) : (
              <Link to="/login">
                <div>Log In</div>
              </Link>
            )}
          </Menu>
          <hr />
        </MenuWrap>
        <Routes>
          {/* switch 대신 routes */}
          <Route path="/" element={<Main post={post} />}></Route>
          {is_login ? (
            <Route path="/" element={<Main post={post} />}></Route>
          ) : (
            <Route path="/login" element={<Login />}></Route>
          )}
          <Route path="/mainlogin" element={<MainLogin />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/upload" element={<Upload />}></Route>
          {/* component 대신 element */}
          {/* <Route path="/cat/:name" element={<Cat />}></Route> */}
          <Route path="/modify" element={<Modify />}></Route>
          {/* :name 으로 파라미터 이름지정 */}
        </Routes>
      </Container>
    </div>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const MenuWrap = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Menu = styled.div`
  min-width: 90vh;
  display: grid;
  grid-template-columns: 3fr 0.5fr 0.5fr;
  grid-template-rows: 3fr 1fr 1fr;
`;
export default App;
