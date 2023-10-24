'use client';
import { UserPopUp } from '@/common/components/UserPopup/UserPopup';
import styles from './Header.module.scss';

export const Header = () => {
  const user = { name: 'ПАН РОМАН' };
  return (
    <header className={styles.header}>
      <UserPopUp handleLogout={() => {}} user={user} />
    </header>
  );
};
