import styled from "styled-components";
import { Spin } from "antd";

export const PromotionContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px 60px;
  
  .promotion-faq {
    margin-top: 60px;
    
    h3 {
      text-align: center;
      margin-bottom: 30px;
      color: var(--text-color);
      font-size: 28px;
      font-weight: 600;
    }
    
    .ant-card {
      height: 100%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      transition: all 0.3s ease;
      
      &:hover {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        transform: translateY(-3px);
      }
      
      .ant-card-head {
        border-bottom: 1px solid #f0f0f0;
        background-color: rgba(255, 102, 131, 0.05);
        
        .ant-card-head-title {
          font-weight: 600;
          color: var(--primary-color);
        }
      }
    }
  }
`;

export const PromotionBanner = styled.div`
  height: 300px;
  background-image: linear-gradient(to right, #ff6683, #fdafbc);
  margin: 0 -20px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url('https://source.unsplash.com/random/1600x800/?teddy,gift') center/cover no-repeat;
    opacity: 0.15;
  }
  
  .banner-content {
    text-align: center;
    position: relative;
    z-index: 2;
    color: white;
    
    h1 {
      font-size: 42px;
      font-weight: 700;
      margin-bottom: 10px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    p {
      font-size: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
  }
`;

export const PromotionHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h2 {
    color: var(--primary-color);
    margin-bottom: 10px;
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background-color: var(--primary-color);
    }
  }
  
  .ant-typography {
    color: var(--text-light);
    font-size: 16px;
  }
`;

export const PromotionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  position: relative;
  min-height: 200px;
  
  ${props => props.loading && `
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.7);
      z-index: 1;
    }
    
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
    }
  `}
`;

export const PromotionCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  
  .promo-image {
    height: 200px;
    position: relative;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    &:hover img {
      transform: scale(1.1);
    }
    
    .category-tag {
      position: absolute;
      top: 10px;
      left: 10px;
      font-weight: 500;
      z-index: 1;
    }
  }
  
  .promo-content {
    padding: 20px;
    
    h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
      color: var(--text-color);
    }
    
    p {
      font-size: 14px;
      color: var(--text-light);
      margin-bottom: 20px;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    
    .promo-meta {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
      
      .promo-code, .promo-validity {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: var(--text-light);
        
        span {
          font-weight: 600;
          color: var(--primary-color);
          background-color: rgba(255, 102, 131, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
        }
        
        svg {
          color: var(--primary-color);
        }
      }
    }
    
    .ant-btn {
      background-color: var(--primary-color);
      border: none;
      border-radius: 20px;
      height: 40px;
      font-weight: 500;
      width: 100%;
      
      &:hover {
        background-color: var(--primary-dark);
      }
    }
  }
`;

export const DiscountTag = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--primary-color);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(255, 102, 131, 0.3);
`; 