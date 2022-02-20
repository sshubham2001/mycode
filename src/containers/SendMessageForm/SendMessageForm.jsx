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
import { Upload, Button as ButtonAnt } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { pushMessage } from "../../store/actions/push";
import { useHistory } from "react-router";

const options = [
  { value: "active", label: "Active" },
  { value: "maintenance", label: "Maintenance" },
  { value: "turn-off", label: "Down" },
];
const SendMessageForm = () => {
  const reduxDispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, setValue } = useForm();
  const [category, setCategory] = useState([]);
  const [description, setDescription] = React.useState("");
  const [media, setMedia] = useState();
  const [icon, setIcon] = useState();
  const [status, setStatus] = useState();
  const [name, setName] = useState();
  const [url, setUrl] = useState();
  const [error, setError] = useState("");
  const [image, setImage] = useState();
  const [ico, setIco] = useState();

  const handleMultiChange = ({ value }) => {
    setValue("reactSelect", value);
    setCategory(value);
  };
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
  // For image uplaod dummy request
  const dummyRequestTwo = ({ file, onSuccess }) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setIco(reader.result);
    };
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const handleUploader = (files) => {
    setMedia(files);
  };
  const onSubmit = (data) => {
    if (!name || !description) {
      return setError("Please fill required fields *");
    }
    const pushData = {
      title: name,
      url,
      description,
      media: image,
      icon: ico,
    };

    reduxDispatch(pushMessage(pushData));
    setName();
    setUrl();
    setDescription();
    setImage();
    setIco();
    history.push("/");
  };

  return (
    <Grid fluid={true}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ paddingBottom: 0, background: "none" }}
      >
        <Row>
          <Col md={4}>
            <FieldDetails>
              Upload your notification image and icon here
            </FieldDetails>
          </Col>

          <Col md={8}>
            <div className="flex">
              <DrawerBox>
                <Upload
                  customRequest={dummyRequest}
                  onChange={(file) => setMedia(file.fileList[0])}
                  listType="picture"
                  maxCount={1}
                >
                  <ButtonAnt icon={<UploadOutlined />}>Upload Media</ButtonAnt>
                </Upload>
              </DrawerBox>
              <DrawerBox>
                <Upload
                  customRequest={dummyRequestTwo}
                  onChange={(file) => setIcon(file.fileList[0])}
                  listType="picture"
                  maxCount={1}
                >
                  <ButtonAnt icon={<UploadOutlined />}>Upload Icon</ButtonAnt>
                </Upload>
              </DrawerBox>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <FieldDetails>
              Add notification title and necessary information from here
            </FieldDetails>
            <div className="error">
              <b style={{ color: "red" }}>{error}</b>
            </div>
          </Col>

          <Col md={8}>
            <DrawerBox>
              <FormFields>
                <FormLabel>Title*</FormLabel>
                <Input
                  name="site_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormFields>

              <FormFields>
                <FormLabel>Url*</FormLabel>
                <Input
                  name="site_name"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </FormFields>

              <FormFields>
                <FormLabel>Description*</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormFields>
              <FormFields>
                <Button
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
                  Send Push Notification
                </Button>
              </FormFields>
            </DrawerBox>
          </Col>
        </Row>
      </Form>
    </Grid>
  );
};

export default SendMessageForm;
