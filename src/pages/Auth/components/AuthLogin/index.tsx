import Button from "@mui/material/Button";
import { useTheme } from "@mui/system/";
import AuthFormHeader from "components/reusable/AuthFormHeader";
import { Form, Formik } from "formik";
import AuthTextField from "pages/Auth/components/AuthTextField";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "routes/index";
import { useLoginMutation } from "store/features/auth/authApi";
import { setUser } from "store/features/auth/authSlice";
import * as Yup from "yup";

type formValuesType = {
  password: string;
  mobile: string;
};

export default function AuthLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const spacing = useTheme().spacing(2);

  const [login] = useLoginMutation();

  const initialValue: formValuesType = {
    password: "",
    mobile: "",
  };

  const submitHandler = async (
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
        navigate(routes.home);
        dispatch(setUser(data?.user));
        localStorage.setItem("user", JSON.stringify(data?.user));
      }
    } catch (error) {
      toast.error("Login failed!");
    }
    setSubmitting(false);
  };

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
              sx={{ marginBottom: spacing }}
              name="mobile"
              type="tel"
              label="Mobile"
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
          </Form>
        )}
      </Formik>
    </>
  );
}
