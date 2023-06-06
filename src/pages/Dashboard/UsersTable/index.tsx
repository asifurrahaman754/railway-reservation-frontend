import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
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
import SuspenseLoader from "components/SuspenseLoader";
import * as React from "react";
import { Link } from "react-router-dom";
import routes from "routes/index";
import { useGetAllUsersQuery } from "store/features/users/usersApi";
import { UserType } from "types/user";
import UserTableHead from "./TableHead";
import TableToolbar from "./TableToolbar";

export default function UsersTable() {
  const { isLoading, isError, data: Users } = useGetAllUsersQuery();
  const [selected, setSelected] = React.useState<Partial<UserType>[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = Users?.data.map((user: UserType) => ({
        id: user.id,
        isVerified: user.isVerified,
      }));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (user: UserType) => {
    const selectedUser = selected.find((u) => u.id === user.id);

    if (!selectedUser) {
      setSelected([...selected, { id: user.id, isVerified: user.isVerified }]);
    } else {
      const newSelected = selected.filter((u) => u.id !== user.id);
      setSelected(newSelected);
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
          <TableToolbar selected={selected} setSelected={setSelected} />

          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <UserTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={Users?.data.length}
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

                {Users?.data.map((user: UserType) => {
                  const isItemSelected = selected.some((u) => u.id === user.id);
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
                        padding="none"
                      >
                        {user.username}
                      </TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">{user.mobile}</TableCell>
                      <TableCell align="left">{user.nid_no}</TableCell>
                      <TableCell align="left">
                        {user.isVerified ? "yes" : "no"}
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
            count={Users?.data.length || 0}
            rowsPerPage={0}
            page={0}
            onPageChange={() => {}}
          />
        </Paper>
      </Box>
    </AuthBg>
  );
}
