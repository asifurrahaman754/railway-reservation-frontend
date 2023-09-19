import AuthBg from "Layouts/AuthBg";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <AuthBg>
      <Outlet />
    </AuthBg>
  );
}
