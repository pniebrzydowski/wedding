import { ButtonHTMLAttributes, ReactElement } from 'react';

import styles from './button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: 'primary' | 'secondary'
}

function Button({ buttonType, children, ...rest }: Props): ReactElement {
  return (
    <button className={styles[buttonType]} {...rest}>
      {children}
    </button>
  );
}

export default Button;