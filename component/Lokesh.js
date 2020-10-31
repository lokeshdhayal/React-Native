import React from 'react'
import { View,Text, Button, Alert,FlatList, AsyncStorage } from 'react-native'
import {Root,Toast} from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CustomInputText from './CustomInputText'
import CustomButton from './CustomButton'
import { createStackNavigation } from 'react-navigation-stack'
class Lokesh extends React.Component{
    constructor(){
        super()
        this.state = {
            a:""
        }
    }
    render(){
    return(
        <View style={{marginTop:50
        }}>
            <CustomInputText onPress = {() => {console.log("yes")}} stateHolder = {this} stateFieldName = "a" label = "Lokesh" />
        </View>
    )
    }
}

export default Lokesh