import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
    height: 64px
    width: 64px
`;
export const WrapperColImage = styled(Col)`
  flex-basics: unset;
`;
export const WrapperStyleNameProduct = styled.h1`
  color: rgb(36, 36, 36);
  font-size: 24px;
  font-weight: 300;
  line-height: 20px;
  word-break: break-word;
  padding-left: 10px;
`;
export const WrapperStyleTextSell = styled.span`
  font-size: 15px;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;

export const WrapperPriceProduct = styled.div`
  background: rgb(250, 250, 250);
  border-radius: 4px;
`;
export const WrapperPriceTextProduct = styled.h1`
  font-size: 32px;
  line-height: 40px;
  margin-right: 8px;
  font-weight: 500;
  padding-left: 10px;
  margin-top: 10px;
  color: rgb(255, 57, 69);
`;
export const WrapperAddressProduct = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;
  gap: 3px;
  span.address {
    margin-bottom: 2px;
    text-decoration: underline;
    font-size: 15px;
    line-height: 24px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span.change-address {
    color: rgb(11, 116, 229);
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  }
`;
export const WrapperQualityProduct = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  width: 120px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
export const WrapperDescriptionProduct = styled.div`
  padding-left: 10px;
  width: 580px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgb(229, 229, 229);
`;

export const WrapperInputNumber = styled(InputNumber)`
  &.ant-input-number.ant-input-number-sm {
    width: 40px;
    border-top: none;
    border-bottom: none;
    .ant-input-number-handler-wrap {
      display: none;
    }
  }
`;
