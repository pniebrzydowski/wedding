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
  lang: InviteLanguage
}

export interface Guest {
  id: string;
  inviteId: string;
  name: string;
  email?: string;
  attending?: string;
  dietaryNeeds?: string;
  songRequest?: string;
  comment?: string;
}