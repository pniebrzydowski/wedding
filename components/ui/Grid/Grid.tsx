import { PropsWithChildren, ReactElement } from 'react';

import styles from './grid.module.css';

interface Props {
  factorX?: 1 | 2 | 3 | 4;
  align?: 'top' | 'center';
}

function Grid({ factorX = 1, align = 'top', children }: PropsWithChildren<Props>): ReactElement {
  return (
    <div className={[styles.wrapper, styles[`x${factorX}`], styles[`align${align}`]].join(' ')}>
      {children}
    </div>
  );
}

export default Grid;