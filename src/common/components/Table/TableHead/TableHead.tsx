import { FC } from 'react';
import { getUniqID } from '@/common/utils/getUniqID';

import styles from './TableHead.module.scss';

interface ITableHeadProps<T> {
  data: (keyof T)[];
}

export const TableHead: FC<ITableHeadProps<any>> = ({ data }) => {
  return (
    <thead className={styles.thead}>
      <tr>
        {data.map((key) => (
          <th key={getUniqID()}>{key as string}</th>
        ))}
        <th>Edit</th>
      </tr>
    </thead>
  );
};
