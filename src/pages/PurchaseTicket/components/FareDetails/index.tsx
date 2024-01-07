import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import DetailsListItem from "../DetailsListItem";
import { JourneyDetailsProps } from "../JourneyDetails";

interface FareDetailsProps extends JourneyDetailsProps {}

export default function FareDetails({ currentTicket }: FareDetailsProps) {
  const { totalPrice } = currentTicket;

  return (
    <Card>
      <CardHeader
        title="Fare Details"
        sx={{
          color: "secondary.main",
        }}
      />
      <CardContent sx={{ py: 0 }}>
        <DetailsListItem label="Ticket price" align="space-between">
          {totalPrice}
        </DetailsListItem>
        {/*  TODO: Add vat */}
        <DetailsListItem label="Vat" align="space-between">
          #TBD
        </DetailsListItem>
        <Divider sx={{ my: 1.5 }} />
        <DetailsListItem label="**Total" align="space-between">
          {totalPrice} Tk
        </DetailsListItem>
      </CardContent>
    </Card>
  );
}
