import styled from "styled-components";
import { Tabs, Input } from "antd";

// Main page container
export const OrderPageContainer = styled.div`
  margin: 0 auto;
  max-width: 1600px;
  min-height: 100vh;
  padding: 24px;
  background-color: #fafafa;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 0;
  color: #333;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  .title-icon {
    margin-right: 12px;
    font-size: 24px;
    color: #ff6683;
  }
`;

export const OrderPageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const OrderSearchInput = styled(Input)`
  width: 400px;
  height: 40px;
  border-radius: 8px;
  
  .ant-input {
    font-size: 14px;
  }
  
  .ant-input-prefix {
    color: #ff6683;
    margin-right: 8px;
  }
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const OrderFilterButton = styled.button`
  height: 40px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid ${props => props.$active ? '#ff6683' : '#e0e0e0'};
  background-color: ${props => props.$active ? '#fff0f3' : '#fff'};
  color: ${props => props.$active ? '#ff6683' : '#666'};
  font-weight: ${props => props.$active ? '500' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    border-color: #ff6683;
    color: #ff6683;
  }
  
  svg {
    margin-right: 6px;
  }
`;

export const OrderTabs = styled(Tabs)`
  margin-bottom: 24px;
  
  .ant-tabs-nav {
    margin-bottom: 24px;
  }
  
  .ant-tabs-tab {
    padding: 8px 16px;
    font-size: 15px;
    transition: all 0.2s;
  }
  
  .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #ff6683 !important;
    font-weight: 500;
  }
  
  .ant-tabs-ink-bar {
    background-color: #ff6683;
    height: 3px;
    border-radius: 3px;
  }
`;

export const OrderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 0 16px;
`;

export const OrderItem = styled.div`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin: 20px 0;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const OrderItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fafbfc;
  
  .order-id {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 10px;
      color: #666;
      font-size: 18px;
    }
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const OrderStatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  
  ${props => {
    switch(props.$type) {
      case 'success':
        return `
          background-color: #ebfff0;
          color: #1a9542;
          border: 1px solid #c3ecd1;
        `;
      case 'processing':
        return `
          background-color: #e6f7ff;
          color: #1890ff;
          border: 1px solid #b8e2ff;
        `;
      case 'error':
        return `
          background-color: #fff2f0;
          color: #ff4d4f;
          border: 1px solid #ffccc7;
        `;
      default:
        return `
          background-color: #f5f5f5;
          color: #666;
          border: 1px solid #e0e0e0;
        `;
    }
  }}
`;

export const OrderItemProducts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

export const OrderProductItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background-color: #fafafa;
`;

export const OrderProductImage = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #f0f0f0;
  }
`;

export const OrderProductInfo = styled.div`
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const OrderItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background-color: #fafbfc;
  border-top: 1px solid #f0f0f0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const OrderStatusGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  .status-item {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
    
    svg {
      color: #666;
      margin-right: 8px;
      font-size: 16px;
    }
    
    .label {
      font-weight: 500;
      margin-right: 6px;
      min-width: 80px;
    }
    
    .value {
      font-weight: 400;
    }
    
    .relative-time {
      margin-left: 8px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const OrderSummary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  
  .order-total {
    font-size: 16px;
    
    .total-price {
      font-size: 18px;
      font-weight: 600;
      color: #ff6683;
      margin-left: 8px;
    }
  }
  
  @media (max-width: 768px) {
    align-items: flex-start;
    width: 100%;
  }
`;

export const OrderActionsGroup = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const OrderFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
`;

export const OrderEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
  svg {
    font-size: 60px;
    color: #d9d9d9;
    margin-bottom: 16px;
  }
  
  h3 {
    font-size: 18px;
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
  }
  
  p {
    color: #666;
    text-align: center;
    margin-bottom: 24px;
    max-width: 400px;
  }
  
  button {
    background-color: #ff6683;
    border-color: #ff6683;
    
    &:hover {
      background-color: #ff4d6f;
      border-color: #ff4d6f;
    }
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
  
  .ant-spin {
    .ant-spin-dot-item {
      background-color: #ff6683;
    }
  }
`;

// Original styles preserved for backward compatibility
export const WrapperItemOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
  border-radius: 6px;
  padding: 16px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #f6f6f6;
  background-color: #fff;
`;

export const WrapperHeaderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
`;

export const WrapperFooterItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
  justify-content: space-between;
`;

export const WrapperContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px 0;
  min-height: calc(100vh - 100px);
`;

export const WrapperListOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const WrapperStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  background: rgba(255, 235, 238, 0.3);
  border-radius: 4px;
`;

export const OrderProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  flex: 1;
  min-width: 0;
`;

export const OrderProductItemContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  flex: 1;
  min-width: 600px;

  @media (max-width: 1024px) {
    min-width: auto;
  }
`;
