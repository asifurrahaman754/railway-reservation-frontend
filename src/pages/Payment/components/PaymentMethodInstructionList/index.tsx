import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
} from "@mui/material";
import ExpandMoreIcon from "icons/ExpandMoreIcon";
import { memo } from "react";
import { paymentMethods } from "utils/payment";

function PaymentMethodInstructionList() {
  return (
    <>
      {paymentMethods?.map(({ instruction }) => {
        return instruction?.map(({ steps, lable }) => (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
