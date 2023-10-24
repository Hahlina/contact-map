'use client';
import { FC, ReactNode, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import classNames from 'classnames';
import { Button } from '../Button/Button';
import { Loader } from '@/common/components/Loader/Loader';

import styles from './ConfirmModal.module.scss';

export interface IConfirmModalProps {
  header: string;
  textAlign?: 'center';
  buttonConfirmLabel?: string;
  buttonCancelLabel?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children?: ReactNode;
  center?: boolean;
  blockScroll?: boolean;
  closeOnOverlayClick?: boolean;
  classNames?: {
    header?: string;
    body?: string;
    buttonCancel?: string;
    buttonConfirm?: string;
  };
}

export const ConfirmModal: FC<IConfirmModalProps> = ({
  header,
  textAlign = 'left',
  isOpen,
  onClose,
  onConfirm,
  children,
  center = true,
  blockScroll = false,
  closeOnOverlayClick = true,
  buttonCancelLabel = 'No',
  buttonConfirmLabel = 'Yes',
  classNames: providedClassNames,
}) => {
  const [modalLoading, setModalLoading] = useState<boolean>(false);

  const headerClasses = classNames(styles.header, providedClassNames?.header);
  const bodyModalClasses = classNames(styles.bodyModal, providedClassNames?.body);
  const buttonCancelClasses = classNames(styles.button, providedClassNames?.buttonCancel);
  const buttonConfirmClasses = classNames(
    styles.button,
    providedClassNames?.buttonConfirm,
  );

  const handleConfirmModal = async () => {
    setModalLoading(true);
    await new Promise((resolve, reject) => {
      resolve(onConfirm?.());
    });
    setModalLoading(false);
  };

  return (
    <Modal
      blockScroll={blockScroll}
      closeOnOverlayClick={closeOnOverlayClick}
      center={center}
      classNames={{
        modal: styles.confirmModal,
        closeIcon: styles.closeIcon,
        closeButton: styles.closeButton,
      }}
      focusTrapped={false}
      open={isOpen}
      onClose={onClose}
    >
      {modalLoading && <Loader />}
      <div className={styles[textAlign]}>
        <div className={headerClasses}>{header}</div>
        <div className={bodyModalClasses}>{children}</div>
      </div>
      <div className={styles.footer}>
        <Button className={buttonCancelClasses} onClick={onClose}>
          {buttonCancelLabel}
        </Button>
        <Button
          className={buttonConfirmClasses}
          onClick={handleConfirmModal}
          disabled={modalLoading}
        >
          {buttonConfirmLabel}
        </Button>
      </div>
    </Modal>
  );
};
