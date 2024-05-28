import React from "react";
import {
  WrapperContent,
  WrapperLabelText,
  WrapperTextPrice,
  WrapperTextValue,
} from "./style";
import { Checkbox } from "antd";

const NavbarComponent = () => {
  const onChange = () => {};
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option, index) => {
          return <WrapperTextValue key={index}>{option}</WrapperTextValue>;
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onChange={onChange}
          >
            {options.map((option) => {
              return (
                <Checkbox
                  style={{ marginLeft: 0 }}
                  value={option.value}
                  key={option.value}
                >
                  {option.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case "price":
        return options.map((option, index) => {
          return <WrapperTextPrice key={index}>{option}</WrapperTextPrice>;
        });
      default:
        return {};
    }
  };
  return (
    <div>
      <WrapperLabelText>Lọc sản phẩm</WrapperLabelText>
      <WrapperContent>
        <div style={{ marginTop: "5px" }}>Đơn vị vận chuyển</div>
        {renderContent("text", ["FAST", "GoJek"])}
      </WrapperContent>
      <WrapperContent>
        <div style={{ marginTop: "5px" }}>Khoảng giá</div>
        {renderContent("price", [
          "0đ - 200.000đ",
          "200.000đ - 500.000đ",
          "500.000đ - 1tr",
        ])}
      </WrapperContent>
      <WrapperContent>
        <div style={{ marginTop: "5px" }}>Đánh giá</div>
        {renderContent("text", [
          "5 sao",
          "Từ 4 sao",
          "Từ 3 sao",
          "Từ 2 sao",
          "Từ 1 sao",
        ])}
      </WrapperContent>
    </div>
  );
};

export default NavbarComponent;
