import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AuthBg from "Layouts/AuthBg";
import AdminTableHead from "components/AdminTableHead";
import AdminTableToolbar from "components/AdminTableToolbar";
import DashboardGoBack from "components/DashboardGoBack";
import SuspenseLoader from "components/SuspenseLoader";
import TableHeadCell from "config/TableHeadCell";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  useDeleteCoachClassMutation,
  useGetAllCoachClassQuery,
} from "store/features/coachClass/coachClassApi";
import { routeType } from "types/tableRow";
import CreateCoachClassDialog from "./CreateCoachClassDialog";

export default function CoachClasses() {
  const { data: coachClass, isError, isLoading } = useGetAllCoachClassQuery();
  const [deleteRoute] = useDeleteCoachClassMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Partial<routeType>[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = coachClass?.data?.map((coachClass: routeType) => ({
        id: coachClass.id,
      }));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (coachClass: routeType) => {
    const { id } = coachClass;
    const selectedRoute = selected.find((u) => u.id === id);

    if (!selectedRoute) {
      setSelected([...selected, { id }]);
    } else {
      const newSelected = selected.filter((u) => u.id !== id);
      setSelected(newSelected);
    }
  };

  const deleteCoachClass = async () => {
    const isConfirmed = confirm(
      "Are you sure you want to delete this coach class?"
    );
    if (isConfirmed) {
      const deleteRoutePromises = selected.map((coachClass) =>
        deleteRoute(coachClass.id)
      );

      try {
        const result: any = await Promise.all(deleteRoutePromises);
        if (result[0]?.data?.success) {
          toast.success("Coach class deleted successfully!");
          setSelected([]);
        }
      } catch (error) {
        toast.error("Error deleting coach class!");
      }
    }
  };

  return (
    <AuthBg>
      <Box
        sx={{
          maxWidth: "1200px",
          width: "100%",
          paddingX: "1rem",
          overflowX: "auto",
        }}
      >
        <DashboardGoBack />
        <Paper sx={{ width: "100%", mb: 2 }}>
          <AdminTableToolbar<(typeof selected)[0]>
            selected={selected}
            title="Coach Classes"
            children2={
              <Tooltip title="add coach class">
                <IconButton onClick={() => setModalOpen(true)}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            }
          >
            <Tooltip title="delete coach class">
              <IconButton onClick={deleteCoachClass}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </AdminTableToolbar>

          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <AdminTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={coachClass?.data.length}
                cells={TableHeadCell.coachClasses}
              />
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={10}>
                      <SuspenseLoader
                        sx={{ color: "#000", width: "15px", height: "15px" }}
                      />
                    </TableCell>
                  </TableRow>
                )}

                {/*TODO: need to use error from api */}
                {isError && (
                  <TableRow>
                    <TableCell colSpan={10}>
                      <Typography variant="body2" align="center">
                        Failed to load data
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}

                {coachClass?.data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10}>
                      <Typography variant="body2" align="center">
                        No coach class found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}

                {coachClass?.data.map((coachClass: routeType) => {
                  const isItemSelected = selected.some(
                    (u) => u.id == coachClass.id
                  );
                  const labelId = `enhanced-table-checkbox-${coachClass.id}`;

                  return (
                    <TableRow
                      key={coachClass.id}
                      hover
                      onClick={() => handleClick(coachClass)}
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
                        {coachClass.id}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                      >
                        {coachClass.name}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <CreateCoachClassDialog
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </AuthBg>
  );
}
