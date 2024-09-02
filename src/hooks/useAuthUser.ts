import { useSelector } from "react-redux";
import {
  selectUser,
  selectUserLoading,
} from "store/features/auth/authSelector";
import { RootState } from "store/index";

const useAuthUser = () => {
  const { user, loading } = useSelector((state: RootState) => ({
    user: selectUser(state),
    loading: selectUserLoading(state),
  }));
  const isInitialized = !!user;

  return { user, isInitialized, loading };
};

export default useAuthUser;
