import { ReactElement } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { getTranslatedSiteTitle } from '../components/Layout';
import SplashScreen from '../components/SplashScreen';

const saveInviteId = (inviteId: string) => {
  localStorage.setItem('inviteId', inviteId);
};

function Index(): ReactElement {
  const { query } = useRouter();

  if (query.inviteId) {
    saveInviteId(query.inviteId as string);
  }

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
