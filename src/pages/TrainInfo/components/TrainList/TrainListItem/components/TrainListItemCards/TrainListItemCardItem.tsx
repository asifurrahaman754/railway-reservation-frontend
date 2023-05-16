import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

export default function TrainListItemCardItem({ isActive }: any) {
  return (
    <Card sx={{ width: "125px", height: "175px" }} elevation={0}>
      <CardHeader
        sx={{
          bgcolor: isActive ? "#E2E8E7" : "#F1E8E8",
        }}
        title={
          <>
            <Typography fontWeight="bold" variant="h6" fontSize="15px">
              AC_S
            </Typography>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary"
              fontSize="15px"
            >
              906 tk
            </Typography>
          </>
        }
      />
      <CardContent
        sx={{
          bgcolor: isActive ? "#D2DDDB" : "#F1DDDD",
          height: "100%",
        }}
      >
        <Typography variant="h6" fontSize="12px">
          Available tickets
        </Typography>
        <Typography variant="h4" fontWeight="bold" fontSize="15px">
          10
        </Typography>

        {isActive && (
          <Button
            size="small"
            fullWidth
            sx={{ borderRadius: "15px", marginTop: "5px" }}
            variant="contained"
          >
            Book now
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
