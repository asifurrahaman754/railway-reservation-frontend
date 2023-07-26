import { Container } from "@mui/material";
import AuthBg from "Layouts/AuthBg";
import TrainDetailsClass from "./TrainDetailsClass";
import TrainDetailsCoach from "./TrainDetailsCoach";
import TrainDetailsHeader from "./TrainDetailsHeader";
import TrainDetailsRoutes from "./TrainDetailsRoutes";

export default function TrainDetails() {
  return (
    <AuthBg isCenter={false}>
      <Container>
        <TrainDetailsHeader />
        <TrainDetailsClass />
        <TrainDetailsCoach />
        <TrainDetailsRoutes />
      </Container>
    </AuthBg>
  );
}
