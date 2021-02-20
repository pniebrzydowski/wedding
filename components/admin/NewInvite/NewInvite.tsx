import { ReactElement, useContext, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { FirebaseContext } from '../../../firebase';
import Text from '../../form/Text';
import Button from '../../ui/Button';
import FlexBox from '../../ui/FlexBox';

import styles from './newInvite.module.css';

function NewInvite(): ReactElement {
  const form = useForm();
  const firebase = useContext(FirebaseContext);
  const [guests, setGuests] = useState([1]);

  const { handleSubmit } = form;

  const onSubmit = (values) => {
    firebase.firestore
      .collection('invites')
      .add({})
      .then((docRef) => {
        console.log(docRef);
        const inviteId = docRef.id;
        Object.keys(values).forEach(field => {
          firebase.firestore
            .collection('guests')
            .doc()
            .set({
              name: values[field],
              inviteId
            })
            .then(() => {
              console.log('Document successfully written!');
            })
            .catch((err) => {
              console.error('Error creating guest: ', err);
            });
        });
      })
      .catch(err => {
        console.error('Error creating invite: ', err);
      });
  };


  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.wrapper}>
          <ul className={styles.guestList}>
            {guests.map(idx => (
              <li key={idx}>
                <Text
                  formName="newInvite"
                  fieldName={`guest_${idx}`}
                  label={`Guest ${idx}`}
                /></li>
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
