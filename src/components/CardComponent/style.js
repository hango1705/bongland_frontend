import styled from "styled-components";
import { Card } from "antd";

export const WrapperCardStyle = styled(Card)`
  width: 189px;
  & img {
    height: 189px;
    width: 189px;
  }
  position: relative;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#fff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const StyleNameProduct = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  height: 40px;
  color: rgb(56, 56, 61);
`;
export const WrapperReportText = styled.div`
  font-size: 13px;
  color: rgb(128, 128, 137);
  display: flex;
  align-items: center;
  margin: 6px 0px 0px;
`;
export const WrapperPriceText = styled.div`
  font-size: 16px;
  color: #ff6683;
  font-weight: 500;
  margin: 10px 0 0;
`;
export const StyledCardContent = styled.div`
  margin-top: -8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const WrapperStyleTextSell = styled.span`
  font-size: 15px;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;
