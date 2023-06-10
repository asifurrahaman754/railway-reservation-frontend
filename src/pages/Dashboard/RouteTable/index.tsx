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
import AuthBg from "Layouts/AuthBg";
import AdminTableHead from "components/AdminTableHead";
import AdminTableToolbar from "components/AdminTableToolbar";
import TableHeadCell from "config/TableHeadCell";
import { useState } from "react";
import { Link } from "react-router-dom";
import routes from "routes/index";
import { routeType } from "types/tableRow";

export default function RouteTable() {
  const [selected, setSelected] = useState<Partial<routeType>[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = [].map((user: routeType) => ({
        id: user.id,
      }));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (route: routeType) => {
    const { id } = route;
    const selectedUser = selected.find((u) => u.id === id);

    if (!selectedUser) {
      setSelected([...selected, { id }]);
    } else {
      const newSelected = selected.filter((u) => u.id !== id);
      setSelected(newSelected);
    }
  };

  const deleteRoutes = async () => {
    const isConfirmed = confirm("Are you sure you want to delete this Route?");
    // if (isConfirmed) {
    //   const deleteUsersPromises = selected.map((user) => deleteUser(user.id));

    //   try {
    //     const result: any = await Promise.all(deleteUsersPromises);
    //     if (result[0]?.data?.success) {
    //       toast.success("User deleted successfully!");
    //       setSelected([]);
    //     }
    //   } catch (error) {
    //     toast.error("Error deleting user!");
    //   }
    // }
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
          >
            <Tooltip title="add route">
              <IconButton onClick={deleteRoutes}>
                <AddIcon />
              </IconButton>
            </Tooltip>
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
                rowCount={[].length}
                cells={TableHeadCell.route}
              />
              <TableBody>
                {/* {isLoading && (
                  <TableRow>
                    <TableCell colSpan={10}>
                      <SuspenseLoader
                        sx={{ color: "#000", width: "15px", height: "15px" }}
                      />
                    </TableCell>
                  </TableRow>
                )}

                {/*TODO: need to use error from api */}
                {/* {isError && (
                  <TableRow>
                    <TableCell colSpan={10}>
                      <Typography variant="body2" align="center">
                        Failed to load data
                      </Typography>
                    </TableCell>
                  </TableRow>
                )} */}

                {[{ id: "nice", name: "asifur" }].map((user) => {
                  const isItemSelected = selected.some((u) => u.id == user.id);
                  const labelId = `enhanced-table-checkbox-${user.id}`;

                  return (
                    <TableRow
                      key={user.id}
                      hover
                      onClick={() => handleClick(user)}
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
                        {user.id}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                      >
                        {user.name}
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
    </AuthBg>
  );
}
