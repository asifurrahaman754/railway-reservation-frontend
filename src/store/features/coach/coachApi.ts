import apiSlice from "../api/apiSlice";
import validateTags from "../api/validateTags";

const coachApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoach: builder.query({
      query: () => "/coaches",
      providesTags: validateTags.getAllCoach,
    }),

    getCoachesById: builder.query({
      query: (id) => `/coaches/${id}`,
      providesTags: validateTags.getAllCoach,
    }),

    addCoach: builder.mutation({
      query: (body) => ({
        url: "/coaches/add",
        method: "POST",
        body,
      }),
      invalidatesTags: validateTags.getAllCoach,
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
  useGetCoachesByIdQuery,
  useAddCoachMutation,
  useDeleteCoachMutation,
} = coachApi;
