import apiSlice from "../api/apiSlice";
import validateTags from "../api/validateTags";

const coachClassFareApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoachClassFare: builder.query({
      query: () => "/coach_class_fare",
      providesTags: validateTags.getAllCoachClassFare,
    }),

    getSingleCoachClassFare: builder.query({
      query: (trainId) => `/coach_class_fare/${trainId}`,
      providesTags: validateTags.getSingleCoachClassFare,
    }),

    addCoachClassFare: builder.mutation({
      query: (body) => ({
        url: "/coach_class_fare/add",
        method: "POST",
        body,
      }),
      invalidatesTags: validateTags.getAllCoachClassFare,
    }),

    deleteCoachClassFare: builder.mutation({
      query: (id) => ({
        url: `/delete_coach_class_fare/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: validateTags.getSingleCoachClassFare,
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
  useGetSingleCoachClassFareQuery,
  useDeleteCoachClassFareMutation,
  useAddCoachClassFareMutation,
} = coachClassFareApi;
