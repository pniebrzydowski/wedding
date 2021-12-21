import { ReactElement, useState } from 'react';

import useCollectionDocsData from '../../../firebase/hooks/useCollectionDocsData';
import { Guest } from '../../../firebase/types';

import styles from './guestList.module.css';
import formStyles from '../../form/form.module.css';
import dayjs from 'dayjs';
import { getLocalDate } from '../utils';

type AttendingValue = 'yes' | 'no' | 'no-response' | 'any-response' | 'dietary' | 'song' | 'comment' | 'all';

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
      if (attendingFilter === 'no-response') {
        return !guest.attendingUS;
      }
      if (attendingFilter === 'any-response') {
        return !!guest.attendingUS;
      }
      if (attendingFilter === 'dietary') {
        return guest.attendingUS && !!guest.dietaryNeeds;
      }
      if (attendingFilter === 'song') {
        return guest.attendingUS && !!guest.songRequestUS;
      }
      if (attendingFilter === 'comment') {
        return !!guest.commentUS;
      }
      return guest.attendingUS === attendingFilter;
    });

  const sortedGuests = visibleGuests.sort((a, b) => {
    if (!a.replyAtUS && !a.attendingUS) { return 1; }
    if (!b.replyAtUS && !b.attendingUS) { return -1; }
    if (a.attendingUS && !a.replyAtUS) { return 1; }
    if (b.attendingUS && !b.replyAtUS) { return -1; }
    if (dayjs(b.replyAtUS) > dayjs(a.replyAtUS)) { return 1; }
    if (dayjs(a.replyAtUS) > dayjs(b.replyAtUS)) { return -1; }
    return 0;
  });

  const showAttedingColumn = attendingFilter !== 'dietary' && attendingFilter !== 'song';
  const showCommentColumn = attendingFilter !== 'dietary' && attendingFilter !== 'song';
  const showDietaryColumn = attendingFilter !== 'song' && attendingFilter !== 'comment';
  const showSongColumn = attendingFilter !== 'dietary' && attendingFilter !== 'comment';
  const showTimeColumn = attendingFilter !== 'dietary' && attendingFilter !== 'song';

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
          },
          {
            value: 'any-response',
            label: 'Any response'
          },
          {
            value: 'dietary',
            label: 'Dietary restrictions'
          },
          {
            value: 'song',
            label: 'Song requests'
          },
          {
            value: 'comment',
            label: 'Has comment'
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
            {showAttedingColumn && <th>Attending</th>}
            {showCommentColumn && <th>Comment</th>}
            {showDietaryColumn && <th>Dietary Restrictions</th>}
            {showSongColumn && <th>Song Requests</th>}
            {showTimeColumn && <th>Time</th>}
          </tr>
        </thead>

        <tbody>
          {sortedGuests.map((guest) => {
            const replyDate = getLocalDate(guest.replyAtUS);

            return (
              <tr key={guest.id}>
                <td>{guest.name}</td>
                {showAttedingColumn && <td>{guest.attendingUS}</td>}
                {showCommentColumn && <td>{guest.commentUS}</td>}
                {showDietaryColumn && <td>{guest.dietaryNeeds}</td>}
                {showSongColumn && <td>{guest.songRequestUS}</td>}
                {showTimeColumn && <td className={styles.noWrap}>{replyDate}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default GuestList;
