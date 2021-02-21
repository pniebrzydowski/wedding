import { PropsWithChildren, ReactElement, ReactNode } from 'react';

import styles from '../form.module.css';

interface Props {
  fieldId: string;
  label?: ReactNode;
  error?: string;
}

function FieldWrapper({
  fieldId,
  label,
  error,
  children,
}: PropsWithChildren<Props> ): ReactElement  {
  return (
    <div className={styles.fieldWrapper}>
      {label && (
        <label className={styles.fieldLabel} htmlFor={fieldId}>
          {label}
        </label>
      )}
      {children}
      {error && <label className={styles.fieldError}>{error}</label>}
    </div>
  );
}

export default FieldWrapper;
