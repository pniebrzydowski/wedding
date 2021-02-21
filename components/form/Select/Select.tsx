import { ReactElement, ReactNode } from 'react';

import { useFormContext } from 'react-hook-form';

import FieldWrapper from '../FieldWrapper';
import styles from '../form.module.css';

export interface SelectOption {
  label?: string;
  value: string;
}

interface Props {
  formName: string;
  fieldName: string;
  label?: ReactNode;
  options: SelectOption[];
  defaultValue?: string;
  error?: string;
  required?: boolean;
}

function Select({
  formName,
  fieldName,
  label,
  options,
  defaultValue,
  error,
  required,
}: Props): ReactElement {
  const { register } = useFormContext();
  const fieldId = `${formName}_${fieldName}`;

  return (
    <FieldWrapper fieldId={fieldId} label={label} error={error}>
      <select
        className={styles.formField}
        id={fieldId}
        name={fieldName}
        defaultValue={defaultValue}
        ref={register({ required })}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

export default Select;
