import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Button } from '@/common/components/Button/Button';

import styles from './NotificationContent.module.scss';

interface INotificationContentProps {
  title: ReactNode;
  body?: ReactNode;
  titleClassName?: string;
  bodyClassName?: string;
  buttonClassName?: string;
  buttonLabel?: string;
  onButtonClick?: (value: any) => void;
}

export const NotificationContent: FC<INotificationContentProps> = ({
  title,
  body,
  titleClassName,
  bodyClassName,
  buttonClassName,
  buttonLabel,
  onButtonClick,
}) => (
  <div className={styles.notificationContent}>
    <h2 className={classNames(styles.title, titleClassName)}>{title}</h2>
    {body && <div className={classNames(styles.body, bodyClassName)}>{body}</div>}
    {buttonLabel && (
      <Button
        className={classNames(styles.button, buttonClassName)}
        onClick={onButtonClick}
      >
        {buttonLabel}
      </Button>
    )}
  </div>
);
