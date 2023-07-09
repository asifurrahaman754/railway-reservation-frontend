import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableHeadCell } from "types/TableHeadCell";

interface UserTableHeadProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  cells: TableHeadCell[];
}

export default function AdminTableHead({
  onSelectAllClick,
  numSelected,
  rowCount,
  cells,
}: UserTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all users",
            }}
          />
        </TableCell>
        {cells.map((headCell) => (
          <TableCell key={headCell.id} align="left" padding="normal">
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
