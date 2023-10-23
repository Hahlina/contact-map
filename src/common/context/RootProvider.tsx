'use client';
import { ModalProvider } from '@/common/hooks/useModal/ModalProvider';
import { FC, ReactNode } from 'react';

export const RootProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>;
};
