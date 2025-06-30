import { Checkbox } from "antd";
import styled from "styled-components";

export const CartPageContainer = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 30px 0 60px;
`;

export const CartPageContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h1 {
    font-size: 28px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }
  
  .continue-shopping {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #ff6683;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
      color: #e05a74;
      transform: translateX(-5px);
    }
  }
`;

export const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  
  .empty-icon {
    font-size: 80px;
    color: #ffcad4;
    margin-bottom: 20px;
    
    svg {
      filter: drop-shadow(0 4px 6px rgba(255, 102, 131, 0.2));
    }
  }
  
  h3 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 16px;
    color: #666;
    margin-bottom: 30px;
    max-width: 500px;
  }
`;

export const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const WrapperLeft = styled.div`
  width: 100%;
`;

export const WrapperRight = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const WrapperStyleHeaderDelivery = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  
  .delivery-header {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
  }
  
  .ant-steps-item-title {
    font-weight: 500;
    font-size: 14px;
  }
  
  .ant-steps-item-description {
    font-size: 12px;
  }
  
  .ant-steps-item-finish .ant-steps-item-icon {
    background-color: #ff6683;
    border-color: #ff6683;
  }
  
  .ant-steps-item-finish .ant-steps-item-content .ant-steps-item-title {
    color: #ff6683;
  }
  
  .ant-steps-item-process .ant-steps-item-icon {
    background-color: #ff6683;
    border-color: #ff6683;
  }
`;

export const WrapperStyleHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 150px 150px 50px;
  gap: 10px;
  background: white;
  padding: 16px 20px;
  border-radius: 12px 12px 0 0;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid #f0f0f0;
  
  .product-col {
    font-weight: 600;
    color: #333;
    font-size: 15px;
  }
  
  .price-col, .quantity-col {
    font-weight: 600;
    color: #333;
    font-size: 15px;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 50px 1fr 100px 100px 50px;
    padding: 12px;
    
    .product-col, .price-col, .quantity-col {
      font-size: 14px;
    }
  }
`;

export const WrapperListOrder = styled.div`
  background: white;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
`;

export const WrapperItemOrder = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 150px 150px 50px;
  gap: 10px;
  padding: 20px;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  .product-info {
    display: flex;
    align-items: center;
    gap: 15px;
    
    img {
      width: 80px;
      height: 80px;
      object-fit: contain;
      border-radius: 8px;
      border: 1px solid #f0f0f0;
      background-color: white;
      padding: 5px;
    }
    
    .product-details {
      .product-name {
        font-weight: 500;
        font-size: 15px;
        color: #333;
        margin-bottom: 5px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .product-type {
        font-size: 13px;
        color: #777;
      }
    }
  }
  
  .product-price {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #ff6683;
  }
  
  .delete-button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #ccc;
    font-size: 16px;
    transition: all 0.3s ease;
    
    &:hover {
      color: #ff6683;
      transform: scale(1.1);
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 50px 1fr 100px 100px 50px;
    padding: 15px;
    
    .product-info {
      img {
        width: 60px;
        height: 60px;
      }
      
      .product-details .product-name {
        font-size: 14px;
      }
    }
    
    .product-price {
      font-size: 14px;
    }
  }
`;

export const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    border-color: #ff6683;
    width: 18px;
    height: 18px;
    
    &:after {
      width: 6px;
      height: 10px;
    }
  }
  
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #ff6683;
    border-color: #ff6683;
  }
  
  .ant-checkbox-checked::after {
    border-color: #ff6683;
  }
`;

export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  
  .count-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #333;
    
    &:hover:not(.disabled) {
      background-color: #ff6683;
      border-color: #ff6683;
      color: white;
    }
    
    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
      background-color: #f5f5f5;
    }
  }
  
  .count-input {
    width: 40px;
    height: 30px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin: 0 5px;
    text-align: center;
    font-size: 14px;
    color: #333;
  }
`;

export const WrapperPriceDiscount = styled.div`
  font-size: 13px;
  color: #999;
  text-decoration: line-through;
  margin-top: 4px;
`;

export const ShippingInfo = styled.div`
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
  
  .info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
    
    .title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      display: flex;
      align-items: center;
      
      svg {
        color: #ff6683;
        margin-right: 8px;
        font-size: 18px;
      }
    }
    
    .edit-button {
      color: #ff6683;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
  .info-row {
    display: flex;
    margin-bottom: 12px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .info-label {
      width: 140px;
      font-weight: 500;
      color: #666;
      display: flex;
      align-items: center;
      
      svg {
        margin-right: 6px;
        color: #ff6683;
      }
    }
    
    .info-value {
      flex: 1;
      color: #333;
    }
  }
`;

