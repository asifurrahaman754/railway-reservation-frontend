import apiSlice from "../api/apiSlice";

const coachApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoach: builder.query({
      query: () => "/coaches",
    }),

    addCoach: builder.mutation({
      query: (body) => ({
        url: "/coaches/add",
        method: "POST",
        body,
      }),

      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllCoach",
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

    deleteCoach: builder.mutation({
      query: (id) => ({
        url: `/delete_coaches/${id}`,
        method: "DELETE",
      }),

      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllCoach",
              undefined,
              (prevData: any) => {
                if (result.data.success) {
                  prevData.data = prevData.data.filter(
                    (coach: any) => coach.id != id
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
  useGetAllCoachQuery,
  useAddCoachMutation,
  useDeleteCoachMutation,
} = coachApi;
