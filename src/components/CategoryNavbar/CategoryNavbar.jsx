import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  NavbarContainer, 
  NavItem, 
  NavItemIcon,
  NavItemText
} from './style';
import { 
  HeartOutlined, 
  GiftOutlined, 
  StarOutlined, 
  CrownOutlined, 
  SmileOutlined
} from '@ant-design/icons';
import * as ProductService from '../../services/ProductService';
import { Tooltip } from 'antd';

const CategoryNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === "OK") {
          setCategories(res?.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Use default categories if API fails
        setCategories(['Gấu bông', 'Thú bông', 'Gối ôm', 'Hoạt hình']);
      }
    };
    
    fetchCategories();
  }, []);

  // Update active category based on URL
  useEffect(() => {
    const path = location.pathname;
    
    if (path === '/') {
      setActiveCategory('');
    } else if (path.startsWith('/product/')) {
      const categoryFromPath = path.split('/product/')[1];
      // Convert URL format back to category name for comparison
      const normalizedCategory = categoryFromPath
        .replace(/_/g, ' ')  // Replace underscores with spaces
        .replace(/%20/g, ' '); // Handle URL encoding
      
      // Normalize Vietnamese text for comparison (convert to uppercase for case-insensitive matching)
      // In reality, we should use the same normalization logic as in the navigation methods
      setActiveCategory(normalizedCategory.toUpperCase());
    } else {
      setActiveCategory('');
    }
  }, [location.pathname]);

  // Icons for categories
  const getIconForCategory = (category, index) => {
    const icons = [
      <HeartOutlined />,
      <GiftOutlined />,
      <StarOutlined />,
      <CrownOutlined />,
      <SmileOutlined />
    ];
    
    return icons[index % icons.length];
  };

  const handleCategoryClick = (category) => {
    navigate(`/product/${category.toLowerCase().replace(/ /g, '_')}`);
  };

  const isCategoryActive = (category) => {
    return activeCategory === category.toUpperCase();
  };

  return (
    <NavbarContainer>
      {categories.map((category, index) => (
        <Tooltip key={category} title={category} placement="bottom">
          <NavItem 
            onClick={() => handleCategoryClick(category)}
            $isActive={isCategoryActive(category)}
          >
            <NavItemIcon $isActive={isCategoryActive(category)}>
              {getIconForCategory(category, index)}
            </NavItemIcon>
            <NavItemText $isActive={isCategoryActive(category)}>{category}</NavItemText>
          </NavItem>
        </Tooltip>
      ))}
    </NavbarContainer>
  );
};

export default CategoryNavbar; 