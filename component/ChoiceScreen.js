import React from 'react'
import { FlatList,View, Text,StyleSheet,Modal,TouchableOpacity, AsyncStorage} from 'react-native'
import {  ScrollView } from 'react-native-gesture-handler'
import CustomButton from './CustomButton'
class ChoiceScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            participantsList:[],
            participantsListRefresh:false,
            selectVisible:false,
            vetoVisible:false,
            vetoDisabled:false,
            vetoText:"Veto",
            filteredRestaurents:[],
            choosenRestaurents:[]
        }
    }
    componentDidMount(){
        AsyncStorage.getItem("participants",(inError,inParticipant)=>{
            if(inParticipant === null){
                inParticipant = []
            }
            else{
                inParticipant = JSON.parse(inParticipant)
            }
            this.setState({participantsList:inParticipant})
        })
        AsyncStorage.getItem("filteredRestaurents",(inError,filteredRestaurents)=>{
            if(filteredRestaurents === null){
                filteredRestaurents = []
            }
            else{
                filteredRestaurents = JSON.parse(filteredRestaurents)
            }
            this.setState({filteredRestaurents:filteredRestaurents})
        })
    }
    getRandom = (min,max) => {
        max = Math.floor(max)
        min = Math.ceil(min)
        return Math.floor(Math.random()*(max - min +1)) + min
    }
    
    render(){
        return (
            <View stlye = {styles.listScreenContainer}>
                <View style = {{justifyContent:"center",alignItems:"center",marginBottom:20,marginTop:20}}>
                <Text style = {styles.choiceScreenheadLine}>Choice Screen</Text>
                </View>
                <FlatList style={styles.choiceScreenListContainer}
                data={this.state.participantsList}
                extraData={this.state.participantsListRefresh}
                renderItem={ ({item}) =>
                <View style={styles.choiceScreenListItem}>
                    <Text style={styles.choiceScreenListItemName}>
                    {item.firstname} {item.lastname} ({item.relation})
                        </Text>
                        <Text>Vetoed: {item.vetoed}</Text>
                        </View>
                        }
                        />
                <CustomButton text = "Random Choose" onPress = {()=>{
                    const selectNumber = this.getRandom(0,this.state.filteredRestaurents.length -1)
                    let choosenRestaurents = this.state.filteredRestaurents[selectNumber]
                        this.setState({selectVisible:true,choosenRestaurents:choosenRestaurents})
                        AsyncStorage.setItem("choosenRestaurent",JSON.stringify(choosenRestaurents),()=>{
                            console.log("yes")
                        })
                }} />
                <Modal presentationStyle = "formSheet" visible = {this.state.selectVisible} animationType= "slide">
                   <View style = {styles.selectContainer}>
                       <View style = {styles.selectInnerContainer}>
            <Text style = {styles.selectName}>{this.state.choosenRestaurents.name}</Text>
                           <View style = {styles.selectedDetails}>
                               <Text style = {styles.selectedDetailLine}>This is a {"\u2605".repeat(this.state.choosenRestaurents.rating)} star</Text>
            <Text style = {styles.selectedDetailLine}>{this.state.choosenRestaurents.cuisine}</Text>
                               <Text style = {styles.selectedDetailLine}>with a price of {"$".repeat(this.state.choosenRestaurents.price)}</Text>
                               <Text style = {styles.selectedDetailLine}>that {this.state.choosenRestaurents.delivery === "yes" ? "DOES" : "DOES NOT"} deliver.</Text>
                           </View>
                           <CustomButton text = "Accept" onPress = {()=>{
                               this.setState({selectVisible:false,vetoVisible:false})
                               this.props.navigation.navigate("postChoice")
                           }} width = "60%" />
                           <CustomButton text = {this.state.vetoText} onPress = {()=>{
                               this.setState({
                                   vetoVisible:true,
                                   selectVisible:false
                               })
                           }} width = "60%" disabled = {this.state.vetoDisabled?"false":"true"} />
                       </View>
                   </View>
                </Modal>
                <Modal visible = {this.state.vetoVisible}  presentationStyle = "formSheet" animationType= "slide">
                    <View style = {styles.vetoContainer}>
                        <View style = {styles.vetoInnerContainer}>
                            <Text style = {styles.vetoHeadLine}>Who's vetoing?</Text>
                            <ScrollView style = {styles.scrollViewContainer}>
                                {this.state.participantsList.map((inValue)=>{
                                    if(inValue.vetoed === "no"){
                                        return (
                                            <TouchableOpacity key = {inValue.key} onPress = {()=>{
                                                const { participantsList } = this.state
                                                for(let participant of participantsList){
                                                    if(participant.key === inValue.key){
                                                        participant.vetoed = "yes"
                                                        break
                                                    }
                                                }
                                                let stillAvailable = false
                                                let label = "No vetoes left"
                                                for(const participant of participantsList){
                                                    if(participant.vetoed === "no"){
                                                        stillAvailable = true
                                                        label = "Veto"
                                                        break
                                                    }
                                                }
                                                const { filteredRestaurents } = this.state
                                                for(let i =0;i<this.state.filteredRestaurents.length;i++){
                                                    if(filteredRestaurents[i].key === this.state.choosenRestaurents.key){
                                                        filteredRestaurents.splice(i,1)
                                                        this.setState({filteredRestaurents:filteredRestaurents})
                                                    }
                                                }

                                                this.setState({participantsList:participantsList,selectVisible:false,vetoVisible:false,vetoText:label})
                                            }} stlye = {{margin:10}}>
                                                <Text style = {{fontSize:20}}>{inValue.firstname + " " + inValue.lastname}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                })}
                            </ScrollView>
                            <View style = {styles.vetoButtonContainer}>
                                <CustomButton text = "Never Mind" width = "94%" onPress = {()=>{this.setState({selectVisible:true,vetoVisible:false})}} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listScreenContainer:{

    },
    selectContainer:{
        flex:1,
        justifyContent:"center"
    },
    selectInnerContainer:{
        alignItems:"center"
    },
    selectName:{
        fontSize:32
    },
    selectedDetails:{
        alignItems:"center",
        paddingTop:80,
        paddingBottom:80
    },
    selectedDetailLine:{
        fontSize:18
    },
    vetoContainer:{
        justifyContent:"center",
        flex:1
    },
    vetoInnerContainer:{
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center"
    },
    vetoHeadLine:{
        fontSize:32,
        fontWeight:"bold"
    },
    scrollViewContainer:{

    },
    vetoButtonContainer:{
    },
    choiceScreenheadLine:{
        fontSize:32,
        fontWeight:"bold"
    },
    choiceScreenListContainer:{
        width:"100%"
    },
    choiceScreenListItem:{
        flexDirection:"row",
        marginTop:4,
        marginBottom:4,
        borderColor:"#c0c0c0",
        borderBottomWidth:2,
        alignItems:"center"
    },
    choiceScreenListItemName:{
        flex:1
    }
})


export default ChoiceScreen