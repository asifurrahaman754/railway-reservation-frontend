import { MenuItem, TextField } from "@mui/material";
import CustomDialog from "components/CustomDialog";
import { Form, Formik } from "formik";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAddCoachMutation } from "store/features/coach/coachApi";
import { useGetSingleCoachClassFareQuery } from "store/features/coachClassFare/coachClassFareApi";
import * as Yup from "yup";

interface TrainDetailsCoachAddProps {
  onClose: () => void;
}

const initialValue = {
  name: "",
  capacity: "",
  class: "",
};

export default function TrainDetailsCoachAdd({
  onClose,
}: TrainDetailsCoachAddProps) {
  const [addCoach, { isLoading }] = useAddCoachMutation();
  const { trainId } = useParams();
  const formRef = useRef<any>();
  const { data: coachClassFare } = useGetSingleCoachClassFareQuery(trainId);

  const handleSubmit = async (
    values: typeof initialValue,
    { setSubmitting }: FormikHelpers<typeof initialValue>
  ) => {
    const coachFare = coachClassFare?.data?.find(
      (coach: any) => coach.class_id === values.class
    );

    try {
      const { data }: any = await addCoach({ ...values, train: trainId, fare: coachFare?.fare });
      setSubmitting(false);
      if (data.success) {
        onClose();
        toast.success("Coach added successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setSubmitting(false);
      toast.error("Coach add failed!");
    }
  };

  const handleSave = () => {
    formRef.current?.handleSubmit();
  };
  return (
    <CustomDialog
      open={true}
      onClose={onClose}
      title="Add Coach"
      onSave={handleSave}
      isActionable
      isDisabled={isLoading}
    >
      <Formik
        innerRef={formRef}
        initialValues={initialValue}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required("Name is required")
            .max(5, "Name can't be greater than 5 characters"),
          capacity: Yup.number()
            .required("Capacity is required")
            .min(10, "Capacity should be greater than 10")
            .max(40, "Capacity should be less than 40"),
          class: Yup.string().required("Please select a class"),
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
              fullWidth
              sx={{ marginBottom: ".5rem" }}
              onChange={handleChange}
              onBlur={handleBlur}
              name={"name"}
              placeholder="Enter coach name"
              value={values.name}
              disabled={isSubmitting}
              helperText={touched.name && errors.name}
              error={touched.name && !!errors.name}
            />
            <TextField
              fullWidth
              sx={{ marginBottom: ".5rem" }}
              onChange={handleChange}
              onBlur={handleBlur}
              name={"capacity"}
              type="number"
              placeholder="Enter coach capacity"
              value={values.capacity}
              disabled={isSubmitting}
              helperText={touched.capacity && errors.capacity}
              error={touched.capacity && !!errors.capacity}
            />
            <TextField
              sx={{ marginBottom: ".5rem" }}
              id="class"
              name="class"
              label="Select coach class"
              select
              fullWidth
              disabled={isSubmitting}
              value={values.class}
              onChange={handleChange}
              error={touched.class && !!errors.class}
              helperText={touched.class && errors.class}
            >
              {coachClassFare?.data?.map((coachClass: any) => (
                <MenuItem key={coachClass.id} value={coachClass.class_id}>
                  {coachClass.className}
                </MenuItem>
              ))}
            </TextField>
          </Form>
        )}
      </Formik>
    </CustomDialog>
  );
}
