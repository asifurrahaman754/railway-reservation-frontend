import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/system/";
import AuthFormField from "components/reusable/AuthFormField";
import AuthFormHeader from "components/reusable/AuthFormHeader";
import { Form, Formik } from "formik";

type formValuesType = {
  email: string;
  fullName: string;
};

export default function AuthRegister() {
  const theme = useTheme();
  const initialValue: formValuesType = { email: "", fullName: "" };

  const validation = (values: formValuesType) => {
    let errors: formValuesType = initialValue;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.fullName) {
      errors.fullName = "Full Name is required!";
    }

    if (!values.fullName) {
      errors.fullName = "Full Name is required!";
    }

    return errors;
  };

  const submitHandler = (values: any, { setSubmitting }: any) => {
    console.log(values);
  };

  return (
    <>
      <AuthFormHeader title="Register" />
      <Formik
        initialValues={initialValue}
        validate={validation}
        onSubmit={submitHandler}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form>
            <Grid container spacing={2} marginBottom="1rem">
              <Grid item xs={12} sm={6}>
                <AuthFormField name="full Name" onChange={() => handleChange} />
                {errors.fullName && (
                  <Typography color={theme.palette.errorColor.main}>
                    {errors.fullName}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <AuthFormField
                  type="email"
                  onChange={() => handleChange}
                  name="email"
                />
                {errors.email && (
                  <Typography color={theme.palette.errorColor.main}>
                    {errors.email}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <AuthFormField type="tel" name="Mobile" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AuthFormField type="number" name="Post Code" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AuthFormField type="password" name="Password" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AuthFormField
                  type="number"
                  name="NID/Birth registration number"
                />
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
