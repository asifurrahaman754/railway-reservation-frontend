import { useRoutes } from "react-router-dom";
import routesConfig from "./routerConfig";

export default function Router() {
  const content = useRoutes(routesConfig);
  return content;
}
