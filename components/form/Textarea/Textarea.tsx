import React, { FunctionComponent } from "react";

import { useFormContext } from "react-hook-form";

import FieldWrapper from "../FieldWrapper";
import styles from "../form.module.css";

interface Props {
  formName: string;
  fieldName: string;
  label?: string;
  defaultValue?: string;
  error?: string;
  required?: boolean;
}

const Textarea: FunctionComponent<Props> = ({
  formName,
  fieldName,
  defaultValue,
  label,
  error,
  required,
}) => {
  const { register } = useFormContext();
  const fieldId = `${formName}_${fieldName}`;

  return (
    <FieldWrapper fieldId={fieldId} label={label} error={error}>
      <textarea
        className={styles.formField}
        id={fieldId}
        name={fieldName}
        defaultValue={defaultValue}
        ref={register({ required })}
      />
    </FieldWrapper>
  );
};

export default Textarea;
