import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const useInviteId = (): string => {
  const { query } = useRouter();
  const firebase = useContext(FirebaseContext);

  const [inviteId, setInviteId] = useState('');
  useEffect(() => {
    if (query.inviteId) {
      const id = query.inviteId as string;
      localStorage.setItem('inviteId', inviteId);
  
      const openedAt = dayjs().utc().format('YYYY-MM-DD HH:mm');
      firebase.firestore
        .collection('invites')
        .doc(id)
        .update({
          opened: true,
          openedAt
        });
      
      setInviteId(id);
      return;
    }
    
    const iId = localStorage.getItem('inviteId');
    if (iId) {
      setInviteId(iId);
    }
  });

  return inviteId;
};

export default useInviteId;