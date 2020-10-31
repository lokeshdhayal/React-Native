import React from 'react'
import CustomButton from './CustomButton'
import { StyleSheet,View,Text, Alert,AsyncStorage, BackHandler } from 'react-native'
import { FlatList} from 'react-native-gesture-handler'
//import CustomInputText from './CustomInputText'
import { Root,Toast} from 'native-base'
class ListScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            listdata:[]
        }
    }
    componentDidMount(){
        BackHandler.addEventListener("hardwareBackPress",()=>{return true})
        AsyncStorage.getItem("restaurents",(inError,inRestaurents)=>{
            if(inRestaurents!= null){
            this.setState({listdata:JSON.parse(inRestaurents)})
            }
        })
    }
    render(){
        return (
            <Root>
            <View style = {styles.listScreenContainer}>
            <View style = {{paddingTop:30}}>
                <CustomButton text = "Add restaurent" width = "94%" onPress = {()=>{this.props.navigation.navigate("Home")}} />
                <FlatList data = {this.state.listdata} renderItem = {({item})=><View style = {styles.restaurentContainer}>
                    <Text style = {styles.restaurentName} >{item.name}</Text>
                    <CustomButton text = "delete" onPress = {() => {
                        Alert.alert("Please Confirm","Are you sure you want to delete it",[{text:"yes",onPress:()=>{
                            AsyncStorage.getItem("restaurents",(inError,inRestaurents) => {
                                if(inRestaurents === null){
                                    inRestaurents = []
                                }
                                else{
                                    inRestaurents = JSON.parse(inRestaurents)
                                }
                                for(let i =0;i<inRestaurents.length;i++){
                                    if(inRestaurents[i].key == item.key){
                                        inRestaurents.splice(item,1)
                                        break;
                                    }
                                }
                                AsyncStorage.setItem("restaurents",JSON.stringify(inRestaurents),()=>{
                                    console.log("deleted")
                                    this.setState({listdata:inRestaurents})
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
    listScreenContainer:{
        flex:1
    },
    restaurentList:{
        width:"95%"
    },
    restaurentContainer:{
        flexDirection:"row",
        marginTop:4,
        marginBottom:4,
        borderBottomWidth:2,
        borderColor:"#c0c0c0",
        alignItems:"center"
    },
    restaurentName:{
        flex:1
    }
})

export default ListScreen