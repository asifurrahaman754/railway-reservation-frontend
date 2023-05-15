import { useState } from "react";
import TrainInfoHeaderDetails from "./TrainInfoHeaderDetails";
import TrainInfoHeaderForm from "./TrainInfoHeaderForm";

export default function TrainInfoHeader() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      {showForm ? (
        <TrainInfoHeaderForm setShowForm={setShowForm} />
      ) : (
        <TrainInfoHeaderDetails setShowForm={setShowForm} />
      )}
    </>
  );
}
