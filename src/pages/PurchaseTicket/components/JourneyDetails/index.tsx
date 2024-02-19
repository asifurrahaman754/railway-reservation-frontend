import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

import { Ticket } from "types/ticket";
import DetailsListItem from "../DetailsListItem";
import { getSeatNameFromArray } from "utils/seats";

export interface JourneyDetailsProps {
  currentTicket: Ticket;
}

export default function JourneyDetails({ currentTicket }: JourneyDetailsProps) {
  const { train_name, from, to, date, time, seats } = currentTicket;

  return (
    <Card>
      <CardHeader
        title="Journey Details"
        sx={{
          color: "secondary.main",
        }}
      />
      <CardContent sx={{ py: 0 }}>
        <DetailsListItem>
          <Typography variant="h5" fontWeight="bold">
            {train_name}
          </Typography>
        </DetailsListItem>
        <DetailsListItem>
          {from} - {to}
        </DetailsListItem>
        <DetailsListItem label="Departure">
          {date} - {time}
        </DetailsListItem>
        <Divider sx={{ my: 1.5 }} />
        <DetailsListItem label="Coach">{seats[0]?.coach_name}</DetailsListItem>
        <DetailsListItem label="Seat type">
          {seats[0]?.coach_class}
        </DetailsListItem>
        <DetailsListItem label="Seats">
          {getSeatNameFromArray(seats)}
        </DetailsListItem>
      </CardContent>
    </Card>
  );
}
