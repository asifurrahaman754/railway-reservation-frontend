import { RootState } from "store/index";
import { authUserType } from "types/authUserType";

export const selectUser = (state: RootState) => state.auth.user as authUserType;
export const selectUserLoading = (state: RootState) => state.auth.loading;
