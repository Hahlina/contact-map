import { FC } from 'react';
import { getUniqID } from '@/common/utils/getUniqID';

import styles from './TableHead.module.scss';
import { getStringWithOutUnderline } from '@/common/utils/getStringWithOutUnderline';

interface ITableHeadProps<T> {
  data: (keyof T)[];
}

export const TableHead: FC<ITableHeadProps<any>> = ({ data }) => {
  return (
    <thead className={styles.thead}>
      <tr>
        {data.map((key) => (
          <th key={getUniqID()}>{getStringWithOutUnderline(key as string)}</th>
        ))}
        <th>Edit</th>
      </tr>
    </thead>
  );
};
