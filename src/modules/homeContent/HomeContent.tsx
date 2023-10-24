'use client';
import { Button } from '@/common/components/Button/Button';
import { useModal } from '@/common/hooks/useModal/useModal';
import { LoginModal } from '@/modules/homeContent/components/LoginModal/LoginModal';

import styles from './HomeContent.module.scss';

export const HomeContent = () => {
  const [showLoginModal] = useModal(LoginModal);
  return (
    <div className={styles.homeWrapper}>
      <h1 className={styles.title}>Contact-map</h1>
      <Button className={styles.button} onClick={showLoginModal}>
        Sign In
      </Button>
    </div>
  );
};
