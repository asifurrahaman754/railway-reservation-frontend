import { Grid, Typography } from "@mui/material";
import PageContainer from "components/PageContainer";
import { useSelector } from "react-redux";
import { selectCurrentTicket } from "store/features/ticket/ticketSelector";
import FareDetails from "./components/FareDetails";
import JourneyDetails from "./components/JourneyDetails";
import PurchaseHeader from "./components/PurchaseHeader";

export default function PurchaseTicket() {
  const currentTicket = useSelector(selectCurrentTicket);

  if (!currentTicket) {
    return (
      <Typography variant="h5" textAlign="center" my={3} color="secondary">
        No ticket information found. Please select a ticket
      </Typography>
    );
  }

  return (
    <PageContainer>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PurchaseHeader />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <JourneyDetails currentTicket={currentTicket} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FareDetails currentTicket={currentTicket} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
