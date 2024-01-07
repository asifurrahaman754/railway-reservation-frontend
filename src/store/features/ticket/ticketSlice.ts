import { createSlice } from "@reduxjs/toolkit";
import { Ticket } from "types/ticket";

interface ticketSliceState {
  currentTicket: Ticket | null;
}

const initialState: ticketSliceState = {
  currentTicket: null,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setTicketInfo: (state, action) => {
      state.currentTicket = action.payload;
    },
    resetTicketInfo: (state) => {
      state.currentTicket = null;
    },
  },
});

export const { resetTicketInfo, setTicketInfo } = ticketSlice.actions;

export default ticketSlice.reducer;
