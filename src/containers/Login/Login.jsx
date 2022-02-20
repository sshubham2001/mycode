import React, { useContext, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import { AuthContext } from "context/auth";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../store/actions/auth";
import {
  FormFields,
  FormLabel,
  FormTitle,
  Error,
} from "../../Components/FormFields/FormFields";
import { Wrapper, FormWrapper, LogoImage, LogoWrapper } from "./Login.style";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import Logoimage from "../../assets/image/logo.png";

const initialValues = {
  email: "",
  password: "",
};

const MyInput = ({ field, form, ...props }) => {
  return <Input {...field} {...props} />;
};

export default function Login() {
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const data = {
    email,
    password,
  };
  const handleSubmit = (e) => {
    if (!email || !password) {
      return setError("Please fill these fields");
    }
    dispatch(adminLogin(data, history));
  };

  return (
    <Wrapper>
      <FormWrapper>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form>
              <FormFields>
                <LogoWrapper>
                  <LogoImage src={Logoimage} alt="pickbazar-admin" />
                </LogoWrapper>
                <FormTitle>Log in to admin</FormTitle>
              </FormFields>

              <FormFields>
                <FormLabel>Email</FormLabel>
                <Field
                  type="email"
                  component={MyInput}
                  placeholder="Ex: demo@demo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <Error>{error}</Error>}
              </FormFields>
              <FormFields>
                <FormLabel>Password</FormLabel>
                <Field
                  type="password"
                  component={MyInput}
                  placeholder="Ex: demo"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Error>{error}</Error>}
              </FormFields>
              <Button
                type="submit"
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => ({
                      width: "100%",
                      marginLeft: "auto",
                      borderTopLeftRadius: "3px",
                      borderTopRightRadius: "3px",
                      borderBottomLeftRadius: "3px",
                      borderBottomRightRadius: "3px",
                    }),
                  },
                }}
              >
                Login
              </Button>
            </Form>
          )}
        />
      </FormWrapper>
    </Wrapper>
  );
}
