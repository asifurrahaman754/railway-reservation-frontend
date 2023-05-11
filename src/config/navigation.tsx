import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import WalletIcon from "@mui/icons-material/Wallet";
import React from "react";

type Navigation = {
  name: string;
  path: string;
  icon?: JSX.Element | React.ReactNode;
};

const navigation: Navigation[] = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Verify Ticket",
    path: "/verify-ticket",
  },
  {
    name: "Train Information",
    path: "/train-information",
  },
];

export const dropDownNavigation: Omit<Navigation, "path">[] = [
  {
    name: "profile",
    icon: <PersonIcon />,
  },
  {
    name: "purchase history",
    icon: <WalletIcon />,
  },
  {
    name: "logout",
    icon: <LogoutIcon />,
  },
];

export default navigation;
