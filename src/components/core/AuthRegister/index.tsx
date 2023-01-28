import AuthFormField from "components/reusable/AuthFormField";
import AuthFormHeader from "components/reusable/AuthFormHeader";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

export default function AuthRegister() {
  return (
    <>
      <AuthFormHeader title="Register" />
      <form>
        <Grid container spacing={2} marginBottom="1rem">
          <Grid item xs={12} sm={6}>
            <AuthFormField name="Full Name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AuthFormField type="email" name="Email" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AuthFormField type="tel" name="Mobile" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AuthFormField type="number" name="Post Code" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AuthFormField type="password" name="Password" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AuthFormField type="number" name="NID/Birth registration number" />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained">
          SIGN UP
        </Button>
      </form>
    </>
  );
}
