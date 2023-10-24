import { FC } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/common/components/Input/Input';
import { Button } from '@/common/components/Button/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { INPUT_FIELD } from '@/common/components/Input/inputField';
import { FORM_FIELD } from '@/common/constants/formField';
import { CustomAuth } from '@/common/types/Api';
import { loginSchema } from '@/common/validateSchemas/loginSchema';
import { useLocalStorageWrite } from '@/common/hooks/useLocalStorageWrite';
import { useLoginMutation } from '@/common/api/services/auth/authApi';
import { useAppDispatch } from '@/common/hooks/redux/redux';
import { useNotification } from '@/common/hooks/useNotification';
import { login } from '@/common/store/reducers/authSlice';
import { NotificationContent } from '@/common/components/NotificationContent/NotificationContent';
import {
  AUTH_MESSAGES,
  NOTIFICATION_TITLE,
  NOTIFICATION_TYPES,
} from '@/common/constants/notification';
import { LOCAL_STORAGE } from '@/common/constants/localStorage';
import { ROUTES } from '@/common/constants/routes';
import { EMPTY_STRING } from '@/common/constants/initValue';

import styles from './LoginForm.module.scss';

interface ILoginFormProps {
  onClose?: () => void;
}

export const LoginForm: FC<ILoginFormProps> = ({ onClose }) => {
  const notify = useNotification();
  const router = useRouter();
  const setAuth = useLocalStorageWrite(LOCAL_STORAGE.AUTH);
  const dispath = useAppDispatch();
  const [loginCreate, { isLoading }] = useLoginMutation();
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
    setError,
    reset,
  } = formMethods;

  const onSubmit = async (data: CustomAuth) => {
    try {
      const loginResponce = await loginCreate(data);
      if ('error' in loginResponce) {
        throw new Error(JSON.stringify(loginResponce));
      }
      notify(
        <NotificationContent
          title={NOTIFICATION_TITLE.SUCCESS}
          body={AUTH_MESSAGES.SUCCESS}
        />,
        NOTIFICATION_TYPES.SUCCESS,
      );
      setAuth(true);
      dispath(login);
      router.push(ROUTES.CONTACTS);
      reset();
      onClose?.();
    } catch (error) {
      if (error instanceof Error) {
        const errorData = JSON.parse(error.message);
        const errorMessage = errorData?.error?.data?.error;
        if (errorData && errorMessage) {
          return notify(
            <NotificationContent title={NOTIFICATION_TITLE.ERROR} body={errorMessage} />,
            NOTIFICATION_TYPES.ERROR,
          );
        } else
          return notify(
            <NotificationContent
              title={NOTIFICATION_TITLE.ERROR}
              body={AUTH_MESSAGES.ERROR}
            />,
            NOTIFICATION_TYPES.ERROR,
          );
      }
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
