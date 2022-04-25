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
const options2 = [
  { value: true, label: "Own Delivery" },
  { value: false, label: "Connect Delivery Fleet" },
];
const SiteSettingsForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const storeDetail = useSelector((state) => state.dashboard.store);
  const loading = useSelector((state) => state.dashboard.loading);

  const { register, handleSubmit, setValue } = useForm();
  const [status, setStatus] = useState(true);
  const [deliveryType, setDeliveryType] = useState(true);
  const [type, setType] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [description, setDescription] = useState();
  const [packingCharge, setPackingCharge] = useState();
  const [deliveryCharge, setDeliveryCharge] = useState();
  const [storeEmail, setStoreEmail] = useState();
  const [phone, setPhone] = useState();
  const [media, setMedia] = useState();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [quote, setQuote] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [mapLink, setMapLink] = useState();
  const [instagramLink, setInstagramLink] = useState();
  const [facebookLink, setFacebookLink] = useState();

  const handleMultiChange = ({ value }) => {
    setType(value);
    setStatus(value[0]?.value);
  };
  const handleMultiChangeDelivery = ({ value }) => {
    setDelivery(value);
    setDeliveryType(value[0]?.value);
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
      ownDelivery: deliveryType,
      packingCharge,
      deliveryCharge,
      storeEmail,
      phone,
      latitude,
      longitude,
      mapLink,
      facebookLink,
      instagramLink,
    };
    dispatch({ type: "START_LOADER" });
    dispatch(updateStoreDetails(storeSettingsData, history));

    setQuote();
    setDescription();
    setPackingCharge();
    setDeliveryCharge();
    setStoreEmail();
    setPhone();
    setLatitude();
    setLongitude();
    setInstagramLink();
    setFacebookLink();
    setMapLink();

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
              . Your storeID is{" "}
              <span style={{ color: "dodgerblue" }}>
                {storeDetail?.storeID}
              </span>
              .
            </FieldDetails>
          </Col>
          <Col lg={8}></Col>
        </Row>
        <Row>
          <Col lg={4}>
            <FieldDetails>Upload your store logo here</FieldDetails>
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
              Update your store description and necessary information from here
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
                <FormLabel>Contact Number</FormLabel>
                <Input
                  name="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={storeDetail?.phone}
                />
              </FormFields>

              <FormFields>
                <FormLabel>Store Email Address</FormLabel>
                <Input
                  name="email"
                  value={storeEmail}
                  onChange={(e) => setStoreEmail(e.target.value)}
                  placeholder={storeDetail?.storeEmail}
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
                <FormLabel>
                  Delivery Solution{" "}
                  <b>
                    {storeDetail.ownDelivery
                      ? "(Own Delivery)"
                      : "(Delivery Fleet Connected)"}
                  </b>
                </FormLabel>
                <Select
                  options={options2}
                  labelKey="label"
                  valueKey="value"
                  placeholder="Choose delivery solution"
                  value={delivery}
                  searchable={false}
                  onChange={handleMultiChangeDelivery}
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
                <FormLabel>Packing Charge</FormLabel>
                <Input
                  name="packing_charge"
                  type="number"
                  value={packingCharge}
                  onChange={(e) => setPackingCharge(e.target.value)}
                  placeholder={storeDetail?.packingCharge}
                />
              </FormFields>

              <FormFields>
                <FormLabel>Delivery Charge</FormLabel>
                <Input
                  type="number"
                  name="delivery_charge"
                  value={deliveryCharge}
                  onChange={(e) => setDeliveryCharge(e.target.value)}
                  placeholder={storeDetail?.deliveryCharge}
                />
              </FormFields>

              <FormFields>
                <FormLabel>Store Coordinates</FormLabel>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Input
                    type="number"
                    name="latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder={
                      storeDetail?.latitude ? storeDetail?.latitude : "Latitude"
                    }
                  />
                  <Input
                    type="number"
                    name="longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder={
                      storeDetail?.longitude
                        ? storeDetail?.longitude
                        : "Longitude"
                    }
                  />
                </div>
              </FormFields>

              <FormFields>
                <FormLabel>Google Map Link</FormLabel>
                <Input
                  type="text"
                  name="map_link"
                  value={mapLink}
                  onChange={(e) => setMapLink(e.target.value)}
                  placeholder={storeDetail?.mapLink}
                />
              </FormFields>

              <FormFields>
                <FormLabel>Instagram Link</FormLabel>
                <Input
                  type="text"
                  name="instagram_link"
                  value={instagramLink}
                  onChange={(e) => setInstagramLink(e.target.value)}
                  placeholder={storeDetail?.instagramLink}
                />
              </FormFields>

              <FormFields>
                <FormLabel>Facebook Link</FormLabel>
                <Input
                  type="text"
                  name="facebook_link"
                  value={facebookLink}
                  onChange={(e) => setFacebookLink(e.target.value)}
                  placeholder={storeDetail?.facebookLink}
                />
              </FormFields>

              {/* <FormFields>
                <FormLabel>Delivery Charge</FormLabel>
                <Input
                  type="text"
                  name="delivery_charge"
                  value={deliveryCharge}
                  onChange={(e) => setDeliveryCharge(e.target.value)}
                  placeholder={storeDetail?.deliveryCharge}
                />
              </FormFields> */}

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
