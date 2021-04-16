import { ReactElement, useContext } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { getTranslatedSiteTitle } from '../components/Layout';
import SplashScreen from '../components/SplashScreen';
import { FirebaseContext } from '../firebase';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const saveInviteId = (inviteId: string) => {
  localStorage.setItem('inviteId', inviteId);
};

function Index(): ReactElement {
  const { query } = useRouter();
  const firebase = useContext(FirebaseContext);

  if (query.inviteId) {
    const id = query.inviteId as string;
    saveInviteId(id);

    const openedAt = dayjs().utc().format('YYYY-MM-DD HH:mm');
    firebase.firestore
      .collection('invites')
      .doc(id)
      .update({
        opened: true,
        openedAt
      });
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
