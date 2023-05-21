const path = {
  USER: "user",
};

export const getUserFromLocal = () => {
  const user = localStorage.getItem(path.USER);
  return user ? JSON.parse(user) : null;
};

export const setUserToLocal = (user: any) => {
  localStorage.setItem(path.USER, JSON.stringify(user));
};

export const removeUserFromLocal = () => {
  localStorage.removeItem(path.USER);
};
