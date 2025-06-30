import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f5f5fa;
  padding: 20px;
`;

export const PageTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 24px;
`;

export const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

export const OrderStatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #fafbfc;
  border-bottom: 1px solid #f0f0f0;

  .order-id {
    font-size: 15px;
    color: #666;
    
    span {
      font-weight: 500;
      color: #333;
      margin-left: 8px;
    }
  }

  .order-status {
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    
    &.pending {
      background: #fff3e0;
      color: #f57c00;
    }
    
    &.processing {
      background: #e3f2fd;
      color: #1976d2;
    }
    
    &.delivered {
      background: #e8f5e9;
      color: #388e3c;
    }
    
    &.cancelled {
      background: #fbe9e7;
      color: #d32f2f;
    }
  }
`;

export const OrderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.div`
  background: #fff;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  overflow: hidden;

  .card-header {
    padding: 12px 16px;
    background: #fafbfc;
    border-bottom: 1px solid #f0f0f0;
    font-weight: 600;
    color: #333;
    font-size: 15px;
  }

  .card-content {
    padding: 16px;

    .info-item {
      margin-bottom: 12px;
      
      &:last-child {
        margin-bottom: 0;
      }

      .label {
        font-size: 13px;
        color: #666;
        margin-bottom: 4px;
      }

      .value {
        font-size: 14px;
        color: #333;
        font-weight: 500;
      }
    }
  }
`;

export const ProductsTable = styled.div`
  margin: 20px;

  .table-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 16px;
    padding: 12px 16px;
    background: #fafbfc;
    border-radius: 8px 8px 0 0;
    border: 1px solid #f0f0f0;
    
    .header-cell {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      
      &:not(:first-child) {
        text-align: center;
      }
    }
  }
`;

export const ProductItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-top: none;
  align-items: center;

  .product-info {
    display: flex;
    align-items: center;
    gap: 12px;

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid #f0f0f0;
      padding: 4px;
    }

    .details {
      .name {
        font-size: 14px;
        font-weight: 500;
        color: #333;
        margin-bottom: 4px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }

  .price, .quantity, .discount {
    text-align: center;
    font-size: 14px;
    color: #333;
  }

  .price {
    color: #ff6683;
    font-weight: 500;
  }
`;

export const OrderSummary = styled.div`
  margin: 20px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  overflow: hidden;

  .summary-header {
    padding: 12px 16px;
    background: #fafbfc;
    border-bottom: 1px solid #f0f0f0;
    font-weight: 600;
    color: #333;
    font-size: 15px;
  }

  .summary-content {
    padding: 16px;

    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      
      &:not(:last-child) {
        border-bottom: 1px solid #f0f0f0;
      }

      .label {
        font-size: 14px;
        color: #666;
      }

      .value {
        font-size: 14px;
        font-weight: 500;
        color: #333;

        &.total {
          color: #ff6683;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
`;
