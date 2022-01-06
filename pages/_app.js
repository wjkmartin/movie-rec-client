import { store } from '../store';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import Header from '../components/Header/Header';

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
        <Component {...pageProps} />)
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
