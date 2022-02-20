import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
// import { useMutation, gql } from "@apollo/client";
import { useDrawerDispatch } from "../../context/DrawerContext";
import { Scrollbars } from "react-custom-scrollbars";
import Uploader from "../../Components/Uploader/Uploader";
import Input from "../../Components/Input/Input";
import Select from "../../Components/Select/Select";
import Button, { KIND } from "../../Components/Button/Button";
import DrawerBox from "../../Components/DrawerBox/DrawerBox";
import { Row, Col } from "../../Components/FlexBox/FlexBox";

import { Input as InputAnt, Upload, Button as ButtonAnt } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { useDispatch } from "react-redux";
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from "../DrawerItems/DrawerItems.style";
import { FormFields, FormLabel } from "../../Components/FormFields/FormFields";
import { Textarea } from "../../Components/Textarea/Textarea";
import { addCategory } from "../../store/actions/category";

const options = [
  { value: "grocery", name: "Grocery", id: "1" },
  { value: "women-cloths", name: "Women Cloths", id: "2" },
  { value: "bags", name: "Bags", id: "3" },
  { value: "makeup", name: "Makeup", id: "4" },
];

const AddCategory = (props) => {
  const dispatch = useDrawerDispatch();
  const reduxDispatch = useDispatch();
  const closeDrawer = useCallback(
    () => dispatch({ type: "CLOSE_DRAWER" }),
    [dispatch]
  );
  const { register, handleSubmit, setValue } = useForm();

  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");
  const [parent, setParent] = useState();
  const [title, setTitle] = useState("");
  const [media, setMedia] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState();

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

  const handleChange = ({ value }) => {
    setParent(value);
  };
  const handleUploader = (files) => {
    setValue("image", files[0].path);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
  };

  const onSubmit = () => {
    if (!title) {
      return setError("Please fill required fields *");
    }
    const newCategory = {
      title,
      description,
      media: image,
      badge: slug,
    };
    reduxDispatch(addCategory(newCategory));
    closeDrawer();
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Category</DrawerTitle>
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
              <FieldDetails>Upload your Category image here</FieldDetails>
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
                  onChange={(file) => setMedia(file.fileList[0])}
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
                Add your category description and necessary informations from
                here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Category Name*</FormLabel>
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
                  <FormLabel>Badge</FormLabel>
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    name="slug"
                  />
                </FormFields>

                {/* <FormFields>
                  <FormLabel>Parent</FormLabel>
                  <Select
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Ex: Choose parent category"
                    value={parent}
                    searchable={false}
                    onChange={handleChange}
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
            Create Category
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddCategory;
