import TextField from "@mui/material/TextField";

type Props = {
  type?: string;
  name: string;
  sx?: any;
  onChange?: () => void;
  value: any;
};

export default function AuthFormField({
  type = "text",
  name,
  sx,
  onChange,
  value,
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