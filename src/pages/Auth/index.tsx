import AuthBg from "components/reusable/AuthBg";
import AuthFormLayout from "components/core/AuthFormLayout";
import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <AuthBg>
      <AuthFormLayout>
        <Outlet />
      </AuthFormLayout>
    </AuthBg>
  );
}
