import { ReactElement } from 'react';
import Grid from '../../ui/Grid';

import styles from './homeContent.module.css';

interface Props {
  basicInfo: string;
}

const HomeContentUS = ({ basicInfo }: Props): ReactElement => {
  return (
    <Grid align='center'>
      <div className={styles.basicInfo} dangerouslySetInnerHTML={{ __html: basicInfo }} />
      <div className={styles.imgWrapper}>
        <img src="/images/cp-hallstatt.jpg" />
        <img src="/images/cp-hands.jpg" />
      </div>
    </Grid>

  );
};

export default HomeContentUS;
