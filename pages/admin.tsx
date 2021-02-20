import Head from 'next/head';
import { FunctionComponent } from 'react';
import GuestList from '../components/admin/AdminGuestList';
import NewInvite from '../components/admin/NewInvite';
import Layout, { siteTitle } from '../components/Layout';

const Admin:FunctionComponent = () => {
  return (
    <Layout>
      <Head>
        <title>Admin | {siteTitle}</title>
      </Head>
      <NewInvite />
      <GuestList />
    </Layout>
  );
};

export default Admin;
