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

const trainHeadCells: TableHeadCell[] = [
  {
    id: "ID",
    label: "ID",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "type",
    label: "Type",
  },
  {
    id: "fare_per_km",
    label: "Fare Per KM",
  },
  {
    id: "holiday",
    label: "Holiday",
  },
];

const TableHeadCell = {
  users: UserHeadCells,
  route: routeHeadCells,
  coachClasses: coachClassesCells,
  coach: coachHeadCells,
  train: trainHeadCells,
};

export default TableHeadCell;
