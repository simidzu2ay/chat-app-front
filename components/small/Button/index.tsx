import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const Button = ({ type, children, ...props }: ButtonProps) => {
  return (
    <button className={classNames(styles.action)} {...props}>
      {children}
    </button>
  );
};

export default Button;
