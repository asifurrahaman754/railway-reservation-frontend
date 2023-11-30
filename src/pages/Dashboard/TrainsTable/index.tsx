import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
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
import weekMap from "data/week";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import routes from "routes/index";
import {
  useDeleteTrainMutation,
  useGetAllTrainQuery,
} from "store/features/train/trainApi";
import { routeType, trainType } from "types/tableRow";
import TableDataLoadingError from "../TableDataLoadingError";
import CreateTrainDialog from "./CreateTrainDialog";

export default function TrainTable() {
  const { data: train, isError, isLoading } = useGetAllTrainQuery();
  const [deleteTrain] = useDeleteTrainMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Partial<trainType>[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = train?.data?.map((train: routeType) => ({
        id: train.id,
      }));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (train: trainType) => {
    const { id } = train;
    const selectedRoute = selected.find((u) => u.id === id);

    if (!selectedRoute) {
      setSelected([...selected, { id }]);
    } else {
      const newSelected = selected.filter((u) => u.id !== id);
      setSelected(newSelected);
    }
  };

  const deleteRow = async () => {
    const isConfirmed = confirm("Are you sure you want to delete these train?");
    if (isConfirmed) {
      const deletePromises = selected.map((train) => deleteTrain(train.id));

      try {
        const result: any = await Promise.all(deletePromises);
        if (result[0]?.data?.success) {
          toast.success("train deleted successfully!");
          setSelected([]);
        }
      } catch (error) {
        toast.error("Error deleting train!");
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
              rowCount={0}
              cells={TableHeadCell.train}
            />
            <TableBody>
              <TableDataLoadingError
                isError={isError}
                isLoading={isLoading}
                data={train?.data}
              />

              {train?.data.map((train: trainType) => {
                const isItemSelected = selected.some((u) => u.id == train.id);
                const labelId = `enhanced-table-checkbox-${train.id}`;

                return (
                  <TableRow
                    key={train.id}
                    hover
                    onClick={() => handleClick(train)}
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
                      {train.id}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {train.name}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {train.type}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {train.fare_per_km} Tk
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {weekMap[`${train.holiday}`]}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      <Link
                        to={routes.admin.train_details.pathWithId(
                          train.id as string
                        )}
                      >
                        <Button variant="outlined">details</Button>
                      </Link>
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
