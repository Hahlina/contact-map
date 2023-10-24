'use client';
import { FC, ReactNode } from 'react';
import { useLocalStorageRead } from '@/common/hooks/useLocalStorageRead';
import { LOCAL_STORAGE } from '@/common/constants/localStorage';
import { useAppDispatch, useAppSelector } from '@/common/hooks/redux/redux';
import { login, logout } from '@/common/store/reducers/authSlice';
import { useRouter } from 'next/navigation';

export const AuthProvider: FC<{
  children: ReactNode;
}> = ({ children }): ReactNode => {
  const isAuth = useLocalStorageRead<string | undefined>(LOCAL_STORAGE.AUTH);
  const dispatch = useAppDispatch();
  const router = useRouter();
  // if (isAuth) {
  //   router.push('/contacts');
  // } else router.push('/');

  if (isAuth) {
    dispatch(login());
  } else {
    dispatch(logout());
  }
  return <>{children}</>;
};
