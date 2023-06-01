import { TableHeadCell } from "types/TableHeadCell";

const UserHeadCells: TableHeadCell[] = [
  {
    id: "name",
    disablePadding: true,
    label: "Name",
  },
  {
    id: "email",
    disablePadding: false,
    label: "Email",
  },
  {
    id: "mobile",
    disablePadding: false,
    label: "Mobile",
  },
  {
    id: "nid",
    disablePadding: false,
    label: "NID No.",
  },
  {
    id: "verified",
    disablePadding: false,
    label: "Verified",
  },
];

const TableHeadCell = {
  users: UserHeadCells,
};

export default TableHeadCell;
