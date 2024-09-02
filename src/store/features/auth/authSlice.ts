import { createSlice } from "@reduxjs/toolkit";
import { authUserType } from "types/authUserType";
import Cookie from "js-cookie";

interface authSliceState {
  user: authUserType | null;
  loading: boolean;
}

const initialState: authSliceState = {
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload.token) {
        Cookie.set("token", action.payload.token, {
          expires: 1,
        });
      }
      state.user = action.payload;
      state.loading = false;
    },
    removeUser: (state) => {
      state.user = null;
    },
    setUserLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { setUser, removeUser, setUserLoading } = authSlice.actions;

export default authSlice.reducer;
