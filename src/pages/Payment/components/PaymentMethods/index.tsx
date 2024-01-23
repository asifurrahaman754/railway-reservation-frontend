import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Ticket } from "types/ticket";
import { paymentMethods } from "utils/payment";
import PaymentMethodInstructionList from "../PaymentMethodInstructionList";
import { useSelector } from "react-redux";
import { selectCurrentTicket } from "store/features/ticket/ticketSelector";

interface PaymentMethodsProps {
  selectedPaymentMethod: string;
  onPaymentSelect: (paymentMethod: string) => void;
}

export default function PaymentMethods({
  selectedPaymentMethod,
  onPaymentSelect,
}: PaymentMethodsProps) {
  const currentTicket = useSelector(selectCurrentTicket);
  const { totalPrice } = currentTicket as Ticket;

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPaymentSelect(e.target.value);
  };

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
            <RadioGroup
              value={selectedPaymentMethod}
              onChange={handlePaymentChange}
              row
            >
              {paymentMethods?.map((p) => {
                return (
                  <FormControlLabel
                    key={p.value}
                    control={<Radio />}
                    value={p.value}
                    label={<img src={p.image} width={100} />}
                  />
                );
              })}
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <Alert severity="info">
              To pay by <strong>{selectedPaymentMethod}</strong> follow the
              instruction below
            </Alert>
            <Typography mt={2}>
              Your Total Due Amount is:- BDT{totalPrice}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <PaymentMethodInstructionList
              selectedPaymentMethod={selectedPaymentMethod}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
