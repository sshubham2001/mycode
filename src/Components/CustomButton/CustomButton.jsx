import React from "react";
import "./customButton.style.css";
const CustomButton = ({ title }) => {
  return <button className="customButton"> {title} </button>;
};

export default CustomButton;
