'use client';
import { FC, ReactNode, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import useOnClickOutside from '@/common/hooks/useClickOutside';
import { BiLogOut } from 'react-icons/bi';
import Avatar from '../../assets/placeholders/avatar.jpg';

import styles from './UserPopup.module.scss';

interface User {
  name?: string;
  image?: string;
}

interface IUserPopUpProps {
  user?: User;
  handleLogout: () => void;
  classNameItem?: string;
}

export enum POPUP_ITEMS_TYPE {
  LINK = 'link',
  ACTION = 'action',
}

interface IItem {
  icon?: ReactNode;
  type: POPUP_ITEMS_TYPE;
  label: ReactNode;
  onClick?: () => void;
  url?: string;
}

export const UserPopUp: FC<IUserPopUpProps> = ({ user, handleLogout, classNameItem }) => {
  const [show, setShow] = useState<boolean>(false);
  const refPopup = useRef(null);

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const items: IItem[] = [
    {
      type: POPUP_ITEMS_TYPE.ACTION,
      onClick: () => handleLogout(),
      label: 'Logout',
      icon: <BiLogOut />,
    },
  ];

  useOnClickOutside(refPopup, () => setShow(false));

  return (
    <div className={classNames(styles.wrapper, { [styles.show]: show })} ref={refPopup}>
      <div className={styles.header} onClick={handleShow}>
        <Image
          src={user?.image || Avatar}
          alt={'user-avatar'}
          width={40}
          height={40}
          className={styles.image}
        />
        <span className={styles.arrow}></span>
      </div>
      <div className={styles.main}>
        <div className={styles.mainHeader}>
          <Image
            src={user?.image || Avatar}
            alt={'user-avatar'}
            width={30}
            height={30}
            className={styles.image}
          />
          <div className={styles.userInfo}>
            <p>{user?.name}</p>
          </div>
        </div>
        <div className={styles.items}>
          {items?.map(({ type, url, icon, onClick, label }, index) => {
            if (type === POPUP_ITEMS_TYPE.LINK && url) {
              return (
                <div
                  className={classNames(styles.item, classNameItem)}
                  key={index}
                  onClick={handleShow}
                >
                  <Link href={url}>
                    <span>{icon}</span>
                    <span>{label}</span>
                  </Link>
                </div>
              );
            } else if (type === POPUP_ITEMS_TYPE.ACTION && onClick) {
              return (
                <div
                  className={classNames(styles.item, classNameItem)}
                  key={index}
                  onClick={handleShow}
                >
                  <p onClick={onClick}>
                    <span>{icon}</span>
                    <span>{label}</span>
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
