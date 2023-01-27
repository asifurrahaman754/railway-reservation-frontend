import loadable from "@loadable/component";
import Auth from "pages/Auth";

const AuthLogin = loadable(() => import("components/core/AuthLogin"));
const AuthRegister = loadable(() => import("components/core/AuthRegister"));

const routesConfig = [
  {
    element: <Auth />,
    children: [
      {
        path: "/auth/login",
        element: <AuthLogin />,
      },
      {
        path: "/auth/register",
        element: <AuthRegister />,
      },
    ],
  },
];

export default routesConfig;
