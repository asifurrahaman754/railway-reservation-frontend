import { Grid, Typography } from "@mui/material";
import PageContainer from "components/PageContainer";
import { useSelector } from "react-redux";
import { selectCurrentTicket } from "store/features/ticket/ticketSelector";
import PaymentHeader from "./components/PaymentHeader";
import PaymentMethods from "./components/PaymentMethods";
import PaymentConfirmation from "./components/PaymentConfirmation";
import { useState } from "react";

export default function Payment() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("bkash");
  const currentTicket = useSelector(selectCurrentTicket);

  const handlePaymentChange = (value: string) => {
    setSelectedPaymentMethod(value);
  };

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
          <PaymentHeader />
        </Grid>
        <Grid item xs={12} md={6}>
          <PaymentMethods
            selectedPaymentMethod={selectedPaymentMethod}
            onPaymentSelect={handlePaymentChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PaymentConfirmation selectedPaymentMethod={selectedPaymentMethod} />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
