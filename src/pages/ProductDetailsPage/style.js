import styled from "styled-components";

export const ProductDetailsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f6f6f6;
  min-height: 100vh;
`;

export const ProductDetailsBreadcrumb = styled.div`
  margin-bottom: 20px;
  padding: 10px 0;
  
  .ant-breadcrumb {
    font-size: 14px;
    
    .ant-breadcrumb-separator {
      margin: 0 8px;
      color: #999;
    }
    
    .breadcrumb-link {
      color: #666;
      cursor: pointer;
      transition: color 0.3s;
      
      &:hover {
        color: #ff6683;
      }
    }
    
    .breadcrumb-current {
      color: #333;
      font-weight: 500;
    }
  }
`;

export const ProductDetailsContent = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 30px;
  
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    
    .ant-spin {
      color: #ff6683;
    }
  }
`;

export const RelatedProductsSection = styled.section`
  margin-top: 40px;
  padding: 30px 0;
  
  .related-products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  position: relative;
  margin-bottom: 20px;
  padding-bottom: 10px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: #ff6683;
  }
`; 