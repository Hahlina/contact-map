'use client';
import { FC, ReactNode } from 'react';
import { ModalProvider } from '@/common/hooks/useModal/ModalProvider';
import { Provider } from 'react-redux';
import { setupStore } from '@/common/store/store';
import { AuthProvider } from '@/common/context/AuthProvider';

const store = setupStore();

export const RootProvider: FC<{
  children: ReactNode;
}> = ({ children }): ReactNode => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </Provider>
  );
};
