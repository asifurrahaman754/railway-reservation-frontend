import { UserType } from "types/tableRow";
import apiSlice from "../api/apiSlice";

const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
    }),

    updateUserVerification: builder.mutation({
      query: (id) => ({
        url: `/user/verification/${id}`,
        method: "PATCH",
      }),

      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchUser = dispatch(
          apiSlice.util.updateQueryData(
            "getAllUsers",
            undefined,
            (prevUsersData: any) => {
              const prevUsers: UserType[] = prevUsersData.data;
              const updatedUsers = prevUsers.map((user) => {
                if (user.id == id) {
                  return { ...user, isVerified: 1 };
                }
                return user;
              });

              return {
                ...prevUsersData,
                data: updatedUsers,
              };
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchUser.undo();
        }
      },
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),

      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              "getAllUsers",
              undefined,
              (prevUsersData: any) => {
                const prevUsers: UserType[] = prevUsersData.data;
                const updatedUsers = prevUsers.filter((user) => user.id != id);

                return {
                  ...prevUsersData,
                  data: updatedUsers,
                };
              }
            )
          );
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserVerificationMutation,
  useDeleteUserMutation,
} = usersApi;
