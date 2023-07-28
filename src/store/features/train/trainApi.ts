import apiSlice from "../api/apiSlice";

const trainApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTrain: builder.query({
      query: () => "/train",
    }),

    getSingleTrain: builder.query({
      query: (trainId) => `/train/${trainId}`,
    }),

    addTrain: builder.mutation({
      query: (body) => ({
        url: "/train/add",
        method: "POST",
        body,
      }),

      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllTrain",
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

    deleteTrain: builder.mutation({
      query: (id) => ({
        url: `/delete_train/${id}`,
        method: "DELETE",
      }),

      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllTrain",
              undefined,
              (prevData: any) => {
                if (result.data.success) {
                  prevData.data = prevData.data.filter(
                    (data: any) => data.id != id
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
  useGetAllTrainQuery,
  useGetSingleTrainQuery,
  useAddTrainMutation,
  useDeleteTrainMutation,
} = trainApi;
