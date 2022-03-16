import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
// import { useMutation, gql } from "@apollo/client";
import { useDrawerDispatch } from "../../context/DrawerContext";
import { Scrollbars } from "react-custom-scrollbars";
import Input from "../../Components/Input/Input";
import Select from "../../Components/Select/Select";
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
import { useDispatch, useSelector } from "react-redux";
import { addCoupon } from "../../store/actions/coupon";
import { Upload, Button as ButtonAnt } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactTagInput from "@pathofdev/react-tag-input";

const AddCampaing = (props) => {
  const dispatch = useDrawerDispatch();
  const reduxDispatch = useDispatch();
  const reduxCategory = useSelector((state) => state.dashboard.categories);
  const closeDrawer = useCallback(
    () => dispatch({ type: "CLOSE_DRAWER" }),
    [dispatch]
  );

  const options =
    reduxCategory &&
    reduxCategory.map((ele, index) => {
      return { value: ele.title, name: ele.title, id: index };
    });

  const { register, handleSubmit, setValue } = useForm();
  const [category, setCategory] = useState([]);

  const [title, setTitle] = useState("");
  const [percent, setPercent] = useState("");
  const [code, setCode] = useState("");
  const [count, setCount] = useState();
  const [amount, setAmount] = useState();
  const [error, setError] = useState("");
  const [image, setImage] = useState();
  const [media, setMedia] = useState("");
  const [user, setUser] = useState();

  // For image uplaod dummy request
  const dummyRequest = ({ file, onSuccess }) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const onSubmit = (data) => {
    if (!title || !percent || !code) {
      return setError("Please fill required fields *");
    }
    const newCoupon = {
      title,
      discount: percent,
      count,
      code,
      minAmount: amount,
      category: category[0]?.value,
      media: image,
      user: user,
    };
    reduxDispatch(addCoupon(newCoupon, closeDrawer));
    // closeDrawer();
  };
  const handleCategoryChange = ({ value }) => {
    setValue("category", value);
    setCategory(value);
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Campaign</DrawerTitle>
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
                Add your campaign description and necessary informations from
                here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Coupon Thumbnail</FormLabel>
                  <Upload
                    customRequest={dummyRequest}
                    onChange={(file) => setMedia(file)}
                    listType="picture"
                    maxCount={1}
                  >
                    <ButtonAnt icon={<UploadOutlined />}>Upload</ButtonAnt>
                  </Upload>
                </FormFields>

                <FormFields>
                  <FormLabel>Campaign Name*</FormLabel>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    name="name"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Discount Percent*</FormLabel>
                  <Input
                    type="number"
                    value={percent}
                    onChange={(e) => setPercent(e.target.value)}
                    name="discount_in_percent"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Discount Code*</FormLabel>
                  <Input
                    value={code.toUpperCase()}
                    onChange={(e) => setCode(e.target.value)}
                    name="code"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Number of Coupon</FormLabel>
                  <Input
                    type="number"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    name="number_of_coupon"
                  />
                </FormFields>

                {/* <FormFields>
                  <FormLabel>Specific User(s)</FormLabel>
                  <ReactTagInput
                    tags={users}
                    onChange={(user) => setUsers(user)}
                  />
                </FormFields> */}

                <FormFields>
                  <FormLabel>Specific User</FormLabel>
                  <Input
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    name="discount_in_percent"
                    placeholder="Paste user email"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Category</FormLabel>
                  <Select
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Ex: Choose parent category"
                    value={category}
                    searchable={false}
                    onChange={handleCategoryChange}
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
                  <FormLabel>Minimum Amount Required</FormLabel>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    name="minimum_amount"
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>
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
            Create Campaign
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddCampaing;
