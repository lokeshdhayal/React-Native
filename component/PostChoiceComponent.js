import React from 'react'
import { View,Text,StyleSheet, AsyncStorage,Button } from 'react-native'


class PostChoiceComponent extends React.Component{
    constructor(){
        super()
        this.state = {
            choosenRestaurent:[]
        }
    }
    componentDidMount(){
        AsyncStorage.getItem("choosenRestaurent",(inError,choosenRestaurent)=>{
            if(choosenRestaurent === null){
                choosenRestaurent = []
            }
            else{
                choosenRestaurent = JSON.parse(choosenRestaurent)
            }
            this.setState({choosenRestaurent:choosenRestaurent})
        })
    }
    render(){
        return(
            <View style = {styles.postChoiceScreenContainer}>
                <View>
                    <Text style = {styles.postChoiceHeadline}>Enjoy your meal!</Text>
                </View>
                <View style = {styles.postChoiceDetailContainer}>
                    <View style = {styles.postChoiceDetainRowContainer}>
                        <Text style = {styles.postChoiceDetailLabel}>Name:</Text>
        <Text style = {styles.postChoiceDetailValue}>{this.state.choosenRestaurent.name}</Text>
                    </View>
                    <View style = {styles.postChoiceDetainRowContainer}>
                        <Text style = {styles.postChoiceDetailLabel}>Cuisine</Text>
                        <Text style = {styles.postChoiceDetailValue}>{this.state.choosenRestaurent.cuisine}</Text>
                    </View>
                    <View style = {styles.postChoiceDetainRowContainer}>
                        <Text style = {styles.postChoiceDetailLabel}>Price:</Text>
                        <Text style = {styles.postChoiceDetailValue}>{this.state.choosenRestaurent.price}</Text>
                    </View>
                    <View style = {styles.postChoiceDetainRowContainer}>
                        <Text style = {styles.postChoiceDetailLabel}>Rating:</Text>
                        <Text style = {styles.postChoiceDetailValue}>{this.state.choosenRestaurent.rating}</Text>
                    </View>
                    <View style = {styles.postChoiceDetainRowContainer}>
                        <Text style = {styles.postChoiceDetailLabel}>Phone:</Text>
                        <Text style = {styles.postChoiceDetailValue}>{this.state.choosenRestaurent.phone}</Text>
                    </View>
                    <View style = {styles.postChoiceDetainRowContainer}>
                        <Text style = {styles.postChoiceDetailLabel}>Address:</Text>
                        <Text style = {styles.postChoiceDetailValue}>{this.state.choosenRestaurent.address}</Text>
                    </View>
                    <View style = {styles.postChoiceDetainRowContainer}>
                        <Text style = {styles.postChoiceDetailLabel}>Website:</Text>
                        <Text style = {styles.postChoiceDetailValue}>{this.state.choosenRestaurent.website}</Text>
                    </View>
                    <View style = {styles.postChoiceDetainRowContainer}>
                        <Text style = {styles.postChoiceDetailLabel}>Delivery:</Text>
                        <Text style = {styles.postChoiceDetailValue}>{this.state.choosenRestaurent.delivery}</Text>
                    </View>
                </View>
                <View style = {{marginTop:10}}>
                <Button title = "All Done" onPress = {()=>{
                        this.props.navigation.navigate("Decision")
                    }} />
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    postChoiceScreenContainer:{
        flex:1,
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center"
    },
    postChoiceHeadline:{
        fontSize:32,paddingBottom:80
    },
    postChoiceDetainRowContainer:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        alignContent:"flex-start"
    },
    postChoiceDetailLabel:{
        width:70,
        fontWeight:"bold",
        color:"#ff0000"
    },
    postChoiceDetailValue:{
        width:300
    },
    postChoiceDetailContainer:{
        borderWidth:2,
        borderColor:"#000000",
        padding:10,
        width:"96%"
    }
})

export default PostChoiceComponent