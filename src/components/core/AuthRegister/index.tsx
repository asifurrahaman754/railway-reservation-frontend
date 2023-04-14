import { Button, Grid, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/system/";
import AuthFormHeader from "components/reusable/AuthFormHeader";
import { Form, Formik } from "formik";
import * as Yup from "yup";

type formValuesType = {
  email: string;
  username: string;
  password: string;
  mobile: string;
  nid_no: string;
};

export default function AuthRegister() {
  const theme = useTheme();
  const initialValue: formValuesType = {
    email: "",
    username: "",
    password: "",
    mobile: "",
    nid_no: "",
  };

  const submitHandler = (values: any, { setSubmitting }: any) => {
    setSubmitting(false);
  };

  return (
    <>
      <AuthFormHeader title="Register" />
      <Formik
        initialValues={initialValue}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Invalid email address")
            .nullable()
            .required("Email is required"),
          username: Yup.string().nullable().required("Full name is required"),
          password: Yup.string().nullable().required("Password is required"),
          mobile: Yup.string().nullable().required("Mobile number is required"),
          nid_no: Yup.string()
            .nullable()
            .required("National ID number is required"),
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
            <Grid container spacing={2} marginBottom="1rem">
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="username"
                  label="Full Name"
                  variant="outlined"
                  value={values.username}
                  disabled={isSubmitting}
                />
                {touched.username && errors.username && (
                  <Typography color={theme.palette.errorColor.main}>
                    {errors.username}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={values.email}
                  disabled={isSubmitting}
                />
                {touched.email && errors.email && (
                  <Typography color={theme.palette.errorColor.main}>
                    {errors.email}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="tel"
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="tel"
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
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="nid_no"
                  label="NID/Birth registration numbe"
                  variant="outlined"
                  value={values.nid_no}
                  disabled={isSubmitting}
                />
                {touched.nid_no && errors.nid_no && (
                  <Typography color={theme.palette.errorColor.main}>
                    {errors.nid_no}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Button type="submit" variant="contained">
              SIGN UP
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
