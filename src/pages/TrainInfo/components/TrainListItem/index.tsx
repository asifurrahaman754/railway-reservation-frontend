import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import SelectCoachContainer from "./components/SelectCoachContainer";
import CoachDetails from "./components/SelectCoachContainer/CoachDetails";
import TrainListItemCards from "./components/TrainListItemCards";
import TrainListItemHeader from "./components/TrainListItemHeader";
import { RouteSchedule } from "types/routeSchedule";

export type expandedItemType = {
  id: string | number;
};

export interface TrainListItemProps {
  schedule: RouteSchedule;
}

export default function TrainListItem({ schedule }: TrainListItemProps) {
  const [expandedItem, setExpandedItem] = useState<null | expandedItemType>(
    null
  );

  return (
    <>
      <Accordion
        sx={{
          borderRadius: "10px",
          boxShadow: "unset",
          "&.MuiAccordion-root::before": {
            height: "0px",
          },
          marginBottom: "1rem",
        }}
        defaultExpanded={true}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            textTransform="uppercase"
            fontWeight="bold"
            variant="h5"
            fontSize={{ xs: "1rem", sm: "1.2rem" }}
          >
            SONAR BANGLA EXPRESS (788)
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Divider />
          <TrainListItemHeader />
          <Divider />

          <TrainListItemCards
            setExpandedItem={setExpandedItem}
            expandedItem={expandedItem}
          />

          {expandedItem?.id && (
            <SelectCoachContainer>
              <CoachDetails>
                <Button
                  variant="text"
                  sx={{ display: "flex", marginLeft: "auto" }}
                  onClick={() => setExpandedItem(null)}
                >
                  Close
                </Button>
              </CoachDetails>
            </SelectCoachContainer>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
