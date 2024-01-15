import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
} from "@mui/material";
import { Ticket } from "types/ticket";
import { paymentMethods } from "utils/payment";
import PaymentMethodInstructionList from "../PaymentMethodInstructionList";

interface PaymentMethodsProps {
  currentTicket: Ticket;
}

export default function PaymentMethods({ currentTicket }: PaymentMethodsProps) {
  const { totalPrice } = currentTicket;

  return (
    <Card>
      <CardHeader
        title="Select Payment Method"
        sx={{
          color: "secondary.main",
        }}
      />
      <CardContent sx={{ py: 0 }}>
        <Grid container rowSpacing={4}>
          <Grid item xs={12}>
            {paymentMethods?.map((p) => {
              return (
                <FormControlLabel
                  control={<Radio />}
                  label={<img src={p.image} width={100} />}
                />
              );
            })}
          </Grid>
          <Grid item xs={12}>
            <Alert severity="info">
              To pay by Bkash follow the instruction below
            </Alert>
            <Typography mt={2}>
              Your Total Due Amount is:- BDT{totalPrice}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <PaymentMethodInstructionList />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
