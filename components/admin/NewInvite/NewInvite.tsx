import { FunctionComponent, useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FirebaseContext } from '../../../firebase';
import Text from '../../form/Text';
import styles from './newInvite.module.css';

const NewInvite: FunctionComponent = () => {
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
        {guests.map(idx => (
          <Text key={idx}
            formName="newInvite"
            fieldName={`guest_${idx}`}
            label={`Guest ${idx}`}
          />
        ))}

        <button type="button" className={styles.addButton} onClick={() => {
          setGuests([...guests, guests.length + 1]);
        }}>
          Add guest
        </button>
        <button type="submit" className={styles.submitButton}>
          Save
        </button>
      </form>
    </FormProvider>
  );
};
export default NewInvite;
