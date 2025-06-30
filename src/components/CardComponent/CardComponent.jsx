import React from "react";
import {
  StyleNameProduct,
  WrapperPriceText,
  StyledCardContent,
  WrapperCardStyle,
  WrapperReportText,
  WrapperStyleTextSell,
  DiscountBadge,
  StockStatus
} from "./style";
import { StarFilled, ShoppingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";

const CardComponent = (props) => {
  const {
    countInStock,
    description,
    image,
    name,
    price,
    rating,
    type,
    sold,
    id,
    discount
  } = props;
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };

  // Calculate if there should be a discount (just for demo purposes)
  const hasDiscount = discount || (Math.random() > 0.7);
  const discountPercent = discount || Math.floor(Math.random() * 20) + 10;
  const inStock = countInStock > 0;

  return (
    <WrapperCardStyle
      hoverable
      cover={<img alt={name} src={image} />}
      onClick={() => handleDetailsProduct(id)}
      disabled={!inStock}
    >
      {hasDiscount && (
        <DiscountBadge>-{discountPercent}%</DiscountBadge>
      )}
      <StyledCardContent>
        <StyleNameProduct>{name}</StyleNameProduct>
        <WrapperReportText>
          <span>
            <span>{rating || 4.8}</span>{" "}
            <StarFilled
              style={{ fontSize: "12px", color: "rgb(253,216,54)" }}
            />
          </span>
          <WrapperStyleTextSell>Đã bán {sold || 1000}+</WrapperStyleTextSell>
        </WrapperReportText>
        <WrapperPriceText>
          {convertPrice(price)}
          {hasDiscount && (
            <span style={{ 
              fontSize: '14px', 
              color: '#999', 
              textDecoration: 'line-through',
              marginLeft: '8px'
            }}>
              {convertPrice(Math.floor(price * (1 + discountPercent/100)))}
            </span>
          )}
        </WrapperPriceText>
        <StockStatus $inStock={inStock}>
          {inStock ? 'Còn hàng' : 'Hết hàng'}
        </StockStatus>
      </StyledCardContent>
    </WrapperCardStyle>
  );
};

export default CardComponent;
