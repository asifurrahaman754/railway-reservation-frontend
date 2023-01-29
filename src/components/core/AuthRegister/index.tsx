import AuthFormField from "components/reusable/AuthFormField";
import AuthFormHeader from "components/reusable/AuthFormHeader";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { Formik, Form } from "formik";

export default function AuthRegister() {
  return (
    <>
      <AuthFormHeader title="Register" />
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            setSubmitting(false);
          }, 400);
        }}
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
                <AuthFormField name="Full Name" onChange={handleChange} />
                {errors.email && <p>error in full name</p>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <AuthFormField
                  type="email"
                  onChange={handleChange}
                  name="Email"
                />
                {errors.email && <p>error in full name</p>}
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
