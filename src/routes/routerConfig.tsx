import DashboardLayout from "Layouts/DashboardLayout";
import HomeLayout from "Layouts/HomeLayout";
import GuardRoute from "components/GuardRoute";
import Loader from "components/Loader";
import AuthLogin from "pages/AuthLogin";
import AuthRegister from "pages/AuthRegister";
import Dashboard from "pages/Dashboard";
import Home from "pages/Home";
import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import routes from "routes";

const TrainInfo = lazy(() => import("pages/TrainInfo"));
const UsersTable = lazy(() => import("pages/Dashboard/UsersTable"));
const RouteTable = lazy(() => import("pages/Dashboard/RouteTable"));
const TrainsTable = lazy(() => import("pages/Dashboard/TrainsTable"));
const CoachClasses = lazy(() => import("pages/Dashboard/CoachClasses"));
const TrainDetails = lazy(
  () => import("pages/Dashboard/TrainsTable/TrainDetails")
);
const Purchase = lazy(() => import("pages/PurchaseTicket"));
const Payment = lazy(() => import("pages/Payment"));

const routesConfig = [
  {
    element: <HomeLayout />,
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
      {
        path: routes.booking,
        element: (
          <Suspense fallback={""}>
            <TrainInfo />
          </Suspense>
        ),
      },
      {
        path: routes.purchase,
        element: (
          <Suspense fallback={""}>
            <Purchase />
          </Suspense>
        ),
      },
      {
        path: routes.payment,
        element: (
          <Suspense fallback={""}>
            <Payment />
          </Suspense>
        ),
      },
    ],
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
    path: routes.admin.login,
    element: <AuthLogin isForAdmin />,
  },
  {
    element: (
      <GuardRoute isForAdmin>
        <DashboardLayout />
      </GuardRoute>
    ),
    children: [
      {
        path: routes.admin.dashboard,
        element: <Dashboard />,
      },
      {
        path: routes.admin.user,
        element: (
          <Suspense fallback={<Loader />}>
            <UsersTable />
          </Suspense>
        ),
      },
      {
        path: routes.admin.trains,
        element: (
          <Suspense fallback={<Loader />}>
            <TrainsTable />
          </Suspense>
        ),
      },
      {
        path: routes.admin.route,
        element: (
          <Suspense fallback={<Loader />}>
            <RouteTable />
          </Suspense>
        ),
      },
      {
        path: routes.admin.coach_classes,
        element: (
          <Suspense fallback={<Loader />}>
            <CoachClasses />
          </Suspense>
        ),
      },
      {
        path: routes.admin.train_details.path,
        element: (
          <Suspense fallback={<Loader />}>
            <TrainDetails />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={routes.auth.login} replace />,
  },
];

export default routesConfig;
