import { RootState } from "store/index";

export const selectCurrentTicket = (state: RootState) => state.ticket.currentTicket;
