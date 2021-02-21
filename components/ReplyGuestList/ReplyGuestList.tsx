import { ReactElement } from 'react';

import { Trans } from '@lingui/macro';
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
          <p>
            <Trans id="reply:noInvite">
              Sorry, we were unable to find your invitation.
              Be sure you accessed the site via the direct link sent in your invitation.
              If you are still having problems, please contact us directly!
            </Trans>
          </p>
        ))}
    </>
  );
}

export default ReplyGuestList;
