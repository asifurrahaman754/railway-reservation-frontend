import DeleteIcon from "@mui/icons-material/Delete";
import VerifiedIcon from "@mui/icons-material/Verified";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { toast } from "react-hot-toast";
import {
  useDeleteUserMutation,
  useUpdateUserVerificationMutation,
} from "store/features/users/usersApi";
import { UserType } from "types/user";

interface EnhancedTableToolbarProps {
  selected: Partial<UserType>[];
  setSelected: React.Dispatch<React.SetStateAction<Partial<UserType>[]>>;
}

export default function TableToolbar({
  selected,
  setSelected,
}: EnhancedTableToolbarProps) {
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserVerification] = useUpdateUserVerificationMutation();

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
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selected.length > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selected.length} users selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          All Users
        </Typography>
      )}
      {selected.length > 0 && (
        <>
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
        </>
      )}
    </Toolbar>
  );
}
