import React from "react";
import styled from "styled-components";

const Modify = () => {
  const modify_ref = React.useRef();
  return (
    <>
      <ContentsWrap>
        <h1>게시글 수정하기</h1>
        <hr />
        <h3>이미지 변경</h3>
        <ImgUploadWrap>
          <input />
          <ImgBtn>파일 찾기</ImgBtn>
        </ImgUploadWrap>
        <h3>게시글 수정</h3>
        <ContentTextArea
          type="text"
          placeholder="게시글 작성"
          ref={modify_ref}
        />
        <BtnWrap>
          <Btn>게시글 수정</Btn>
          <Btn>게시글 삭제</Btn>
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
