import { RootState } from "store/index";

export const selectUser = (state: RootState) => state.auth.user;
