import { Container } from "@mui/material";
import AuthBg from "Layouts/AuthBg";
import TrainDetailsHeader from "./TrainDetailsHeader";

export default function TrainDetails() {
  return (
    <AuthBg isCenter={false}>
      <Container>
        <TrainDetailsHeader />
      </Container>
    </AuthBg>
  );
}
