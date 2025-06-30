import styled from "styled-components";
import { Card } from "antd";

export const WrapperCardStyle = styled(Card)`
  width: 100%;
  max-width: 250px;
  margin: 0 auto;
  & img {
    height: 220px;
    width: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }
  position: relative;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#fff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(255, 102, 131, 0.2);
    transform: translateY(-5px);
    
    & img {
      transform: scale(1.05);
    }
  }
`;

export const StyleNameProduct = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 1.3;
  text-align: center;
  height: 42px;
  color: rgb(56, 56, 61);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 5px;
`;

export const WrapperReportText = styled.div`
  font-size: 13px;
  color: rgb(128, 128, 137);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 6px 0px;
`;

export const WrapperPriceText = styled.div`
  font-size: 18px;
  color: #ff6683;
  font-weight: 600;
  margin: 8px 0 0;
`;

export const StyledCardContent = styled.div`
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WrapperStyleTextSell = styled.span`
  font-size: 13px;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;

export const DiscountBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff6683;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;
  z-index: 1;
`;

export const StockStatus = styled.div`
  font-size: 12px;
  color: ${props => props.$inStock ? '#00a65a' : '#cc0000'};
  margin-top: 5px;
`;
