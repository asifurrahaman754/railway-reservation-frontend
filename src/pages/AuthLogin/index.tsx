import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system/";
import AuthLayout from "Layouts/AuthLayout";
import AuthTextField from "components/AuthTextField";
import { Form, Formik } from "formik";
import useAuthSubmitHandler from "hooks/useAuthSubmitHandler";
import { Link } from "react-router-dom";
import routes from "routes/index";
import * as Yup from "yup";

type formValuesType = {
  password: string;
  mobile: string;
  email: string;
};

type AuthLoginProps = {
  isForAdmin?: boolean;
};

export default function AuthLogin({ isForAdmin }: AuthLoginProps) {
  const spacing = useTheme().spacing(2);
  const handlerType = isForAdmin ? "admin" : "login";
  const submitHandler = useAuthSubmitHandler();

  const initialValue: formValuesType = {
    password: "",
    mobile: "",
    email: "",
  };

  return (
    <AuthLayout>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="700"
        margin="1rem 0 2rem 0"
      >
        {isForAdmin ? "Admin Login" : "Login"}
      </Typography>

      <Formik
        initialValues={initialValue}
        validationSchema={Yup.object().shape({
          password: Yup.string().required("Password is required"),
          ...(isForAdmin
            ? {
                email: Yup.string()
                  .email("Invalid email")
                  .required("Email is required"),
              }
            : {
                mobile: Yup.string().required("Mobile number is required"),
              }),
        })}
        onSubmit={(...args) => submitHandler(handlerType, ...args)}
      >
        {(formikProps) => (
          <Form onSubmit={formikProps.handleSubmit}>
            {isForAdmin ? (
              <AuthTextField
                sx={{ marginBottom: spacing }}
                name="email"
                type="email"
                label="Email"
                {...formikProps}
              />
            ) : (
              <AuthTextField
                sx={{ marginBottom: spacing }}
                name="mobile"
                type="tel"
                label="Mobile"
                {...formikProps}
              />
            )}

            <AuthTextField
              sx={{ marginBottom: spacing }}
              name="password"
              type="password"
              label="Password"
              {...formikProps}
            />

            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>

            <Typography
              variant="body2"
              textAlign="center"
              marginTop={spacing}
              marginBottom={spacing}
            >
              Don't have an account?{" "}
              <Link to={routes.auth.register}>
                <Button component="a" variant="text">
                  Register
                </Button>
              </Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
