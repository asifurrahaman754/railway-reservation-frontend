import Auth from "pages/Auth";
import React from "react";
import { Navigate } from "react-router-dom";
import routes from "routes";
import Home from "../pages/Home";

const AuthLogin = React.lazy(() => import("pages/Auth/components/AuthLogin"));
const AuthRegister = React.lazy(
  () => import("pages/Auth/components/AuthRegister")
);

const routesConfig = [
  {
    path: routes.home,
    element: <Home />,
  },
  {
    element: <Auth />,
    children: [
      {
        path: routes.auth.login,
        element: <AuthLogin />,
      },
      {
        path: routes.auth.register,
        element: <AuthRegister />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to={routes.auth.login} replace />,
  },
];

export default routesConfig;
