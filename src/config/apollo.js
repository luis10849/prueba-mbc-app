import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  createHttpLink,
} from '@apollo/client';
import {setContext} from 'apollo-link-context';

import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = createHttpLink({
  uri:
    Platform.OS === 'ios'
      ? 'http://localhost:4000/'
      : 'http://192.168.5.128:4000/',
});

const authLink = setContext(async (_, {headers}) => {
  const token = await AsyncStorage.getItem('token');
  return {
      headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ''
      }
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
