import { Divider, Grid, Typography } from "@mui/material";
import AlertCard from "components/AlertCard";

export default function Purchase() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} mb={3}>
        <Typography variant="h4" pb={3}>
          Purchase Ticket
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <AlertCard>
          <strong>
            Please Note: Co-passengers' names (as given on their NID / photo ID)
            are mandatory to complete the ticket purchase process. All
            passengers MUST carry their NID / photo ID document while traveling.
          </strong>
        </AlertCard>
      </Grid>
      <Grid item xs={12}>
        <AlertCard>
          <strong>
            Please complete the passenger details, review and continue to the
            payment page within 5 minutes, or the selected seat(s) will be
            released and you will have to re-initiate the booking process.
          </strong>
        </AlertCard>
      </Grid>
    </Grid>
  );
}
