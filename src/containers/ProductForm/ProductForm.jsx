import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Scrollbars } from "react-custom-scrollbars";
import { useDrawerDispatch } from "../../context/DrawerContext";
import Button, { KIND } from "../../Components/Button/Button";

import DrawerBox from "../../Components/DrawerBox/DrawerBox";
import { Row, Col } from "../../Components/FlexBox/FlexBox";
import Input from "../../Components/Input/Input";
import { Textarea } from "../../Components/Textarea/Textarea";
import Select from "../../Components/Select/Select";
import { FormFields, FormLabel } from "../../Components/FormFields/FormFields";
import { Input as InputAnt, Upload, Button as ButtonAnt } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
// import { css } from "@emotion/react";
// import BeatLoader from "react-spinners/BeatLoader";

import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

import { addProduct } from "../../store/actions/product";

import "./ProductForm.style.css";
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from "../DrawerItems/DrawerItems.style";

const typeOptions = [
  { value: "Veg", name: "Veg", id: "1" },
  { value: "Non-Veg", name: "Non-Veg", id: "2" },
];

const offerOptions = [
  { value: true, name: "True", id: "1" },
  { value: false, name: "False", id: "2" },
];

const featuredOptions = [
  { value: true, name: "True", id: "1" },
  { value: false, name: "False", id: "2" },
];

const AddProduct = (props) => {
  const reduxDispatch = useDispatch();
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(
    () => dispatch({ type: "CLOSE_DRAWER" }),
    [dispatch]
  );

  const fetchCategories = useSelector((state) => state.dashboard.categories);
  const loading = useSelector((state) => state.dashboard.loading);

  let options = fetchCategories.map((ele) => {
    return { value: ele.title, id: ele._id, name: ele.title };
  });

  const { register, handleSubmit, setValue } = useForm();

  const [tags, setTags] = useState([]);
  const [inputList, setInputList] = useState([
    { specKey: null, specValue: null },
  ]);
  const [title, setTitle] = useState("");
  const [media, setMedia] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState();
  const [price, setPrice] = useState();
  const [salePrice, setSalePrice] = useState();
  const [discount, setDiscount] = useState();
  const [quantity, setQuantity] = useState();
  const [offer, setOffer] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [type, setType] = useState([]);
  const [category, setCategory] = useState(null);
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const [image, setImage] = useState();
  const [itemType, setItemType] = useState("");

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

  const handleOfferChange = ({ value }) => {
    setOffer(value);
  };

  const handleFeaturedChange = ({ value }) => {
    setFeatured(value);
  };
  const handleUploader = (files) => {
    setMedia(files[0].path);
    setFile(files[0].path);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { specKey: "", specValue: "" }]);
  };

  // For image uplaod dummy request
  const dummyRequest = ({ file, onSuccess }) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
      setImage();
    };
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  // handle click upload product
  const onSubmit = () => {
    if (!category || !title || !price) {
      return setError("Please fill required fields *");
    }
    if (category === undefined) {
      return setError("Please fill required fields *");
    }
    const storeID = localStorage.getItem("storeID");

    const productDetails = {
      storeID,
      title,
      media: image,
      description,
      unit,
      price,
      salePrice,
      offer: offer[0]?.value,
      discount,
      quantity,
      type: itemType,
      featured: featured[0]?.value,
      tags,
      category: category[0]?.value,
      specifications: inputList,
    };
    reduxDispatch({ type: "START_LOADER" });
    reduxDispatch(addProduct(productDetails, closeDrawer));
    setError("");
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Product</DrawerTitle>
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
              <FieldDetails>Upload your Product image here</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox
                overrides={{
                  Block: {
                    style: {
                      width: "100%",
                      height: "auto",
                      padding: "30px",
                      borderRadius: "3px",
                      backgroundColor: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  },
                }}
              >
                <Upload
                  customRequest={dummyRequest}
                  onChange={(file) => {
                    setMedia(file.fileList[0]);
                  }}
                  listType="picture"
                  maxCount={1}
                >
                  <ButtonAnt icon={<UploadOutlined />}>Upload</ButtonAnt>
                </Upload>
              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>
                Add your Product description and necessary information from here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Name*</FormLabel>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    name="name"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Unit</FormLabel>
                  <Input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    name="unit"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Price*</FormLabel>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    name="price"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Sale Price</FormLabel>
                  <Input
                    type="number"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    name="salePrice"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Offer</FormLabel>
                  <Select
                    options={offerOptions}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Please choose"
                    value={offer}
                    searchable={false}
                    onChange={handleOfferChange}
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
                  <FormLabel>Discount In Percent</FormLabel>
                  <Input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    name="discountInPercent"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Product Quantity</FormLabel>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    name="quantity"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Type</FormLabel>
                  <Select
                    options={typeOptions}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Product Type"
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

                <FormFields>
                  <FormLabel>Featured</FormLabel>
                  <Select
                    options={featuredOptions}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Please choose"
                    value={featured}
                    searchable={false}
                    onChange={handleFeaturedChange}
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
                  <FormLabel>Products Tags</FormLabel>
                  <ReactTagInput
                    tags={tags}
                    onChange={(newTags) => setTags(newTags)}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Category*</FormLabel>
                  <Select
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Please choose"
                    value={category}
                    searchable={false}
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
                  <FormLabel>Product Specifications</FormLabel>
                  {inputList.map((x, i) => {
                    return (
                      <div className="box">
                        <InputAnt
                          className="specinput mb-6"
                          name="specKey"
                          placeholder="Enter Key"
                          value={x.specKey}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                        <InputAnt
                          className="specinput"
                          name="specValue"
                          placeholder="Enter Value"
                          value={x.specValue}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                        <div>
                          {inputList.length !== 1 && (
                            <button
                              className="btn-rmv"
                              onClick={() => handleRemoveClick(i)}
                            >
                              Remove
                            </button>
                          )}
                          {inputList.length - 1 === i && (
                            <button
                              className="btn-box"
                              onClick={handleAddClick}
                            >
                              Add New
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </FormFields>

                {/* <FormFields>
                  <FormLabel>Categories</FormLabel>
                  <Select
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Product Tag"
                    value={category}
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
            isLoading={loading}
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
            Create Product
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddProduct;
