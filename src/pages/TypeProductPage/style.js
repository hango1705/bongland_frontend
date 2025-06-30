import { Col, Select, Input } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

export const WrapperProducts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  width: 100%;
`;

export const WrapperNavbar = styled.div`
  background: white;
  padding: 18px;
  border-radius: 12px;
  height: fit-content;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  position: sticky;
  top: 20px;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(255, 102, 131, 0.15);
    border-color: #ffcad4;
  }
`;

export const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 2px solid #ffcad4;

  .title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: center;
    gap: 8px;

    .anticon {
      color: #ff6683;
    }
  }
`;

export const ClearFiltersButton = styled.button`
  background: #fff0f3;
  border: none;
  color: #ff6683;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 16px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff6683;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(255, 102, 131, 0.25);
  }

  .anticon {
    font-size: 12px;
  }
`;

export const ProductTypeHeader = styled.div`
  background-image: linear-gradient(to right, rgba(255, 102, 131, 0.8), rgba(253, 175, 188, 0.8)),
                    url('https://source.unsplash.com/random/1600x400/?teddy,plush');
  background-size: cover;
  background-position: center;
  padding: 40px 30px;
  margin-bottom: 30px;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  h1 {
    font-size: 32px;
    font-weight: 700;
    color: white;
    margin-bottom: 10px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  p {
    font-size: 16px;
    color: white;
    max-width: 600px;
    margin-bottom: 0;
    opacity: 0.9;
  }
`;

export const ProductCount = styled.div`
  background: #fff0f3;
  padding: 8px 15px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #ff6683;
  
  span {
    margin-left: 5px;
    font-weight: 600;
  }
`;

// Add styles for the sorting dropdown
export const SortSelect = styled(Select)`
  min-width: 160px;
  
  .ant-select-selector {
    border-color: #f0f0f0 !important;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05) !important;
    height: 40px !important;
    display: flex;
    align-items: center;
    
    &:hover {
      border-color: #ffcad4 !important;
    }
  }
  
  &.ant-select-focused .ant-select-selector {
    border-color: #ff6683 !important;
    box-shadow: 0 0 0 2px rgba(255, 102, 131, 0.2) !important;
  }
  
  .ant-select-arrow {
    color: #ff6683;
  }
`;

// Create separate styles for dropdown to avoid overlay deprecation
export const dropdownStyles = {
  items: {
    borderRadius: '8px',
    boxShadow: '0 3px 12px rgba(0, 0, 0, 0.1)',
  },
  option: {
    padding: '10px 12px',
  },
  optionSelected: {
    backgroundColor: '#fff0f3',
    color: '#ff6683',
    fontWeight: 600,
  },
  optionActive: {
    backgroundColor: '#fff8f9',
  }
};

export const ProductActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background: white;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  .sort-container {
    display: flex;
    align-items: center;
    gap: 10px;
    
    label {
      font-size: 14px;
      font-weight: 500;
      color: #666;
    }
  }
`;

export const SearchInput = styled(Input)`
  width: 100%;
  border-radius: 8px;
  border-color: #f0f0f0;
  padding: 10px 15px;
  height: 42px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover, &:focus {
    border-color: #ffcad4;
    box-shadow: 0 3px 8px rgba(255, 102, 131, 0.15);
  }
  
  .ant-input-prefix {
    margin-right: 10px;
    color: #ff6683;
  }
`;

export const SearchContainer = styled.div`
  margin-bottom: 20px;
`;
