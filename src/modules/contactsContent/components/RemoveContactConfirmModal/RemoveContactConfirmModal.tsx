'use client';
import { FC } from 'react';
import { useNotification } from '@/common/hooks/useNotification';
import { NotificationContent } from '@/common/components/NotificationContent/NotificationContent';
import { ConfirmModal } from '@/common/components/ConfirmModal/ConfirmModal';
import {
  NOTIFICATION_TITLE,
  NOTIFICATION_TYPES,
  TABLE_ACTION_MESSAGES,
} from '@/common/constants/notification';
import { TableData } from '@/common/types/Api';
import { useRemoveContactMutation } from '@/common/api/services/contacts/contactsApi';

interface IRemoveContactConfirmModalProps extends TableData {
  isOpen: boolean;
  onClose: () => void;
}

export const RemoveContactConfirmModal: FC<IRemoveContactConfirmModalProps> = ({
  isOpen,
  onClose,
  name,
  id,
}) => {
  const modalTitle = `Delete contact - ${name}?`;
  const notify = useNotification();
  const [removeContact, { isSuccess, isError }] = useRemoveContactMutation();
  const onConfirmRemove = async () => {
    try {
      const contactId = id ? id : 0;
      const deleteResponse = await removeContact({ id: contactId });
      if ('error' in deleteResponse) {
        onClose();
        throw new Error(JSON.stringify(deleteResponse));
      }
      notify(
        <NotificationContent
          title={NOTIFICATION_TITLE.SUCCESS}
          body={TABLE_ACTION_MESSAGES.SUCCESS_DELETE}
        />,
        NOTIFICATION_TYPES.SUCCESS,
      );
    } catch (error) {
      if (error instanceof Error) {
        const errorData = JSON.parse(error.message);
        const errorMessage = errorData?.error?.data?.detail;
        if (errorData && errorMessage) {
          return notify(
            <NotificationContent title={NOTIFICATION_TITLE.ERROR} body={errorMessage} />,
            NOTIFICATION_TYPES.ERROR,
          );
        } else
          return notify(
            <NotificationContent
              title={NOTIFICATION_TITLE.ERROR}
              body={TABLE_ACTION_MESSAGES.ERROR}
            />,
            NOTIFICATION_TYPES.ERROR,
          );
      }
    }
  };
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      center={true}
      header={modalTitle}
      blockScroll={true}
      onConfirm={onConfirmRemove}
    />
  );
};
