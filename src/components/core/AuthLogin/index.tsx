import { Button } from "@mui/material";
import { useTheme } from "@mui/system/";
import AuthFormHeader from "components/reusable/AuthFormHeader";
import AuthTextField from "components/reusable/AuthTextField";
import { Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "store/features/auth/authApi";
import { setUser } from "store/features/auth/authSlice";
import * as Yup from "yup";

type formValuesType = {
  password: string;
  mobile: string;
};

export default function AuthLogin() {
  const dispatch = useDispatch();
  const theme = useTheme();

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
      const { data } = await login(values);

      if (!data?.success) {
        setFieldError(data?.field?.name, data?.field?.message);
        // TODO: input field should focus
      } else {
        toast.success("Login success!");
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
