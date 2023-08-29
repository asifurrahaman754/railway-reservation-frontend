import { MenuItem, TextField } from "@mui/material";
import CustomDialog from "components/CustomDialog";
import { Form, Formik, FormikHelpers } from "formik";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAddRouteScheduleMutation } from "store/features/routeSchedule/routeScheduleApi";
import { useGetAllRouteQuery } from "store/features/route/routeApi";
import * as Yup from "yup";
import { Route } from "types/route";

interface TrainDetailsRoutesAddProps {
  onClose: () => void;
}

const initialValue = {
  from_route: "",
  to_route: "",
  departure: "",
  arrival: "",
  distance: "",
};

export default function TrainDetailsRoutesAdd({
  onClose,
}: TrainDetailsRoutesAddProps) {
  const [addRouteSchedule, { isLoading }] = useAddRouteScheduleMutation();
  const { data: routes, isLoading: isRoutesLoading } = useGetAllRouteQuery();
  const { trainId } = useParams();
  const formRef = useRef<any>();

  const handleSubmit = async (
    values: typeof initialValue,
    { setSubmitting, setFieldError }: FormikHelpers<typeof initialValue>
  ) => {
    if (values.from_route === values.to_route) {
      setFieldError("from_route", "From route and to route cannot be same!");
      return;
    }

    try {
      const { data }: any = await addRouteSchedule({
        ...values,
        train_id: trainId,
      });
      setSubmitting(false);
      if (data.success) {
        onClose();
        toast.success("Route added successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setSubmitting(false);
      toast.error("Route add failed!");
    }
  };

  const handleSave = () => {
    formRef.current?.handleSubmit();
  };

  return (
    <CustomDialog
      open={true}
      onClose={onClose}
      title="Add Train Routes"
      onSave={handleSave}
      isActionable
      isDisabled={isLoading || isRoutesLoading}
      maxWidth="xs"
    >
      <Formik
        innerRef={formRef}
        initialValues={initialValue}
        validationSchema={Yup.object().shape({
          from_route: Yup.string().required("from route is required!"),
          to_route: Yup.string().required("to route is required!"),
          departure: Yup.string().required("departure time is required!"),
          arrival: Yup.string().required("arrival time is required!"),
          distance: Yup.number().required("distance is required!"),
        })}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          values,
          isSubmitting,
          touched,
          errors,
        }) => (
          <Form>
            <TextField
              margin="dense"
              id="from_route"
              name="from_route"
              label="Select from route"
              select
              fullWidth
              disabled={isSubmitting}
              value={values.from_route}
              onChange={handleChange}
              error={touched.from_route && !!errors.from_route}
              helperText={touched.from_route && errors.from_route}
            >
              {routes?.data?.map((route: Route) => (
                <MenuItem key={route.id} value={route.id}>
                  {route.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              id="to_route"
              name="to_route"
              label="Select to route"
              select
              fullWidth
              disabled={isSubmitting}
              value={values.to_route}
              onChange={handleChange}
              error={touched.to_route && !!errors.to_route}
              helperText={touched.to_route && errors.to_route}
            >
              {routes?.data?.map((route: Route) => (
                <MenuItem key={route.id} value={route.id}>
                  {route.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              margin="dense"
              onChange={handleChange}
              onBlur={handleBlur}
              name={"departure"}
              type="time"
              placeholder="Enter departure time"
              value={values.departure}
              disabled={isSubmitting}
              helperText={touched.departure && errors.departure}
              error={touched.departure && !!errors.departure}
            />
            <TextField
              fullWidth
              margin="dense"
              onChange={handleChange}
              onBlur={handleBlur}
              name={"arrival"}
              type="time"
              placeholder="Enter arrival time"
              value={values.arrival}
              disabled={isSubmitting}
              helperText={touched.arrival && errors.arrival}
              error={touched.arrival && !!errors.arrival}
            />
            <TextField
              fullWidth
              margin="dense"
              onChange={handleChange}
              onBlur={handleBlur}
              name={"distance"}
              type="number"
              placeholder="Enter route distance in km"
              value={values.distance}
              disabled={isSubmitting}
              helperText={touched.distance && errors.distance}
              error={touched.distance && !!errors.distance}
            />
          </Form>
        )}
      </Formik>
    </CustomDialog>
  );
}
