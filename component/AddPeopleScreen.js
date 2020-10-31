import React from 'react'
import { View,Text,StyleSheet,Picker, AsyncStorage } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Constants } from 'react-native-unimodules'
//import { Picker } from 'native-base'
import CustomInputText from './CustomInputText'
import CustomButton from './CustomButton'
//import CustomInputText from './CustomInputText'
class AddPeopleScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            firstname:"",
            lastname:"",
            relation:"",
            key:`r_${new Date().getTime()}`
        }
    }
    render(){
        return (
            <ScrollView style = {styles.addScreenContainer}>
                <View style = {styles.addScreenInnerContainer}>
                    <View style = {styles.addScreenFormContainer}>
                        <CustomInputText maxLenght ={20} label = "Name" stateHolder = {this} stateFieldName = "firstname" />
                        <CustomInputText maxLenght ={20} label = "Last Name" stateHolder = {this} stateFieldName = "lastname" />
                        <CustomInputText maxLenght ={20} label = "Relation" stateHolder = {this} stateFieldName = "relation" />
                        
                        <View style = {styles.addScreenButtonContainer}>
                        <CustomButton text = "Cancel" onPress = {()=>{this.props.navigation.navigate("peopleScreen")}} width = "44%"/>
                            <CustomButton text = "Save" onPress = {()=>{
                                AsyncStorage.getItem("people",(error,inPeople)=>{
                                    if(inPeople == null){
                                        inPeople = []
                                    }
                                    else{
                                        inPeople = JSON.parse(inPeople)
                                    }
                                    inPeople.push(this.state)
                                    AsyncStorage.setItem("people",JSON.stringify(inPeople),()=>{
                                        this.props.navigation.navigate("peopleScreen")
                                    })
                                }
                                )
                                }} width = "44%"/>
                        </View>

                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    addScreenContainer:{
        marginTop:Constants.statusBarHeight
    },
    addScreenInnerContainer:{
        flex:1,
        alignItems:"center",
        paddingTop:20,
        width:"100%"
    },
    addScreenFormContainer:{
        width:"94%"
    },
    fieldLabel:{
        marginLeft:10
    },
    pickerContainer : {
        ...Platform.select({
          ios : { },
          android : { width : "96%", borderRadius : 8, borderColor : "#c0c0c0", borderWidth : 2,
            marginLeft : 10, marginBottom : 20, marginTop : 4
          }
        })
    },
    addScreenButtonContainer:{
        flexDirection:"row",
        justifyContent:"center"
    }
})

export default AddPeopleScreen 