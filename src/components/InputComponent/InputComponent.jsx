import { Input } from "antd";
import React from "react";
import styled from "styled-components";

const StyledInput = styled(Input)`
  border-color: ${({ $borderColor }) => $borderColor};
`;

const InputComponent = ({
  size,
  placeholder,
  borderless,
  borderColor,
  style,
  ...rests
}) => {
  return (
    <StyledInput
      size={size}
      placeholder={placeholder}
      borderless={borderless}
      $borderColor={borderColor}
      style={style}
      {...rests}
    />
  );
};

export default InputComponent;
