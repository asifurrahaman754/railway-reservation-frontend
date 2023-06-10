import { TableHeadCell } from "types/TableHeadCell";

const UserHeadCells: TableHeadCell[] = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "mobile",
    label: "Mobile",
  },
  {
    id: "nid",
    label: "NID No.",
  },
  {
    id: "verified",
    label: "Verified",
  },
];

const routeHeadCells: TableHeadCell[] = [
  {
    id: "ID",
    label: "ID",
  },
  {
    id: "name",
    label: "Name",
  },
];

const TableHeadCell = {
  users: UserHeadCells,
  route: routeHeadCells,
};

export default TableHeadCell;
