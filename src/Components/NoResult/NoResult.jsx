import React from "react";
import NoResultSvg from "./no-result.svg";
import { NoResultWrapper, ImageWrapper, ButtonWrapper } from "./NoResult.style";
import Button from "../Button/Button";
// import { ArrowPrev } from '../AllSvgIcon';

// type NoResultProps = {
//   id?: string;
//   onClick?: () => void;
//   hideButton?: boolean;
//   style?: any;
// };

const NoResult = ({ id, onClick, hideButton = true, style, title }) => {
  return (
    <NoResultWrapper id={id} style={style}>
      <h2>{title}</h2>
      {/* <h3>Sorry, No result found :(</h3> */}

      <ImageWrapper>
        <img src={NoResultSvg} alt="No Result" />
      </ImageWrapper>

      {hideButton ? (
        <ButtonWrapper>
          <div onClick={onClick}>
            <Button>
              Try Again Later
              {/* <ArrowPrev /> Go Back */}
            </Button>
          </div>
        </ButtonWrapper>
      ) : null}
    </NoResultWrapper>
  );
};

export default NoResult;