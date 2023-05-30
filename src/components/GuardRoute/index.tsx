import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import routes from "routes/index";
import { selectUser } from "store/features/auth/authSelector";
import { authUserType } from "types/authUserType";

export default function GuardRoute({
  children,
  isForAdmin = false,
}: {
  children: React.ReactNode | null;
  isForAdmin?: boolean;
}) {
  const isAuthenticated: authUserType | null = useSelector(selectUser);

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <Navigate
          to={isForAdmin ? routes.admin.login : routes.auth.login}
          replace={true}
        />
      )}
    </>
  );
}
