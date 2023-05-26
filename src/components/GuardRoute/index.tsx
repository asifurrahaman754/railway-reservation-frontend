import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import routes from "routes/index";
import { selectUser } from "store/features/auth/authSelector";
import { authUserType } from "types/authUserType";

export default function GuardRoute({
  children,
}: {
  children: React.ReactNode | null;
}) {
  const isAuthenticated: authUserType | null = useSelector(selectUser);
  console.log("isAuthenticated", isAuthenticated);

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <Navigate to={routes.auth.login} replace={true} />
      )}
    </>
  );
}
