import { WhereFilterOp } from '@firebase/firestore-types';

export interface FirebaseQuery {
  field: string;
  operator: WhereFilterOp;
  value?: string;
}

export interface FirebaseData<T> {
  data: T;
  loading: boolean;
}

export type InviteLanguage = 'en' | 'de';

export interface Invite {
  id: string;
  lang: InviteLanguage;
  opened?: boolean;
  openedAt?: string;
}

export type Attending = '' | 'yes' | 'no';

export interface Guest {
  id: string;
  inviteId: string;
  name: string;
  gender: 'm' | 'f';
  email?: string;
  attending?: Attending;
  dietaryNeeds?: string;
  songRequest?: string;
  comment?: string;
  replyAt?: string;
}