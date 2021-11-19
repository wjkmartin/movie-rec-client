import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../store';

import firebase from 'firebase/compat/app';

function MyApp({ Component, pageProps }) {
  // Configure Firebase.
  const config = {
    apiKey: process.env.apiKeyFirebase,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    databaseURL: process.env.databaseURL,
    measurementId: process.env.measurementId,
  };

  firebase.initializeApp(config);

  return (
    <Provider store={store}>
      <Component {...pageProps} />)
    </Provider>
  );
}

export default MyApp;
