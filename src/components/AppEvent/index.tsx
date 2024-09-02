import React, { useEffect } from "react";
import { useGetLoggedInUserQuery } from "store/features/auth/authApi";
import Loader from "components/Loader";
import { Dialog } from "@mui/material";
import { setUser } from "store/features/auth/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import routes from "routes/index";

function AppEvent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetLoggedInUserQuery(null);

  useEffect(() => {
    if (!isLoading && data) {
      if (data?.success) {
        dispatch(setUser(data?.data));
      } else {
        toast.error("Failed to login user!");
        navigate(routes.auth.login);
      }
    }
  }, [isLoading, data]);

  if (isLoading) {
    return (
      <Dialog fullScreen open={isLoading}>
        <Loader
          size={40}
          sx={{
            height: "100%",
            display: "grid",
            placeItems: "center",
          }}
        />
      </Dialog>
    );
  }

  return null;
}

export default AppEvent;
