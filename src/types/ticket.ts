import { Seat } from "./seat";

export type Ticket = {
  train_name: string;
  from: string;
  to: string;
  date: string;
  time: string;
  seats: Array<Seat>;
  totalPrice: string;
};
