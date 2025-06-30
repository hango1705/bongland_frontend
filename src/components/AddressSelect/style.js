import styled from 'styled-components';

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  
  .ant-select {
    width: 100%;
    
    .ant-select-selector {
      border-radius: 4px;
      border: 1px solid #d9d9d9;
      
      &:hover {
        border-color: #ff6683;
      }
    }
    
    &.ant-select-focused .ant-select-selector {
      border-color: #ff6683;
      box-shadow: 0 0 0 2px rgba(255, 102, 131, 0.2);
    }
  }
  
  .ant-alert {
    margin-top: 10px;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const SelectLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 0px;
`; 