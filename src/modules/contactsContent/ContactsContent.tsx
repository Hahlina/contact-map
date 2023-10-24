import styles from './ContactsContent.module.scss';
import { Table } from '@/common/components/Table/Table';
import { tableData } from '../../../fakeData';
import { TableData } from '@/common/types/Api';

export const ContactsContent = () => {
  const fakeData = tableData;
  return (
    <div>
      <Table data={fakeData} />
    </div>
  );
};
