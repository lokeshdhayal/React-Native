import React from 'react'
import { View, Text, AsyncStorage, Alert,Image,StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

let participant = null
let filteredRestaurents = null
let choosenRestaurent = { }

class DecisionScreen extends React.Component {
    render() {
        return (
            <View style = {styles.decsionTimeScreenContainer}>
                <TouchableOpacity style = {styles.decisionTimeScreenTouchable}
                onPress = {()=>{
                    AsyncStorage.getItem("people",(inError,inPeople)=>{
                        if(inPeople === null){
                            inPeople = []
                        }
                        else{
                            inPeople = JSON.parse(inPeople)
                        }
                        if(inPeople.length === 0){
                            Alert.alert("That ain't gonna work, chief",
                            "You haven't added any people." +
                            "You should probably do that first, no?",[{text:"OK"}],{cancelable:false})
                        }
                        else{
                            AsyncStorage.getItem("restaurents",(Errors,inRestaurents)=>{
                                if(inRestaurents === null){
                                    inRestaurents = []
                                }
                                else{
                                    inRestaurents = JSON.parse(inRestaurents)
                                }
                                if(inRestaurents.length === 0){
                                    Alert.alert("That ain't gonna work, chief","You haven't added any restaurants. You should probably do that first, no?",[{text:"OK"}],{cancelable:false})
                                }
                                else{
                                    this.props.navigation.navigate("whoIsGoing")
                                }
                            })
                        }

                    })
                }}>
                    <Image source = {require("./Images/Home.jpg")} />
                    <Text style={{paddingTop:20}}>(click the food to get going)</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    decsionTimeScreenContainer:{flex:1,
        justifyContent:"center",
    alignItems:"center"},
    decisionTimeScreenTouchable:{
        alignItems:"center",
        justifyContent:"center"
    }
})

export default DecisionScreen