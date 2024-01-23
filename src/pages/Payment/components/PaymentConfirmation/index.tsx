import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Grid,
  FormGroup,
  FormLabel,
  TextField,
  Button,
} from "@mui/material";
import { memo, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUser } from "store/features/auth/authSelector";
import { useAddTicketMutation } from "store/features/ticket/ticketApi";
import { selectCurrentTicket } from "store/features/ticket/ticketSelector";

interface PaymentConfirmationProps {
  selectedPaymentMethod: string;
}

function PaymentConfirmation({
  selectedPaymentMethod,
}: PaymentConfirmationProps) {
  const user = useSelector(selectUser);
  const selectedTicket = useSelector(selectCurrentTicket);
  const [addTicket] = useAddTicketMutation();
  const [transactionId, setTransactionId] = useState("");

  const handleTransactionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionId(e.target.value);
  };

  const handleBookTicket = async () => {
    if (!transactionId) return;

    if (transactionId.length >= 25) {
      toast.error("Transaction ID is too long!");
      return;
    }

    try {
      const { data }: any = await addTicket({
        user_id: 1,
        payment_method: selectedPaymentMethod,
        transaction_id: transactionId,
        seats: selectedTicket?.seats,
      });

      if (data.success) {
        toast.success("Ticket purchase successful");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Ticket purchase failed!");
    }
  };

  return (
    <Card>
      <CardHeader
        title="Payment Confirmation"
        sx={{
          color: "secondary.main",
        }}
      />
      <CardContent sx={{ py: 0 }}>
        <Grid container rowSpacing={4}>
          <Grid item xs={12}>
            <Alert severity="info">
              Please enter your {selectedPaymentMethod} payment transaction ID
              below
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormLabel htmlFor="transactionId">
                *{" "}
                {selectedPaymentMethod.charAt(0).toUpperCase() +
                  selectedPaymentMethod.slice(1)}{" "}
                Transaction ID (try any random number)
              </FormLabel>
              <TextField
                placeholder="TrxId"
                fullWidth
                type="number"
                onChange={handleTransactionChange}
                value={transactionId}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleBookTicket}>
              Pay now
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default memo(PaymentConfirmation);
