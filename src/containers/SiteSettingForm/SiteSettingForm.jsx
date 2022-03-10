import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Uploader from "../../Components/Uploader/Uploader";
import Input from "../../Components/Input/Input";
import { Textarea } from "../../Components/Textarea/Textarea";
import Select from "../../Components/Select/Select";
import Button from "../../Components/Button/Button";
import DrawerBox from "../../Components/DrawerBox/DrawerBox";
import { Grid, Row, Col } from "../../Components/FlexBox/FlexBox";
import { Form, FieldDetails } from "../DrawerItems/DrawerItems.style";
import { FormFields, FormLabel } from "../../Components/FormFields/FormFields";
import { useDispatch, useSelector } from "react-redux";
import { updateSite } from "../../store/actions/auth";
import { useHistory } from "react-router";
import { Upload, Button as ButtonAnt } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { updateStoreDetails } from "../../store/actions/store";

const options = [
  { value: true, label: "Opened" },
  { value: false, label: "Closed" },
];
const SiteSettingsForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const storeDetail = useSelector((state) => state.dashboard.store);
  const loading = useSelector((state) => state.dashboard.loading);

  const { register, handleSubmit, setValue } = useForm();
  const [status, setStatus] = useState(true);
  const [type, setType] = useState([]);
  const [description, setDescription] = useState();
  const [media, setMedia] = useState();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [quote, setQuote] = useState();
  const handleMultiChange = ({ value }) => {
    setType(value);
    setStatus(value[0]?.value);
  };
  const handleUploader = (files) => {
    setMedia(files);
  };

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
    const storeSettingsData = {
      title: name,
      description,
      isOpen: status,
      quote,
      logo: image,
    };
    dispatch({ type: "START_LOADER" });
    dispatch(updateStoreDetails(storeSettingsData, history));

    setQuote();
    setDescription();

    // dispatch(updatestore(storeSettingsData, history));
    // console.log(storeSettingsData);
  };

  return (
    <Grid fluid={true}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ paddingBottom: 0, background: "none" }}
      >
        <Row>
          <Col lg={4}>
            <FieldDetails style={{ fontSize: 16 }}>
              Store is currently{" "}
              <span
                style={
                  storeDetail.isOpen ? { color: "green" } : { color: "tomato" }
                }
              >
                {storeDetail.isOpen ? "Opened" : "Closed"}
              </span>
            </FieldDetails>
          </Col>
          <Col lg={8}></Col>
        </Row>
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
          <Col md={4}>
            <FieldDetails>
              Add your site description and necessary information from here
            </FieldDetails>
          </Col>

          <Col md={8}>
            <DrawerBox>
              <FormFields>
                <FormLabel>Site Name</FormLabel>
                <Input
                  disabled
                  name="site_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={storeDetail?.title}
                />
              </FormFields>

              <FormFields>
                <FormLabel>Site Description</FormLabel>
                <Textarea
                  value={description}
                  placeholder={storeDetail?.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormFields>

              <FormFields>
                <FormLabel>Quote</FormLabel>
                <Input
                  name="site_quote"
                  placeholder={storeDetail?.quote}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                />
              </FormFields>

              <FormFields>
                <FormLabel>Status</FormLabel>
                <Select
                  options={options}
                  labelKey="label"
                  valueKey="value"
                  placeholder="Choose current status"
                  value={type}
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
                <Button
                  isLoading={loading}
                  type="submit"
                  overrides={{
                    BaseButton: {
                      style: ({ $theme }) => ({
                        width: "50%",
                        marginLeft: "auto",
                        borderTopLeftRadius: "3px",
                        borderTopRightRadius: "3px",
                        borderBottomLeftRadius: "3px",
                        borderBottomRightRadius: "3px",
                      }),
                    },
                  }}
                >
                  Submit
                </Button>
              </FormFields>
            </DrawerBox>
          </Col>
        </Row>
      </Form>
    </Grid>
  );
};

export default SiteSettingsForm;
