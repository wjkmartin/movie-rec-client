import React from 'react';
import { store } from '../store';
import '../styles/globals.css';
import { Provider } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore' 

import { fbConfig } from '../config';

import Header from '../components/Header/Header';

firebase.initializeApp(fbConfig);

const rrfConfig = {
  userProfile: 'users',
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Header />
          <CssBaseline />
            <Component {...pageProps} />
        </ReactReduxFirebaseProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
