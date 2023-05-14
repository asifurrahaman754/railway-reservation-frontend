import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system/";
import { IMG_PATH } from "config/img_path";
import { useLocation } from "react-router-dom";

export default function TrainInfoHeader() {
  const primaryColor = useTheme().palette.primary.main;
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const fromCity = params.get("fromCity");
  const toCity = params.get("toCity");
  const date = new Date(params.get("date"));
  const formattedDate = date
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(/(\d+)(st|nd|rd|th)/, "$1"); // remove ordinal suffix from day

  return (
    <Box bgcolor="#ECECEC" padding="3rem 0">
      <Container>
        <Grid
          container
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          <Grid item md={4} xs={12}>
            <Box display="flex" alignItems="center">
              <img
                src={`${IMG_PATH}/running-train-icon.svg`}
                alt="running train icon"
              />
              <Box marginLeft="1rem">
                <Box display="flex" alignItems="center" color={primaryColor}>
                  <Typography variant="h6">{fromCity} </Typography>
                  <Typography variant="h6"> - </Typography>
                  <Typography variant="h6">{toCity}</Typography>
                </Box>
                <Typography variant="body1" fontWeight="500">
                  {formattedDate}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item md={4} xs={12} textAlign="center">
            <ButtonGroup
              disableElevation
              variant="outlined"
              aria-label="Disabled elevation buttons"
              sx={{ bgcolor: "#fff" }}
              size="large"
            >
              <Button startIcon={<NavigateBeforeIcon />}>Prev day</Button>
              <Button endIcon={<NavigateNextIcon />}>Next day</Button>
            </ButtonGroup>
          </Grid>
          <Grid item md={4} xs={12}>
            <Button
              variant="contained"
              size="large"
              sx={{
                display: "flex",
                margin: { md: "0 0 0 auto", xs: "0 auto" },
              }}
            >
              Modify search
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
