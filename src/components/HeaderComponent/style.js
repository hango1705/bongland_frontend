import styled from "styled-components";
import { Row } from "antd";

export const WrapperHeader = styled(Row)`
  padding: 10px 120px;
  background-color: #fff;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
  width: 100%;
`;
export const WrapperTextHeader = styled.span`
  font-size: 18px;
  color: #02c4c1;
  font-weight: bold;
  text-align: left;
  cursor: pointer;
`;
export const WrapperHeaderAccount = styled.span`
  display: flex;
  align-items: center;
  color: #f48ea1;
  gap: 10px;
`;
export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: #f48ea1;
  white-space: nowrap;
`;
export const WrapperIconHeader = styled.span`
  font-size: 30px;
  color: #f48ea1;
`;
export const WrapperContentPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: #f48ea1;
  }
`;
