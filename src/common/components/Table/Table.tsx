import { FC } from 'react';
import { TableBody } from '@/common/components/Table/TableBody/TableBody';
import { TableHead } from '@/common/components/Table/TableHead/TableHead';

import styles from './Table.module.scss';

interface ITableProps<T> {
  data: T[];
}
export const Table: FC<ITableProps<any>> = ({ data }) => {
  const keys = Object.keys(data[0]);
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <TableHead data={keys} />
        <TableBody data={data} />
      </table>
    </div>
  );
};
