
import { ReactElement } from 'react';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import Firebase, { FirebaseContext } from '../firebase';
import '../styles/global.css';

dayjs.extend(localizedFormat);

function App({ Component, pageProps }: any): ReactElement {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}
export default App;
