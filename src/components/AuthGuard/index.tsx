import useAuthUser from "hooks/useAuthUser";
import { Navigate } from "react-router-dom";
import routes from "routes/index";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthUser();

  if (loading) {
    return null;
  }

  return (
    <>{user ? children : <Navigate to={routes.auth.login} replace={true} />}</>
  );
}
