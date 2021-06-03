import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext} from 'react';
import {Button, Dimensions, FlatList, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {AuthContext} from '../context/AuthContex';
import {LoadingScreen} from './LoadingScreen'
import {
  gql,useQuery
} from '@apollo/client';
import { Card } from '../components/Card';
const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;


const GET_RECIPES = gql`
      query getRecipes {
         getRecipes {
           id
           photoUrl
           description
           ingredients
         }
      }
`

export const RecipeScreen = () => {
  const {logOut} = useContext(AuthContext);

  //apollo
  const { data, loading } = useQuery(GET_RECIPES)

  if (loading) return <LoadingScreen />

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
        <FlatList 
           showsVerticalScrollIndicator={false}
           numColumns={2}
           data={data && data.getRecipes}
           renderItem={({item}) => <Card cardWidth={cardWidth} food={item} />}
        />
        <Button onPress={logOut} title="logout" color="#5856D6"/>
    </SafeAreaView>
  );
};
