import { Container } from "@mui/material";
import AuthBg from "Layouts/AuthBg";
import TrainDetailsClassFare from "./TrainDetailsClassFare";
import TrainDetailsCoach from "./TrainDetailsCoach";
import TrainDetailsHeader from "./TrainDetailsHeader";
import TrainDetailsRoutes from "./TrainDetailsRoutes";

export default function TrainDetails() {
  return (
    <AuthBg isCenter={false}>
      <Container>
        <TrainDetailsHeader />
        <TrainDetailsClassFare />
        <TrainDetailsCoach />
        <TrainDetailsRoutes />
      </Container>
    </AuthBg>
  );
}
