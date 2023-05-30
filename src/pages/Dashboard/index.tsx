import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AuthBg from "Layouts/AuthBg";

const CustomButton = ({ children }: { children: string }) => {
  return (
    <Button
      fullWidth
      sx={{
        textAlign: "center",
        padding: "15px",
        bgcolor: "#003866",
        color: "#fff",
        "&:hover": {
          bgcolor: "#003866",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default function Dashboard() {
  return (
    <AuthBg>
      <Container>
        <Box maxWidth="500px" margin="auto">
          <Grid
            container
            rowSpacing={{ xs: 2, sm: 3, md: 4 }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item sm={6} xs={12}>
              <CustomButton>Users</CustomButton>
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomButton>Train list</CustomButton>
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomButton>Bookings</CustomButton>
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomButton>Admins</CustomButton>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </AuthBg>
  );
}
