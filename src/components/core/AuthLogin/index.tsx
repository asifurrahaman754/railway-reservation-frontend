import { Typography, useTheme } from "@mui/material";

export default function AuthLogin() {
  const theme = useTheme();
  return (
    <>
      <Typography
        variant="h5"
        textAlign="center"
        fontWeight={theme.typography.bold}
        marginY="1rem"
      >
        Login
      </Typography>
    </>
  );
}
