import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system/";
import { TrainListItemCardsProps } from ".";

interface TrainListItemCardProps extends TrainListItemCardsProps {
  isActive: boolean;
  id: number;
}

export default function TrainListItemCardItem({
  isActive,
  expandedItem,
  setExpandedItem,
  id,
}: TrainListItemCardProps) {
  const isExpanded = expandedItem?.id === id;
  const primaryColor = useTheme().palette.primary.main;
  const nonExpandedColor = isActive ? "#E2E8E7" : "#F1E8E8";
  const headerBgColor = isExpanded ? primaryColor : nonExpandedColor;

  const expandItem = () => {
    if (expandedItem?.id === id) {
      setExpandedItem(null);
      return;
    }

    setExpandedItem({ id });
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
              AC_S
            </Typography>
            <Typography
              color={isExpanded ? "#fff" : "primary"}
              variant="h5"
              fontWeight="bold"
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
            onClick={expandItem}
          >
            Book now
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
