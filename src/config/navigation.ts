type Navigation = {
  name: string;
  path: string;
  icon?: string;
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

export default navigation;
