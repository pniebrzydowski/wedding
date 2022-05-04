import { ReactElement } from 'react';
import Grid from '../../ui/Grid';

import styles from './homeContent.module.css';

interface Props {
  basicInfo: string;
  additionalInfo: string
}

const HomeContentUS = ({ basicInfo, additionalInfo }: Props): ReactElement => {
  return (
    <Grid align='center'>
      <div>
        <div className={styles.basicInfo} dangerouslySetInnerHTML={{ __html: basicInfo }} />
        <div className={styles.additionalInfo} dangerouslySetInnerHTML={{ __html: additionalInfo }} />
      </div>
      <div className={styles.imgWrapper}>
        <img src="/images/cp-hallstatt.jpg" />
        <img src="/images/cp-hands.jpg" />
      </div>
    </Grid>

  );
};

export default HomeContentUS;
