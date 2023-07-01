export type UserType = {
  email: string;
  id: number;
  mobile: string;
  username: string;
  nid_no: string;
  isVerified: boolean | number;
};

export type routeType = {
  id: string;
  name: string;
};

export type coachClassType = routeType;

export type coachType = {
  id: string;
  name: string;
  capacity: number;
  class_id: string;
  train_id: string;
};
