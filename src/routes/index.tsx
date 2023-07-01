const routes = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },
  admin: {
    login: "/admin/login",
    dashboard: "/admin/dashboard",
    trains: "/admin/dashboard/train",
    user: "/admin/dashboard/user",
    bookings: "/admin/dashboard/bookings",
    admin_accounts: "/admin/dashboard/admin_accounts",
    route: "/admin/dashboard/route",
    coach_classes: "/admin/dashboard/coach_classes",
    coaches: "/admin/dashboard/coaches",
  },
  home: "/",
  booking: `/booking`,
};

export default routes;
