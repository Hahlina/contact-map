import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/common/constants/config';
import { CustomAuth } from '@/common/types/Api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://technical-task-api.icapgroupgmbh.com/api',
  }),
  tagTypes: ['Auth'],
  endpoints(build) {
    return {
      login: build.mutation({
        query: (data: CustomAuth) => ({
          url: '/login/',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: 'Auth', id: 'login' }],
      }),
    };
  },
});

export const { useLoginMutation } = authApi;
