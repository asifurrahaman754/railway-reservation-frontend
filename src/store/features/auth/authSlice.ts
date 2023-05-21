import { createSlice } from "@reduxjs/toolkit";
import { authUserType } from "types/authUserType";
import { getUserFromLocal } from "utils/localStorage";

interface authSliceState {
  user: authUserType | null;
}

const initialState: authSliceState = {
  user: getUserFromLocal(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
