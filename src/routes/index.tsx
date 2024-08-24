const routes = {
  auth: {
    login: "/login",
    register: "/register",
  },
  admin: {
    dashboard: "/admin/dashboard",
    trains: "/admin/dashboard/train",
    train_details: {
      path: "/admin/dashboard/train/:trainId",
      pathWithId: (trainId: string) => `/admin/dashboard/train/${trainId}`,
    },
    user: "/admin/dashboard/user",
    bookings: "/admin/dashboard/bookings",
    admin_accounts: "/admin/dashboard/admin_accounts",
    route: "/admin/dashboard/route",
    coach_classes: "/admin/dashboard/coach_classes",
  },
  home: "/",
  booking: `/booking`,
  purchase: `/purchase`,
  payment: `/payment`,
  paymentSuccess: {
    path: `/payment-success/:ticketID`,
    pathWithId: (ticketID: string) => `/payment-success/${ticketID}`,
  },
};

export default routes;
