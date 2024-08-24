import Cookie from "js-cookie";

export const removeUserFromCookie = () => {
  Cookie.remove("token");
};
