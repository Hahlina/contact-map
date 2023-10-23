import { FC, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import styles from './BaseLayout.module.scss';
import { RootProvider } from '@/common/context/RootProvider';

interface IBaseLayoutProps {
  children: ReactNode;
}

export const BaseLayout: FC<IBaseLayoutProps> = ({ children }) => {
  return (
    <>
      <RootProvider>
        <ToastContainer />
        <main className={styles.mainWrapper}>{children}</main>
      </RootProvider>
    </>
  );
};
