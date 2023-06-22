import apiSlice from "../api/apiSlice";

const coachClassApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoachClass: builder.query({
      query: () => "/coach_classes",
    }),

    addCoachClass: builder.mutation({
      query: (body) => ({
        url: "/coach_class/add",
        method: "POST",
        body,
      }),

      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllCoachClass",
              undefined,
              (prevData: any) => {
                if (result.data.success) {
                  prevData.data.push(result.data.data);
                }
              }
            )
          );
        } catch (error) {}
      },
    }),

    deleteCoachClass: builder.mutation({
      query: (id) => ({
        url: `/coach_class/${id}`,
        method: "DELETE",
      }),

      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllCoachClass",
              undefined,
              (prevData: any) => {
                if (result.data.success) {
                  prevData.data = prevData.data.filter(
                    (coachClass: any) => coachClass.id != id
                  );
                }
              }
            )
          );
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetAllCoachClassQuery,
  useAddCoachClassMutation,
  useDeleteCoachClassMutation,
} = coachClassApi;
