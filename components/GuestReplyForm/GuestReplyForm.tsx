import { ReactElement, useContext } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { FirebaseContext } from '../../firebase';
import { Guest } from '../../firebase/types';
import Select, { SelectOption } from '../form/Select';
import Textarea from '../form/Textarea';
import Button from '../ui/Button';

import styles from './guestReplyForm.module.css';

interface Props {
  guest: Guest;
}

function GuestReplyForm(
  { guest: { id, attending, name, dietaryNeeds, songRequest }
  }: Props): ReactElement {
  const form = useForm();
  const firebase = useContext(FirebaseContext);

  const { handleSubmit } = form;

  const onSubmit = ({
    attending,
    dietaryNeeds,
    songRequest,
  }: Partial<Guest>) => {
    firebase.firestore
      .collection('guests')
      .doc(id)
      .update({
        attending,
        dietaryNeeds,
        songRequest,
      })
      .then(() => {
        console.log('Reply submitted!');
      })
      .catch((err) => {
        console.error('Error creating series: ', err);
      });
  };

  const attendingOptions: SelectOption[] = [
    {
      value: '',
    },
    {
      value: 'yes',
      label: 'Can\'t wait!',
    },
    {
      value: 'no',
      label: 'Sorry, can\'t make it',
    },
  ];

  return (
    <li className={styles.listItem}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" id="guest_id" name="id" value={id} />
          <div className={styles.header}>
            <h3>{name}</h3>
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          </div>
          <div className={styles.grid}>
            <div className={styles.column}>
              <Select
                formName="guest"
                fieldName="attending"
                label="You in?"
                options={attendingOptions}
                defaultValue={attending}
              />
            </div>
            <div className={styles.column}>
              <Textarea
                formName="guest"
                fieldName="dietaryNeeds"
                label="Dietary Needs"
                defaultValue={dietaryNeeds}
              />
              <Textarea
                formName="guest"
                fieldName="songRequest"
                label="Song Request"
                defaultValue={songRequest}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </li>
  );
}
export default GuestReplyForm;
