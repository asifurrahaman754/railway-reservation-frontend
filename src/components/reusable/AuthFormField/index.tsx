import TextField from "@mui/material/TextField";

type Props = {
  type?: string;
  name: string;
  sx?: any;
  onChange?: () => void;
};

export default function AuthFormField({
  type = "text",
  name,
  sx,
  onChange,
  ...props
}: Props) {
  return (
    <TextField
      {...props}
      fullWidth
      sx={{ ...sx }}
      id={name}
      onChange={onChange && onChange}
      type={type}
      name={name}
      label={`${name}`}
      variant="outlined"
    />
  );
}
