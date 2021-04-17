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

function InviteList(): ReactElement {
  const { data: invites } = useCollectionDocsData<Invite>({
    collection: 'invites'
  });
  const [openedFilter, setOpenedFilter] = useState<boolean>();

  const { loading, data: guests } = useCollectionDocsData<Guest>({
    collection: 'guests',
    sortField: 'inviteId'
  });

  if (loading) {
    return <>Loading...</>;
  }

  const invitesWithGuests = getInvitesWithGuests(invites, guests);
  const opened = invitesWithGuests.filter(i => i.opened).length;

  const visibleInvites = openedFilter === undefined
    ? invitesWithGuests
    : invitesWithGuests.filter(invite =>
      openedFilter === false ? !invite.opened : invite.opened
    );

  const sortedInvites = visibleInvites.sort((a, b) => {
    if (!a.openedAt && !a.opened) { return 1; }
    if (!b.openedAt && !b.opened) { return -1; }
    if (a.opened && !a.openedAt) { return 1; }
    if (b.opened && !b.openedAt) { return -1; }
    if (dayjs(b.openedAt) > dayjs(a.openedAt)) { return 1; }
    if (dayjs(a.openedAt) > dayjs(b.openedAt)) { return -1; }
    return 0;
  });

  return (
    <>
      <Grid>
        <select className={formStyles.formField} onChange={e => {
          if (e.target.value === 'true') {
            setOpenedFilter(true);
            return;
          }
          if (e.target.value === 'false') {
            setOpenedFilter(false);
            return;
          }
          setOpenedFilter(undefined);
        }}>
          {[
            {
              value: '',
              label: 'Show all'
            },
            {
              value: 'true',
              label: 'Opened'
            },
            {
              value: 'false',
              label: 'Not opened'
            }
          ].map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        <button onClick={() => {
          console.log(invitesWithGuests);
        }}>Generate Invite Objects</button>
      </Grid>

      <p>Total: {sortedInvites.length} / {invitesWithGuests.length}</p>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Invite Id</th>
            <th>Guest Names</th>
            <th>Guest Emails</th>
            <th>Opened At ({opened}/{invitesWithGuests.length})</th>
          </tr>
        </thead>

        <tbody>
          {sortedInvites.map(invite => {
            const { names, emails } = getInviteInfo(invite);
            const openedAtDate = getLocalDate(invite.openedAt);

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
                  {invite.opened ? <>&#10003; {openedAtDate}</> : ''}
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
