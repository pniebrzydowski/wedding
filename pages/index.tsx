import { ReactElement, useContext } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { getTranslatedSiteTitle } from '../components/Layout';
import SplashScreen from '../components/SplashScreen';
import { FirebaseContext } from '../firebase';

const saveInviteId = (inviteId: string) => {
  localStorage.setItem('inviteId', inviteId);
};

function Index(): ReactElement {
  const { query } = useRouter();
  const firebase = useContext(FirebaseContext);

  if (query.inviteId) {
    const id = query.inviteId as string;
    saveInviteId(id);

    firebase.firestore
      .collection('invites')
      .doc(id)
      .update({
        opened: true
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
