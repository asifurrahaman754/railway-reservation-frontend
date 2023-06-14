import apiSlice from "../api/apiSlice";

const routeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoute: builder.query({
      query: () => "/route",
    }),

    addRoute: builder.mutation({
      query: (body) => ({
        url: "/route/add",
        method: "POST",
        body,
      }),

      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllRoute",
              undefined,
              (prevData: any) => {
                if (result.data.success) {
                  prevData.data.push(result.data.data);
                }
              }
            )
          );
        } catch (error) {}
      },
    }),

    deleteRoute: builder.mutation({
      query: (id) => ({
        url: `/route/${id}`,
        method: "DELETE",
      }),

      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllRoute",
              undefined,
              (prevData: any) => {
                if (result.data.success) {
                  prevData.data = prevData.data.filter(
                    (route: any) => route.id != id
                  );
                }
              }
            )
          );
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetAllRouteQuery,
  useAddRouteMutation,
  useDeleteRouteMutation,
} = routeApi;
