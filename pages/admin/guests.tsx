import { ReactElement } from 'react';

import Head from 'next/head';

import GuestList from '../../components/admin/GuestList';
import FlexBox from '../../components/ui/FlexBox';
import Padding from '../../components/ui/Padding';

function Admin(): ReactElement {
  return (
    <>
      <Head>
        <title>Guest List</title>
      </Head>
      <Padding>
        <FlexBox flexDirection="column" factor={3}>
          <GuestList />
        </FlexBox>
      </Padding>
    </>
  );
}

export default Admin;
