import { Trans } from '@lingui/macro';
import Link from 'next/link';
import { ReactElement } from 'react';
import { getRouteUrl, RouteName } from '../MainNavigation/routes';
import Button from '../ui/Button';

import styles from './homeContent.module.css';

interface Props {
  basicInfo: string;
}

const HomeContent = ({ basicInfo }: Props): ReactElement => {
  return (
    <div className={styles.container}>
      <div className={styles.basicInfo} dangerouslySetInnerHTML={{ __html: basicInfo }} />
      <div className={styles.imgWrapper}>
        <img src="/images/christina-pat-budapest.jpeg" />
      </div>
      <div className={styles.buttonWrapper}>
        <Link href={getRouteUrl(RouteName.Reply)}>
          <Button buttonType="primary">
            <Trans id="home:replyButtonLabel">
              Let us know if you can make it!
            </Trans>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeContent;
