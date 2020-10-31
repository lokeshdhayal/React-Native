import React from 'react'
import { View,Text,TouchableOpacity } from 'react-native'
import PropType from "prop-types"
class CustomButton extends React.Component{
    render(){
        const { text,onPress,buttonStyle, textStyle , width ,disable } = this.props;
        return (
            <TouchableOpacity style = {[
                {padding:10,width:width,margin:10,borderRadius:8,height:60,
                backgroundColor:disable !== null && disable === true ?"#e0e0e0" : "#303656"
                },
                buttonStyle
            ]} onPress = {() => {if(disable == null || disable === "false"){
                onPress()
            }}}>

                <Text style = {[
                    {
                        fontSize:20,fontWeight:"bold",
                        color:"#ffffff",textAlign:"center",
                        paddingTop:8
                    },textStyle
                ]}>
                    {text}
                </Text>
            </TouchableOpacity>
        )
    }
}

CustomButton.propTypes = {
    text:PropType.string.isRequired,onPress:PropType.func.isRequired,
    buttonStyle:PropType.object,textStyle:PropType.object,
    width:PropType.string,disable:PropType.string
}

export default CustomButton