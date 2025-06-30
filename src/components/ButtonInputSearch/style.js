import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .ant-input {
    border-color: #ff6683;
    
    &:focus, &:hover {
      border-color: #ff6683;
      box-shadow: none;
    }
  }
  
  .ant-btn {
    border-color: #ff6683;
    
    &:hover {
      opacity: 0.9;
    }
  }
  
  @media (max-width: 768px) {
    .ant-input {
      font-size: 14px;
    }
  }
`; 