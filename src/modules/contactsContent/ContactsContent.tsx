'use client';
import { useState } from 'react';
import { Table } from '@/modules/contactsContent/components/Table/Table';
import { useFetchAllContactsQuery } from '@/common/api/services/contacts/contactsApi';

import styles from './ContactsContent.module.scss';

export const ContactsContent = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const { data: tableList } = useFetchAllContactsQuery({
    offset: currentPage,
    limit: itemsPerPage,
  });
  return (
    <div className={styles.contactsWrapper}>
      <h2>/Contacts</h2>
      {tableList && (
        <Table {...{ ...tableList, itemsPerPage, currentPage, setCurrentPage }} />
      )}
    </div>
  );
};
