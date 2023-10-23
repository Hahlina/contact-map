'use client';

import {
  useState,
  useMemo,
  useCallback,
  ReactNode,
  ComponentType,
  ComponentProps,
} from 'react';

import useEventListener from '../useEventListener';
import { ModalContext } from './ModalContext';
import { CUSTOM_EVENTS } from './customEvents';

interface IModalProviderProps {
  children: ReactNode;
}

interface IModalsConfigItem {
  component: ComponentType<ComponentProps<any>>;
  data?: Record<string, any>;
  isOpen?: boolean;
}

interface TModalsConfig {
  [key: string]: IModalsConfigItem;
}

export const ModalProvider = ({ children }: IModalProviderProps) => {
  const [modalsConfig, setConfig] = useState<TModalsConfig>({});

  const hideModal = useCallback(
    (modalKey: string, onClose = () => null) => {
      setConfig((prevConfig) => ({
        ...prevConfig,
        [`${modalKey}`]: { ...prevConfig[`${modalKey}`], isOpen: false },
      }));

      if (onClose) {
        onClose();
      }
    },
    [setConfig],
  );

  const showModal = useCallback(
    (
      modalKey: string,
      component: ComponentType<Record<string, unknown>>,
      modalData: Record<string, unknown>,
    ) => {
      setConfig((prevConfig) => ({
        ...prevConfig,
        [modalKey]: { isOpen: true, component, data: modalData },
      }));
    },
    [setConfig],
  );

  const hideAllModals = useCallback(
    () => Object.keys(modalsConfig).map((modalKey) => hideModal(modalKey)),
    [hideModal, modalsConfig],
  );

  const contextValue = useMemo(
    () => ({
      showModal,
      hideModal,
      hasActiveModal: Object.values(modalsConfig).some(({ isOpen }) => isOpen),
    }),
    [hideModal, showModal, modalsConfig],
  );

  const renderModal = useMemo(
    () =>
      Object.keys(modalsConfig).map((modalKey) => {
        const { component, isOpen, data } = modalsConfig[`${modalKey}`];
        const Component = component;
        const showComponent = isOpen && component;

        return (
          showComponent && (
            <Component
              onClose={() => hideModal(modalKey)}
              key={modalKey}
              isOpen={isOpen}
              {...data}
            />
          )
        );
      }),
    [hideModal, modalsConfig],
  );

  useEventListener(CUSTOM_EVENTS.AUTO_LOGOUT, hideAllModals);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {renderModal}
    </ModalContext.Provider>
  );
};
