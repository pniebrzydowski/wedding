import { PropsWithChildren, ReactElement } from 'react';

import styles from './padding.module.css';

interface Props {
  factor?: 1 | 2 | 3 | 4;
}

function Padding({ factor = 1, children }: PropsWithChildren<Props>): ReactElement {
  return (
    <div className={[styles.wrapper, styles[`factor${factor}`]].join(' ')}>
      {children}
    </div>
  );
}

export default Padding;