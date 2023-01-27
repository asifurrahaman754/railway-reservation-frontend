import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type Props = {
  children: React.ReactChild | React.ReactNode;
};

export default function AuthFormLayout({ children }: Props) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        maxWidth: "500px",
        backgroundColor: theme.palette.defaultBg.main,
        padding: "2rem 3rem",
        borderRadius: "5px",
      }}
    >
      <Box
        sx={{
          width: {
            xs: 60,
            sm: 100,
          },
        }}
      >
        <img width="100%" src="/assets/images/logo.png" alt="logo" />
      </Box>

      {children}
    </Box>
  );
}
