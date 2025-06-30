import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
  height: 64px;
  width: 64px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ff6683;
    transform: translateY(-2px);
  }
`;

export const WrapperColImage = styled(Col)`
  flex-basis: unset;
  margin: 5px;
`;
export const ProfileValue = styled.div`
  color: #333;
  font-size: 15px;
  font-weight: 500;
`;
export const ProductImageContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  
  .ant-image {
    width: 100%;
    height: 100%;
    
    img {
      object-fit: contain;
      transition: transform 0.5s ease;
    }
    
    &:hover img {
      transform: scale(1.05);
    }
  }
`;

export const ThumbnailsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;
`;

export const WrapperStyleNameProduct = styled.h1`
  color: #333;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 16px;
  word-break: break-word;
`;

export const WrapperStyleTextSell = styled.span`
  font-size: 15px;
  line-height: 24px;
  color: #777;
  margin-left: 10px;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px dashed #e8e8e8;
  
  .rating-number {
    font-size: 16px;
    font-weight: 600;
    margin-right: 8px;
  }
  
  .stars {
    display: flex;
    margin-right: 8px;
  }
`;

export const WrapperPriceProduct = styled.div`
  background: #fff0f3;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const WrapperPriceTextProduct = styled.div`
  font-size: 32px;
  line-height: 40px;
  font-weight: 600;
  color: #ff6683;
  display: flex;
  align-items: center;
  
  .original-price {
    font-size: 16px;
    color: #999;
    text-decoration: line-through;
    margin-left: 10px;
    font-weight: normal;
  }
  
  .discount-badge {
    background-color: #ff6683;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 14px;
    margin-left: 10px;
    font-weight: bold;
  }
`;

export const WrapperAddressProduct = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 20px;
  
  span {
    color: #666;
  }
  
  span.address {
    text-decoration: underline;
    font-size: 15px;
    line-height: 24px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px;
  }
  
  span.change-address {
    color: #ff6683;
    font-size: 14px;
    line-height: 24px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const WrapperQualityProduct = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  
  button {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    transition: all 0.3s;
    
    &:hover {
      background-color: #e0e0e0;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

export const WrapperInputNumber = styled(InputNumber)`
  &.ant-input-number.ant-input-number-sm {
    width: 50px;
    height: 36px;
    border: none;
    text-align: center;
    
    .ant-input-number-input {
      text-align: center;
      font-weight: 600;
    }
    
    .ant-input-number-handler-wrap {
      display: none;
    }
  }
`;

export const WrapperDescriptionProduct = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  
  .description-title {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .description-content {
    font-size: 15px;
    line-height: 1.6;
    color: #666;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
  
  button {
    flex: 1;
    height: 48px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    &.add-to-cart {
      background-color: #ff6683;
      color: white;
      border: none;
      
      &:hover {
        background-color: #e05a74;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 102, 131, 0.3);
      }
      
      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }
    }
    
    &.buy-now {
      background-color: white;
      color: #ff6683;
      border: 2px solid #ff6683;
      
      &:hover {
        background-color: #fff0f3;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 102, 131, 0.2);
      }
    }
    
    .icon {
      margin-right: 8px;
      font-size: 18px;
    }
  }
`;

export const StockInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  .stock-status {
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    
    &.in-stock {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    
    &.low-stock {
      background-color: #fff8e1;
      color: #ffa000;
    }
    
    &.out-of-stock {
      background-color: #ffebee;
      color: #c62828;
    }
  }
`;

export const ProductDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;
