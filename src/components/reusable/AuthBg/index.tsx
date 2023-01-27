import { styled } from "@mui/material/styles";

const AuthBgWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  background:
    "url('/assets/images/train-bg.svg') no-repeat fixed right bottom / 50%",
  backgroundColor: theme.palette.AuthbodyBg.main,
  [theme.breakpoints.down("sm")]: {
    backgroundSize: "100%",
  },
  ...(theme.palette.AuthbodyBg as any),
}));

type Props = {
  children: React.ReactChild | React.ReactNode;
};

export default function AuthBg({ children }: Props) {
  return <AuthBgWrapper>{children}</AuthBgWrapper>;
}
