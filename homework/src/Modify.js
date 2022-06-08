import React from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { db, storage } from "./shared/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { modifyContentFB } from "./redux/modules/homework";

const Modify = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const content_index = params.index;
  const content_list = useSelector((state) => state.homework.list);
  const modify_ref = React.useRef();
  const file_link_ref = React.useRef(null);

  const uploadImgFB = async (e) => {
    console.log(e.target.files);
    const uploaded_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );
    console.log(uploaded_file);
    const file_url = await getDownloadURL(uploaded_file.ref);
    console.log(file_url);
    file_link_ref.current = { url: file_url };
  };

  const modifyContentList = () => {
    dispatch(
      modifyContentFB({
        content: modify_ref.current.value,
        image_url: file_link_ref.current.url,
        // id: params,
        id: content_list[content_index].id,
        //id 값 보내기!
      })
    );
    // console.log(file_link_ref.current.url, "이거");
    navigate("/");
  };
  return (
    <>
      <ContentsWrap>
        <h1>게시글 수정하기</h1>
        <hr />
        <h3>이미지 변경</h3>
        <ImgUploadWrap>
          <input type="file" onChange={uploadImgFB} />
        </ImgUploadWrap>
        <h3>게시글 수정</h3>
        <ContentTextArea
          type="text"
          placeholder="게시글 수정"
          ref={modify_ref}
        />
        <BtnWrap>
          <Btn onClick={modifyContentList}>게시글 수정</Btn>
        </BtnWrap>
      </ContentsWrap>
    </>
  );
};

const ContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const ImgUploadWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ImgBtn = styled.button`
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  margin-left: 30px;
  background-color: white;
  &:hover {
    background-color: lightgrey;
  }
`;
const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
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
const ContentTextArea = styled.textarea`
  min-width: 40vw;
  min-height: 20vh;
  text-align: left;
`;
export default Modify;
