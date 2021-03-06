import { i18n } from '@lingui/core';
import { defineMessage } from '@lingui/macro';

import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import Footer from '../Footer';

import MainNavigation from '../MainNavigation';

import styles from './layout.module.css';

const siteTitle = 'Christina & Patrick\'s Wedding';

export const getTranslatedSiteTitle = (): string => i18n._(defineMessage({
  id: 'siteTitle',
  message: 'Christina & Patrick\'s Wedding'
}));

interface Props {
  children?: ReactNode;
  headerImageUrl?: string;
}

const Layout = ({ children, headerImageUrl }: Props): ReactElement => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Wedding" />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={getTranslatedSiteTitle()} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className={styles.bg}></div>
      <header className={styles.header}>
        <MainNavigation />
      </header>
      {headerImageUrl && <img className={styles.headerImage} src={`/images/${headerImageUrl}`} />}
      <div className={styles.container}>
        <main>{children}</main>
      </div>
      <div className={styles.footerWrapper}>
        <div className={styles.container}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
