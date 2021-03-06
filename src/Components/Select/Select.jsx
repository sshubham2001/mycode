import React from "react";
import { Select } from "baseui/select";
import { CaretDownIcon } from "../../assets/icons/CaretDownIcon";

export const getContainerFontStyle = ({ $theme }) => {
  // return $theme.typography.fontBold14;
};

export default function CustomSelect(props) {
  return (
    <Select
      overrides={{
        SelectArrow: () => {
          return <CaretDownIcon />;
        },
        Popover: {
          props: {
            overrides: {
              Body: {
                style: { zIndex: 1 },
              },
            },
          },
        },
        Placeholder: {
          style: ({ $theme }) => ({
            color: "#111",
            ...getContainerFontStyle({ $theme }),
          }),
        },
        SingleValue: {
          style: ({ $theme }) => ({
            ...getContainerFontStyle({ $theme }),
            color: "#111",
            lineHeight: "1.5",
          }),
        },
        DropdownListItem: {
          style: ({ $theme }) => ({
            fontSize: "14px",
            fontWeight: "700",
            color: "#111",
          }),
        },
        OptionContent: {
          style: ({ $theme, $selected }) => {
            return {
              // ...$theme.typography.fontBold14,
              // color: $selected ? "#111" : $theme.colors.textNormal,
            };
          },
        },
        DropdownOption: {
          style: ({ $theme }) => ({
            fontSize: "14px",
            fontWeight: "700",
            color: "#111",
          }),
        },
      }}
      {...props}
    />
  );
}
