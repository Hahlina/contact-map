import { FC } from 'react';
import { useUpdateContactMutation } from '@/common/api/services/contacts/contactsApi';
import Input from '@/common/components/Input/Input';
import { Button } from '@/common/components/Button/Button';
import { useNotification } from '@/common/hooks/useNotification';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { TableData } from '@/common/types/Api';
import { EMPTY_STRING } from '@/common/constants/initValue';
import { yupResolver } from '@hookform/resolvers/yup';
import { NotificationContent } from '@/common/components/NotificationContent/NotificationContent';
import { getValidDateFormat } from '@/common/utils/getValidDateFormat';
import { contactUpdateSchema } from '@/common/validateSchemas/contactUpdateSchema';
import { FORM_FIELD } from '@/common/constants/formField';
import { INPUT_FIELD } from '@/common/components/Input/inputField';
import {
  AUTH_MESSAGES,
  NOTIFICATION_TITLE,
  NOTIFICATION_TYPES,
} from '@/common/constants/notification';
import { DATE_FORMATS } from '@/common/constants/dateFormats';

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
  const isValidDate = moment(birthday_date).isValid();
  const validDate = getValidDateFormat(birthday_date);
  const formMethods = useForm<TableData>({
    defaultValues: {
      [INPUT_FIELD.NAME]: name,
      [INPUT_FIELD.EMAIL]: email,
      [INPUT_FIELD.BIRTHDAY_DATE]: isValidDate ? birthday_date : EMPTY_STRING,
      [INPUT_FIELD.PHONE_NUMBER]: phone_number,
      [INPUT_FIELD.ADDRESS]: address,
    },
    mode: 'onBlur',
    resolver: yupResolver(contactUpdateSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = formMethods;

  const onSubmit = async (data: TableData) => {
    console.log('-> data', data);
    try {
      if (isError) {
        return notify(
          <NotificationContent
            title={NOTIFICATION_TITLE.ERROR}
            body={AUTH_MESSAGES.ERROR}
          />,
          NOTIFICATION_TYPES.ERROR,
        );
      }
    } catch (e) {}
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
        <DatePicker
          className={styles.dataPicker}
          selected={new Date(isValidDate ? birthday_date : validDate)}
          onChange={(date) => {
            formMethods.setValue(
              INPUT_FIELD.BIRTHDAY_DATE,
              date ? moment(date).format(DATE_FORMATS.DD_MM_YY) : EMPTY_STRING,
            );
          }}
          dateFormat={DATE_FORMATS.DD_MM_YY}
          placeholderText={FORM_FIELD.BIRTHDAY}
        />
        <Input
          placeholder={FORM_FIELD.PHONE}
          type={INPUT_FIELD.PHONE}
          {...register(INPUT_FIELD.PHONE_NUMBER)}
          errorMessage={errors?.phone_number?.message}
        />
        <Input
          placeholder={FORM_FIELD.ADDRESS}
          {...register(INPUT_FIELD.ADDRESS)}
          errorMessage={errors?.address?.message}
        />
        <Button type={'submit'}>Update contact</Button>
      </form>
    </div>
  );
};
