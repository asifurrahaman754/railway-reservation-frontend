import GuardRoute from "components/GuardRoute";
import Loader from "components/Loader";
import AuthLogin from "pages/AuthLogin";
import AuthRegister from "pages/AuthRegister";
import Dashboard from "pages/Dashboard";
import Home from "pages/Home";
import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import routes from "routes";

const TrainInfo = lazy(() => import("pages/TrainInfo"));
const UsersTable = lazy(() => import("pages/Dashboard/UsersTable"));
const RouteTable = lazy(() => import("pages/Dashboard/RouteTable"));
const TrainsTable = lazy(() => import("pages/Dashboard/TrainsTable"));
const CoachClasses = lazy(() => import("pages/Dashboard/CoachClasses"));
const Coaches = lazy(() => import("pages/Dashboard/Coaches"));

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
      <Suspense fallback={<Loader />}>
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
    path: routes.admin.user,
    element: (
      <GuardRoute isForAdmin>
        <Suspense fallback={<Loader />}>
          <UsersTable />
        </Suspense>
      </GuardRoute>
    ),
  },
  {
    path: routes.admin.trains,
    element: (
      <GuardRoute isForAdmin>
        <Suspense fallback={<Loader />}>
          <TrainsTable />
        </Suspense>
      </GuardRoute>
    ),
  },
  {
    path: routes.admin.route,
    element: (
      <GuardRoute isForAdmin>
        <Suspense fallback={<Loader />}>
          <RouteTable />
        </Suspense>
      </GuardRoute>
    ),
  },
  {
    path: routes.admin.coach_classes,
    element: (
      <GuardRoute isForAdmin>
        <Suspense fallback={<Loader />}>
          <CoachClasses />
        </Suspense>
      </GuardRoute>
    ),
  },
  {
    path: routes.admin.coaches,
    element: (
      <GuardRoute isForAdmin>
        <Suspense fallback={<Loader />}>
          <Coaches />
        </Suspense>
      </GuardRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to={routes.auth.login} replace />,
  },
];

export default routesConfig;
