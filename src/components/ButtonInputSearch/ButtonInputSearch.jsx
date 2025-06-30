import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { SearchContainer } from "./style";

const ButtonInputSearch = (props) => {
  const {
    size = "large",
    placeholder = "Tìm kiếm sản phẩm",
    textButton,
    borderless,
    backgroundColorInput = "#fff",
    backgroundColorButton = "#ff6683",
    borderColor = "#ff6683",
    colorButton = "#fff",
    allowClear = true,
    onChange,
    onSearch
  } = props;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <SearchContainer>
      <InputComponent
        size={size}
        placeholder={placeholder}
        borderless={borderless}
        borderColor={borderColor}
        style={{ 
          backgroundColor: backgroundColorInput,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        allowClear={allowClear}
      />
      <ButtonComponent
        size={size}
        borderless={borderless}
        icon={
          typeof textButton === 'object' 
            ? textButton 
            : <SearchOutlined style={{ color: colorButton, fontSize: '18px' }} />
        }
        textButton={typeof textButton === 'string' ? textButton : ''}
        styleTextButton={{ color: colorButton }}
        styleButton={{
          backgroundColor: backgroundColorButton,
          color: colorButton,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderLeft: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: size === 'large' ? '40px' : size === 'middle' ? '35px' : '30px',
          minWidth: typeof textButton === 'string' ? '80px' : '50px',
        }}
        onClick={() => onSearch && onSearch(document.querySelector('input').value)}
      />
    </SearchContainer>
  );
};

export default ButtonInputSearch;
