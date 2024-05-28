import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: flex-start;
  height: 44px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;
export const WrapperButtonMore = styled(ButtonComponent)`
  &: hover {
    color: #fff;
    background: #ff6683;
    span {
      color: #fff;
    }
  }
  width: 100%;
  text-align: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
export const WrapperProducts = styled.div`
  margin-top: 20px;
  margin-left: 120px;
  margin-right: 120px;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
`;
