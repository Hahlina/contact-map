'use client';
import { createContext } from 'react';

export interface IModalContext {
  showModal: (...props: any[]) => void;
  hideModal: (...props: any[]) => void;
  hasActiveModal: boolean;
  [key: string]: any;
}

export const ModalContext = createContext<IModalContext>({
  showModal: () => null,
  hideModal: () => null,
  hasActiveModal: false,
});
