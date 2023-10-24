import { FC } from 'react';
import { TableHead } from './TableHead/TableHead';
import { TableData } from '@/common/types/Api';
import { TableBody } from '@/modules/contactsContent/components/Table/TableBody/TableBody';
import { EMPTY_ARRAY } from '@/common/constants/initValue';

import styles from './Table.module.scss';

interface ITableProps<T> {
  data?: TableData[] | T[];
}

export const Table: FC<ITableProps<any>> = ({ data }) => {
  const keys = data && data.length > 0 ? Object.keys(data[0]) : EMPTY_ARRAY;
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        {keys && <TableHead data={keys} />}
        {data && <TableBody data={data} />}
      </table>
    </div>
  );
};
