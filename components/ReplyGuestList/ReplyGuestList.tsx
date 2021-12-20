import { ReactElement, useContext } from 'react';

import { i18n } from '@lingui/core';
import { defineMessage, plural, Trans } from '@lingui/macro';
import { FormProvider, useForm } from 'react-hook-form';

import { FirebaseContext } from '../../firebase';
import useCollectionDocsData from '../../firebase/hooks/useCollectionDocsData';
import { Attending, Guest } from '../../firebase/types';
import GuestReplyForm from '../GuestReplyForm';
import InviteNotFound from '../InviteNotFound';
import Button from '../ui/Button';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import GuestReplyFormUS from '../partyUS/GuestReplyForm';

dayjs.extend(utc);

const getSuccessMessage = (attending: Attending[], numberOfGuests: number): string => {
  if (attending.every(v => v === 'yes')) {
    return i18n._(defineMessage({
      id: 'reply:success.attending',
      message: plural(numberOfGuests, {
        one: 'Looking forward to seeing you there!',
        other: 'Looking forward to seeing you there!'
      })
    }));
  }

  if (attending.every(v => v === 'no')) {
    return i18n._(
      defineMessage({
        id: 'reply:success.notAttending',
        message: plural(numberOfGuests, {
          one: 'Sorry that you can\'t join us, hope to see you soon!',
          other: 'Sorry that you can\'t join us, hope to see you soon!'
        })
      }));
  }

  return i18n._(defineMessage({
    id: 'reply:success.noResponse',
    message: 'Thanks for your response!'
  }));
};

interface Props {
  inviteId: string;
  partyLocation?: 'austria' | 'us';
}

function ReplyGuestList({ inviteId, partyLocation = 'austria' }: Props): ReactElement {
  const attendingKey = partyLocation === 'austria' ? 'attending' : 'attendingUS';
  const { loading, data: guests } = useCollectionDocsData<Guest>({
    collection: 'guests',
    query: {
      field: 'inviteId',
      operator: '==',
      value: inviteId,
    },
  });
  const firebase = useContext(FirebaseContext);
  const form = useForm();

  const { handleSubmit, formState: { isSubmitting } } = form;

  if (loading) {
    return <Trans id="reply:loading">Loading...</Trans>;
  }

  if (!guests?.length) {
    return <InviteNotFound />;
  }

  const onSubmit = async (values: { guest: { [key: string]: Partial<Guest> } }) => {
    const guestIds = Object.keys(values.guest);
    const replyTime = dayjs().utc().format('YYYY-MM-DD HH:mm');


    const batch = firebase.firestore.batch();
    const attending: Attending[] = [];
    guestIds.forEach(id => {
      const updatedGuest: Partial<Guest> = values.guest[id];
      updatedGuest[partyLocation === 'austria' ? 'replyAt' : 'replyAtUS'] = replyTime;

      const guestDoc = firebase.firestore
        .collection('guests')
        .doc(id);
      batch.update(guestDoc, updatedGuest);
      attending.push(values.guest[id][attendingKey]);
    });

    batch
      .commit()
      .then(() => {
        const message = getSuccessMessage(attending, guestIds.length);
        toast.success(message, { toastId: 'reply-response' });
      })
      .catch((err) => {
        toast.error(
          i18n._(defineMessage({
            id: 'reply:error',
            message: 'There was an error. Try again or contact us if you continue to have problems.'
          })),
          { toastId: 'reply-response' }
        );
      });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
      />
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul>
            {guests.map((guest) => (
              partyLocation === 'austria' ?
                <GuestReplyForm guest={guest} key={guest.id} />
                : <GuestReplyFormUS guest={guest} key={guest.id} />
            ))}
          </ul>
          <Button buttonType="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? '...'
              : <Trans id="reply:save">Save</Trans>
            }
          </Button>
        </form></FormProvider>
    </>
  );
}

export default ReplyGuestList;
