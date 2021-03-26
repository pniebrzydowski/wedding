import { ReactElement } from 'react';

import Head from 'next/head';

import Padding from '../../components/ui/Padding';
import InviteList from '../../components/admin/InviteList';
import NewInvite from '../../components/admin/NewInvite';

function Admin(): ReactElement {
  return (
    <>
      <Head>
        <title>Admin | Invites</title>
      </Head>
      <Padding>
        <NewInvite />
      </Padding>
      <Padding>
        <InviteList />
      </Padding>
    </>
  );
}

export default Admin;
