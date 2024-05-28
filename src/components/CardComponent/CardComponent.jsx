import React from "react";
import {
  StyleNameProduct,
  WrapperPriceText,
  StyledCardContent,
  WrapperCardStyle,
  WrapperReportText,
  WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";
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
  } = props;
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };
  return (
    <WrapperCardStyle
      hoverable
      cover={<img alt="product" src={image} />}
      onClick={() => handleDetailsProduct(id)}
    >
      <StyledCardContent>
        <StyleNameProduct>{name}</StyleNameProduct>
        <WrapperReportText>
          <span>
            <span>{rating}</span>{" "}
            <StarFilled
              style={{ fontSize: "12px", color: "rgb(253,216,54)" }}
            />
          </span>
          <WrapperStyleTextSell>| Đã bán {sold || 1000}+</WrapperStyleTextSell>
        </WrapperReportText>
        <WrapperPriceText>{convertPrice(price)}</WrapperPriceText>
      </StyledCardContent>
    </WrapperCardStyle>
  );
};

export default CardComponent;
