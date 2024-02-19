import apiSlice from "../api/apiSlice";

const ticketApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkTicketByPnr: builder.query({
      query: (pnr) => `/check_ticket/${pnr}`,
    }),

    addTicket: builder.mutation({
      query: (body) => ({
        url: "/buy_ticket",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAddTicketMutation, useCheckTicketByPnrQuery } = ticketApi;
