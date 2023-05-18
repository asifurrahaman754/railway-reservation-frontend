import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TrainListItemCards from "./components/TrainListItemCards";
import TrainListItemHeader from "./components/TrainListItemHeader";

export default function TrainListItem() {
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

          <TrainListItemCards />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
