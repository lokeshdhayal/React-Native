import React from 'react'
import { View, Text, StyleSheet,Picker, AsyncStorage,Alert} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Constants } from 'react-native-unimodules'
import CustomButton from './CustomButton'


class PrefilterScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            cuisine:"",
            price:"",
            rating:"",
            delivery:""
        }
    }
    render(){
        return (
            <ScrollView style = {styles.preFilterCOntainer}>
                <View style = {styles.preFilterInnerContainer}>
                    <View style = {styles.preFilterScreenFormContainer}>
                        <View style = {styles.preFilterHeadlineContainer}>
                            <Text style = {styles.preFilterHeadline} >Pre-Filters</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.fieldLabel}>Cuisine</Text>
                <View style = {styles.pickerContainer}>
                    <Picker style = {styles.picker} onValueChange = {(value)=>{
                        this.setState({cuisine:value})}} selectedValue = {this.state.cuisine}>
                        <Picker.Item value = "" label = "Choose cuisine" />
                        <Picker.Item value = "American" label = "American" />
                        <Picker.Item value = "Algerian" label = "Algerian" />
                        <Picker.Item value = "Other" label = "Other" />
                    </Picker>
                </View>
                <Text style={styles.fieldLabel}>Price</Text>
                <View style = {styles.pickerContainer}>
                    <Picker style = {styles.picker} onValueChange = {(value)=>{
                        this.setState({price:value})}} selectedValue = {this.state.price}>
                        <Picker.Item value = "" label = "Choose price" />
                        <Picker.Item value = "1" label = "1" />
                        <Picker.Item value = "2" label = "2" />
                        <Picker.Item value = "3" label = "3" />
                        <Picker.Item value = "4" label = "4" />
                        <Picker.Item value = "5" label = "5" />
                    </Picker>
                </View>
                <Text style={styles.fieldLabel}>Rating</Text>
                <View style = {styles.pickerContainer}>
                    <Picker style = {styles.picker} onValueChange = {(value)=>{
                        this.setState({rating:value})}} selectedValue = {this.state.rating}>
                        <Picker.Item value = "" label = "Choose rating" />
                        <Picker.Item value = "1" label = "1" />
                        <Picker.Item value = "2" label = "2" />
                        <Picker.Item value = "3" label = "3" />
                        <Picker.Item value = "4" label = "4" />
                        <Picker.Item value = "5" label = "5" />
                    </Picker>
                </View>
                <Text style={styles.fieldLabel}>Delivery</Text>
                <View style = {styles.pickerContainer}>
                    <Picker style = {styles.picker} onValueChange = {(value)=>{
                        this.setState({delivery:value})}} selectedValue = {this.state.delivery}>
                        <Picker.Item label = "No" value = "no"/>
                        <Picker.Item label = "Yes" value = "yes"/>
                        <Picker.Item label = "Choose Delivery" value = ""/>
                    </Picker>
                </View>
                <CustomButton text ="Next" width = "94%" onPress = {()=>{
                    AsyncStorage.getItem("restaurents",(inError,inRestaurents)=>{
                        if(inRestaurents == null){
                            inRestaurents = []
                        }
                        else{
                            inRestaurents = JSON.parse(inRestaurents)
                        }
                        let filteredRestaurents = []
                        for(const Restautent of inRestaurents){
                            let passTests = true
                            if(this.state.delivery !== ""){
                                if(this.state.delivery !== Restautent.delivery){
                                    passTests = false
                                    console.log("yes")
                                }
                            }
                            if(this.state.rating !== ""){
                                if(this.state.rating > Restautent.rating){
                                    passTests = false
                                    console.log("yes")
                                }
                            }
                            if(this.state.price !== ""){
                                if(this.state.price > Restautent.price){
                                    passTests = false
                                    console.log("yes")
                                }
                            }
                            if(this.state.cuisine !== ""){
                                if(this.state.cuisine !== Restautent.cuisine){
                                    passTests = false
                                }
                            }
                            if(passTests){
                                filteredRestaurents.push(Restautent)
                            }
                        }
                        if(filteredRestaurents.length === 0){
                            Alert.alert("Well, that's an easy choice",
                            "None of your restaurants match these criteria. Maybe " +
                      "try loosening them up a bit?",[{text:"Ok"}],{cancelable:false})
                        }
                        else{
                            AsyncStorage.setItem("filteredRestaurents",JSON.stringify(filteredRestaurents),()=>{
                                this.props.navigation.navigate("Choice")
                            })
                        }
                    })
                }}  />
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    preFilterCOntainer:{
        marginTop:Constants.statusBarHeight
    },
    preFilterInnerContainer:{
        flex:1,
        width:"100%",
        alignItems:"center",
        paddingTop:20
    },
    preFilterScreenFormContainer:{
        width:"96%"
    },
    preFilterHeadlineContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    preFilterHeadline:{
        fontSize:30,
        marginTop:20,
        marginBottom:20
    },
    fieldLabel:{
        marginLeft:10
    },
    pickerContainer:{
        width : "96%", borderRadius : 8, borderColor : "#c0c0c0", borderWidth : 2,
            marginLeft : 10, marginBottom : 20, marginTop : 4
    },
    picker:{

    }
})

export default PrefilterScreen