import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "routes/index";
import {
  useAdminLoginMutation,
  useLoginMutation,
} from "store/features/auth/authApi";
import { setUser } from "store/features/auth/authSlice";
import { setUserToLocal } from "utils/localStorage";

export default function useAuthSubmitHandler() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [adminLogin] = useAdminLoginMutation();

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
        navigate(routes.home);
        dispatch(setUser(data?.user));
        setUserToLocal(data?.user);
      }
    } catch (error) {
      toast.error("Login failed!");
    }
    setSubmitting(false);
  };

  const adminLoginHandler = async (
    values: any,
    { setSubmitting, setFieldError }: any
  ) => {
    try {
      const { data }: any = await adminLogin(values);

      if (!data?.success) {
        setFieldError(data?.field?.name, data?.field?.message);
        // TODO: input field should focus
      } else {
        toast.success("Login success!");
        navigate(routes.admin.dashboard);
        dispatch(setUser(data?.user));
        setUserToLocal(data?.user);
      }
    } catch (error) {
      toast.error("Login failed!");
    }
    setSubmitting(false);
  };

  const submitHandler = async (handlerType: string, ...args: any[]) => {
    switch (handlerType) {
      case "login":
        await loginHandler(...args);
        break;
      case "admin":
        await adminLoginHandler(...args);
        break;
      default:
        break;
    }
  };

  return submitHandler;
}
