import { Radio } from "antd";
import styled from "styled-components";
import { Layout } from 'antd';
import { Steps } from 'antd';
import { Button } from 'antd';

export const PaymentContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px 0;
`;

export const PaymentContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const PaymentHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
  position: relative;

  h1 {
    margin: 0;
    font-size: 28px;
    color: #333;
  }

  .return-to-cart {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    color: #555;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 4px;
    transition: all 0.2s;

    &:hover {
      color: #ff6683;
      background-color: rgba(255, 102, 131, 0.1);
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 22px;
    }
    
    .return-to-cart {
      position: static;
      transform: none;
      margin-bottom: 10px;
      align-self: flex-start;
    }
  }
`;

export const PaymentSteps = styled(Steps)`
  margin-bottom: 30px;
  
  .ant-steps-item-process .ant-steps-item-icon {
    background: #ff6683;
    border-color: #ff6683;
  }
  
  .ant-steps-item-finish .ant-steps-item-icon {
    border-color: #ff6683;
    
    .ant-steps-icon {
      color: #ff6683;
    }
  }
  
  .ant-steps-item-finish .ant-steps-item-tail::after {
    background-color: #ff6683;
  }
`;

export const PaymentLayout = styled.div`
  display: flex;
  gap: 30px;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const PaymentMain = styled.div`
  flex: 1;
  min-width: 0;
`;

export const PaymentSidebar = styled.div`
  width: 380px;
  
  @media (max-width: 992px) {
    width: 100%;
  }
`;

export const PaymentSection = styled.div`
  margin-bottom: 25px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
`;

export const PaymentSectionHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #eaeaea;
  
  .icon {
    color: #ff6683;
    font-size: 20px;
    margin-right: 10px;
  }
  
  .title {
    font-weight: 600;
    font-size: 16px;
    color: #333;
  }
`;

export const PaymentSectionContent = styled.div`
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const ShippingInfo = styled.div`
  .shipping-address {
    .address-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      
      .title {
        font-weight: 600;
        font-size: 15px;
        color: #333;
      }
      
      .edit-button {
        color: #ff6683;
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 14px;
        background-color: rgba(255, 102, 131, 0.1);
        transition: all 0.2s;
        
        &:hover {
          background-color: rgba(255, 102, 131, 0.2);
        }
      }
    }
    
    .address-details {
      background-color: #f9f9f9;
      border-radius: 6px;
      padding: 12px 15px;
      
      .info-item {
        display: flex;
        margin-bottom: 8px;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        .label {
          min-width: 120px;
          font-weight: 500;
          color: #666;
          display: flex;
          align-items: center;
          
          .anticon {
            margin-right: 5px;
            color: #888;
          }
        }
        
        .value {
          color: #333;
          flex: 1;
          word-break: break-word;
        }
      }
    }
  }
`;

export const SpecialInstructions = styled.div`
  margin-top: 20px;
  
  .instructions-label {
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
  }
  
  textarea {
    width: 100%;
    min-height: 80px;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 6px;
    resize: vertical;
    font-family: inherit;
    font-size: 14px;
    
    &:focus {
      outline: none;
      border-color: #ff6683;
      box-shadow: 0 0 0 2px rgba(255, 102, 131, 0.2);
    }
    
    &::placeholder {
      color: #aaa;
    }
  }
`;

export const DeliveryOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

export const DeliveryOption = styled.div`
  border: 2px solid ${props => props.$selected ? '#ff6683' : '#e8e8e8'};
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s;
  background: ${props => props.$selected ? '#fff0f3' : 'white'};
  
  &:hover {
    border-color: #ff6683;
  }
  
  h4 {
    margin: 0 0 10px;
    color: ${props => props.$selected ? '#ff6683' : '#333'};
  }
  
  .price {
    color: #ff6683;
    font-weight: 600;
  }
  
  .description {
    font-size: 13px;
    color: #666;
    margin-top: 5px;
  }
`;

export const PaymentOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

export const PaymentOption = styled.div`
  border: 2px solid ${props => props.$selected ? '#ff6683' : '#e8e8e8'};
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s;
  background: ${props => props.$selected ? '#fff0f3' : 'white'};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  &:hover {
    border-color: #ff6683;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:after {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${props => props.$selected ? "#ff6683" : "transparent"};
    top: 10px;
    right: 10px;
    transition: all 0.3s;
  }
  
  &:before {
    content: "✓";
    position: absolute;
    top: 7px;
    right: 13px;
    color: white;
    font-size: 11px;
    z-index: 1;
    opacity: ${props => props.$selected ? 1 : 0};
    transition: all 0.3s;
  }
  
  .payment-logo {
    margin-bottom: 10px;
    height: 40px;
    display: flex;
    align-items: center;
    
    img {
      max-height: 100%;
      max-width: 80px;
    }
    
    svg {
      font-size: 24px;
      color: #ff6683;
    }
  }
  
  .payment-info {
    .payment-name {
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }
    
    .payment-description {
      font-size: 12px;
      color: #666;
    }
  }
`;

export const ShippingMethod = styled.div`
  .method-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

export const ShippingMethodOption = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid ${props => props.$selected ? '#ff6683' : '#ddd'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.$selected ? 'rgba(255, 102, 131, 0.05)' : '#fff'};
  position: relative;
  
  &:hover {
    border-color: #ff6683;
    background-color: rgba(255, 102, 131, 0.05);
  }
  
  &:after {
    content: '';
    position: absolute;
    right: 15px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid ${props => props.$selected ? '#ff6683' : '#ddd'};
    background-color: ${props => props.$selected ? '#ff6683' : 'transparent'};
    box-shadow: ${props => props.$selected ? '0 0 0 2px rgba(255, 102, 131, 0.2)' : 'none'};
  }
  
  .method-logo {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }
  
  .method-info {
    flex: 1;
    
    .method-name {
      font-weight: 600;
      color: #333;
      margin-bottom: 3px;
    }
    
    .method-description {
      font-size: 13px;
      color: #777;
    }
  }
  
  .method-price {
    margin-right: 30px;
    font-weight: 600;
    color: ${props => props.$selected ? '#ff6683' : '#333'};
  }
