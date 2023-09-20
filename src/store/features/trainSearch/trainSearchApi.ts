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
    getTotalAvailableTickets: builder.mutation({
      query: (body) => ({
        url: "/get_ticket_available",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useFetchTrainMutation, useGetTotalAvailableTicketsMutation } =
  trainSearchApi;
