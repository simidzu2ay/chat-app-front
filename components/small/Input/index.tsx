import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register?: () => UseFormRegisterReturn | void;
}

const Input = ({
  type,
  className,
  register = () => {},
  ...props
}: InputProps) => {
  return (
    <input
      className={classNames(styles.input, className)}
      type={type || 'text'}
      {...register()}
      {...props}
    />
  );
};

export default Input;
