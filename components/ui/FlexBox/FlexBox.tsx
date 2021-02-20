import { FunctionComponent } from 'react';

import styles from './flexBox.module.css';

interface Props {
  flexDirection?: 'column' | 'row';
  factor?: 1 | 2 | 3 | 4;
}

const FlexBox: FunctionComponent<Props> = ({ flexDirection = 'row', factor = 1, children }: Props) => (
  <div className={[styles.wrapper, styles[flexDirection], styles[`factor${factor}`]].join(' ')}>
    {children}
  </div>
);

export default FlexBox;