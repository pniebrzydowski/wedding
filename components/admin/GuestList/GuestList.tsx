import { ReactElement } from 'react';

import useCollectionDocsData from '../../../firebase/hooks/useCollectionDocsData';
import { Guest } from '../../../firebase/types';

import styles from './guestList.module.css';

function GuestList(): ReactElement {
  const { loading, data: guests } = useCollectionDocsData<Guest>({
    collection: 'guests',
  });

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Guest Name</th>
          <th>Attending</th>
          <th>Dietary</th>
          <th>Song</th>
          <th>Invite ID</th>
        </tr>
      </thead>

      <tbody>
        {guests.map((guest) => <tr key={guest.id}>
          <td>{guest.name}</td>
          <td>{guest.attending}</td>
          <td>{guest.dietaryNeeds}</td>
          <td>{guest.songRequest}</td>
          <td>{guest.inviteId}</td>
        </tr>)}
      </tbody>
    </table>
  );
}

export default GuestList;
