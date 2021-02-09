import { WhereFilterOp } from "@firebase/firestore-types";

export interface FirebaseQuery {
  field: string;
  operator: WhereFilterOp;
  value?: string;
}

export interface FirebaseData<T> {
  data: T;
  loading: boolean;
}
