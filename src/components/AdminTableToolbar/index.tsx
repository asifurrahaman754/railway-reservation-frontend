import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

interface AdminTableToolbarProps<T> {
  selected: T[];
  title: string;
  children?: React.ReactNode;
  children2?: React.ReactNode;
}

export default function AdminTableToolbarProps<T>({
  selected,
  title,
  children,
  children2,
}: AdminTableToolbarProps<T>) {
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
          {selected.length} {title} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          All {title}
        </Typography>
      )}
      {selected.length > 0 && children}

      {!selected.length && children2}
    </Toolbar>
  );
}
