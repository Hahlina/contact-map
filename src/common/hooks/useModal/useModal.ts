'use client';
import { FunctionComponent, MouseEvent, useCallback, useContext, useMemo } from 'react';

import { getUniqID } from '@/common/utils/getUniqID';
import { ModalContext } from './ModalContext';
import { ModalProvider } from './ModalProvider';

export const useModal = <TProps = { [key: string]: unknown }>(
  component: FunctionComponent<TProps>,
  data?: Partial<TProps>,
  onClose?: () => void,
) => {
  const { showModal, hideModal } = useContext(ModalContext);

  const key = useMemo(() => getUniqID(), []);

  const show = useCallback(
    (modalData?: Partial<TProps> | MouseEvent) => {
      showModal(
        key,
        component,
        modalData instanceof Event ? data : { ...data, ...modalData },
      );
    },
    [component, data, key, showModal],
  );

  const hide = useCallback(() => {
    hideModal(key, onClose);
  }, [hideModal, key, onClose]);

  return [show, hide];
};

useModal.ModalContext = ModalContext;
useModal.ModalProvider = ModalProvider;
