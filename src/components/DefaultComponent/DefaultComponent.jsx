import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import CategoryNavbar from "../CategoryNavbar/CategoryNavbar";

const DefaultComponent = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <CategoryNavbar />
      {children}
    </div>
  );
};
export default DefaultComponent;
