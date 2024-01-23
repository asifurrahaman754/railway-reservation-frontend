import apiSlice from "../api/apiSlice";

const ticketApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTicket: builder.mutation({
      query: (body) => ({
        url: "/buy_ticket",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAddTicketMutation } = ticketApi;
