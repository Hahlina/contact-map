'use client';
import { FC } from 'react';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { useModal } from '@/common/hooks/useModal/useModal';
import { ContactUpdateModal } from '@/modules/contactsContent/components/ContactUpdateModal/ContactUpdateModal';
import { getUniqID } from '@/common/utils/getUniqID';

import styles from './TableBody.module.scss';

interface ITableBodyProps<T> {
  data: T[];
}

export const TableBody: FC<ITableBodyProps<Record<string, any>>> = ({ data }) => {
  const [showContactsUpdateModal] = useModal(ContactUpdateModal);
  const keys = Object.keys(data[0]);

  return (
    <tbody className={styles.tableBody}>
      {data.map((item) => (
        <tr key={getUniqID()}>
          {keys.map((key) => (
            <td key={key}>{item[key]}</td>
          ))}
          <td className={styles.icons}>
            <FiEdit3
              className={styles.editIcon}
              onClick={() => showContactsUpdateModal({ ...item })}
            />
            <FiTrash2 className={styles.removeIcon} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};
