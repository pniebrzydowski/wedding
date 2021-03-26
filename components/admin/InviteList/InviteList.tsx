import { ReactElement } from 'react';

import useCollectionDocsData from '../../../firebase/hooks/useCollectionDocsData';
import { Guest, Invite } from '../../../firebase/types';

import styles from './inviteList.module.css';

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

const getGuestsInfo = (guests: Guest[]): { names: string[], emails: string[] } => {
  const names = [];
  const emails = [];
  guests.forEach(guest => {
    names.push(guest.name);
    if (guest.email) {
      emails.push(guest.email);
    }
  });
  return { names, emails };
};

const getEmailLink = (invite: Invite, names: string[], emails: string[]): string => {
  const subject = invite.lang === 'en'
    ? 'Wallner-Niebrzydowski Wedding Invitation!'
    : 'Wallner-Niebrzydowski Hochzeitseinladung!';
  const inviteLink = `https://wallski-wedding.vercel.app/?inviteId=${invite.id}`;
  const salutation = names.join(',%20');
  return `mailto:${emails}?subject=${subject}&body=${salutation}%0d%0a%0d%0a${inviteLink}`;
};

function InviteList(): ReactElement {
  const { data: invites } = useCollectionDocsData<Invite>({
    collection: 'invites'
  });

  const { loading, data: guests } = useCollectionDocsData<Guest>({
    collection: 'guests',
    sortField: 'inviteId'
  });

  if (loading) {
    return <>Loading...</>;
  }

  const invitesWithGuests = getInvitesWithGuests(invites, guests);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Invite Id</th>
          <th>Guest Names</th>
          <th>Guest Emails</th>
          <th>Link</th>
        </tr>
      </thead>

      <tbody>
        {invitesWithGuests.map(invite => {
          const { names, emails } = getGuestsInfo(invite.guests);
          return (
            <tr key={invite.id}>
              <td>{invite.id}</td>
              <td>
                {names.join(', ')}
              </td>
              <td>
                {emails.join(', ')}
              </td>
              <td>
                {emails && emails.length ? (
                  <a href={getEmailLink(invite, names, emails)}>
                    Email Link
                  </a>
                )
                  : (<>No emails</>)
                }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table >
  );
}

export default InviteList;
