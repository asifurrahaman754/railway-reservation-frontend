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
  },
  home: "/",
  booking: `/booking`,
};

export default routes;
