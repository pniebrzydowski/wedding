import { i18n } from '@lingui/core';
import { defineMessage } from '@lingui/macro';

import Head from 'next/head';
import Link from 'next/link';
import { ReactElement, ReactNode } from 'react';
import Footer from '../../Footer';
import LangSwitch from '../../LangSwitch';
import { getHomeRoute } from '../../MainNavigation/routes';

import styles from './layout.module.css';
import navLinkStyles from '../../MainNavigation/mainNavigation.module.css';

export const getTranslatedSiteTitle = (): string => i18n._(defineMessage({
  id: 'siteTitle-us',
  message: 'Christina & Patrick\'s Wedding - Round 2'
}));

interface Props {
  children?: ReactNode;
  headerImageUrl?: string;
}

const LayoutUS = ({ children, headerImageUrl }: Props): ReactElement => {
  const siteTitle = getTranslatedSiteTitle();
  const originalSiteRoute = getHomeRoute();

  return (
    <div className={styles.body}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Wedding" />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className={styles.bg}></div>
      <div className={styles.header}>
        <h1>{siteTitle}</h1>
        <nav>
          <ul>
            <li>
              <Link href={originalSiteRoute.url}>
                <a className={navLinkStyles.navLink}>
                  {i18n._(defineMessage({
                    id: 'pageTitle:originalSite',
                    message: 'Round 1'
                  }))}
                </a>
              </Link>
            </li>
            <LangSwitch />
          </ul>
        </nav>
      </div>
      {headerImageUrl && <img className={styles.headerImage} src={`/images/${headerImageUrl}`} />}
      <div className={styles.container}>
        <main>{children}</main>
      </div>
      <div className={styles.footerWrapper}>
        <div className={styles.container}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LayoutUS;
