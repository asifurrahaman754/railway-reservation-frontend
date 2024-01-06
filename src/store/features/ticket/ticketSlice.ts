import { createSlice } from "@reduxjs/toolkit";

interface ticketSliceState {
  train_name: string;
  from: string;
  to: string;
  date: string;
  time: string;
  seats: Array<string>;
  totalPrice: string;
}

const initialState: ticketSliceState = {
  train_name: "",
  from: "",
  to: "",
  date: "",
  time: "",
  seats: [],
  totalPrice: "",
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setTicketInfo: (state, action) => {
      state.train_name = action.payload.train_name;
      state.from = action.payload.from;
      state.to = action.payload.to;
      state.date = action.payload.date;
      state.time = action.payload.time;
      state.seats = action.payload.seats;
      state.totalPrice = action.payload.totalPrice;
    },
    resetTicketInfo: (state) => {
      state.train_name = "";
      state.from = "";
      state.to = "";
      state.date = "";
      state.time = "";
      state.seats = [];
      state.totalPrice = "";
    },
  },
});

export const { resetTicketInfo, setTicketInfo } = ticketSlice.actions;

export default ticketSlice.reducer;
