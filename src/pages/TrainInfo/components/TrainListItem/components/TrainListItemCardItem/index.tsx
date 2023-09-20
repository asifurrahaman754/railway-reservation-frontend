import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system/";
import { useEffect } from "react";
import { useGetTotalAvailableTicketsMutation } from "store/features/trainSearch/trainSearchApi";
import { CoachClassFare } from "types/coachClassFare";

interface TrainListItemCardProps {
  coachClassFare: CoachClassFare;
  fare: number;
  trainId: string;
  expandedItem: number | null;
  setExpandedItem: (item: number | null) => void;
}

export default function TrainListItemCardItem({
  coachClassFare,
  fare,
  trainId,
  expandedItem,
  setExpandedItem,
}: TrainListItemCardProps) {
  const [getTotalAvailableTickets, { data: totalTickets, isLoading }] =
    useGetTotalAvailableTicketsMutation();
  const isExpanded = expandedItem === coachClassFare?.id;
  const primaryColor = useTheme().palette.primary.main;

  const isActive = isLoading || totalTickets;
  const nonExpandedColor = isActive ? "#E2E8E7" : "#F1E8E8";
  const headerBgColor = isExpanded ? primaryColor : nonExpandedColor;
  const fareWithCoach = fare + coachClassFare?.fare;

  const expandItem = () => {
    if (isExpanded) {
      setExpandedItem(null);
      return;
    }

    setExpandedItem(coachClassFare?.id);
  };

  useEffect(() => {
    getTotalAvailableTickets({
      trainId,
      class_id: coachClassFare?.class_id,
    });
  }, [trainId, coachClassFare?.class_id]);

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
              {coachClassFare.className}
            </Typography>
            <Typography
              color={isExpanded ? "#fff" : "primary"}
              variant="h5"
              fontWeight="bold"
              fontSize="15px"
            >
              {fareWithCoach} tk
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
          {totalTickets?.data ?? "..."}
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
