import { useContext, useEffect, useState, useRef } from "react";

import FirebaseContext from "../FirebaseContext";
import { FirebaseQuery, FirebaseData } from "../types";

import {
  OrderByDirection,
  Query,
  DocumentData,
} from "@firebase/firestore-types";

interface Props {
  collection: string;
  query?: FirebaseQuery;
  sortField?: string;
  sortOrder?: OrderByDirection;
}

const useCollectionDocsData = <T>({
  collection,
  query,
  sortField,
  sortOrder = "asc",
}: Props): FirebaseData<T[]> => {
  const firebase = useContext(FirebaseContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T[]>([]);

  const queryRef = useRef<Query<DocumentData> | undefined>(
    firebase?.firestore?.collection(collection)
  );

  useEffect(() => {
    if (!query || !queryRef.current) {
      return;
    }

    queryRef.current = queryRef.current.where(
      query.field,
      query.operator,
      query.value
    );
  }, [query]);

  useEffect(() => {
    if (!queryRef.current || !sortField) {
      return;
    }

    queryRef.current = queryRef.current.orderBy(sortField, sortOrder);
  }, [sortField, sortOrder]);

  useEffect(() => {
    if (!queryRef.current) {
      return;
    }

    const unsubscribe = queryRef.current.onSnapshot(
      (snapshot) => {
        setLoading(false);
        const docs = snapshot?.docs ?? [];
        const data = docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as T),
        }));
        console.log(data);
        setData(data);
      },
      (error) => {
        setLoading(false);
        console.error(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [queryRef]);

  return {
    data,
    loading,
  };
};

export default useCollectionDocsData;
