import React, { useEffect } from "react";
import { useGetLoggedInUserQuery } from "store/features/auth/authApi";
import Loader from "components/Loader";
import { Dialog } from "@mui/material";
import { setUser } from "store/features/auth/authSlice";
import { useDispatch } from "react-redux";

function AppEvent() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetLoggedInUserQuery(null);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setUser(data?.data));
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
