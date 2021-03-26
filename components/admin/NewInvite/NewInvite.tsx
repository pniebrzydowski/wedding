import { ReactElement, useContext, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { FirebaseContext } from '../../../firebase';
import { Guest, Invite } from '../../../firebase/types';
import Select from '../../form/Select';
import Text from '../../form/Text';
import Button from '../../ui/Button';
import FlexBox from '../../ui/FlexBox';

import styles from './newInvite.module.css';

function NewInvite(): ReactElement {
  const form = useForm<Omit<Invite, 'id'>>();
  const firebase = useContext(FirebaseContext);
  const [guests, setGuests] = useState([1]);

  const { handleSubmit } = form;

  const onSubmit = (values: Invite) => {
    firebase.firestore
      .collection('invites')
      .add({
        lang: values.lang
      })
      .then((docRef) => {
        const inviteId = docRef.id;
        const guests: Partial<Guest>[] = [];
        Object.keys(values).forEach(field => {
          const fieldParts = field.split('_');
          if (fieldParts[0] !== 'guest') {
            return;
          }
          const guestIndex = parseInt(fieldParts[1], 10) - 1;
          if (!guests[guestIndex]) {
            guests[guestIndex] = {
              inviteId
            };
          }
          guests[guestIndex][fieldParts[2]] = values[field];
        });

        console.log(guests);
        guests.forEach(guest => {
          firebase.firestore
            .collection('guests')
            .doc()
            .set(guest)
            .then(() => {
              console.log('New Guest added!');
            })
            .catch((err) => {
              console.error('Error creating guest: ', err);
            });
        });
        form.reset();
        setGuests([1]);
      })
      .catch(err => {
        console.error('Error creating invite: ', err);
      });
  };


  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.wrapper}>
          <Select
            formName="newInvite"
            fieldName='lang'
            label='Language'
            defaultValue='en'
            options={
              [
                { value: 'en', label: 'English' }, { value: 'de', label: 'Deutsch' }
              ]
            }
          />

          <ul className={styles.guestList}>
            {guests.map(idx => (
              <li key={idx}>
                <FlexBox>
                  <Text
                    formName="newInvite"
                    fieldName={`guest_${idx}_name`}
                    label={'Name'}
                    required
                  />
                  <Select
                    formName="newInvite"
                    fieldName={`guest_${idx}_gender`}
                    label={'Gender'}
                    defaultValue={'m'}
                    options={[
                      { value: 'm', label: 'M' }, { value: 'f', label: 'F' }
                    ]}
                  />
                  <Text
                    formName="newInvite"
                    fieldName={`guest_${idx}_email`}
                    label={'Email'}
                  />
                </FlexBox>
              </li>
            ))}
          </ul>

          <FlexBox flexDirection="column">
            <Button buttonType="secondary" type="button" onClick={() => {
              setGuests([...guests, guests.length + 1]);
            }}>
              Add guest
            </Button>
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          </FlexBox>
        </div>
      </form>
    </FormProvider>
  );
}
export default NewInvite;
