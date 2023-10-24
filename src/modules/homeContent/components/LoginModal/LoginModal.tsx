import { FC } from 'react';
import { Modal } from '@/common/components/Modal/Modal';
import { LoginForm } from '@/modules/homeContent/components/LoginForm/LoginForm';
import { MODAL_SIZES } from '@/common/components/Modal/constants';

import styles from './LoginModal.module.scss';

interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const LoginModal: FC<ILoginModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      bodyClassName={styles.loginModal}
      isOpen={isOpen}
      onClose={onClose}
      size={MODAL_SIZES.XS}
      showCloseIcon={true}
      center={true}
      withFooter={false}
    >
      <LoginForm onClose={onClose} />
    </Modal>
  );
};
