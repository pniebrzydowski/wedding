import React, { FunctionComponent } from "react";
import styles from "../form.module.css";

interface Props {
  fieldId: string;
  label?: string;
  error?: string;
}

const FieldWrapper: FunctionComponent<Props> = ({
  fieldId,
  label,
  error,
  children,
}) => {
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
};

export default FieldWrapper;
