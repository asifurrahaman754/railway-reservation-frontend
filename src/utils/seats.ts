import { Seat } from "types/seat";

export const getSeatNameFromArray = (seats: Seat[]) => {
   return seats?.map((s) => `${s.coach_name}-${s.name}`).join(", ");
}