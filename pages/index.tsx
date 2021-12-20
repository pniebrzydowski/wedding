import { ReactElement } from 'react';

import Head from 'next/head';

import { getTranslatedSiteTitle } from '../components/Layout';
import useInviteId from '../firebase/hooks/useInviteId';
import SplashScreenUS from '../components/partyUS/SplashScreen';

function Index(): ReactElement {
  useInviteId();

  return (
    <>
      <Head>
        <title>{getTranslatedSiteTitle()}</title>
      </Head>
      <SplashScreenUS />
    </>
  );
}

export default Index;
