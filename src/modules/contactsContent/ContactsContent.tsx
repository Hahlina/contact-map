'use client';
import { Table } from '@/modules/contactsContent/components/Table/Table';
import { useFetchAllContactsQuery } from '@/common/api/services/contacts/contactsApi';
import { EMPTY_ARRAY } from '@/common/constants/initValue';

import styles from './ContactsContent.module.scss';

export const ContactsContent = () => {
  const { data: tableList } = useFetchAllContactsQuery({ offset: 10 });
  console.log('-> tableList', tableList);
  return (
    <div className={styles.contactsWrapper}>
      <h2>/Contacts</h2>
      {tableList && <Table data={tableList?.results} />}
    </div>
  );
};
