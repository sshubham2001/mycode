import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Scrollbars } from "react-custom-scrollbars";
import { useDrawerDispatch, useDrawerState } from "../../context/DrawerContext";
import Uploader from "../../Components/Uploader/Uploader";
import Button, { KIND } from "../../Components/Button/Button";
import DrawerBox from "../../Components/DrawerBox/DrawerBox";
import { Row, Col } from "../../Components/FlexBox/FlexBox";
import Input from "../../Components/Input/Input";
import { Textarea } from "../../Components/Textarea/Textarea";
import Select from "../../Components/Select/Select";
import { FormFields, FormLabel } from "../../Components/FormFields/FormFields";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from "../DrawerItems/DrawerItems.style";
import { Upload, Button as ButtonAnt } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { updateProduct } from "../../store/actions/product";

const options = [
  { value: "Fruits & Vegetables", name: "Fruits & Vegetables", id: "1" },
  { value: "Meat & Fish", name: "Meat & Fish", id: "2" },
  { value: "Purse", name: "Purse", id: "3" },
  { value: "Hand bags", name: "Hand bags", id: "4" },
  { value: "Shoulder bags", name: "Shoulder bags", id: "5" },
  { value: "Wallet", name: "Wallet", id: "6" },
  { value: "Laptop bags", name: "Laptop bags", id: "7" },
  { value: "Women Dress", name: "Women Dress", id: "8" },
  { value: "Outer Wear", name: "Outer Wear", id: "9" },
  { value: "Pants", name: "Pants", id: "10" },
];

const typeOptions = [
  { value: "Veg", name: "Veg", id: "1" },
  { value: "Non-Veg", name: "Non-Veg", id: "2" },
];

const activeOptions = [
  { value: true, name: "Active", id: "1" },
  { value: false, name: "Inactive", id: "2" },
];

const AddProduct = () => {
  const dispatch = useDrawerDispatch();
  const reduxDispatch = useDispatch();
  const productData = useSelector((state) => state.dashboard.singleProduct);
  const data = useDrawerState("data");
  const closeDrawer = useCallback(
    () => dispatch({ type: "CLOSE_DRAWER" }),
    [dispatch]
  );

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: data,
  });
  const [type, setType] = useState([]);
  const [active, setActive] = useState([]);
  const [tag, setTag] = useState([]);
  const [name, setName] = useState();
  const [media, setMedia] = useState("");
  const [description, setDescription] = useState();
  const [unit, setUnit] = useState();
  const [price, setPrice] = useState();
  const [salePrice, setSalePrice] = useState();
  const [discount, setDiscount] = useState();
  const [quantity, setQuantity] = useState();
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState();
  const [itemType, setItemType] = useState();
  const [itemActive, setItemActive] = useState();

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

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
  };

  const handleMultiChange = ({ value }) => {
    setCategory(value);
  };

  const handleTypeChange = ({ value }) => {
    setType(value);
    setItemType(value[0]?.value);
  };

  const handleActiveChange = ({ value }) => {
    setActive(value);
    setItemActive(value[0]?.value);
  };
  const handleUploader = (files) => {
    setMedia(files[0].path);
  };
  const onSubmit = (data) => {
    console.log("newProduct data added");
    const updateDetails = {
      _id: productData.id,
      title: name,
      media: image,
      price,
      salePrice,
      description,
      isActive: itemActive,
      type: itemType,
    };
    reduxDispatch(updateProduct(updateDetails));
    closeDrawer();
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Update Product</DrawerTitle>
      </DrawerTitleWrapper>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ height: "100%", background: "none" }}
        noValidate
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
              <FieldDetails>Upload your Product image here</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox>
                <Upload
                  customRequest={dummyRequest}
                  onChange={(file) => setMedia(file)}
                  listType="picture"
                  maxCount={1}
                >
                  <ButtonAnt icon={<UploadOutlined />}>Upload</ButtonAnt>
                </Upload>
                {productData.image && (
                  <img src={productData.image} width="100" height="100" />
                )}
              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>
                Update your Product description and necessary information from
                here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    placeholder={productData.title}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder={productData.description}
                  />
                </FormFields>

                {/* <FormFields>
                  <FormLabel>Unit</FormLabel>
                  <Input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    name="unit"
                  />
                </FormFields> */}

                <FormFields>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    name="price"
                    placeholder={productData.price}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Sale Price</FormLabel>
                  <Input
                    type="number"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    name="salePrice"
                    placeholder={productData.salePrice}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Availability</FormLabel>
                  <Select
                    options={activeOptions}
                    labelKey="name"
                    valueKey="value"
                    placeholder={productData.isActive}
                    value={active}
                    searchable={false}
                    onChange={handleActiveChange}
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

                {/* <FormFields>
                  <FormLabel>Discount In Percent</FormLabel>
                  <Input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    name="discountInPercent"
                  />
                </FormFields> */}

                {/* <FormFields>
                  <FormLabel>Product Quantity</FormLabel>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    name="quantity"
                  />
                </FormFields> */}

                <FormFields>
                  <FormLabel>Type</FormLabel>
                  <Select
                    options={typeOptions}
                    labelKey="name"
                    valueKey="value"
                    placeholder={productData.type}
                    value={type}
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

                {/* <FormFields>
                  <FormLabel>Categories</FormLabel>
                  <Select
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Product Tag"
                    value={tag}
                    onChange={handleMultiChange}
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
                    multi
                  />
                </FormFields> */}
              </DrawerBox>
            </Col>
          </Row>
        </Scrollbars>

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
            Update Product
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddProduct;
