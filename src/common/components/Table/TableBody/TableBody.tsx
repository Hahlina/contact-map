import { FC } from 'react';
import { getUniqID } from '@/common/utils/getUniqID';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';

import styles from './TableBody.module.scss';

interface ITableBodyProps<T> {
  data: T[];
}

export const TableBody: FC<ITableBodyProps<Record<string, any>>> = ({ data }) => {
  const keys = Object.keys(data[0]);

  return (
    <tbody className={styles.tableBody}>
      {data.map((item) => (
        <tr key={getUniqID()}>
          {keys.map((key) => (
            <td key={key}>{item[key]}</td>
          ))}
          <td className={styles.icons}>
            <FiEdit3 className={styles.editIcon} />
            <FiTrash2 className={styles.removeIcon} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};
