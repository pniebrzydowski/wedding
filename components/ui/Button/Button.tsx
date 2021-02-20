import { ButtonHTMLAttributes, FunctionComponent } from 'react';

import styles from './button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: 'primary' | 'secondary'
}

const Button: FunctionComponent<Props> = ({ buttonType, children, ...rest }: Props) => (
  <button className={styles[buttonType]} {...rest}>
    {children}
  </button>
);

export default Button;