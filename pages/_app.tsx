import Firebase, { FirebaseContext } from "../firebase";
import "../styles/global.css";

const App = ({ Component, pageProps }) => (
  <FirebaseContext.Provider value={new Firebase()}>
    <Component {...pageProps} />;
  </FirebaseContext.Provider>
);
export default App;
