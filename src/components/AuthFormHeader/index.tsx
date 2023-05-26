import Typography from "@mui/material/Typography";

type Props = {
  title: string;
};

export default function AuthFormHeader({ title }: Props) {
  return (
    <Typography
      variant="h4"
      textAlign="center"
      fontWeight="700"
      margin="1rem 0 2rem 0"
    >
      {title}
    </Typography>
  );
}
