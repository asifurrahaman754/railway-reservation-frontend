import TextField from "@mui/material/TextField";

type AuthTextFieldProps = {
  type?: string;
  name: string;
  label: string;
  sx?: any;
  handleChange?: (e: any) => void;
  handleBlur?: (e: any) => void;
  isSubmitting?: boolean;
  values?: any;
  touched?: any;
  errors?: any;
};

export default function AuthTextField({
  type = "text",
  name,
  label,
  sx,
  ...propsFormik
}: AuthTextFieldProps) {
  const { handleChange, handleBlur, values, isSubmitting, touched, errors } =
    propsFormik;

  return (
    <TextField
      fullWidth
      sx={{ ...sx }}
      onChange={handleChange}
      onBlur={handleBlur}
      type={type}
      name={name}
      label={label}
      value={values[name]}
      variant="outlined"
      disabled={isSubmitting}
      helperText={touched[name] && errors[name]}
      error={touched[name] && !!errors[name]}
    />
  );
}
