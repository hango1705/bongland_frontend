import { Radio } from "antd";
import styled from "styled-components";

export const WrapperCountOrder = styled.div`
  display: flex;
  align-item: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
export const WrapperItemOrderInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const Label = styled.span`
  font-size: 14px;
  color: #000;
  font-weight: bold;
`;
export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`;
export const WrapperItemOrder = styled.div`
  display: flex;
  align-item: center;
  padding: 9 16px;
  background: #fff;
  margin-top: 12px;
`;
export const WrapperListOrder = styled.div``;
export const WrapperPriceOrder = styled.div`
  display: flex;
  align-item: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
export const WrapperPriceDiscount = styled.span`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`;
export const WrapperContainer = styled.div`
  width: 95%;
  max-width: 800px;
  background-color: #fff;
  border-radius: 6px;
  padding: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;
export const WrapperValue = styled.div`
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 255, 255);
  padding: 10px;
  width: fit-content;
  border-radius: 6px;
  margin-top: 4px;
  font-size: 12px;
`;
export const WrapperInfo = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 10px;
`;
export const WrapperTotal = styled.div`
  display: flex;
  align-item: flex-start;
  justify-content: space-between;
  padding: 17px 20px;
  background: #fff;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
`;

export const DemoNotice = styled.div`
  background-color: #fff3cd;
  color: #856404;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 20px;
  border: 1px solid #ffeeba;
  text-align: center;
  
  span {
    font-weight: bold;
    font-size: 16px;
    display: block;
    margin-bottom: 8px;
  }
  
  p {
    margin: 0;
    font-size: 14px;
  }
`;
