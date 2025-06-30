import styled from "styled-components";

export const WrapperLabelText = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #ffcad4;
`;

export const WrapperTextValue = styled.div`
  padding: 10px 12px;
  color: ${props => props.$isSelected ? 'white' : '#444'};
  border-radius: 8px;
  background-color: ${props => props.$isSelected ? '#ff6683' : 'white'};
  width: 100%;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.$isSelected ? '600' : '400'};
  box-shadow: ${props => props.$isSelected ? '0 4px 10px rgba(255, 102, 131, 0.25)' : '0 2px 5px rgba(0, 0, 0, 0.05)'};
  border: 1px solid ${props => props.$isSelected ? '#ff6683' : '#eee'};
  
  &:hover {
    background-color: ${props => props.$isSelected ? '#ff6683' : '#fff0f3'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: #ffcad4;
  }
`;

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px 0;
  border-top: 1px solid #f0f0f0;
  margin-bottom: 5px;

  .filter-title {
    font-size: 14px;
    font-weight: 600;
    color: #555;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 8px;
      color: #ff6683;
    }
  }
  
  .filter-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const WrapperTextPrice = styled.div`
  padding: 10px 12px;
  color: ${props => props.$isSelected ? 'white' : '#444'};
  border-radius: 8px;
  background-color: ${props => props.$isSelected ? '#ff6683' : 'white'};
  width: 100%;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.$isSelected ? '600' : '400'};
  box-shadow: ${props => props.$isSelected ? '0 4px 10px rgba(255, 102, 131, 0.25)' : '0 2px 5px rgba(0, 0, 0, 0.05)'};
  border: 1px solid ${props => props.$isSelected ? '#ff6683' : '#eee'};
  
  &:hover {
    background-color: ${props => props.$isSelected ? '#ff6683' : '#fff0f3'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: #ffcad4;
  }
`;

export const PriceRangeContainer = styled.div`
  border-radius: 12px;
  background-color: white;
  padding: 16px;
  margin-bottom: 10px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #f5f5f5;
`;

export const PriceRangeTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #ff6683;
  letter-spacing: 0.5px;
`;

export const PriceInputsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  margin-top: 15px;
`;

export const PriceInput = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  text-align: ${props => props.$align || 'left'};
  background-color: #f8f8f8;
  padding: 6px 10px;
  border-radius: 6px;
  min-width: 45%;
`;

// Custom styles for the Ant Design Slider component
export const SliderStyles = {
  railStyle: {
    backgroundColor: '#f0f0f5',
    height: '6px',
    borderRadius: '3px',
  },
  trackStyle: {
    backgroundColor: '#ff6683',
    height: '6px',
    borderRadius: '3px',
    boxShadow: '0 1px 3px rgba(255, 102, 131, 0.3)',
  },
  handleStyle: {
    height: '22px',
    width: '22px',
    marginTop: '-8px',
    backgroundColor: '#ffffff',
    borderColor: '#ff6683',
    border: '2px solid #ff6683',
    boxShadow: '0 0 8px rgba(255, 102, 131, 0.4)',
    opacity: 1,
    transition: 'transform 0.2s ease',
    
    '&:hover': {
      transform: 'scale(1.1)',
      boxShadow: '0 0 0 8px rgba(255, 102, 131, 0.2)',
    }
  },
  activeDotStyle: {
    borderColor: '#ff6683',
  },
};
