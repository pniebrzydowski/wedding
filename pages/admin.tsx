import { ReactElement } from 'react';

import Head from 'next/head';

import GuestList from '../components/admin/GuestList';
import NewInvite from '../components/admin/NewInvite';
import { getTranslatedSiteTitle } from '../components/Layout';
import FlexBox from '../components/ui/FlexBox';
import Padding from '../components/ui/Padding';

function Admin(): ReactElement {
  return (
    <>
      <Head>
        <title>Admin | {getTranslatedSiteTitle()}</title>
      </Head>
      <Padding>
        <FlexBox flexDirection="column" factor={3}>
          <NewInvite />
          <GuestList />
        </FlexBox>
      </Padding>
    </>
  );
}

export default Admin;
