import { ReactElement, useState } from 'react';

import useCollectionDocsData from '../../../firebase/hooks/useCollectionDocsData';
import { Guest } from '../../../firebase/types';

import styles from './guestList.module.css';
import formStyles from '../../form/form.module.css';
import dayjs from 'dayjs';

type AttendingValue = 'yes' | 'no' | 'no-response' | 'all';

function GuestList(): ReactElement {
  const { loading, data: guests } = useCollectionDocsData<Guest>({
    collection: 'guests'
  });
  const [attendingFilter, setAttendingFilter] = useState<AttendingValue>('all');

  if (loading) {
    return <>Loading...</>;
  }

  const visibleGuests = attendingFilter === 'all'
    ? guests
    : guests.filter(guest => {
      return attendingFilter === 'no-response' ? !guest.attending : guest.attending === attendingFilter;
    });

  const sortedGuests = visibleGuests.sort((a, b) => {
    if (!a.replyAt) { return 1; }
    if (!b.replyAt) { return -1; }
    if (dayjs(b.replyAt) > dayjs(a.replyAt)) { return 1; }
    if (dayjs(a.replyAt) > dayjs(b.replyAt)) { return -1; }
    return 0;
  });

  return (
    <div>
      <select className={formStyles.formField} onChange={e => setAttendingFilter(e.target.value as AttendingValue)}>
        {[
          {
            value: 'all',
            label: 'Show all'
          },
          {
            value: 'yes',
            label: 'Yes'
          },
          {
            value: 'no',
            label: 'No'
          },
          {
            value: 'no-response',
            label: 'No response'
          }
        ].map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>

      <p>Total: {sortedGuests.length} / {guests.length}</p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Guest Name</th>
            <th>Attending</th>
            <th>Comment</th>
            <th>Dietary</th>
            <th>Song</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {sortedGuests.map((guest) => <tr key={guest.id}>
            <td>{guest.name}</td>
            <td>{guest.attending}</td>
            <td>{guest.comment}</td>
            <td>{guest.dietaryNeeds}</td>
            <td>{guest.songRequest}</td>
            <td className={styles.noWrap}>{guest.replyAt}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default GuestList;
