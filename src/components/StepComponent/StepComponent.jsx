import { Steps } from "antd";
import React from "react";

const StepComponent = ({ current = 0, items = [] }) => {
  const { Step } = Steps;
  const description = "This is des";
  return (
    <Steps current={current}>
      {items.map((item) => {
        return (
          <Step
            key={item.title}
            title={item.title}
            description={item.description}
          />
        );
      })}
    </Steps>
  );
};

export default StepComponent;
