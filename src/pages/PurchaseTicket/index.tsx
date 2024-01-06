import { Grid } from "@mui/material";
import PageContainer from "components/PageContainer";
import FareDetails from "./components/FareDetails";
import JourneyDetails from "./components/JourneyDetails";
import PurchaseHeader from "./components/PurchaseHeader";

export default function PurchaseTicket() {
  return (
    <PageContainer>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PurchaseHeader />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <JourneyDetails />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FareDetails />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
