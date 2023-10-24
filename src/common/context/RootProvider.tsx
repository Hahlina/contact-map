'use client';
import { FC, ReactNode } from 'react';
import { ModalProvider } from '@/common/hooks/useModal/ModalProvider';
import { Provider } from 'react-redux';
import { setupStore } from '@/common/store/store';

const store = setupStore();

export const RootProvider: FC<{
  children: ReactNode;
}> = ({ children }): ReactNode => {
  return (
    <Provider store={store}>
      <ModalProvider>{children}</ModalProvider>
    </Provider>
  );
};
