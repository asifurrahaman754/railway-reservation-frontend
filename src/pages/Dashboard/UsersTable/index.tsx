import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AuthBg from "Layouts/AuthBg";
import * as React from "react";
import UserTableHead from "./TableHead";
import TableToolbar from "./TableToolbar";

interface Data {
  name: string;
  email: string;
  mobile: string;
  nid: number;
  isVerified: boolean;
}

function createData(
  name: string,
  email: string,
  mobile: string,
  nid: number,
  isVerified: boolean
): Data {
  return {
    name,
    email,
    mobile,
    nid,
    isVerified,
  };
}

const rows: Data[] = [
  createData("asifur1", "asifur@gmail.com", "1234", 4343, true),
  createData("asifur2", "asifur@gmail.com", "1234", 4343, true),
  createData("asifur3", "asifur@gmail.com", "1234", 4343, true),
  createData("asifur4", "asifur@gmail.com", "1234", 4343, true),
];

export default function UsersTable() {
  const [selected, setSelected] = React.useState<any[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: Data[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
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
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <UserTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={rows.length}
              />
              <TableBody>
                {rows.map((row, index) => {
                  const isItemSelected = selected.indexOf(row.name) !== -1;
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={() => handleClick(row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
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
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.mobile}</TableCell>
                      <TableCell align="left">{row.nid}</TableCell>
                      <TableCell align="left">
                        {row.isVerified ? "yes" : "no"}
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
            count={rows.length}
            rowsPerPage={0}
            page={0}
            onPageChange={() => {}}
          />
        </Paper>
      </Box>
    </AuthBg>
  );
}
