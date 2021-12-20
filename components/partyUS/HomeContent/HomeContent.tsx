import { ReactElement } from 'react';
import Grid from '../../ui/Grid';

import styles from './homeContent.module.css';

interface Props {
  basicInfo: string;
}

const HomeContentUS = ({ basicInfo }: Props): ReactElement => {
  return (
    <>
      <Grid>
        <div className={styles.basicInfo} dangerouslySetInnerHTML={{ __html: basicInfo }} />
        <img src="/images/christina-pat-almkogel.jpg" />
      </Grid>
    </>
  );
};

export default HomeContentUS;
