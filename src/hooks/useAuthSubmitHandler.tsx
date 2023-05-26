import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "routes/index";
import { useLoginMutation } from "store/features/auth/authApi";
import { setUser } from "store/features/auth/authSlice";

export default function useAuthSubmitHandler() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

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
        localStorage.setItem("user", JSON.stringify(data?.user));
      }
    } catch (error) {
      toast.error("Login failed!");
    }
    setSubmitting(false);
  };

  const adminLoginHandler = async () => {};

  const submitHandler = async (handlerType: string, ...args: any[]) => {
    console.log("handlerType", handlerType);
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
