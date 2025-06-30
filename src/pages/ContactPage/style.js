import styled from "styled-components";

export const ContactContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding-bottom: 60px;
  
  h2 {
    font-size: 28px;
    color: var(--text-color);
    margin-bottom: 30px;
    text-align: center;
    position: relative;
    
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
  
  .store-locations {
    padding: 60px 20px;
    margin: 40px 0;
    background-color: var(--bg-light);
  }
  
  .map-container {
    padding: 0 20px;
    margin-bottom: 60px;
    
    .google-map {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      
      .map-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 15px;
        text-align: center;
        
        p {
          margin: 0;
          font-size: 14px;
          
          &:first-child {
            font-weight: 600;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
`;

export const ContactHeader = styled.div`
  height: 300px;
  background-image: linear-gradient(to right, rgba(255, 102, 131, 0.8), rgba(253, 175, 188, 0.8)), 
                    url('https://source.unsplash.com/random/1600x900/?contact,phone');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .header-content {
    text-align: center;
    color: white;
    padding: 0 20px;
    
    h1 {
      font-size: 42px;
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

export const ContactWrapper = styled.div`
  padding: 60px 20px;
`;

export const ContactInfo = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  h2 {
    text-align: left;
    margin-bottom: 30px;
    
    &:after {
      left: 0;
      transform: none;
    }
  }
  
  .info-item {
    display: flex;
    margin-bottom: 25px;
    
    .anticon {
      font-size: 22px;
      color: var(--primary-color);
      margin-right: 15px;
      margin-top: 3px;
    }
    
    h3 {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 5px;
      color: var(--text-color);
    }
    
    p {
      margin: 0;
      color: var(--text-light);
      font-size: 14px;
    }
  }
  
  .social-links {
    h3 {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 15px;
      color: var(--text-color);
    }
    
    .social-icons {
      display: flex;
      gap: 15px;
      
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: white;
        font-size: 18px;
        transition: all 0.3s ease;
        
        &.facebook {
          background-color: #3b5998;
        }
        
        &.instagram {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        }
        
        &.youtube {
          background-color: #ff0000;
        }
        
        &.tiktok {
          background-color: #000000;
        }
        
        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
`;

export const ContactFormWrapper = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  h2 {
    text-align: left;
    margin-bottom: 10px;
    
    &:after {
      display: none;
    }
  }
  
  p {
    color: var(--text-light);
    margin-bottom: 30px;
  }
  
  .contact-form {
    .ant-form-item-label > label {
      font-weight: 500;
      color: var(--text-color);
    }
    
    .ant-input, .ant-select-selector {
      border-radius: 6px;
      border-color: #e8e8e8;
      
      &:hover, &:focus {
        border-color: var(--primary-color);
      }
    }
    
    .ant-input-affix-wrapper:hover, .ant-input-affix-wrapper:focus, .ant-input-affix-wrapper-focused {
      border-color: var(--primary-color);
    }
    
    textarea.ant-input {
      min-height: 120px;
    }
    
    .ant-form-item:last-child {
      margin-bottom: 0;
    }
    
    .ant-btn-primary {
      height: 45px;
      font-weight: 500;
      border-radius: 6px;
      padding: 0 25px;
      display: flex;
      align-items: center;
      background-color: var(--primary-color);
      border: none;
      
      .anticon {
        margin-right: 8px;
      }
      
      &:hover {
        background-color: var(--primary-dark);
      }
    }
  }
`;

export const StoreLocation = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  .store-image {
    height: 180px;
    width: 100%;
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
  }
  
  .store-info {
    padding: 20px;
    
    h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 15px;
      color: var(--text-color);
    }
    
    .info-detail {
      display: flex;
      margin-bottom: 10px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .anticon {
        color: var(--primary-color);
        margin-right: 10px;
        margin-top: 3px;
        flex-shrink: 0;
      }
      
      p {
        margin: 0;
        font-size: 14px;
        color: var(--text-light);
      }
    }
  }
`;

export const FaqSection = styled.div`
  padding: 60px 20px;
  max-width: 900px;
  margin: 0 auto 60px;
  
  .faq-intro {
    text-align: center;
    color: var(--text-light);
    margin-bottom: 30px;
  }
  
  .faq-collapse {
    margin-bottom: 40px;
    border-radius: 8px;
    overflow: hidden;
    
    .ant-collapse-item {
      border-bottom: 1px solid #f0f0f0;
      
      &:last-child {
        border-bottom: none;
      }
    }
    
    .ant-collapse-header {
      padding: 16px 24px;
      background-color: white;
      
      .faq-question {
        display: flex;
        align-items: center;
        
        .anticon {
          color: var(--primary-color);
          margin-right: 10px;
        }
        
        span {
          font-weight: 500;
          color: var(--text-color);
        }
      }
    }
    
    .ant-collapse-content-box {
      padding: 16px 24px;
      background-color: #f9f9f9;
      
      p {
        margin: 0;
        color: var(--text-light);
        line-height: 1.6;
      }
    }
  }
  
  .faq-more {
    text-align: center;
    
    h3 {
      font-size: 20px;
      color: var(--text-color);
      margin-bottom: 10px;
    }
    
    p {
      color: var(--text-light);
      margin-bottom: 20px;
    }
    
    .ant-btn {
      height: 45px;
      font-weight: 500;
      border-radius: 6px;
      padding: 0 25px;
      display: inline-flex;
      align-items: center;
      background-color: var(--primary-color);
      border: none;
      
      .anticon {
        margin-right: 8px;
      }
      
      &:hover {
        background-color: var(--primary-dark);
      }
    }
  }
`; 