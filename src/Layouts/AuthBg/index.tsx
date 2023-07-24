import { styled } from "@mui/material/styles";

const AuthBgWrapper = styled("div")(({ theme, isCenter }) => ({
  width: "100%",
  minHeight: "100vh",
  display: "grid",
  placeItems: isCenter ? "center" : "start",
  background:
    "url('/assets/images/train-bg.svg') no-repeat fixed right bottom / 50%",
  backgroundColor: theme.palette.AuthbodyBg.main,
  [theme.breakpoints.down("sm")]: {
    backgroundSize: "100%",
  },
  ...(theme.palette.AuthbodyBg as any),
}));

type Props = {
  children: React.ReactNode;
  isCenter?: boolean;
};

export default function AuthBg({ children, isCenter = true }: Props) {
  return <AuthBgWrapper isCenter={isCenter}>{children}</AuthBgWrapper>;
}
