import TextField from "@mui/material/TextField";

type Props = {
  type?: string;
  name: string;
  sx?: any;
};

export default function AuthFormField({
  type = "text",
  name,
  sx,
  ...props
}: Props) {
  return (
    <TextField
      {...props}
      fullWidth
      sx={{ ...sx }}
      id={name}
      type={type}
      name={name}
      label={`${name}`}
      variant="outlined"
    />
  );
}
