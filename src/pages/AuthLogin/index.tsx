import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { toast } from "react-hot-toast";
import { useTheme } from "@mui/system/";
import AuthLayout from "Layouts/AuthLayout";
import AuthTextField from "components/AuthTextField";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import routes from "routes/index";
import { useLoginMutation } from "store/features/auth/authApi";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "store/features/auth/authSlice";
import { userHomeRedirect } from "utils/authUser";
import { selectUser } from "store/features/auth/authSelector";

export default function AuthLogin() {
  const spacing = useTheme().spacing(2);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector(selectUser);

  const loginHandler = async (
    values: any,
    { setSubmitting, setFieldError }: any
  ) => {
    try {
      const { data }: any = await login(values);

      if (!data?.success) {
        setFieldError(data?.field?.name, data?.field?.message);
        // TODO: input field should focus
      } else {
        toast.success("Login success!");
        navigate(userHomeRedirect(data?.user));
        dispatch(setUser(data?.user));
      }
    } catch (error) {
      toast.error("Login failed!");
    }
    setSubmitting(false);
  };

  if (authUser) {
    navigate(userHomeRedirect(authUser));
  }

  return (
    <AuthLayout>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="700"
        margin="1rem 0 2rem 0"
      >
        Login
      </Typography>

      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().required("Password is required"),
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        })}
        onSubmit={loginHandler}
      >
        {(formikProps) => (
          <Form onSubmit={formikProps.handleSubmit}>
            <AuthTextField
              sx={{ marginBottom: spacing }}
              name="email"
              type="email"
              label="Email"
              {...formikProps}
            />

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
