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
        <img src="/images/christina-pat-budapest.jpg" />
      </div>
      <div className={styles.buttonWrapper}>
        <p>
          <Trans id="home:replyText">
            Please let us know if you can make it by July 31st
          </Trans>
        </p>
        <p>
          <Link href={getRouteUrl(RouteName.Reply)}>
            <a>
              <Button buttonType="primary">
                <Trans id="home:replyButtonLabel">
                  Reply now
                </Trans>
              </Button>
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HomeContent;
