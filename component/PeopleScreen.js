import React from 'react'
import CustomButton from './CustomButton'
import { StyleSheet,View,Text, Alert,AsyncStorage, BackHandler } from 'react-native'
import { FlatList} from 'react-native-gesture-handler'
import { Root,Toast} from 'native-base'
class PeopleScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            listdata:[]
        }
    }
    componentDidMount(){
        BackHandler.addEventListener("hardwareBackPress",()=>{return true})
        AsyncStorage.getItem("people",(inError,inPeople)=>{
            if(inPeople!= null){
            this.setState({listdata:JSON.parse(inPeople)})
            }
        })
    }
    render(){
        return (
            <Root>
            <View style = {{flex:1}}>
            <View style = {{paddingTop:30}}>
                <CustomButton text = "Add Member" width = "94%" onPress = {()=>{this.props.navigation.navigate("addPeopleScreen")}} />
                <FlatList data = {this.state.listdata} renderItem = {({item})=><View style = {{flexDirection:"row",justifyContent:"space-between",alignItems:"center",borderBottomWidth:2,borderColor:"#c0c0c0"}}>
        <Text style = {{fontSize:15,marginLeft:10}}>{item.firstname + " " + item.lastname + ""} ({item.relation})</Text>
                    <CustomButton text = "delete" onPress = {() => {
                        Alert.alert("Please Confirm","Are you sure you want to delete it",[{text:"yes",onPress:()=>{
                            AsyncStorage.getItem("people",(inError,inPeople) => {
                                if(inPeople === null){
                                    inPeople = []
                                }
                                else{
                                    inPeople = JSON.parse(inPeople)
                                }
                                for(let i =0;i<inPeople.length;i++){
                                    if(inPeople[i].key == item.key){
                                        inPeople.splice(item,1)
                                        break;
                                    }
                                }
                                AsyncStorage.setItem("restaurents",JSON.stringify(inPeople),()=>{
                                    console.log("deleted")
                                    this.setState({listdata:inPeople})
                                    Toast.show({text:"Restaurent Deleted",position:"bottom",type:"danger",duration:2000})
                                })
                            })
                        }},{text:"no"},{text:"cancel",style:"cancel"}],{cancelable:true})
                    }} />
                </View>}/>
            </View>
            </View>
            </Root>
        )
    }
}

const styles = StyleSheet.create({
    restaurentList:{}
})

export default PeopleScreen