`;

export const PaymentMethod = styled.div`
  .payment-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

export const PaymentMethodOption = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid ${props => props.$selected ? '#ff6683' : '#ddd'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.$selected ? 'rgba(255, 102, 131, 0.05)' : '#fff'};
  position: relative;
  
  &:hover {
    border-color: #ff6683;
    background-color: rgba(255, 102, 131, 0.05);
  }
  
  &:after {
    content: '';
    position: absolute;
    right: 15px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid ${props => props.$selected ? '#ff6683' : '#ddd'};
    background-color: ${props => props.$selected ? '#ff6683' : 'transparent'};
    box-shadow: ${props => props.$selected ? '0 0 0 2px rgba(255, 102, 131, 0.2)' : 'none'};
  }
  
  .payment-logo {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }
  
  .payment-info {
    flex: 1;
    
    .payment-name {
      font-weight: 600;
      color: #333;
      margin-bottom: 3px;
    }
    
    .payment-description {
      font-size: 13px;
      color: #777;
    }
  }
`;

export const PaymentSummary = styled.div`
  width: 380px;
  align-self: flex-start;
  
  @media (max-width: 992px) {
    width: 100%;
  }
`;

export const OrderProducts = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  
  .summary-title {
    font-weight: 600;
    font-size: 16px;
    color: #333;
    margin-bottom: 15px;
    
    .items-count {
      color: #777;
      font-weight: normal;
      margin-left: 5px;
    }
  }
  
  .product-list {
    max-height: 300px;
    overflow-y: auto;
    padding-right: 5px;
    
    &::-webkit-scrollbar {
      width: 5px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: #ddd;
      border-radius: 10px;
    }
    
    &::-webkit-scrollbar-track {
      background-color: #f5f5f5;
      border-radius: 10px;
    }
  }
`;

export const OrderProduct = styled.div`
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
  
  .product-image {
    width: 60px;
    height: 60px;
    border-radius: 6px;
    overflow: hidden;
    margin-right: 12px;
    position: relative;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .quantity-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background-color: #ff6683;
      color: white;
      border-radius: 50%;
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
    }
  }
  
  .product-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    .product-name {
      font-weight: 500;
      color: #333;
      margin-bottom: 5px;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .product-price {
      font-weight: 600;
      color: #ff6683;
    }
  }
`;

export const OrderSummaryInfo = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #eaeaea;
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    
    .label {
      color: #666;
    }
    
    .value {
      font-weight: 500;
      color: #333;
    }
  }
  
  .divider {
    height: 1px;
    background-color: #eee;
    margin: 15px 0;
  }
  
  .total-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    
    .total-label {
      font-weight: 600;
      font-size: 16px;
      color: #333;
    }
    
    .total-value {
      font-weight: 700;
      font-size: 18px;
      color: #ff6683;
    }
  }
  
  .order-button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 6px;
    background-color: #ff6683;
    color: white;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 15px;
    
    &:hover {
      background-color: #ff5078;
    }
    
    &:disabled {
      background-color: #ffb3c2;
      cursor: not-allowed;
    }
  }
  
  .note {
    font-size: 12px;
    color: #777;
    text-align: center;
    margin-bottom: 15px;
  }
  
  .secure-payment {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #666;
    
    .anticon {
      color: #4caf50;
      margin-right: 5px;
    }
  }
`;

export const OrderConfirmation = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 40px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  
  .success-icon {
    font-size: 64px;
    color: #52c41a;
    margin-bottom: 24px;
  }
  
  .confirmation-title {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 16px;
  }
  
  .confirmation-message {
    color: #666;
    margin-bottom: 24px;
    line-height: 1.5;
  }
  
  .order-number {
    background-color: #f6ffed;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 24px;
    border: 1px solid #b7eb8f;
    
    .label {
      color: #666;
      margin-bottom: 4px;
    }
    
    .number {
      font-size: 18px;
      font-weight: 600;
      color: #52c41a;
    }
  }
  
  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 16px;
    
    button {
      min-width: 160px;
      height: 44px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      
      &.primary {
        background-color: #ff6683;
        border: none;
        color: white;
        
        &:hover {
          background-color: #e5596e;
        }
      }
      
      &.secondary {
        background-color: white;
        border: 1px solid #ff6683;
        color: #ff6683;
        
        &:hover {
          background-color: #fff0f3;
        }
      }
    }
    
    @media (max-width: 576px) {
      flex-direction: column;
      gap: 12px;
      
      button {
        width: 100%;
      }
    }
  }
`;

export const CheckoutSteps = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  
  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 120px;
    position: relative;
    
    &:not(:last-child):after {
      content: '';
      position: absolute;
      top: 15px;
      right: -50px;
      width: 100px;
      height: 1px;
      background-color: #ddd;
    }
    
    .step-number {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      margin-bottom: 5px;
      color: #888;
    }
    
    .step-text {
      font-size: 14px;
      color: #888;
    }
  }

  @media (max-width: 768px) {
    .step {
      width: 90px;
      
      &:not(:last-child):after {
        width: 70px;
        right: -35px;
      }
      
      .step-text {
        font-size: 12px;
      }
    }
  }
`;
