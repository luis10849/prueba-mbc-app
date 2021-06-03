import React from 'react'
import {useNavigation} from '@react-navigation/core';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { recipeStyles } from '../theme/recipeTheme';

export const Card = ({cardWidth,food}) => {

  const navigation = useNavigation();

  return (
    <TouchableHighlight
      style={{marginTop: 20}}
      underlayColor="white"
      activeOpacity={0.9}
      onPress={() => navigation.navigate('DetailsScreen', food)}>
      <View style={[recipeStyles.card, {width: cardWidth}]}>
        <View style={{alignItems: 'center', top: -30}}>
          <Image source={{uri: food.photoUrl}} style={{height: 120, width: 120}} />
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{food.description}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};


