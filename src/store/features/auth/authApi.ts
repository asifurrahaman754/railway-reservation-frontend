import apiSlice from "../api/apiSlice";
import { setUserLoading } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    getLoggedInUser: builder.query({
      query: () => `/auth/user`,
      onQueryStarted(_arg, { dispatch }) {
        dispatch(setUserLoading());
      },
    }),

    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetLoggedInUserQuery,
  useRegisterMutation,
} = authApi;
