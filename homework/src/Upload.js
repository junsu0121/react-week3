import React from "react";
import styled from "styled-components";
import { db, storage } from "./shared/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createContentFB } from "./redux/modules/homework";

const Upload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const content_ref = React.useRef(null);
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
  const uploadFB = () => {
    dispatch(
      createContentFB({
        content: content_ref.current.value,
        image_url: file_link_ref.current.url,
      })
    );
    navigate("/");
  };

  return (
    <>
      <ContentsWrap>
        <h1>게시글 작성</h1>
        <hr />
        <h3>이미지 업로드</h3>
        <ImgUploadWrap>
          <input type="file" onChange={uploadImgFB} />
          {/* 이미지 인풋 */}
        </ImgUploadWrap>
        <h3>게시물 내용</h3>
        <ContentTextArea
          type="text"
          placeholder="게시글 작성"
          ref={content_ref}
        />
        <Btn onClick={uploadFB}>게시글 작성</Btn>
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
export default Upload;
