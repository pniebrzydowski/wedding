import { ReactElement } from 'react';

import Head from 'next/head';

import GuestList from '../components/admin/GuestList';
import NewInvite from '../components/admin/NewInvite';
import Layout, { siteTitle } from '../components/Layout';
import FlexBox from '../components/ui/FlexBox';

function Admin(): ReactElement {
  return (
    <Layout>
      <Head>
        <title>Admin | {siteTitle}</title>
      </Head>
      <FlexBox flexDirection="column" factor={3}>
        <NewInvite />
        <GuestList />
      </FlexBox>
    </Layout>
  );
}

export default Admin;