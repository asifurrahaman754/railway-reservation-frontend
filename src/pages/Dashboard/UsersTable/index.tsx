import DeleteIcon from "@mui/icons-material/Delete";
import VerifiedIcon from "@mui/icons-material/Verified";
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
import * as React from "react";
import { toast } from "react-hot-toast";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserVerificationMutation,
} from "store/features/users/usersApi";
import { UserType } from "types/tableRow";

export default function UsersTable() {
  const { isLoading, isError, data: Users } = useGetAllUsersQuery();
  const [selected, setSelected] = React.useState<Partial<UserType>[]>([]);
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserVerification] = useUpdateUserVerificationMutation();

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

  const verifyUser = async () => {
    const isConfirmed = confirm("Are you sure you want to verify this user?");
    if (isConfirmed) {
      const noVerifiedUsers = selected.filter((user) => user.isVerified !== 1);
      const updateUsersPromises = noVerifiedUsers.map((user) =>
        updateUserVerification(user.id)
      );

      if (updateUsersPromises.length === 0) {
        toast.error("No user to verify!");
        return;
      }

      try {
        const result: any = await Promise.all(updateUsersPromises);
        if (result[0]?.data?.success) {
          toast.success("User verified successfully!");
          setSelected([]);
        }
      } catch (error) {
        toast.error("Error verifying user!");
      }
    }
  };

  const deleteUsers = async () => {
    const isConfirmed = confirm("Are you sure you want to delete this user?");
    if (isConfirmed) {
      const deleteUsersPromises = selected.map((user) => deleteUser(user.id));

      try {
        const result: any = await Promise.all(deleteUsersPromises);
        if (result[0]?.data?.success) {
          toast.success("User deleted successfully!");
          setSelected([]);
        }
      } catch (error) {
        toast.error("Error deleting user!");
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
            title="Users"
          >
            <Tooltip title="Verify user">
              <IconButton onClick={verifyUser}>
                <VerifiedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete user">
              <IconButton onClick={deleteUsers}>
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
                rowCount={Users?.data.length}
                cells={TableHeadCell.users}
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
        </Paper>
      </Box>
    </AuthBg>
  );
}
