import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import AdminTableCard from "components/AdminTableCard";
import AdminTableHead from "components/AdminTableHead";
import AdminTableToolbar from "components/AdminTableToolbar";
import TableHeadCell from "config/TableHeadCell";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  useDeleteCoachMutation,
  useGetAllCoachQuery,
} from "store/features/coach/coachApi";
import { coachType, routeType } from "types/tableRow";
import TableDataLoadingError from "../TableDataLoadingError";
import CreateTrainDialog from "./CreateTrainDialog";

export default function TrainTable() {
  const { data: coach, isError, isLoading } = useGetAllCoachQuery();
  const [deleteCoach] = useDeleteCoachMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Partial<routeType>[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = coach?.data?.map((coach: routeType) => ({
        id: coach.id,
      }));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (coach: routeType) => {
    const { id } = coach;
    const selectedRoute = selected.find((u) => u.id === id);

    if (!selectedRoute) {
      setSelected([...selected, { id }]);
    } else {
      const newSelected = selected.filter((u) => u.id !== id);
      setSelected(newSelected);
    }
  };

  const deleteRow = async () => {
    const isConfirmed = confirm("Are you sure you want to delete this coach?");
    if (isConfirmed) {
      const deletePromises = selected.map((coach) => deleteCoach(coach.id));

      try {
        const result: any = await Promise.all(deletePromises);
        if (result[0]?.data?.success) {
          toast.success("Coach deleted successfully!");
          setSelected([]);
        }
      } catch (error) {
        toast.error("Error deleting Coach!");
      }
    }
  };

  return (
    <>
      <AdminTableCard>
        <AdminTableToolbar<(typeof selected)[0]>
          selected={selected}
          title="Train"
          children2={
            <Tooltip title="add new train">
              <IconButton onClick={() => setModalOpen(true)}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          }
        >
          <Tooltip title="delete train">
            <IconButton onClick={deleteRow}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </AdminTableToolbar>

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="train table"
            size="medium"
          >
            <AdminTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={coach?.data.length}
              cells={TableHeadCell.coach}
            />
            <TableBody>
              <TableDataLoadingError
                isError={isError}
                isLoading={isLoading}
                data={coach?.data}
              />

              {coach?.data.map((coach: coachType) => {
                const isItemSelected = selected.some((u) => u.id == coach.id);
                const labelId = `enhanced-table-checkbox-${coach.id}`;

                return (
                  <TableRow
                    key={coach.id}
                    hover
                    onClick={() => handleClick(coach)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isItemSelected} />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {coach.id}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {coach.name}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {coach.capacity}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {coach.class_id}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {coach.train_id}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </AdminTableCard>

      <CreateTrainDialog modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}
