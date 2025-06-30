import styled from "styled-components";
import { Button } from "antd";

export const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
  
  .slick-slider {
    position: relative;
  }
  
  .slick-dots {
    bottom: 20px;
    
    li {
      margin: 0 5px;
      
      button {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        
        &:before {
          display: none;
        }
      }
      
      &.slick-active button {
        background: #fff;
      }
    }
  }
  
  .slide-item {
    position: relative;
  }
`;

export const SlideOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%);
  display: flex;
  align-items: center;
`;

export const SlideContent = styled.div`
  padding: 0 120px;
  max-width: 600px;
  animation: fadeInLeft 1s ease;
  
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const SlideHeading = styled.h2`
  font-size: 42px;
  font-weight: bold;
  color: white;
  margin-bottom: 15px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;

export const SlideDescription = styled.p`
  font-size: 20px;
  color: white;
  margin-bottom: 25px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

export const SlideButton = styled(Button)`
  background: #ff6683;
  border: none;
  height: 48px;
  padding: 0 30px;
  font-size: 16px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e05a74;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(255, 102, 131, 0.4);
  }
  
  .anticon {
    margin-left: 8px;
    transition: transform 0.3s ease;
  }
  
  &:hover .anticon {
    transform: translateX(5px);
  }
`;

export const CustomArrow = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  ${props => props.$position === 'left' ? 'left: 20px;' : 'right: 20px;'}
  
  &:hover {
    background: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  svg {
    font-size: 16px;
    color: #555;
  }
`; 