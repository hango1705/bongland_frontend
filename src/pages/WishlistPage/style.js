import styled from "styled-components";

export const WishlistContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding-bottom: 60px;
  
  .loading-container {
    padding: 60px 0;
    text-align: center;
    
    .spinner {
      display: inline-block;
      width: 40px;
      height: 40px;
      border: 3px solid rgba(255, 102, 131, 0.2);
      border-radius: 50%;
      border-top-color: var(--primary-color);
      animation: spin 1s ease-in-out infinite;
      margin-bottom: 15px;
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    
    p {
      font-size: 16px;
      color: var(--text-light);
    }
  }
  
  .pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    
    .ant-pagination-item-active {
      border-color: var(--primary-color);
      
      a {
        color: var(--primary-color);
      }
    }
  }
  
  .recommendations {
    margin-top: 60px;
    padding: 0 20px;
    
    .ant-divider {
      color: var(--text-color);
      
      h2 {
        font-size: 24px;
        font-weight: 600;
      }
    }
    
    .ant-card {
      border-radius: 8px;
      overflow: hidden;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      }
      
      .ant-card-cover img {
        height: 200px;
        object-fit: cover;
      }
      
      .ant-card-meta-title {
        font-size: 16px;
        font-weight: 500;
      }
      
      .ant-card-meta-description {
        color: var(--primary-color);
        font-weight: 600;
      }
    }
  }
`;

export const WishlistHeader = styled.div`
  height: 250px;
  background-image: linear-gradient(to right, rgba(255, 102, 131, 0.8), rgba(253, 175, 188, 0.8)), 
                    url('https://source.unsplash.com/random/1600x900/?teddy,love');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  
  .header-content {
    text-align: center;
    color: white;
    padding: 0 20px;
    
    h1 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 16px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    p {
      font-size: 18px;
      max-width: 600px;
      margin: 0 auto;
    }
  }
`;

export const WishlistToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 0 20px;
  
  .toolbar-right {
    display: flex;
    align-items: center;
    gap: 15px;
    
    .item-count {
      font-weight: 500;
      color: var(--text-light);
    }
    
    .ant-btn {
      border-radius: 4px;
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    
    .toolbar-left, .toolbar-right {
      width: 100%;
    }
    
    .toolbar-right {
      justify-content: space-between;
    }
  }
`;

export const WishlistItem = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
  opacity: ${props => props.$inStock ? '1' : '0.8'};
  
  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
  
  .item-image {
    position: relative;
    height: 220px;
    overflow: hidden;
    cursor: pointer;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    &:hover img {
      transform: scale(1.1);
    }
    
    .out-of-stock {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 600;
    }
    
    .discount-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: var(--primary-color);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 14px;
    }
  }
  
  .item-content {
    padding: 15px;
    
    h3 {
      font-size: 16px;
      color: var(--text-color);
      margin-bottom: 10px;
      cursor: pointer;
      transition: color 0.2s ease;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 48px;
      
      &:hover {
        color: var(--primary-color);
      }
    }
  }
`;

export const WishlistPrice = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  .price {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-color);
  }
  
  .original-price {
    font-size: 14px;
    color: var(--text-muted);
    text-decoration: line-through;
  }
`;

export const WishlistActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .ant-btn-primary {
    background-color: var(--primary-color);
    border: none;
    height: 36px;
    
    &:hover, &:focus {
      background-color: var(--primary-dark);
    }
    
    &:disabled {
      opacity: 0.6;
    }
    
    .anticon {
      font-size: 16px;
    }
  }
  
  .action-icons {
    display: flex;
    gap: 8px;
    
    .action-button {
      padding: 0;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      
      &:hover {
        background-color: #f5f5f5;
      }
      
      &.delete:hover {
        color: #ff4d4f;
      }
    }
  }
`;

export const EmptyWishlist = styled.div`
  padding: 60px 20px;
  text-align: center;
  
  .ant-empty {
    margin-bottom: 20px;
  }
  
  .ant-btn-primary {
    background-color: var(--primary-color);
    border: none;
    height: 40px;
    font-weight: 500;
    
    &:hover {
      background-color: var(--primary-dark);
    }
  }
`;

export const StockStatus = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
`; 