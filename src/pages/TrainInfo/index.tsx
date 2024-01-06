import Box from "@mui/material/Box";
import AlertCard from "components/AlertCard";
import Loader from "components/Loader";
import PageContainer from "components/PageContainer";
import useSearchParams from "hooks/useSearchParams";
import { useEffect } from "react";
import { useFetchTrainMutation } from "store/features/trainSearch/trainSearchApi";
import { RouteSchedule } from "types/routeSchedule";
import TrainInfoHeader from "./components/TrainInfoHeader";
import TrainListItem from "./components/TrainListItem";

export default function TrainInfo() {
  let data = useSearchParams();
  const [fetchTrain, { data: allSchedules, isLoading }] =
    useFetchTrainMutation();

  useEffect(() => {
    fetchTrain(data);
  }, [JSON.stringify(data)]);

  let content;
  if (isLoading) {
    content = <Loader />;
  } else {
    content = (
      <PageContainer>
        <Box mb={3}>
          <AlertCard>
            <strong>
              Please Note: Other users may be in the process of purchasing
              tickets at this moment. But in case of payment failure, those
              tickets may become available time-to-time.
            </strong>
          </AlertCard>
        </Box>

        {allSchedules?.data?.map((schedule: RouteSchedule) => (
          <TrainListItem schedule={schedule} key={schedule.id} />
        ))}
      </PageContainer>
    );
  }

  return (
    <>
      <TrainInfoHeader />
      {content}
    </>
  );
}
