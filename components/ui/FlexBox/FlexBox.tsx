import { PropsWithChildren, ReactElement } from 'react';

import styles from './flexBox.module.css';

interface Props {
  flexDirection?: 'column' | 'row';
  factor?: 1 | 2 | 3 | 4;
}

function FlexBox({ flexDirection = 'row', factor = 1, children }: PropsWithChildren<Props>): ReactElement {
  return (
    <div className={[styles.wrapper, styles[flexDirection], styles[`factor${factor}`]].join(' ')}>
      {children}
    </div>
  );
}

export default FlexBox;