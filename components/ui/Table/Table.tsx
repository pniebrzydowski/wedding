import { PropsWithChildren, ReactElement, TableHTMLAttributes } from 'react';

import styles from './table.module.css';

function Table({ children }: PropsWithChildren<TableHTMLAttributes<any>>): ReactElement {
  return (
    <table className={styles.table}>
      {children}
    </table>
  );
}

export default Table;