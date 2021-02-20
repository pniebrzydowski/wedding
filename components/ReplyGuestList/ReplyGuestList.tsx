import { ReactElement } from 'react';

import useCollectionDocsData from '../../firebase/hooks/useCollectionDocsData';
import { Guest } from '../../firebase/types';
import GuestReplyForm from '../GuestReplyForm';

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

  return (
    <>
      {loading && 'Loading...'}

      {!loading &&
        guests &&
        (guests.length ? (
          <ul>
            {guests.map((guest) => <GuestReplyForm guest={guest} key={guest.id} />)}
          </ul>
        ) : (
          <>Sorry, no invite was found with this ID</>
        ))}
    </>
  );
}

export default ReplyGuestList;
