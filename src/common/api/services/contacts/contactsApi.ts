import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/common/constants/config';
import { TableData } from '@/common/types/Api';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Contacts'],
  endpoints(build) {
    return {
      fetchAllContacts: build.query<TableData, TableData>({
        query: () => ({
          url: '/table/',
          method: 'GET',
        }),
        providesTags: () => ['Contacts'],
      }),
      updateContact: build.mutation<TableData, TableData>({
        query: (contact) => ({
          url: `/table/${contact.id}`,
          method: 'PUT',
          body: contact,
        }),
        invalidatesTags: ['Contacts'],
      }),
      removeContact: build.mutation<Pick<TableData, 'id'>, Pick<TableData, 'id'>>({
        query: (contact) => ({
          url: `/table/${contact.id}`,
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
