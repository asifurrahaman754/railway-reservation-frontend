import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import districts from "data/district";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import routes from "routes/index";
import { useGetAllCoachClassQuery } from "store/features/coachClass/coachClassApi";
import { formInitialValuesType } from "types/bookTicketFormType";
import { CoachClass } from "types/coachClass";
import * as Yup from "yup";

const formInitialValues: formInitialValuesType = {
  from: "",
  to: "",
  journeyDate: "",
  seat: "",
};

export default function HomeTicketSearchForm() {
  const { data } = useGetAllCoachClassQuery();
  const navigate = useNavigate();
  const today = new Date();
  const tenDaysFromToday = new Date();
  tenDaysFromToday.setDate(today.getDate() + 10);

  const submitHandler = async (
    values: formInitialValuesType,
    { setSubmitting, setErrors }: any
  ) => {
    const { from, journeyDate, seat, to } = values;

    if (from === to) {
      setErrors({ to: "From and To can't be same!" });
      setSubmitting(false);
      return;
    }

    // set the query params in the url using new URLSearchParams()
    const params = new URLSearchParams();
    params.append("fromCity", from);
    params.append("toCity", to);
    params.append("date", journeyDate);
    params.append("seat", seat);

    navigate(`${routes.booking}?${params.toString()}`);
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={Yup.object().shape({
        from: Yup.string()
          .required("from destination is required!")
          .oneOf(districts, "Invalid District"),
        to: Yup.string()
          .required("to destination is required!")
          .oneOf(districts, "Invalid District"),
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
        <Box
          sx={{
            width: { sm: "600px" },
            margin: "50px auto",
            padding: "0 20px",
          }}
        >
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
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
            </Grid>

            <Button
              type="submit"
              size="large"
              fullWidth
              variant="contained"
              sx={{ marginTop: "1.5rem" }}
            >
              Submit
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
}
