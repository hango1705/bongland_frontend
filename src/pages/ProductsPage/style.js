import styled from 'styled-components';
import { Select } from 'antd';

export const ProductsContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding-bottom: 60px;

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
`;

export const ProductsHeader = styled.div`
  height: 200px;
  background-image: linear-gradient(to right, rgba(255, 102, 131, 0.8), rgba(253, 175, 188, 0.8)),
                    url('https://source.unsplash.com/random/1600x900/?teddy,toy');
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

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 0 20px;
  
  .filter-left {
    .ant-input-search {
      .ant-input {
        border-color: var(--primary-color);
        
        &:focus, &:hover {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(255, 102, 131, 0.2);
        }
      }
      
      .ant-input-search-button {
        border-color: var(--primary-color);
        background-color: var(--primary-color);
        
        &:hover {
          background-color: var(--primary-dark);
          border-color: var(--primary-dark);
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    
    .filter-left, .filter-right {
      width: 100%;
    }
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  padding: 0 20px;
`;

export const SortSelect = styled(Select)`
  .ant-select-selector {
    border-color: var(--primary-color) !important;
    
    &:hover {
      border-color: var(--primary-color) !important;
    }
  }
  
  &.ant-select-focused .ant-select-selector {
    border-color: var(--primary-color) !important;
    box-shadow: 0 0 0 2px rgba(255, 102, 131, 0.2) !important;
  }
  
  .ant-select-arrow {
    color: var(--primary-color);
  }
`; 