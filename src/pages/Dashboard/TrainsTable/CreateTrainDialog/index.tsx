import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import AuthTextField from "components/AuthTextField";
import Dialog from "components/Dialog";
import weekMap from "data/week";
import { Form, Formik, FormikHelpers } from "formik";
import { useRef } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-hot-toast";
import { useAddTrainMutation } from "store/features/train/trainApi";
import { trainType } from "types/tableRow";
import * as Yup from "yup";

const portal: any = document.getElementById("modal");

type CreateDialogProps = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialValue: trainType = {
  name: "",
  type: "",
  fare_per_km: 0,
  holiday: "",
};

export default function CreateTrainDialog({
  modalOpen,
  setModalOpen,
}: CreateDialogProps) {
  const [addCoach, { isLoading }] = useAddTrainMutation();
  const formRef = useRef<any>();

  const handleSubmit = async (
    values: typeof initialValue,
    { setSubmitting }: FormikHelpers<typeof initialValue>
  ) => {
    try {
      const { data }: any = await addCoach(values);
      setSubmitting(false);
      if (data.success) {
        setModalOpen(false);
        toast.success("Coach added successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setSubmitting(false);
      toast.error("Something went wrong");
    }
  };

  return ReactDOM.createPortal(
    <Dialog
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onAdd={() => {
        if (formRef.current) {
          formRef.current.handleSubmit();
        }
      }}
      title="Train"
      showLoader={isLoading}
    >
      <Formik
        innerRef={formRef}
        initialValues={initialValue}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required("Name is required")
            .max(40, "Name can't be greater than 40 characters"),
          type: Yup.string().required("type is required"),
          fare_per_km: Yup.number().min(1, "fare per km cannot be 0"),
          holiday: Yup.string().required("holiday is required"),
        })}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form>
            <AuthTextField
              sx={{ marginBottom: ".5rem" }}
              name="name"
              label=""
              {...formikProps}
              placeholder="Enter train name"
            />
            <TextField
              sx={{ marginBottom: ".5rem" }}
              id="type"
              name="type"
              label="Select train type"
              select
              fullWidth
              disabled={formikProps.isSubmitting}
              value={formikProps.values.type}
              onChange={formikProps.handleChange}
              error={formikProps.touched.type && !!formikProps.errors.type}
              helperText={formikProps.touched.type && formikProps.errors.type}
            >
              <MenuItem value="express">Express</MenuItem>
              <MenuItem value="Local">Local</MenuItem>
            </TextField>
            <AuthTextField
              sx={{ marginBottom: ".5rem" }}
              name="fare_per_km"
              label="fare per km (Tk)"
              type="number"
              {...formikProps}
              placeholder=""
            />
            <TextField
              sx={{ marginBottom: ".5rem" }}
              id="holiday"
              name="holiday"
              label="Select train holiday"
              select
              fullWidth
              disabled={formikProps.isSubmitting}
              value={formikProps.values.holiday}
              onChange={formikProps.handleChange}
              error={
                formikProps.touched.holiday && !!formikProps.errors.holiday
              }
              helperText={
                formikProps.touched.holiday && formikProps.errors.holiday
              }
            >
              {Object.keys(weekMap).map((week) => (
                <MenuItem key={week} value={week}>
                  {weekMap[week]}
                </MenuItem>
              ))}
            </TextField>
          </Form>
        )}
      </Formik>
    </Dialog>,
    portal
  );
}
