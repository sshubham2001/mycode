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
import { useDispatch } from "react-redux";
import { updateSite } from "../../store/actions/auth";
import { useHistory } from "react-router";

const options = [
  { value: true, label: "Opened" },
  { value: false, label: "Closed" },
];
const SiteSettingsForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, setValue } = useForm();
  const [status, setStatus] = useState([]);
  const [type, setType] = useState([]);
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState();
  const [name, setName] = useState("");
  const handleMultiChange = ({ value }) => {
    setType(value);
    setStatus(value[0]?.value);
  };
  const handleUploader = (files) => {
    setMedia(files);
  };
  const onSubmit = (data) => {
    const siteSettingsData = {
      name,
      description,
      status,
    };
    dispatch(updateSite(siteSettingsData, history));
    // console.log(siteSettingsData);
  };

  return (
    <Grid fluid={true}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ paddingBottom: 0, background: "none" }}
      >
        <Row>
          <Col md={4}>
            <FieldDetails>Upload your site logo here</FieldDetails>
          </Col>

          <Col md={8}>
            <DrawerBox>
              <Uploader onChange={handleUploader} />
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
                  name="site_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormFields>

              <FormFields>
                <FormLabel>Site Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
