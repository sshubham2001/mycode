import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
// import { useMutation, gql } from "@apollo/client";
import { Scrollbars } from "react-custom-scrollbars";
import { useDrawerDispatch } from "../../context/DrawerContext";
import Input from "../../Components/Input/Input";
import Checkbox from "../../Components/CheckBox/CheckBox";
import PhoneInput from "../../Components/PhoneInput/PhoneInput";
import Button, { KIND } from "../../Components/Button/Button";

import DrawerBox from "../../Components/DrawerBox/DrawerBox";
import { Row, Col } from "../../Components/FlexBox/FlexBox";
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from "../DrawerItems/DrawerItems.style";
import { FormFields, FormLabel } from "../../Components/FormFields/FormFields";
import Select from "../../Components/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { inviteAdminUser } from "../../store/actions/roles";

const roleOptions = [
  { value: "Super Admin", name: "Super Admin", id: "1" },
  { value: "System Admin", name: "System Admin", id: "2" },
  { value: "Delivery Boy", name: "Delivery Boy", id: "3" },
];

const StaffMemberForm = (props) => {
  const dispatch = useDrawerDispatch();
  const reduxDispatch = useDispatch();
  const closeDrawer = useCallback(
    () => dispatch({ type: "CLOSE_DRAWER" }),
    [dispatch]
  );

  const handleTypeChange = ({ value }) => {
    setRole(value);
  };

  const { register, handleSubmit } = useForm();
  const [country, setCountry] = React.useState(undefined);
  const [checked, setChecked] = React.useState(true);
  const [text, setText] = React.useState("");

  const [name, setName] = React.useState();
  const [role, setRole] = React.useState();
  const [email, setEmail] = React.useState();
  const [phone, setPhone] = React.useState();
  const [error, setError] = React.useState("");

  const onSubmit = (data) => {
    if (!name || !email || !role || !phone) {
      return setError("Please fill all required fields");
    }
    const userDetails = {
      name,
      email,
      role: role[0]?.value,
      phone,
    };
    reduxDispatch(inviteAdminUser(userDetails));
    closeDrawer();
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Staff Member</DrawerTitle>
      </DrawerTitleWrapper>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ height: "100%", background: "none" }}
      >
        <Scrollbars
          autoHide
          renderView={(props) => (
            <div {...props} style={{ ...props.style, overflowX: "hidden" }} />
          )}
          renderTrackHorizontal={(props) => (
            <div
              {...props}
              style={{ display: "none" }}
              className="track-horizontal"
            />
          )}
        >
          <Row>
            <Col lg={4}>
              <FieldDetails>
                Add staff name, description and necessary information from here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Full Name*</FormLabel>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="first_name"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Role*</FormLabel>
                  <Select
                    options={roleOptions}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Choose Role"
                    value={role}
                    searchable={false}
                    onChange={handleTypeChange}
                    overrides={{
                      Placeholder: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      DropdownListItem: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      OptionContent: {
                        style: ({ $theme, $selected }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $selected
                              ? $theme.colors.textDark
                              : $theme.colors.textNormal,
                          };
                        },
                      },
                      SingleValue: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      Popover: {
                        props: {
                          overrides: {
                            Body: {
                              style: { zIndex: 5 },
                            },
                          },
                        },
                      },
                    }}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Contact No.*</FormLabel>
                  {/* <PhoneInput
                    country={country}
                    onCountryChange={({ option }) => setCountry(option)}
                    text={text}
                    onTextChange={(e) => setText(e.currentTarget.value)}
                    name="contact_number"
                  /> */}
                  <Input
                    type="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    name="phone"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Email*</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>

          {/* <Row>
            <Col lg={4}>
              <FieldDetails>
                Expand or restrict user’s permissions to access certain part of
                pickbazar system.
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <Checkbox
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    name="agreement_check"
                    overrides={{
                      Label: {
                        style: ({ $theme }) => ({
                          color: $theme.colors.textNormal,
                        }),
                      },
                    }}
                  >
                    Access for created account
                  </Checkbox>
                </FormFields>
              </DrawerBox>
            </Col>
          </Row> */}
        </Scrollbars>
        <div className="error">
          <b style={{ color: "red" }}>{error}</b>
        </div>

        <ButtonGroup>
          <Button
            kind={KIND.minimal}
            onClick={closeDrawer}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: "50%",
                  borderTopLeftRadius: "3px",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                  borderBottomLeftRadius: "3px",
                  marginRight: "15px",
                  color: $theme.colors.red400,
                }),
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: "50%",
                  borderTopLeftRadius: "3px",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                  borderBottomLeftRadius: "3px",
                }),
              },
            }}
          >
            Add Staff
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default StaffMemberForm;
