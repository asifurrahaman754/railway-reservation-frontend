import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Loader from "components/Loader";
import useSearchParams from "hooks/useSearchParams";
import { useEffect } from "react";
import { useFetchTrainMutation } from "store/features/trainSearch/trainSearchApi";
import { RouteSchedule } from "types/routeSchedule";
import TrainInfoHeader from "./components/TrainInfoHeader";
import TrainListItem from "./components/TrainListItem";

export default function TrainInfo() {
  let data = useSearchParams();
  const [fetchTrain, { data: allSchedules, isLoading }] = useFetchTrainMutation();

  useEffect(() => {
    fetchTrain(data);
  }, [JSON.stringify(data)]);

  let content;
  if (isLoading) {
    content = <Loader />;
  } else {
    content = (
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
    );
  }

  return (
    <>
      <TrainInfoHeader />
      {content}
    </>
  );
}
