import apiSlice from "../api/apiSlice";
import validateTags from "../api/validateTags";

const routeScheduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRouteSchedule: builder.query({
      query: () => "/route_schedule",
    }),

    getRouteScheduleById: builder.query({
      query: (id) => `/route_schedule/${id}`,
    }),

    addRouteSchedule: builder.mutation({
      query: (body) => ({
        url: "/route_schedule/add",
        method: "POST",
        body,
      }),
    }),

    deleteRouteSchedule: builder.mutation({
      query: (id) => ({
        url: `/delete_route_schedule/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddRouteScheduleMutation,
  useDeleteRouteScheduleMutation,
  useGetAllRouteScheduleQuery,
  useGetRouteScheduleByIdQuery,
} = routeScheduleApi;
