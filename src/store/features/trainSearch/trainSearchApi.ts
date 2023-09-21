import apiSlice from "../api/apiSlice";

const trainSearchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTrain: builder.mutation({
      query: (body) => ({
        url: "/book_ticket",
        method: "POST",
        body,
      }),
    }),

    fetchSeats: builder.query({
      query: (coachId) => `/seats/${coachId}`,
    }),
  }),
});

export const { useFetchTrainMutation, useFetchSeatsQuery } = trainSearchApi;
