import React from 'react'
import { Image, View } from 'react-native'

export default function WhiteLogo() {
    return (
        <View style={{
            alignItems: "center"
        }}>
            <Image 
               source={require('../assets/chef.png')}
               style={{
                   width: 110,
                   height: 100
               }}
            />
        </View>
    )
}
