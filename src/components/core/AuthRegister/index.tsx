import { Button, Grid, Typography } from "@mui/material";
import AuthFormHeader from "components/reusable/AuthFormHeader";
import AuthTextField from "components/reusable/AuthTextField";
import { Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "store/features/auth/authApi";
import * as Yup from "yup";

type registerformValuesType = {
  email: string;
  username: string;
  password: string;
  mobile: string;
  nid_no: string;
};

export default function AuthRegister() {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const initialValue: registerformValuesType = {
    email: "",
    username: "",
    password: "",
    mobile: "",
    nid_no: "",
  };

  const submitHandler = async (values: any, { setSubmitting }: any) => {
    try {
      const { data } = await register(values);

      if (!data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Registration successfull!");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      toast.error("Registration failed!");
    }
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
            .required("Email is required"),
          username: Yup.string().required("Full name is required"),
          password: Yup.string().required("Password is required"),
          mobile: Yup.string().required("Mobile number is required"),
          nid_no: Yup.string().required("National ID number is required"),
        })}
        onSubmit={submitHandler}
      >
        {(formikProps) => (
          <Form onSubmit={formikProps.handleSubmit}>
            <Grid container spacing={2} marginBottom="1rem">
              <Grid item xs={12} sm={6}>
                <AuthTextField
                  name="username"
                  label="Full Name"
                  {...formikProps}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <AuthTextField
                  name="email"
                  type="email"
                  label="email"
                  {...formikProps}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <AuthTextField
                  name="mobile"
                  type="tel"
                  label="Mobile"
                  {...formikProps}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AuthTextField
                  name="password"
                  type="password"
                  label="Password"
                  {...formikProps}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <AuthTextField
                  name="nid_no"
                  label="NID number"
                  {...formikProps}
                />
              </Grid>
            </Grid>

            <Typography
              variant="body2"
              color="textSecondary"
              fontWeight="500"
              marginBottom="1rem"
            >
              Note: after successfull registration you will be redirect to the
              login page. But it will take 12 hours to verify you NID.
            </Typography>
            <Button type="submit" variant="contained">
              SIGN UP
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
