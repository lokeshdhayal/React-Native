import React from 'react'
import { View,Text,StyleSheet,Picker, AsyncStorage } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Constants } from 'react-native-unimodules'
//import { Picker } from 'native-base'
import CustomInputText from './CustomInputText'
import CustomButton from './CustomButton'
//import CustomInputText from './CustomInputText'
class AddScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            name:"",
            cuisine:"",
            price:"",
            rating:"",
            phone:"",
            address:"",
            website:"",
            delivery:"",
            key:`r_${new Date().getTime()}`
        }
    }
    render(){
        return (
            <ScrollView style = {styles.addScreenContainer}>
                <View style = {styles.addScreenInnerContainer}>
                    <View style = {styles.addScreenFormContainer}>
                        <CustomInputText maxLenght ={20} label = "Name" stateHolder = {this} stateFieldName = "name" />
                        <Text style = {styles.fieldLabel}>Cuisine</Text>
                        <View style = {styles.pickerContainer}>
                            <Picker style = {styles.picker} value = "" onValueChange = {(inItem)=>this.setState({cuisine:inItem})} prompt = "cuisine" selectedValue = {this.state.cuisine} >
                                <Picker.Item label = "Lokesh" value = "Dhayal"/>
                                <Picker.Item label = "Algerian" value = "Algerian"/>
                                <Picker.Item label = "American" value = "American"/>
                                <Picker.Item label = "Other" value = ""/>
                            </Picker>
                        </View>
                        <Text style = {styles.fieldLabel}>Price</Text>
                        <View style = {styles.pickerContainer}>
                            <Picker style = {styles.picker} value = "" onValueChange = {(inItem)=>this.setState({price:inItem})} prompt = "price" selectedValue = {this.state.price} >
                                <Picker.Item label = "1" value = "1"/>
                                <Picker.Item label = "2" value = "2"/>
                                <Picker.Item label = "3" value = "3"/>
                                <Picker.Item label = "4" value = "4"/>
                                <Picker.Item label = "5" value = "5"/>
                                <Picker.Item label = "User Choice" value = ""/>
                            </Picker>
                        </View>

                        <Text style = {styles.fieldLabel}>Rating</Text>
                        <View style = {styles.pickerContainer}>
                            <Picker style = {styles.picker} value = "" onValueChange = {(inItem)=>this.setState({rating:inItem})} prompt = "rating" selectedValue = {this.state.rating} >
                                <Picker.Item label = "1" value = "1"/>
                                <Picker.Item label = "2" value = "2"/>
                                <Picker.Item label = "3" value = "3"/>
                                <Picker.Item label = "4" value = "4"/>
                                <Picker.Item label = "5" value = "5"/>
                                <Picker.Item label = "User Choice" value = ""/>
                            </Picker>
                        </View>

                        <CustomInputText maxLenght ={20} label = "Phone Number" stateHolder = {this} stateFieldName = "phone" />
                        <CustomInputText maxLenght ={20} label = "Address" stateHolder = {this} stateFieldName = "address" />
                        <CustomInputText maxLenght ={20} label = "Web Site" stateHolder = {this} stateFieldName = "website" />

                        <View style = {styles.pickerContainer}>
                            <Picker style = {styles.picker} value = "" onValueChange = {(inItem)=>this.setState({delivery:inItem})} prompt = "rating" selectedValue = {this.state.delivery} >
                                <Picker.Item label = "No" value = "no"/>
                                <Picker.Item label = "Yes" value = "yes"/>
                                <Picker.Item label = "User Choice" value = ""/>
                            </Picker>
                        </View>

                        <View style = {styles.addScreenButtonContainer}>
                        <CustomButton text = "Cancel" onPress = {()=>{this.props.navigation.navigate("listScreen")}} width = "44%"/>
                            <CustomButton text = "Save" onPress = {()=>{
                                AsyncStorage.getItem("restaurents",(error,inRestaurents)=>{
                                    if(inRestaurents == null){
                                        inRestaurents = []
                                    }
                                    else{
                                        inRestaurents = JSON.parse(inRestaurents)

                                    }
                                    inRestaurents.push(this.state)
                                    AsyncStorage.setItem("restaurents",JSON.stringify(inRestaurents),()=>{
                                        this.props.navigation.navigate("listScreen")
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

export default AddScreen 