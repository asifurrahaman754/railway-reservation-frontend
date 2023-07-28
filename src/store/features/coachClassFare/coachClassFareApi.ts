import apiSlice from "../api/apiSlice";

const coachClassFareApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoachClassFare: builder.query({
      query: () => "/coach_class_fare",
    }),

    addCoachClassFare: builder.mutation({
      query: (body) => ({
        url: "/coach_class_fare/add",
        method: "POST",
        body,
      }),
    }),

    deleteCoachClassFare: builder.mutation({
      query: (id) => ({
        url: `/delete_coach_class_fare/${id}`,
        method: "DELETE",
      }),

      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllCoachClassFare",
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
  useGetAllCoachClassFareQuery,
  useDeleteCoachClassFareMutation,
  useAddCoachClassFareMutation,
} = coachClassFareApi;
