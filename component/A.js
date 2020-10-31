import { View,Text } from 'native-base'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const A = () => {
    return (
            <View style = {{justifyContent:"space-around",flex:1,alignItems:"stretch"}}>
                <View style = {{backgroundColor:"red",height:100,width:100}}></View>
                <View style = {{backgroundColor:"green",height:100,width:100}}></View>
            </View>
    )
}

export default A