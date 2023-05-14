import Auth from "pages/Auth";
import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import routes from "routes";

const AuthLogin = lazy(() => import("pages/Auth/components/AuthLogin"));
const AuthRegister = lazy(() => import("pages/Auth/components/AuthRegister"));
const Home = lazy(() => import("pages/Home"));
const TrainInfo = lazy(() => import("pages/TrainInfo"));

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
    path: routes.booking,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <TrainInfo />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <Navigate to={routes.auth.login} replace />,
  },
];

export default routesConfig;
