import React from "react";
import styled from "styled-components";

const Upload = () => {
  const content_ref = React.useRef();
  return (
    <>
      <ContentsWrap>
        <h1>게시글 작성</h1>
        <hr />
        <h3>이미지 업로드</h3>
        <ImgUploadWrap>
          <input />
          <ImgBtn>파일 찾기</ImgBtn>
        </ImgUploadWrap>
        <h3>게시물 내용</h3>
        <ContentTextArea
          type="text"
          placeholder="게시글 작성"
          ref={content_ref}
        />
        <Btn>게시글 작성</Btn>
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
