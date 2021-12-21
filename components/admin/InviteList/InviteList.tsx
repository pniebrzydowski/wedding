import { ReactElement, useState } from 'react';

import useCollectionDocsData from '../../../firebase/hooks/useCollectionDocsData';
import { Guest, Invite } from '../../../firebase/types';

import styles from './inviteList.module.css';
import formStyles from '../../form/form.module.css';
import Grid from '../../ui/Grid';
import dayjs from 'dayjs';
import { getLocalDate } from '../utils';

interface InviteWithGuests extends Invite {
  guests: Guest[];
}

const getInvitesWithGuests = (invites: Invite[], guests: Guest[]): InviteWithGuests[] => {
  const invitesWithGuests: InviteWithGuests[] = [];
  invites.forEach(invite => {
    invitesWithGuests.push({
      ...invite,
      guests: guests.filter((guest) => guest.inviteId === invite.id)
    });
  });
  return invitesWithGuests;
};

const getInviteInfo = (invite: InviteWithGuests): { names: string[], emails: string[] } => {
  const { guests } = invite;

  const names: string[] = [];
  const emails: string[] = [];
  guests.forEach(guest => {
    names.push(guest.name);
    if (guest.email) {
      emails.push(guest.email);
    }
  });
  return { names, emails };
};

type InviteFilterValue = 'all' | 'opened' | 'not-opened' | 'no-response';

function InviteList(): ReactElement {
  const { data: invites } = useCollectionDocsData<Invite>({
    collection: 'invites'
  });
  const [filterValue, setFilterValue] = useState<InviteFilterValue>('all');

  const { loading, data: guests } = useCollectionDocsData<Guest>({
    collection: 'guests',
    sortField: 'inviteId'
  });

  if (loading) {
    return <>Loading...</>;
  }

  const invitesWithGuests = getInvitesWithGuests(invites, guests);
  const openedCount = invitesWithGuests.filter(i => i.openedUS).length;

  const visibleInvites = (filterValue) === undefined
    ? invitesWithGuests
    : invitesWithGuests.filter(invite => {
      if (filterValue === 'all') {
        return true;
      }
      if (filterValue === 'no-response') {
        return invite.guests.some(g => !g.attending);
      }
      return filterValue === 'opened' ? invite.openedUS : !invite.openedUS;
    });

  const sortedInvites = visibleInvites.sort((a, b) => {
    if (!a.openedAtUS && !a.openedUS) { return 1; }
    if (!b.openedAtUS && !b.openedUS) { return -1; }
    if (a.openedUS && !a.openedAtUS) { return 1; }
    if (b.openedUS && !b.openedAtUS) { return -1; }
    if (dayjs(b.openedAtUS) > dayjs(a.openedAtUS)) { return 1; }
    if (dayjs(a.openedAtUS) > dayjs(b.openedAtUS)) { return -1; }
    return 0;
  });

  return (
    <>
      <Grid>
        <select className={formStyles.formField} onChange={e => {
          setFilterValue(e.target.value as InviteFilterValue);
        }}>
          {[
            {
              value: 'all',
              label: 'Show all'
            },
            {
              value: 'opened',
              label: 'Opened'
            },
            {
              value: 'not-opened',
              label: 'Not opened'
            },
            {
              value: 'no-response',
              label: 'No Response'
            }
          ].map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        <button onClick={() => {
          console.log(visibleInvites);
        }}>Generate Invite Objects</button>
      </Grid>

      <p>Total: {sortedInvites.length} / {invitesWithGuests.length}</p>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Invite Id</th>
            <th>Guest Names</th>
            <th>Guest Emails</th>
            <th>Opened At ({openedCount}/{invitesWithGuests.length})</th>
          </tr>
        </thead>

        <tbody>
          {sortedInvites.map(invite => {
            const { names, emails } = getInviteInfo(invite);
            const openedAtDate = getLocalDate(invite.openedAtUS);

            return (
              <tr key={invite.id}>
                <td>{invite.id}</td>
                <td>
                  {names.join(', ')}
                </td>
                <td>
                  {emails.join(', ')}
                </td>
                <td className={styles.noWrap}>
                  {invite.openedUS ? <>&#10003; {openedAtDate}</> : ''}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default InviteList;
