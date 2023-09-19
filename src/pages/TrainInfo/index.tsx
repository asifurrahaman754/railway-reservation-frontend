import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import TrainInfoHeader from "./components/TrainInfoHeader";
import useSearchParams from "hooks/useSearchParams";
import { useFetchTrainMutation } from "store/features/trainSearch/trainSearchApi";
import { useEffect } from "react";
import Loader from "components/Loader";
import { RouteSchedule } from "types/routeSchedule";
import TrainListItem from "./components/TrainListItem";
import { Box } from "@mui/material";

export default function TrainInfo() {
  let data = useSearchParams();
  const [fetchTrain, { isLoading, data: allSchedules }] =
    useFetchTrainMutation();

  useEffect(() => {
    fetchTrain(data);
  }, [JSON.stringify(data)]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <TrainInfoHeader />
      <Box py={3}>
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

          {allSchedules?.data?.map((schedule: RouteSchedule) => (
            <TrainListItem schedule={schedule} key={schedule.id} />
          ))}
        </Container>
      </Box>
    </>
  );
}
