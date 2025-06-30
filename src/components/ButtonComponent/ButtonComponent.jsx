import { Button } from "antd";
import styled from "styled-components";
import React from "react";

const StyledButton = styled(Button)`
  border-color: ${({ $borderColor }) => $borderColor};
`;

const ButtonComponent = ({
  size,
  styleButton,
  borderless,
  borderColor,
  styleTextButton,
  textButton,
  disabled,
  ...rests
}) => {
  return (
    <StyledButton
      style={{
        ...styleButton,
        background: disabled ? "#ccc" : styleButton?.background,
      }}
      size={size}
      borderless={borderless}
      $borderColor={borderColor}
      disabled={disabled}
      {...rests}
    >
      <span style={styleTextButton}>{textButton}</span>
    </StyledButton>
  );
};

export default ButtonComponent;
