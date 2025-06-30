import styled from 'styled-components';

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffeef2;
  padding: 12px 20px;
  border-bottom: 2px dashed #ffcad4;
  box-shadow: 0 2px 8px rgba(255, 102, 131, 0.1);
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 25px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  
  &:not(:last-child):after {
    content: '♥';
    position: absolute;
    right: -5px;
    top: 50%;
    transform: translateY(-50%);
    color: #ffcad4;
    font-size: 12px;
  }
  
  &:hover {
    transform: translateY(-5px);
  }
  
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #ff6683;
    opacity: ${({ $isActive }) => $isActive ? '1' : '0'};
    transition: all 0.3s ease;
    box-shadow: 0 0 10px #ff6683;
  }
  
  /* Add animation for active state */
  ${({ $isActive }) => $isActive && `
    animation: pulse 2s infinite;
    
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
  `}
`;

export const NavItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${({ $isActive }) => $isActive ? '#ff6683' : 'white'};
  margin-bottom: 6px;
  box-shadow: ${({ $isActive }) => $isActive ? '0 4px 8px rgba(255, 102, 131, 0.3)' : '0 3px 6px rgba(255, 102, 131, 0.1)'};
  transition: all 0.3s ease;
  border: 2px solid #ffcad4;
  
  svg {
    font-size: 20px;
    color: ${({ $isActive }) => $isActive ? 'white' : '#ff6683'};
    transition: all 0.3s ease;
  }
  
  ${NavItem}:hover & {
    background-color: #ff6683;
    transform: scale(1.1) rotate(5deg);
    
    svg {
      color: white;
    }
  }
`;

export const NavItemText = styled.span`
  font-size: 13px;
  font-weight: ${({ $isActive }) => $isActive ? '600' : '500'};
  color: ${({ $isActive }) => $isActive ? '#ff6683' : '#333'};
  transition: all 0.3s ease;
  
  ${NavItem}:hover & {
    color: #ff6683;
  }
`; 