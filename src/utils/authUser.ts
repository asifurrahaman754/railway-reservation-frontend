import routes from "routes/index";
import { authUserType } from "types/authUserType";

export const isAdmin = (user: authUserType) => user?.isAdmin > 0;

export const userHomeRedirect = (user: authUserType) =>
  isAdmin(user) ? routes.admin.dashboard : routes.home;
