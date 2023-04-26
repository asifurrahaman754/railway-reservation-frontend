import { Button } from "@mui/material";
import { useTheme } from "@mui/system/";
import AuthFormHeader from "components/reusable/AuthFormHeader";
import AuthTextField from "components/reusable/AuthTextField";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useLoginMutation } from "store/features/auth/authApi";
import * as Yup from "yup";

type formValuesType = {
  password: string;
  mobile: string;
};

export default function AuthLogin() {
  const theme = useTheme();
  const [login, { isSuccess }] = useLoginMutation();

  const initialValue: formValuesType = {
    password: "",
    mobile: "",
  };

  const submitHandler = (values: any, { setSubmitting }: any) => {
    login(values);
  };

  useEffect(() => {
    // if (isSuccess) {
    //   alert("Login success");
    // }
  }, [isSuccess]);

  return (
    <>
      <AuthFormHeader title="Login" />

      <Formik
        initialValues={initialValue}
        validationSchema={Yup.object().shape({
          password: Yup.string().required("Password is required"),
          mobile: Yup.string().required("Mobile number is required"),
        })}
        onSubmit={submitHandler}
      >
        {(formikProps) => (
          <Form onSubmit={formikProps.handleSubmit}>
            <AuthTextField
              sx={{ marginBottom: theme.spacing(2) }}
              name="mobile"
              type="tel"
              label="Mobile"
              {...formikProps}
            />

            <AuthTextField
              sx={{ marginBottom: theme.spacing(2) }}
              name="password"
              type="password"
              label="Password"
              {...formikProps}
            />

            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
