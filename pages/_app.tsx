
import { ReactElement } from 'react';
import Firebase, { FirebaseContext } from '../firebase';
import '../styles/global.css';

function App({ Component, pageProps }: any): ReactElement {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}
export default App;
