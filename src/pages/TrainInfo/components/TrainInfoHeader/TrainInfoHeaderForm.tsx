import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Form, Formik } from "formik";
import useSearchParams from "hooks/useSearchParams";
import { useGetAllCoachClassQuery } from "store/features/coachClass/coachClassApi";
import { formInitialValuesType } from "types/bookTicketFormType";
import * as Yup from "yup";

type TrainInfoHeaderDetailsProps = {
  setShowForm: (showForm: boolean) => void;
};

export default function TrainInfoHeaderForm({
  setShowForm,
}: TrainInfoHeaderDetailsProps) {
  const { data } = useGetAllCoachClassQuery();
  const today = new Date();
  const tenDaysFromToday = new Date();
  tenDaysFromToday.setDate(today.getDate() + 10);
  const { date, fromCity, toCity, seat } = useSearchParams();

  const formInitialValues: formInitialValuesType = {
    from: fromCity,
    to: toCity,
    journeyDate: date,
    seat: seat,
  };

  const submitHandler = async (
    values: formInitialValuesType,
    { setSubmitting }: any
  ) => {
    const { from, journeyDate, seat, to } = values;

    // set the query params in the url using new URLSearchParams()
    const params = new URLSearchParams();
    params.append("fromCity", from);
    params.append("toCity", to);
    params.append("date", journeyDate);
    params.append("seat", seat);

    // navigate(`${routes.booking}?${params.toString()}`);
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={Yup.object().shape({
        from: Yup.string().required("from destination is required!"),
        to: Yup.string().required("to destination is required!"),
        journeyDate: Yup.date()
          .max(
            tenDaysFromToday.toISOString().split("T")[0],
            "Date should be at least 10 days from today"
          )
          .min(
            today.toISOString().split("T")[0],
            "Date should be at least today"
          )
          .required("Date of Journey is required"),
        seat: Yup.string().required("Seat is required!"),
      })}
      onSubmit={submitHandler}
    >
      {({
        handleChange,
        handleBlur,
        values,
        isSubmitting,
        touched,
        errors,
        handleSubmit,
      }) => (
        <Box bgcolor="#ffffff" padding="2rem 0">
          <Container>
            <Form>
              <Grid
                container
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                spacing={3}
              >
                <Grid item md={2.5} xs={12}>
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.from}
                    name="from"
                    label="from"
                    variant="outlined"
                    disabled={isSubmitting}
                    size="small"
                    helperText={touched.from && errors.from}
                    error={touched.from && !!errors.from}
                  />
                </Grid>
                <Grid item md={2.5} xs={12}>
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.to}
                    name="to"
                    label="to"
                    variant="outlined"
                    disabled={isSubmitting}
                    size="small"
                    helperText={touched.to && errors.to}
                    error={touched.to && !!errors.to}
                  />
                </Grid>
                <Grid item md={2.5} xs={12}>
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.journeyDate}
                    name="journeyDate"
                    label="Date of Journey"
                    variant="outlined"
                    type="date"
                    disabled={isSubmitting}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: today.toISOString().split("T")[0],
                      max: tenDaysFromToday.toISOString().split("T")[0],
                    }}
                    helperText={touched.journeyDate && errors.journeyDate}
                    error={touched.journeyDate && !!errors.journeyDate}
                  />
                </Grid>
                <Grid item md={2.5} xs={12}>
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.seat}
                    name="seat"
                    label="Choose a Class"
                    variant="outlined"
                    disabled={isSubmitting}
                    size="small"
                    select
                    helperText={touched.seat && errors.seat}
                    error={touched.seat && !!errors.seat}
                  >
                    {data?.data.map((coachClass: CoachClass) => (
                      <MenuItem value={coachClass.name}>
                        {coachClass.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={2} xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { md: "column", xs: "row-reverse" },
                      justifyContent: "space-between",
                      gap: ".5rem",
                    }}
                  >
                    <Button
                      variant="text"
                      startIcon={<CloseIcon />}
                      onClick={() => setShowForm(false)}
                    >
                      Close
                    </Button>
                    <Button variant="contained">Search Train</Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          </Container>
        </Box>
      )}
    </Formik>
  );
}
