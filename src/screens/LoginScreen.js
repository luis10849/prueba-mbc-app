import React, {useContext} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Background} from '../components/Background';
import WhiteLogo from '../components/WhiteLogo';
import {useForm} from '../hooks/useForm';
import {loginStyles} from '../theme/loginTheme';

//Apollo
import {gql, useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/core';

//Context
import {AuthContext} from '../context/AuthContex';

const LOGIN = gql`
  mutation login($input: UserInput) {
    login(input: $input) {
      token
    }
  }
`;

export const LoginScreen = () => {
  const {email, password, onChange} = useForm({
    emil: '',
    password: '',
  });

  //Context
  const {signIn} = useContext(AuthContext);

  //Mutation
  const [login] = useMutation(LOGIN);

  const onLogin = async () => {
    if (email === '' || password === '') {
        Alert.alert('Login wrong', 'data cannot be empty');
        return;
    }

    try {
      const {data} = await login({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      const {token} = data.login;
      signIn(token);
    } catch (error) {
      console.log(error);
      Alert.alert('Login wrong', 'incorrect information');
    }
  };

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.formContainer}>
          <WhiteLogo />

          <Text style={loginStyles.label}>Email</Text>
          <TextInput
            placeholder="email"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={value => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onLogin}
          />

          <Text style={loginStyles.label}>Password</Text>
          <TextInput
            placeholder="*******"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={value => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}
          />

          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onLogin}>
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
