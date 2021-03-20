import { ReactElement } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout, { getTranslatedSiteTitle } from '../components/Layout';

const saveInviteId = (inviteId: string) => {
  localStorage.setItem('inviteId', inviteId);
};

function Home(): ReactElement {
  const { query } = useRouter();

  if (query.inviteId) {
    saveInviteId(query.inviteId as string);
  }

  return (
    <Layout>
      <Head>
        <title>{getTranslatedSiteTitle()}</title>
      </Head>
    </Layout>
  );
}

export default Home;
