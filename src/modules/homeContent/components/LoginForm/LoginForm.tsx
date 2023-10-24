import Input from '@/common/components/Input/Input';
import { Button } from '@/common/components/Button/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { INPUT_FIELD } from '@/common/components/Input/inputField';
import { FORM_FIELD } from '@/common/constants/formField';
import { CustomAuth } from '@/common/types/Api';
import { loginSchema } from '@/common/validateSchemas/loginSchema';
import { EMPTY_STRING } from '@/common/constants/initValue';

import styles from './LoginForm.module.scss';
import { useLoginMutation } from '@/common/api/services/auth/auth';
import { useNotification } from '@/common/hooks/useNotification';
import { NotificationContent } from '@/common/components/NotificationContent/NotificationContent';
import {
  AUTH_MESSAGES,
  NOTIFICATION_TITLE,
  NOTIFICATION_TYPES,
} from '@/common/constants/notification';
import { useLocalStorageWrite } from '@/common/hooks/useLocalStorageWrite';
import { LOCAL_STORAGE } from '@/common/constants/localStorage';

export const LoginForm = () => {
  const notify = useNotification();
  const setAuth = useLocalStorageWrite(LOCAL_STORAGE.AUTH);
  const [login, { data, isError, isLoading }] = useLoginMutation();
  const formMethods = useForm<CustomAuth>({
    defaultValues: {
      [INPUT_FIELD.USERNAME]: EMPTY_STRING,
      [INPUT_FIELD.PASSWORD]: EMPTY_STRING,
    },
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = formMethods;

  const onSubmit = async (data: CustomAuth) => {
    try {
      const sendLogin = await login(data);
      setAuth(true);

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
      <p className={styles.title}>Sign In</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm} noValidate>
        <Input
          placeholder={FORM_FIELD.NAME}
          {...register(INPUT_FIELD.USERNAME)}
          errorMessage={errors?.username?.message}
        />
        <Input
          placeholder={FORM_FIELD.PASSWORD}
          type={INPUT_FIELD.PASSWORD}
          {...register(INPUT_FIELD.PASSWORD)}
          errorMessage={errors?.password?.message}
        />
        <Button type={'submit'} variant={'glass'} disabled={isLoading}>
          Sign In
        </Button>
      </form>
    </div>
  );
};
