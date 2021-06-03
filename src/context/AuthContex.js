import React, {createContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authInicialState = {
  status: 'checking',
  token: null,
};

export const AuthContext = createContext({
  token: '',
  status: 'checking',
  signIn: () => {},
  logOut: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNIN':
      return {
        ...state,
        token: action.payload,
        status: 'authenticated',
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        status: 'not-authenticated',
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');

    if (!token) return dispatch({type: 'LOGOUT'});

    await AsyncStorage.setItem('token', token);
    dispatch({
      type: 'SIGNIN',
      payload: token,
    });
  };

  const signIn = async token => {
    dispatch({
      type: 'SIGNIN',
      payload: token,
    });

    await AsyncStorage.setItem('token', token);
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'LOGOUT'});
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