export const PromoCode = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  
  .promo-header {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .promo-input {
    display: flex;
    gap: 10px;
    
    input {
      flex: 1;
      height: 40px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      padding: 0 15px;
      font-size: 14px;
      
      &:focus {
        outline: none;
        border-color: #ff6683;
        box-shadow: 0 0 0 2px rgba(255, 102, 131, 0.2);
      }
    }
    
    button {
      height: 40px;
      min-width: 100px;
      background-color: #ff6683;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: #e05a74;
      }
    }
  }
`;

export const OrderSummary = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
`;

export const WrapperInfo = styled.div`
  padding: 20px;
  
  .summary-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #f0f0f0;
  }
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 14px;
    
    &.discount .value {
      color: #ff6683;
    }
    
    .label {
      color: #777;
      display: flex;
      align-items: center;
    }
    
    .value {
      font-weight: 500;
      color: #333;
      
      .free-shipping-badge {
        background-color: #e7f9ee;
        color: #00a65a;
        font-size: 12px;
        font-weight: 600;
        padding: 3px 8px;
        border-radius: 4px;
      }
    }
  }
  
  .shipping-method {
    margin-top: 20px;
    border-top: 1px dashed #f0f0f0;
    padding-top: 15px;
    
    .method-title {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      margin-bottom: 12px;
    }
    
    .method-options {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .method-option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      transition: all 0.3s ease;
      cursor: pointer;
      
      &.selected {
        border-color: #ff6683;
        background-color: #fff8f9;
        
        .radio-button {
          border-color: #ff6683;
          
          &:after {
            transform: scale(1);
          }
        }
        
        .method-name {
          color: #ff6683;
          font-weight: 600;
        }
      }
      
      &.disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      .radio-button {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 2px solid #ccc;
        position: relative;
        transition: all 0.2s ease;
        
        &:after {
          content: '';
          position: absolute;
          top: 3px;
          left: 3px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ff6683;
          transform: scale(0);
          transition: all 0.2s ease;
        }
      }
      
      .method-details {
        flex: 1;
        
        .method-name {
          font-size: 14px;
          font-weight: 500;
          color: #333;
          margin-bottom: 2px;
        }
        
        .method-time {
          font-size: 12px;
          color: #888;
        }
      }
      
      .method-price {
        font-size: 14px;
        font-weight: 600;
        color: #ff6683;
      }
    }
  }
`;

export const WrapperTotal = styled.div`
  background-color: #fff9fa;
  padding: 20px;
  border-top: 1px solid #ffe6eb;
  
  .total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    .total-label {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }
    
    .total-value {
      font-size: 24px;
      font-weight: 700;
      color: #ff6683;
    }
  }
  
  .shipping-badge {
    background-color: #e7f9ee;
    color: #00a65a;
    font-size: 13px;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 15px;
    
    svg {
      font-size: 14px;
    }
  }
  
  .checkout-button {
    width: 100%;
    height: 48px;
    background-color: #ff6683;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    
    &:hover:not(:disabled) {
      background-color: #e05a74;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(255, 102, 131, 0.3);
    }
    
    &:disabled {
      background-color: #ffc1ce;
      cursor: not-allowed;
    }
  }
  
  .note {
    text-align: center;
    font-size: 12px;
    color: #999;
    margin-top: 15px;
  }
`;

export const UserInfoModal = styled.div`
  .form-item {
    margin-bottom: 20px;
    
    label {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }
    
    input {
      width: 100%;
      height: 40px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      padding: 0 15px;
      font-size: 14px;
      
      &:focus {
        outline: none;
        border-color: #ff6683;
        box-shadow: 0 0 0 2px rgba(255, 102, 131, 0.2);
      }
    }
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 30px;
    
    button {
      height: 40px;
      min-width: 120px;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &.cancel {
        background-color: white;
        color: #666;
        border: 1px solid #e0e0e0;
        
        &:hover {
          background-color: #f5f5f5;
        }
      }
      
      &.save {
        background-color: #ff6683;
        color: white;
        border: none;
        
        &:hover {
          background-color: #e05a74;
        }
      }
    }
  }
`;
