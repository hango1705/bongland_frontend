import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: flex-start;
  height: 44px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover {
    color: #fff;
    background: #ff6683;
    span {
      color: #fff;
    }
  }
  width: 100%;
  text-align: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const WrapperProducts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 25px;
  justify-content: center;
  margin-top: 20px;
  padding: 0 15px;
`;

export const SectionContainer = styled.section`
  padding: 40px 10px;
  margin: 0 auto;
  max-width: 1440px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #ff6683;
  margin-bottom: 30px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: #ff6683;
  }
`;

export const FeatureGrid = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  gap: 20px;
`;

export const FeatureBox = styled.div`
  flex: 1;
  min-width: 220px;
  padding: 25px;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  .feature-icon {
    font-size: 28px;
    color: #ff6683;
    margin-right: 15px;
  }
  
  .feature-content {
    h3 {
      font-size: 16px;
      margin: 0 0 8px 0;
      color: #333;
    }
    
    p {
      margin: 0;
      font-size: 14px;
      color: #666;
    }
  }
`;

export const CategoryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin: 0 auto;
  max-width: 1200px;
`;

export const CategoryCard = styled.div`
  width: 240px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: white;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(255, 102, 131, 0.3);
  }
  
  .category-image {
    height: 200px;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
  }
  
  &:hover .category-image img {
    transform: scale(1.1);
  }
  
  h3 {
    padding: 15px;
    margin: 0;
    font-size: 16px;
    text-align: center;
    font-weight: 600;
    color: #333;
    background-color: white;
  }
`;

export const PromoBanner = styled.div`
  margin: 40px 120px;
  height: 300px;
  border-radius: 12px;
  background-image: linear-gradient(to right, #ff6683, #fdafbc);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 60px;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 55%;
    height: 100%;
    background-image: url('https://source.unsplash.com/random/800x600/?teddy,toy');
    background-size: cover;
    background-position: center;
    opacity: 0.85;
  }
  
  .promo-content {
    width: 45%;
    z-index: 1;
    
    h2 {
      font-size: 32px;
      font-weight: bold;
      color: white;
      margin: 0 0 10px;
    }
    
    h3 {
      font-size: 22px;
      color: white;
      margin: 0 0 15px;
      font-weight: 500;
    }
    
    p {
      font-size: 16px;
      color: white;
      margin: 0;
    }
  }
  
  @media (max-width: 1024px) {
    margin: 40px 60px;
    
    .promo-content {
      width: 55%;
      
      h2 {
        font-size: 28px;
      }
      
      h3 {
        font-size: 20px;
      }
    }
  }
  
  @media (max-width: 768px) {
    margin: 30px;
    height: auto;
    padding: 30px;
    
    &:before {
      display: none;
    }
    
    .promo-content {
      width: 100%;
    }
  }
`;
