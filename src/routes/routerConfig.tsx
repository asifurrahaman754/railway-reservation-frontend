import Auth from "pages/Auth";
import React from "react";
import { Navigate } from "react-router-dom";
import routes from "routes";

const AuthLogin = React.lazy(() => import("components/core/AuthLogin"));
const AuthRegister = React.lazy(() => import("components/core/AuthRegister"));

const routesConfig = [
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
