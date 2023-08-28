import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import validateTags from "./validateTags";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: [
    ...validateTags.getAllCoachClassFare,
    ...validateTags.getSingleCoachClassFare,
    ...validateTags.getAllCoach,
  ],
  endpoints: () => ({}),
});

export default apiSlice;
