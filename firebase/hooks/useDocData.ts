import { useContext, useEffect, useState, useRef } from 'react';

import FirebaseContext from '../FirebaseContext';
import { FirebaseData } from '../types';

import { CollectionReference, DocumentData } from '@firebase/firestore-types';

interface DocDataProps {
  collection: string;
  id: string;
}

const useDocData = <T>({
  collection,
  id,
}: DocDataProps): FirebaseData<T | undefined> => {
  const firebase = useContext(FirebaseContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();

  const queryRef = useRef<CollectionReference<DocumentData> | undefined>(
    firebase?.firestore?.collection(collection)
  );

  useEffect(() => {
    if (!queryRef.current) {
      return;
    }

    const unsubscribe = queryRef.current.doc(id).onSnapshot(
      (doc) => {
        setLoading(false);
        setData(doc.data() as T);
      },
      (error) => {
        setLoading(false);
        console.error(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [id, queryRef]);

  return {
    data,
    loading,
  };
};

export default useDocData;
