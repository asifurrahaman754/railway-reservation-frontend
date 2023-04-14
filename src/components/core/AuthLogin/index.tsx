import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/system/";
import AuthFormHeader from "components/reusable/AuthFormHeader";
import { Form, Formik } from "formik";
import * as Yup from "yup";

type formValuesType = {
  password: string;
  mobile: string;
};

export default function AuthLogin() {
  const theme = useTheme();

  const initialValue: formValuesType = {
    password: "",
    mobile: "",
  };

  const submitHandler = (values: any, { setSubmitting }: any) => {
    console.log(values);

    setSubmitting(false);
  };

  return (
    <>
      <AuthFormHeader title="Login" />

      <Formik
        initialValues={initialValue}
        validationSchema={Yup.object().shape({
          password: Yup.string().nullable().required("Password is required"),
          mobile: Yup.string().nullable().required("Mobile number is required"),
        })}
        onSubmit={submitHandler}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          touched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Box sx={{ marginBottom: "1rem" }}>
              <TextField
                fullWidth
                onChange={handleChange}
                type="tel"
                onBlur={handleBlur}
                name="mobile"
                label="Mobile"
                variant="outlined"
                value={values.mobile}
                disabled={isSubmitting}
              />
              {touched.mobile && errors.mobile && (
                <Typography color={theme.palette.errorColor.main}>
                  {errors.mobile}
                </Typography>
              )}
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <TextField
                fullWidth
                onChange={handleChange}
                type="password"
                onBlur={handleBlur}
                name="password"
                label="Password"
                variant="outlined"
                value={values.password}
                disabled={isSubmitting}
              />
              {touched.password && errors.password && (
                <Typography color={theme.palette.errorColor.main}>
                  {errors.password}
                </Typography>
              )}
            </Box>

            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
