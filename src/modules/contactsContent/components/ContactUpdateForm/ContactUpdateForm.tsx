import { FC } from 'react';
import Input from '@/common/components/Input/Input';
import { FORM_FIELD } from '@/common/constants/formField';
import { INPUT_FIELD } from '@/common/components/Input/inputField';
import { Button } from '@/common/components/Button/Button';
import { useNotification } from '@/common/hooks/useNotification';
import { useForm } from 'react-hook-form';
import { TableData } from '@/common/types/Api';
import { EMPTY_STRING } from '@/common/constants/initValue';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/common/validateSchemas/loginSchema';
import { NotificationContent } from '@/common/components/NotificationContent/NotificationContent';
import {
  AUTH_MESSAGES,
  NOTIFICATION_TITLE,
  NOTIFICATION_TYPES,
} from '@/common/constants/notification';
import { useUpdateContactMutation } from '@/common/api/services/contacts/contactsApi';
import styles from './ContactUpdateForm.module.scss';

interface IContactUpdateFormProps extends TableData {
  onClose: () => void;
}

export const ContactUpdateForm: FC<IContactUpdateFormProps> = ({
  id,
  name,
  address,
  email,
  phone_number,
  birthday_date,
  onClose,
}) => {
  const notify = useNotification();
  const [updateContact, { data, isError, isLoading }] = useUpdateContactMutation();

  const formMethods = useForm<TableData>({
    defaultValues: {
      [INPUT_FIELD.NAME]: name,
      [INPUT_FIELD.EMAIL]: email,
      [INPUT_FIELD.BIRTHDAY_DATE]: birthday_date,
      [INPUT_FIELD.PHONE_NUMBER]: phone_number,
      [INPUT_FIELD.ADDRESS]: address || EMPTY_STRING,
    },

    mode: 'onBlur',
    // resolver: yupResolver(loginSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = formMethods;

  const onSubmit = async (data: TableData) => {
    try {
      if (isError) {
        return notify(
          <NotificationContent
            title={NOTIFICATION_TITLE.ERROR}
            body={AUTH_MESSAGES.LOGIN_ERROR}
          />,
          NOTIFICATION_TYPES.ERROR,
        );
      }
    } catch (e) {
      console.log('-> e', e);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <p className={styles.title}>Update contact</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
        <Input
          placeholder={FORM_FIELD.NAME}
          {...register(INPUT_FIELD.NAME)}
          errorMessage={errors?.name?.message}
        />
        <Input
          placeholder={FORM_FIELD.EMAIL}
          type={INPUT_FIELD.EMAIL}
          {...register(INPUT_FIELD.EMAIL)}
          errorMessage={errors?.email?.message}
        />
        <Input
          placeholder={FORM_FIELD.BIRTHDAY}
          type={INPUT_FIELD.DATE}
          {...register(INPUT_FIELD.BIRTHDAY_DATE)}
          errorMessage={errors?.birthday_date?.message}
        />
        <Input
          placeholder={FORM_FIELD.PHONE}
          type={INPUT_FIELD.PHONE}
          {...register(INPUT_FIELD.PHONE_NUMBER)}
          errorMessage={errors?.phone_number?.message}
        />
        <Button type={'submit'} variant={'glass'} disabled={isLoading}>
          Update contact
        </Button>
      </form>
    </div>
  );
};
