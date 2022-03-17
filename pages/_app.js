import React from 'react';
import { store } from '../store';
import '../styles/globals.css';
import { Provider } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore' 

import { fbConfig } from '../config';

import HeadComponent from '../components/Head/Head';
import Header from '../components/Header/Header';

import theme from '../styles/theme';

firebase.initializeApp(fbConfig);

const rrfConfig = {
  userProfile: 'users',
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

function App({ Component, pageProps }) {
  
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <HeadComponent />
          <Header />
          <CssBaseline />
            <Component {...pageProps} />
        </ReactReduxFirebaseProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
