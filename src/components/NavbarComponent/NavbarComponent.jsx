import React, { useState, useEffect } from "react";
import {
  WrapperContent,
  WrapperLabelText,
  WrapperTextPrice,
  WrapperTextValue,
  PriceRangeContainer,
  PriceRangeTitle,
  PriceInputsContainer,
  PriceInput,
  SliderStyles
} from "./style";
import { Slider } from "antd";
import { 
  FilterOutlined, 
  StarOutlined, 
  DollarOutlined, 
  CarOutlined,
  TagOutlined
} from "@ant-design/icons";

// Helper function to format number as VND
const formatVND = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value) + 'đ';
};

const NavbarComponent = ({ 
  onFilterShippingChange, 
  onFilterPriceChange, 
  onFilterRatingChange,
  selectedShipping,
  selectedPrice,
  selectedRating
}) => {
  // Define price range
  const maxPrice = 1000000;
  const [priceRange, setPriceRange] = useState([0, selectedPrice?.max || 200000]);
  
  // Sync with parent's selectedPrice
  useEffect(() => {
    if (selectedPrice) {
      setPriceRange([selectedPrice.min, selectedPrice.max]);
    } else if (selectedPrice === null) {
      setPriceRange([0, 200000]); // Reset to default when cleared
    }
  }, [selectedPrice]);

  // Rating options
  const ratingOptions = [
    { label: "5 sao", value: 5 },
    { label: "Từ 4 sao", value: 4 },
    { label: "Từ 3 sao", value: 3 },
    { label: "Từ 2 sao", value: 2 },
    { label: "Từ 1 sao", value: 1 },
  ];

  // Shipping options
  const shippingOptions = ["FAST", "GoJek"];

  // Handle shipping filter click
  const handleShippingClick = (option) => {
    if (onFilterShippingChange) {
      if (selectedShipping === option) {
        onFilterShippingChange(null); // Toggle off if already selected
      } else {
        onFilterShippingChange(option);
      }
    }
  };

  // Handle price range change
  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  // Apply price filter when slider is released
  const handlePriceAfterChange = (value) => {
    if (onFilterPriceChange) {
      onFilterPriceChange({
        min: value[0],
        max: value[1]
      });
    }
  };

  // Handle rating click
  const handleRatingClick = (rating) => {
    if (onFilterRatingChange) {
      if (selectedRating === rating.value) {
        onFilterRatingChange(null); // Toggle off if already selected
      } else {
        onFilterRatingChange(rating.value);
      }
    }
  };

  // Check if an option is selected
  const isSelected = (type, option) => {
    switch (type) {
      case "shipping":
        return selectedShipping === option;
      case "rating":
        return selectedRating === option.value;
      default:
        return false;
    }
  };

  return (
    <div>
      <WrapperLabelText>
        <FilterOutlined style={{ marginRight: "10px" }} />
        Lọc sản phẩm
      </WrapperLabelText>
      
      <WrapperContent>
        <div className="filter-title">
          <CarOutlined /> Đơn vị vận chuyển
        </div>
        <div className="filter-options">
          {shippingOptions.map((option) => (
            <WrapperTextValue 
              key={option}
              onClick={() => handleShippingClick(option)}
              $isSelected={isSelected("shipping", option)}
            >
              {option === "FAST" ? 
                <span style={{ fontWeight: 'bold', color: isSelected("shipping", option) ? 'white' : '#2868f5' }}>
                  {option}
                </span> 
                : option}
            </WrapperTextValue>
          ))}
        </div>
      </WrapperContent>
      
      <WrapperContent>
        <PriceRangeContainer>
          <PriceRangeTitle>
            <DollarOutlined style={{ marginRight: "8px" }} />
            Khoảng giá
          </PriceRangeTitle>
          <Slider
            range
            min={0}
            max={maxPrice}
            step={10000}
            value={priceRange}
            onChange={handlePriceChange}
            onAfterChange={handlePriceAfterChange}
            railStyle={SliderStyles.railStyle}
            trackStyle={SliderStyles.trackStyle}
            handleStyle={[SliderStyles.handleStyle, SliderStyles.handleStyle]}
          />
          <PriceInputsContainer>
            <PriceInput>{formatVND(priceRange[0])}</PriceInput>
            <PriceInput $align="right">{formatVND(priceRange[1])}</PriceInput>
          </PriceInputsContainer>
        </PriceRangeContainer>
      </WrapperContent>
      
      <WrapperContent>
        <div className="filter-title">
          <StarOutlined /> Đánh giá
        </div>
        <div className="filter-options">
          {ratingOptions.map((option) => (
            <WrapperTextValue 
              key={option.label}
              onClick={() => handleRatingClick(option)}
              $isSelected={isSelected("rating", option)}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                {option.label}
                {option.value === 5 && 
                  <StarOutlined style={{ color: isSelected("rating", option) ? 'white' : 'gold' }} />
                }
              </span>
            </WrapperTextValue>
          ))}
        </div>
      </WrapperContent>
    </div>
  );
};

export default NavbarComponent;
