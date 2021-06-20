import { ReactElement } from 'react';

import Head from 'next/head';

import { getTranslatedSiteTitle } from '../components/Layout';
import SplashScreen from '../components/SplashScreen';
import useInviteId from '../firebase/hooks/useInviteId';

function Index(): ReactElement {
  useInviteId();

  return (
    <>
      <Head>
        <title>{getTranslatedSiteTitle()}</title>
      </Head>
      <SplashScreen />
    </>
  );
}

export default Index;
