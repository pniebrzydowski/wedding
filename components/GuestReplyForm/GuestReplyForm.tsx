import { ReactElement, useContext } from 'react';

import { i18n } from '@lingui/core';
import { defineMessage, Trans } from '@lingui/macro';
import { FormProvider, useForm } from 'react-hook-form';

import { FirebaseContext } from '../../firebase';
import { Attending, Guest } from '../../firebase/types';
import Select, { SelectOption } from '../form/Select';
import Textarea from '../form/Textarea';
import Button from '../ui/Button';

import styles from './guestReplyForm.module.css';
import Grid from '../ui/Grid';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

interface Props {
  guest: Guest;
}

const getSuccessMessage = (attending: Attending): string => {
  if (!attending) {
    return i18n._(defineMessage({
      id: 'reply:success.noResponse',
      message: 'Thanks for your response, please let us know if you can make it!'
    }));
  }

  if (attending === 'yes') {
    return i18n._(defineMessage({
      id: 'reply:success.attending',
      message: 'Looking forward to seeing you there!'
    }));
  }

  return i18n._(defineMessage({
    id: 'reply:success.notAttending',
    message: 'Sorry that you can\'t join us, hope to see you soon!'
  }));
};

function GuestReplyForm(
  { guest: { id, attending, name, dietaryNeeds, songRequest, comment }
  }: Props): ReactElement {
  const form = useForm();
  const firebase = useContext(FirebaseContext);

  const { handleSubmit, formState: { isSubmitting } } = form;

  const onSubmit = async ({
    attending,
    dietaryNeeds,
    songRequest,
    comment
  }: Partial<Guest>) => {
    const newData: Partial<Guest> = {
      attending,
      dietaryNeeds,
      songRequest,
      comment
    };
    console.log(newData);

    return firebase.firestore
      .collection('guests')
      .doc(id)
      .update(newData)
      .then(() => {
        const message = getSuccessMessage(attending);
        toast.success(message, { toastId: 'reply-response' });
      })
      .catch((err) => {
        const error = i18n._(defineMessage({
          id: 'reply:error',
          message: 'There was an error. Try again or contact us if you continue to have problems.'
        }));
        toast.error(error, { toastId: 'reply-response' });
      });
  };

  const attendingOptions: SelectOption[] = [
    {
      value: '',
    },
    {
      value: 'yes',
      label: i18n._(defineMessage({
        id: 'reply:options.yes',
        message: 'Can\'t wait!'
      }))
    },
    {
      value: 'no',
      label: i18n._(defineMessage({
        id: 'reply:options.no',
        message: 'Sorry, can\'t make it'
      }))
    },
  ];

  return (
    <li className={styles.listItem}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" id="guest_id" name="id" value={id} />
          <div className={styles.header}>
            <h3>{name}</h3>
            <Button buttonType="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? '...'
                : <Trans id="reply:save">Save</Trans>
              }
            </Button>
          </div>
          <Grid factorX={2}>
            <Select
              formName="guest"
              fieldName="attending"
              label={<Trans id="reply:labels.answer">You in?</Trans>}
              options={attendingOptions}
              defaultValue={attending}
            />
            <Textarea
              formName="guest"
              fieldName="dietaryNeeds"
              label={<Trans id="reply:labels.dietaryRestrictions">Dietary Restrictions</Trans>}
              defaultValue={dietaryNeeds}
            />
            <Textarea
              formName="guest"
              fieldName="comment"
              label={<Trans id="reply:labels.otherComment">Other comments</Trans>}
              defaultValue={comment}
            />
            <div>
              <Textarea
                formName="guest"
                fieldName="songRequest"
                label={<Trans id="reply:labels.songRequest">Song Request</Trans>}
                defaultValue={songRequest}
              />
              <p className={styles.disclaimer}>* <Trans id="reply:songRequestDisclaimer">No guarantee</Trans></p>
            </div>
          </Grid>
        </form>
      </FormProvider>
    </li>
  );
}
export default GuestReplyForm;
