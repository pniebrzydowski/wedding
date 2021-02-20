import { PropsWithChildren, ReactElement } from 'react';

import styles from './grid.module.css';

interface Props {
  factorX?: 1 | 2 | 3 | 4;
}

function Grid({ factorX = 1, children }: PropsWithChildren<Props>): ReactElement {
  return (
    <div className={[styles.wrapper, styles[`x${factorX}`]].join(' ')}>
      {children}
    </div>
  );
}

export default Grid;