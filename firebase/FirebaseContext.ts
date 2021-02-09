import { createContext } from 'react';

import Firebase from './Firebase';

const FirebaseContext = createContext<Firebase | null>(null);

export default FirebaseContext;
