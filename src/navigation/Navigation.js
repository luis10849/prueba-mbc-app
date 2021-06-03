import React, {useContext} from 'react';
import {LoginScreen} from '../screens/LoginScreen';
import {RecipeScreen} from '../screens/RecipeScreen';

import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from '../context/AuthContex';
import {LoadingScreen} from '../screens/LoadingScreen';
import { DetailsScreen } from '../screens/DetailsScreen';

const Stack = createStackNavigator();

export const Navigation = () => {
  const {status} = useContext(AuthContext);

  if (status === 'checking') return <LoadingScreen />;

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerShown: false,
      }}>
      {status === 'authenticated' ? (
        <>
          <Stack.Screen
            name="RecipeScreen"
            component={RecipeScreen}
            options={{
              headerShown: true,
              headerTitle: 'Recipes',
            }}
          />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        </>
      ) : (
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};
