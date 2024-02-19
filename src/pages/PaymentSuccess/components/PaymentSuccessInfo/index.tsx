import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "store/features/auth/authSelector";

export default function PaymentSuccessInfo() {
  const user = useSelector(selectUser);

  return (
    <>
      <Typography color="primary" variant="body1">
        Payment Successfull
      </Typography>
      <Typography color="primary" variant="h4" mt={1}>
        Hi {user?.username}, We have successfully confirmed your ticket!
      </Typography>
      <Typography variant="h6" mt={2} mb={2}>
        We request you to read the following
      </Typography>
      <Box component="ul" ml={4}>
        <Box component="li" mb={2}>
          To reiceve a Bangladesh Railway printed ticket, donwload and show a
          copy of the printed ticket at the counter.
        </Box>
        <Box component="li" mb={2}>
          For cancellation and refund, please show the printed ticket at the at
          the station.
        </Box>
        <Box component="li" mb={2}>
          If you have not received your email after a few hours, please send a
          support request at support@example.com
        </Box>
      </Box>
    </>
  );
}
