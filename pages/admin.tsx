import Head from 'next/head';
import { FunctionComponent } from 'react';
import GuestList from '../components/admin/AdminGuestList';
import NewInvite from '../components/admin/NewInvite';
import Layout, { siteTitle } from '../components/Layout';
import FlexBox from '../components/ui/FlexBox';

const Admin:FunctionComponent = () => {
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
};

export default Admin;
