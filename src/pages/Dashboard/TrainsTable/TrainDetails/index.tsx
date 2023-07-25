import { Container } from "@mui/material";
import AuthBg from "Layouts/AuthBg";
import TrainDetailsClass from "./TrainDetailsClass";
import TrainDetailsHeader from "./TrainDetailsHeader";

export default function TrainDetails() {
  return (
    <AuthBg isCenter={false}>
      <Container>
        <TrainDetailsHeader />
        <TrainDetailsClass />
      </Container>
    </AuthBg>
  );
}
