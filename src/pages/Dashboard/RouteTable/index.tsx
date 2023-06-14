import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AuthBg from "Layouts/AuthBg";
import AdminTableHead from "components/AdminTableHead";
import AdminTableToolbar from "components/AdminTableToolbar";
import SuspenseLoader from "components/SuspenseLoader";
import TableHeadCell from "config/TableHeadCell";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import routes from "routes/index";
import {
  useDeleteRouteMutation,
  useGetAllRouteQuery,
} from "store/features/route/routeApi";
import { routeType } from "types/tableRow";
import CreateRouteDialog from "./CreateRouteDialog";

export default function RouteTable() {
  const { data: route, isError, isLoading } = useGetAllRouteQuery();
  const [deleteRoute] = useDeleteRouteMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Partial<routeType>[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = route?.data?.map((route: routeType) => ({
        id: route.id,
      }));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (route: routeType) => {
    const { id } = route;
    const selectedRoute = selected.find((u) => u.id === id);

    if (!selectedRoute) {
      setSelected([...selected, { id }]);
    } else {
      const newSelected = selected.filter((u) => u.id !== id);
      setSelected(newSelected);
    }
  };

  const deleteRoutes = async () => {
    const isConfirmed = confirm("Are you sure you want to delete this Route?");
    if (isConfirmed) {
      const deleteRoutePromises = selected.map((route) =>
        deleteRoute(route.id)
      );

      try {
        const result: any = await Promise.all(deleteRoutePromises);
        if (result[0]?.data?.success) {
          toast.success("Route deleted successfully!");
          setSelected([]);
        }
      } catch (error) {
        toast.error("Error deleting route!");
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
        <Link to={routes.admin.dashboard}>
          <Tooltip title="Back to dashboard">
            <IconButton
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#f3f3f3",
                marginBottom: "1rem",
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          </Tooltip>
        </Link>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <AdminTableToolbar<(typeof selected)[0]>
            selected={selected}
            title="Routes"
            children2={
              <Tooltip title="add route">
                <IconButton onClick={() => setModalOpen(true)}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            }
          >
            <Tooltip title="delete route">
              <IconButton onClick={deleteRoutes}>
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
                rowCount={route?.data.length}
                cells={TableHeadCell.route}
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

                {route?.data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10}>
                      <Typography variant="body2" align="center">
                        No route found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}

                {route?.data.map((route: routeType) => {
                  const isItemSelected = selected.some((u) => u.id == route.id);
                  const labelId = `enhanced-table-checkbox-${route.id}`;

                  return (
                    <TableRow
                      key={route.id}
                      hover
                      onClick={() => handleClick(route)}
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
                        {route.id}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                      >
                        {route.name}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={0}
            rowsPerPage={0}
            page={0}
            onPageChange={() => {}}
          />
        </Paper>
      </Box>

      <CreateRouteDialog modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </AuthBg>
  );
}
