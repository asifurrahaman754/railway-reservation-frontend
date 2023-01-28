import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

type Props = {
  title: string;
};

export default function AuthFormHeader({ title }: Props) {
  const theme = useTheme();

  return (
    <Typography
      variant="h4"
      textAlign="center"
      fontWeight={theme.typography.bold}
      margin="1rem 0 2rem 0"
    >
      {title}
    </Typography>
  );
}
