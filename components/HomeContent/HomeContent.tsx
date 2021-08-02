import { ReactElement } from 'react';
import Grid from '../ui/Grid';

import styles from './homeContent.module.css';

interface Props {
  basicInfo: string;
  covidInfo: string;
}

const HomeContent = ({ basicInfo, covidInfo }: Props): ReactElement => {
  return (
    <>
      <h1 className={styles.basicInfo}>Christina & Patrick</h1>
      <Grid factorX={2}>
        <div className={styles.covidInfo} dangerouslySetInnerHTML={{ __html: covidInfo }} />
        <div>
          <div className={styles.basicInfo} dangerouslySetInnerHTML={{ __html: basicInfo }} />
          <img src="/images/christina-pat-budapest.jpg" />
        </div>
      </Grid>
    </>
  );
};

export default HomeContent;
