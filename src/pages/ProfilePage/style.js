import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #000;
  font-size: 18px;
  margin: 5px 0;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;
export const WrapperContentProfile = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  width: 600px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 10px;
  gap: 30px;
`;

export const WrapperLabel = styled.label`
  color: #000;
  font-size: 12px;
  line-height: 30px;
  font-weight: 600;
  width: 100px;
  text-align: left;
`;
export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const WrapperUploadFile = styled.input`
  color: white;
  max-width: 70px;
`;
