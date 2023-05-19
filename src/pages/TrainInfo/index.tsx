import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import UserLayout from "layouts/UserLayout";
import TrainInfoHeader from "./components/TrainInfoHeader";
import TrainLists from "./components/TrainLists";

export default function TrainInfo() {
  return (
    <UserLayout>
      <TrainInfoHeader />
      <Box sx={{ padding: "2rem 0" }}>
        <Container>
          <Alert
            severity="info"
            sx={{
              fontSize: ".85rem",
              borderRadius: "10px",
              marginBottom: "3rem",
            }}
          >
            <strong>
              Please Note: Other users may be in the process of purchasing
              tickets at this moment. But in case of payment failure, those
              tickets may become available time-to-time.
            </strong>
          </Alert>

          <TrainLists />
        </Container>
      </Box>
    </UserLayout>
  );
}
