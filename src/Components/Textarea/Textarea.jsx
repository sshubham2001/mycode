import React from "react";
import { Textarea as BaseTextarea, SIZE } from "baseui/textarea";

const getInputFontStyle = ({ $theme }) => {
  return {
    color: "#111",
    // ...$theme.typography.fontBold14,
  };
};

export const Textarea = ({ ...props }) => {
  return (
    <BaseTextarea
      overrides={{
        Input: {
          style: ({ $theme }) => {
            return {
              ...getInputFontStyle({ $theme }),
            };
          },
        },
      }}
      {...props}
    />
  );
};

export { SIZE };
