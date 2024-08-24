import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "store/features/auth/authSelector";
import { authUserType } from "types/authUserType";
import { userHomeRedirect } from "utils/authUser";

export default function GuardRoute({
  children,
}: {
  children: React.ReactNode;
  isForAdmin?: boolean;
}) {
  const authUser = useSelector(selectUser);

  return (
    <>
      {authUser ? (
        children
      ) : (
        <Navigate to={userHomeRedirect(authUser)} replace={true} />
      )}
    </>
  );
}
