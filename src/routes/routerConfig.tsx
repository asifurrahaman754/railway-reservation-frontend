import GuardRoute from "components/GuardRoute";
import SuspenseLoader from "components/SuspenseLoader";
import AuthLogin from "pages/AuthLogin";
import AuthRegister from "pages/AuthRegister";
import Dashboard from "pages/Dashboard";
import Home from "pages/Home";
import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import routes from "routes";

const TrainInfo = lazy(() => import("pages/TrainInfo"));

const routesConfig = [
  {
    path: routes.home,
    element: <Home />,
  },
  {
    path: routes.auth.login,
    element: <AuthLogin />,
  },
  {
    path: routes.auth.register,
    element: <AuthRegister />,
  },
  {
    path: routes.booking,
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <TrainInfo />
      </Suspense>
    ),
  },
  {
    path: routes.admin.login,
    element: <AuthLogin isForAdmin />,
  },
  {
    path: routes.admin.dashboard,
    element: (
      <GuardRoute isForAdmin>
        <Dashboard />
      </GuardRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to={routes.auth.login} replace />,
  },
];

export default routesConfig;
