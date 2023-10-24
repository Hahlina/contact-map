import { useCallback } from 'react';
import { toast, ToastContent, ToastOptions, TypeOptions } from 'react-toastify';
import { NOTIFICATION_TYPES } from '@/common/constants/notification';

export enum POSITION_TYPES {
  bottomCenter = 'bottom-center',
  bottomLeft = 'bottom-left',
  bottomRight = 'bottom-right',
  topCenter = 'top-center',
  topLeft = ' top-left',
  topRight = 'top-right',
}

const defaultConfig: ToastOptions = {
  autoClose: 3000,
  closeOnClick: true,
  data: {},
  draggable: true,
  hideProgressBar: false,
  pauseOnHover: true,
  position: POSITION_TYPES.topRight,
};

export const useNotification = () =>
  useCallback(
    (
      content: ToastContent,
      type: TypeOptions = NOTIFICATION_TYPES.Info,
      config?: ToastOptions,
    ) =>
      toast(content, {
        ...defaultConfig,
        ...config,
        type,
        // closeButton: NotificationCloseButton,
        icon: true,
        className: `toast ${type}-toast`,
        progressClassName: `progress ${type}-progress`,
      }),
    [],
  );
