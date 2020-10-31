import { CheckBox } from 'native-base'
import React from 'react'
import { View,Text,StyleSheet, Alert, BackHandler, AsyncStorage } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import CustomButton from './CustomButton'

class WhosGoingScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            people:[{firstName:"LokeshDhayal",lastName:"DHayal",relationship:"None",key:"1"},{firstName:"LokeshDhayal",lastName:"DHayal",relationship:"None",key:"2"}],
            selected:{}
        }
    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress",()=>{return true})
        AsyncStorage.getItem("people",(inError,inPeople)=>{
            if(inPeople === null){
                inPeople = []
            }
            else{
                inPeople = JSON.parse(inPeople)
            }
            const selected = {}
            for(const people of inPeople){
                selected[people.key] = false
            }
            this.setState({people:inPeople,selected:selected})
        })
    }
    render(){
        return (
            <View style = {styles.listScreenContainer}>
                <Text style = {styles.whosGoingHeadline}>Who's Going?</Text>
                <FlatList style = {{width:"94%"}} 
                data = {this.state.people} 
                renderItem = {({item}) => (
                    <TouchableOpacity style={styles.whosGoingItemTouchable} onPress = {()=>{
                        const selected = this.state.selected
                        selected[item.key] = !selected[item.key];
                        this.setState({selected:selected})
                    }}>
                        <CheckBox checked = {this.state.selected[item.key]} onPress = {()=>{
                            console.log(this.state.selected[item.key])
                            const selected = this.state.selected
                            selected[item.key] = !selected[item.key];
                            this.setState({selected:selected})
                            //console.log(selected)
                        }} style = {styles.whosGoingCheckBox} />
                <Text style = {styles.whosGoingName}>{item.firstname} {item.lastname} ({item.relation})</Text>
                    </TouchableOpacity>
                )} />
                <CustomButton text = "Save" onPress = {()=>{
                    const participants = [ ];
                    for(const person of this.state.people){
                        if(this.state.selected[person.key]){
                        const participant = Object.assign({},person)
                        participant.vetoed = "no"
                        participants.push(participant)
                        }
                    }
                    if(participants.length === 0){
                        Alert.alert("Uhh, you awake?","You didn't select anyone to go. Wanna give it another try?",[{text:"Ok"}],{cancelable:false})
                    }
                    else{
                        AsyncStorage.setItem("participants",JSON.stringify(participants),()=>{
                            this.props.navigation.navigate("prefilter")
                        })
                    }
                }} width = "94%"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listScreenContainer:{flex:1,
        justifyContent:"center",
        alignItems:"center"},
    whosGoingItemTouchable:{
        marginBottom:10,
        marginTop:10,
        flexDirection:"row"
    },
    whosGoingCheckBox:{
        marginRight:20
    },
    whosGoingName:{
        flex:1
    },
    whosGoingHeadline:{
        fontSize:30,
        marginTop:20,
        marginBottom:20
    }
})

export default WhosGoingScreen