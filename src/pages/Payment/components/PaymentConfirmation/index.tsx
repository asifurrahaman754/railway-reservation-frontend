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

export default function PaymentConfirmation() {
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
              Please enter your Bkash payment transaction ID below
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormLabel htmlFor="transactionId">
                * Bkash Transaction ID (try any random number)
              </FormLabel>
              <TextField
                id="transactionId"
                placeholder="TrxId"
                fullWidth
                type="number"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained">Pay now</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
