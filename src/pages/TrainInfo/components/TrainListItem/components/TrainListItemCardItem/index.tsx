import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system/";
import { useMemo } from "react";
import { Coach } from "types/coach";
import { getFareWithCurr } from "utils/fare";

interface TrainListItemCardProps {
  fare: number;
  coaches: Coach[];
  selectedCoachClass: string;
  onClick: (item: string) => void;
}

export default function TrainListItemCardItem({
  fare,
  selectedCoachClass,
  coaches,
  onClick,
}: TrainListItemCardProps) {
  const isExpanded = selectedCoachClass === coaches[0]?.class;
  const primaryColor = useTheme().palette.primary.main;

  const totalAvailableTickets = useMemo(() => {
    return coaches.reduce((acc, coach) => {
      return (acc += coach.available_seats);
    }, 0);
  }, [coaches[0]?.class]);

  const isActive = totalAvailableTickets > 0;
  const nonExpandedColor = isActive ? "#E2E8E7" : "#F1E8E8";
  const headerBgColor = isExpanded ? primaryColor : nonExpandedColor;

  const expandItem = () => {
    if (isExpanded) {
      onClick("");
      return;
    }

    onClick(coaches[0]?.class);
  };

  return (
    <Card
      sx={{
        width: "125px",
        borderRadius: "8px",
        height: "175px",
        border: isExpanded ? `2px solid ${primaryColor}` : "none",
      }}
      elevation={0}
    >
      <CardHeader
        sx={{
          bgcolor: headerBgColor,
        }}
        title={
          <>
            <Typography
              color={isExpanded ? "#fff" : "#000"}
              fontWeight="bold"
              variant="h6"
              fontSize="15px"
            >
              {coaches[0]?.class}
            </Typography>
            <Typography
              color={isExpanded ? "#fff" : "primary"}
              variant="h5"
              fontWeight="bold"
              fontSize="15px"
            >
              {getFareWithCurr(fare, coaches[0]?.fare)}
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
          {totalAvailableTickets ?? "..."}
        </Typography>

        {isActive && (
          <Button
            size="small"
            fullWidth
            sx={{ borderRadius: "15px", marginTop: "5px" }}
            variant="contained"
            onClick={expandItem}
          >
            Book now
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
