'use client';
import { FC } from 'react';
import { Modal } from '@/common/components/Modal/Modal';
import { ContactUpdateForm } from '../ContactUpdateForm/ContactUpdateForm';
import { MODAL_SIZES } from '@/common/components/Modal/constants';
import { TableData } from '@/common/types/Api';

import styles from './ContactUpdateModal.module.scss';

interface IContactUpdateModalProps extends TableData {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactUpdateModal: FC<IContactUpdateModalProps> = ({
  isOpen,
  onClose,
  ...rest
}) => {
  return (
    <Modal
      bodyClassName={styles.contactUpdateModal}
      isOpen={isOpen}
      onClose={onClose}
      size={MODAL_SIZES.XS}
      showCloseIcon={true}
      center={true}
      withFooter={false}
    >
      <ContactUpdateForm {...rest} onClose={onClose} />
    </Modal>
  );
};
