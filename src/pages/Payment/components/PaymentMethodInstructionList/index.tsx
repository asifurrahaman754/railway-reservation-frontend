import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
} from "@mui/material";
import ExpandMoreIcon from "icons/ExpandMoreIcon";
import { memo } from "react";
import { getColor } from "utils/color";
import { paymentMethods } from "utils/payment";

function PaymentMethodInstructionList() {
  return (
    <>
      {paymentMethods?.map(({ instruction }) => {
        return instruction?.map(({ steps, lable }, i) => (
          <Accordion
            defaultExpanded={i === 0}
            disableGutters
            elevation={0}
            sx={{
              border: `1px solid ${getColor("grey200")}`,
            }}
          >
            <AccordionSummary
              sx={{
                backgroundColor: getColor("grey100"),
                borderBottom: `1px solid ${getColor("grey200")}`,
              }}
              expandIcon={<ExpandMoreIcon />}
            >
              {lable}
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {steps?.map((step, i) => (
                  <ListItem>
                    {i + 1}. {step}
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ));
      })}
    </>
  );
}

export default memo(PaymentMethodInstructionList);
