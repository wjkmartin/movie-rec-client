import React from 'react';
import { store } from '../store';
import '../styles/globals.css';
import { Provider } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { getApps, initializeApp } from 'firebase/app';

import { fbConfig } from '../config';

import Header from '../components/Header/Header';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

let firebase;
if (!getApps.length) {
  firebase = initializeApp(fbConfig);
}

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
          <Header />
          <CssBaseline />
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
