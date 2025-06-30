import styled from "styled-components";
import { Row } from "antd";

export const WrapperHeader = styled(Row)`
  padding: 15px 120px;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-shadow: 0 4px 12px rgba(255, 102, 131, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 2px solid #ffeef2;
`;

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  img {
    width: 55px;
    height: 55px;
    margin-right: 12px;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.1) rotate(5deg);
  }
`;

export const WrapperTextHeader = styled.span`
  font-size: 26px;
  color: #ff6683;
  font-weight: bold;
  text-align: left;
  letter-spacing: 1px;
  text-shadow: 1px 1px 0px #ffb6c1;
`;

export const NavLink = styled.div`
  display: flex;
  gap: 35px;
  
  .nav-item {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    position: relative;
    padding: 5px 0;
    transition: all 0.3s ease;
    
    &:hover {
      color: #ff6683;
      transform: translateY(-2px);
    }
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #ff6683;
      transition: width 0.3s ease;
    }
    
    &:hover:after {
      width: 100%;
    }
  }
`;

export const SearchWrapper = styled.div`
  flex: 1;
  max-width: 400px;
  margin: 0 20px;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #fff5f7;
  padding: 8px 15px;
  border-radius: 30px;
  border: 1px dashed #ffcad4;
`;

export const ActionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(255, 102, 131, 0.15);
  
  .action-icon {
    font-size: 20px;
    color: #ff6683;
  }
  
  &:hover {
    transform: scale(1.1);
    background-color: #fff0f3;
  }
`;

export const CartBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 15px;
  border-radius: 20px;
  background-color: white;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(255, 102, 131, 0.15);
  
  span {
    font-size: 14px;
    font-weight: 500;
    color: #ff6683;
  }
  
  svg {
    font-size: 20px;
    color: #ff6683;
  }
  
  &:hover {
    transform: scale(1.05);
    background-color: #fff0f3;
  }
`;

export const UserMenuContainer = styled.div`
  .user-dropdown {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 8px 15px;
    border-radius: 25px;
    background-color: #fff5f7;
    transition: all 0.3s ease;
    border: 1px dashed #ffcad4;
    
    &:hover {
      background-color: #fff0f3;
      transform: translateY(-2px);
    }
    
    img {
      height: 38px;
      width: 38px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #ffcad4;
    }
    
    .user-name {
      font-size: 14px;
      font-weight: 500;
      color: #ff6683;
      max-width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    svg {
      font-size: 14px;
      color: #ff6683;
    }
  }
  
  .login-button {
    button {
      background-color: #ff6683;
      border: none;
      height: 40px;
      padding: 0 20px;
      font-size: 15px;
      font-weight: 500;
      box-shadow: 0 3px 8px rgba(255, 102, 131, 0.3);
      
      &:hover {
        background-color: #ff4d6d;
        transform: translateY(-2px);
      }
    }
  }
`;

export const WrapperHeaderAccount = styled.span`
  display: flex;
  align-items: center;
  color: #f48ea1;
  gap: 10px;
`;

export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: #f48ea1;
  white-space: nowrap;
`;

export const WrapperIconHeader = styled.span`
  font-size: 30px;
  color: #f48ea1;
`;

export const WrapperContentPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: #f48ea1;
  }
`;
