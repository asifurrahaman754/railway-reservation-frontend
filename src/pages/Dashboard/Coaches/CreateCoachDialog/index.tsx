import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import AuthTextField from "components/AuthTextField";
import Dialog from "components/Dialog";
import { Form, Formik, FormikHelpers } from "formik";
import { useRef } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-hot-toast";
import { useAddCoachMutation } from "store/features/coach/coachApi";
import { useGetAllCoachClassQuery } from "store/features/coachClass/coachClassApi";
import { coachClassType } from "types/tableRow";
import * as Yup from "yup";

const portal: any = document.getElementById("modal");

type CreateDialogProps = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialValue = {
  name: "",
  capacity: "",
  class: "",
  train: "",
};

export default function CreateCoachDialog({
  modalOpen,
  setModalOpen,
}: CreateDialogProps) {
  const [addCoach, { isLoading }] = useAddCoachMutation();
  const formRef = useRef<any>();
  const { data: coachClasses } = useGetAllCoachClassQuery();

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
      title="Coach"
      showLoader={isLoading}
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
          train: Yup.string().required("Please select a train"),
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
              placeholder="Enter coach name"
            />
            <AuthTextField
              sx={{ marginBottom: ".5rem" }}
              name="capacity"
              label=""
              type="number"
              {...formikProps}
              placeholder="Enter coach capacity"
            />
            <TextField
              sx={{ marginBottom: ".5rem" }}
              id="class"
              name="class"
              label="Select coach class"
              select
              fullWidth
              disabled={formikProps.isSubmitting}
              value={formikProps.values.class}
              onChange={formikProps.handleChange}
              error={formikProps.touched.class && !!formikProps.errors.class}
              helperText={formikProps.touched.class && formikProps.errors.class}
            >
              {coachClasses.data?.map((coachClass: coachClassType) => (
                <MenuItem key={coachClass.id} value={coachClass.id}>
                  {coachClass.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="train"
              name="train"
              label="Select coach train"
              select
              fullWidth
              disabled={formikProps.isSubmitting}
              value={formikProps.values.train}
              onChange={formikProps.handleChange}
              error={formikProps.touched.train && !!formikProps.errors.train}
              helperText={formikProps.touched.train && formikProps.errors.train}
            >
              <MenuItem value={1}>First train</MenuItem>
              <MenuItem value={2}>Second train</MenuItem>
            </TextField>
          </Form>
        )}
      </Formik>
    </Dialog>,
    portal
  );
}
