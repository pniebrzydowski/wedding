import { Trans } from '@lingui/macro';
import Link from 'next/link';
import { ReactElement } from 'react';
import { getRouteUrl, RouteName } from '../MainNavigation/routes';

import styles from './footer.module.css';

const Footer = (): ReactElement => {  
  const faqLink = (
    <Link href={getRouteUrl(RouteName.Faq)}>
      <a><Trans id="footer:faqLink">FAQs</Trans></a>
    </Link>
  );

  return (
    <div className={styles.container}>
      <div>
        <h4>
          <Trans id="footer:social">Social</Trans>
        </h4>
        <p>
          <Trans id="footer:publicGroup">
            As so many people are travelling in and with the pandemic creeping in the background,
            we thought it could be useful to have a public group chat where we can answer any of your questions.
            Also, it could provide an opportunity to organize groups for ride-sharing, to save money on the train,
            or travelling around before or after the wedding.
          </Trans>
        </p>
        <div>
          <a className={styles.telegramLink} href="https://t.me/joinchat/RcMHaKRjn9hlMWRk">
            <img className={styles.telegramIcon} src="/images/Telegram.svg" />
            <Trans id="footer:telegramLinkText">
            Join the telegram group here
            </Trans>
          </a>
        </div>
      </div>
      <div>
        <h4>
          <Trans id="footer:questions">Have questions?</Trans>
        </h4>
        <p>
          <Trans id="footer:contact">
            If you can&apos;t find what you&apos;re looking for in our {faqLink}, you can ask in our{' '}
            <a href="https://t.me/joinchat/RcMHaKRjn9hlMWRk">Group Chat on Telegram</a>{' '}
            or write us an email at{' '}
            <a href="mailto:christina.patrick.2021@gmail.com">christina.patrick.2021@gmail.com</a>.
          </Trans>
        </p>
      </div>
    </div>
  );
};

export default Footer;
