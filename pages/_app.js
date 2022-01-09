import { store } from '../store';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import Header from '../components/Header/Header';
import Head from 'next/head';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Header />
        <Head>
        <title>MovieApp</title>
        <meta
          name="description"
          content="Find the next movie that will change everything"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
