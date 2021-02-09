import firebase from "firebase/app";
import "firebase/firestore";

interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  databaseURL?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}

const config: FirebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  app: firebase.app.App;
  firestore: firebase.firestore.Firestore;

  constructor() {
    if (firebase.apps.length) {
      this.app = firebase.apps[0];
    } else {
      this.app = firebase.initializeApp(config);
    }
    this.firestore = firebase.firestore(this.app);
  }
}

export default Firebase;
