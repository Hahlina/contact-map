'use client';
import { UserPopUp } from '@/common/components/UserPopup/UserPopup';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@/common/store/reducers/authSlice';
import { ROUTES } from '@/common/constants/routes';

import styles from './Header.module.scss';

export const Header = () => {
  const user = { name: 'PAN ROMAN' };
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout);
    localStorage.clear();
    router.push(ROUTES.HOME);
  };
  return (
    <header className={styles.header}>
      <UserPopUp handleLogout={handleLogout} user={user} />
    </header>
  );
};
