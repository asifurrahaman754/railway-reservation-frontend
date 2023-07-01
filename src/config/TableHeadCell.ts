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

const coachClassesCells: typeof routeHeadCells = routeHeadCells;

const coachHeadCells: TableHeadCell[] = [
  {
    id: "ID",
    label: "ID",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "capacity",
    label: "Capacity",
  },
  {
    id: "Coach_Class",
    label: "Coach Class",
  },
  {
    id: "train",
    label: "train",
  },
];

const TableHeadCell = {
  users: UserHeadCells,
  route: routeHeadCells,
  coachClasses: coachClassesCells,
  coach: coachHeadCells,
};

export default TableHeadCell;
