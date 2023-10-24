'use client';
import { ChangeEvent, FC, forwardRef, useState } from 'react';
import classNames from 'classnames';
import ShowPasswordIcon from '../../assets/icons/showPassword.svg';
import HidePasswordIcon from '../../assets/icons/hidePassword.svg';
import { INPUT_FIELD } from './inputField';

import styles from './Input.module.scss';

interface IPropsInputGroup {
  type?: INPUT_FIELD;
  name?: string;
  id?: string;
  value?: string;
  classNameInput?: string;
  classNameError?: string;
  errorMessage?: string;
  classNameWrapper?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

const InputGroup: FC<IPropsInputGroup> = forwardRef<HTMLInputElement, IPropsInputGroup>(
  (
    {
      value,
      type = 'text',
      name,
      id,
      classNameInput,
      classNameError,
      classNameWrapper,
      onChange,
      errorMessage,
      placeholder,
      disabled,
      autoFocus = false,
      ...otherProps
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={classNames(styles.inputWrapper, classNameWrapper)}>
        <input
          value={value}
          type={showPassword ? INPUT_FIELD.TEXT : type}
          id={id}
          className={classNames(styles.input, classNameInput, {
            [styles.withError]: errorMessage,
          })}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          ref={ref}
          {...otherProps}
        />
        {type === INPUT_FIELD.PASSWORD && (
          <span className={styles.passwordToggle} onClick={handleTogglePassword}>
            {showPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
          </span>
        )}
        {errorMessage && (
          <p className={classNames(styles.errorMassage, classNameError)}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

InputGroup.displayName = 'Input';
export default InputGroup;
