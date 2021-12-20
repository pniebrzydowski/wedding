import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Invite } from '../types';

dayjs.extend(utc);

type PartyLocation = 'austria' | 'us';

const useInviteId = (party: PartyLocation = 'austria'): string => {
  const { query } = useRouter();
  const firebase = useContext(FirebaseContext);

  const [inviteId, setInviteId] = useState('');
  useEffect(() => {
    if (query.inviteId) {
      const id = query.inviteId as string;
      localStorage.setItem('inviteId', inviteId);

      const openedAt = dayjs().utc().format('YYYY-MM-DD HH:mm');
      const updatedData: Partial<Invite> = party === 'austria' ? {
        opened: true,
        openedAt
      } : {
        openedUS: true,
        openedAtUS: openedAt
      };


      const doc = firebase.firestore
        .collection('invites')
        .doc(id);

      doc.get()
        .then(resDoc => {
          if (!resDoc.exists) {
            return;
          }
          doc.update(updatedData);
          setInviteId(id);
          return;
        })
    }

    const iId = localStorage.getItem('inviteId');
    if (iId) {
      setInviteId(iId);
    }
  });

  return inviteId;
};

export default useInviteId;