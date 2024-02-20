import PageContainer from "components/PageContainer";
import PaymentSuccessInfo from "./components/PaymentSuccessInfo";
import PaymentSuccessInfoTable from "./components/PaymentSuccessInfoTable";
import { Grid } from "@mui/material";
import Loader from "components/Loader";
import { useParams } from "react-router-dom";
import { useCheckTicketByPnrQuery } from "store/features/ticket/ticketApi";
import { useSelector } from "react-redux";
import { selectCurrentTicket } from "store/features/ticket/ticketSelector";
import { lazy } from "react";

const NotFound = lazy(() => import("components/NotFound"));

export default function PaymentSuccess() {
  const { ticketID } = useParams();
  const currentTicket = useSelector(selectCurrentTicket);
  const { data, isLoading } = useCheckTicketByPnrQuery(ticketID);

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.data?.pnr || !currentTicket) {
    return <NotFound />;
  }

  return (
    <PageContainer>
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          <PaymentSuccessInfo />
        </Grid>
        <Grid item md={4} xs={12}>
          <PaymentSuccessInfoTable pnr={data?.data?.pnr} />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
