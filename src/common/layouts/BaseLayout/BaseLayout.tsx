import { FC, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { RootProvider } from '@/common/context/RootProvider';
import { Header } from '@/common/components/Header/Header';

import styles from './BaseLayout.module.scss';

interface IBaseLayoutProps {
  children: ReactNode;
}

export const BaseLayout: FC<IBaseLayoutProps> = ({ children }) => {
  return (
    <RootProvider>
      <ToastContainer />
      <main className={styles.mainWrapper}>
        <Header />
        {children}
      </main>
    </RootProvider>
  );
};
