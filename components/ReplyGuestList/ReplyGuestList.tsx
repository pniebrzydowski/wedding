import { ReactElement } from 'react';

import { Trans } from '@lingui/macro';
import useCollectionDocsData from '../../firebase/hooks/useCollectionDocsData';
import { Guest } from '../../firebase/types';
import GuestReplyForm from '../GuestReplyForm';
import InviteNotFound from '../InviteNotFound';

interface Props {
  inviteId: string;
}

function ReplyGuestList({ inviteId }: Props): ReactElement {
  const { loading, data: guests } = useCollectionDocsData<Guest>({
    collection: 'guests',
    query: {
      field: 'inviteId',
      operator: '==',
      value: inviteId,
    },
  });

  if (loading) {
    return <>Loading...</>;
  }

  if (!guests?.length) {
    return <InviteNotFound />;
  }

  return (
    <ul>
      {guests.map((guest) => <GuestReplyForm guest={guest} key={guest.id} />)}
    </ul>
  );
}

export default ReplyGuestList;
