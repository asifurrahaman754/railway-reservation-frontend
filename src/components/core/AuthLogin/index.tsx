import Button from "@mui/material/Button";
import AuthFormField from "components/reusable/AuthFormField";
import AuthFormHeader from "components/reusable/AuthFormHeader";

export default function AuthLogin() {
  return (
    <>
      <AuthFormHeader title="Login" />

      <form>
        <AuthFormField type="tel" name="Mobile" sx={{ marginBottom: "1rem" }} />
        <AuthFormField
          type="password"
          name="Password"
          sx={{ marginBottom: "1rem" }}
        />

        <Button type="submit" fullWidth variant="contained">
          Submit
        </Button>
      </form>
    </>
  );
}
