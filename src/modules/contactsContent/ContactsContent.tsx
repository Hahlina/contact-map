import { Table } from '@/common/components/Table/Table';
import { tableData } from '../../../fakeData';

import styles from './ContactsContent.module.scss';

export const ContactsContent = () => {
  const fakeData = tableData;
  return (
    <div className={styles.contactsWrapper}>
      <h2>/Contacts</h2>
      <Table data={fakeData} />
    </div>
  );
};
