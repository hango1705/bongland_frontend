import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    textButton,
    borderless,
    backgroundColorInput = "#fff",
    backgroundColorButton = "#f48ea1",
    borderColor,
    colorButton = "#f48ea1",
  } = props;
  return (
    <div style={{ display: "flex", backgroundColor: "#fff" }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        borderless={borderless}
        borderColor={borderColor}
        style={{ backgroundColor: backgroundColorInput }}
        {...props}
      />
      <ButtonComponent
        size={size}
        borderless={borderless}
        icon={
          <SearchOutlined color={colorButton} style={{ color: "#f48ea1" }} />
        }
        borderColor={borderColor}
        textButton={textButton}
        styleTextButton={{ color: colorButton }}
        styleButton={{
          backgroundColor: backgroundColorButton,
          color: "#f48ea1",
        }}
      />
    </div>
  );
};

export default ButtonInputSearch;
