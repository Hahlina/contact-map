import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/common/constants/config';
import { TableData } from '@/common/types/Api';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://technical-task-api.icapgroupgmbh.com/api',
  }),
  tagTypes: ['Contacts'],
  endpoints(build) {
    return {
      fetchAllContacts: build.query<any, { limit?: number; offset?: number }>({
        query: (params) => ({
          url: '/table/',
          method: 'GET',
          params,
        }),
        providesTags: ['Contacts'],
      }),
      updateContact: build.mutation<TableData, TableData>({
        query: (contact) => ({
          url: `/table/${contact.id}`,
          method: 'PUT',
          body: contact,
        }),
        invalidatesTags: ['Contacts'],
      }),
      removeContact: build.mutation<{ id: number }, { id: number }>({
        query: (id) => ({
          url: `/table/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Contacts'],
      }),
    };
  },
});

export const {
  useFetchAllContactsQuery,
  useUpdateContactMutation,
  useRemoveContactMutation,
} = contactsApi;
