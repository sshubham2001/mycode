import React from "react";
import BoxWrapper, {
  BoxHeading,
  TitleWrapper,
  BoxContentWrapper,
} from "./Box.style";

const BoxTitleProps = {
  title: "",
};

const BoxProps = {
  children: React.ReactNode,
  style: "",
};

export const BoxTitleWrapper = ({ children, style }) => {
  return <TitleWrapper style={style}>{children}</TitleWrapper>;
};

export const BoxTitle = ({ title }) => {
  return <BoxHeading>{title}</BoxHeading>;
};

export const Box = ({ children }) => {
  return <BoxWrapper>{children}</BoxWrapper>;
};

export const BoxContent = ({ children, style }) => {
  return <BoxContentWrapper style={style}>{children}</BoxContentWrapper>;
};
