import React from 'react'
import PropTypes from 'prop-types'
import  {StyleSheet, Platform,View,Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
class CustomInputText extends React.Component {
    render() {
        const { label,lableStyle,maxLenght,textInputStyle,stateHolder,stateFieldName } = this.props
        return (
            <View>
                <Text style = {[lableStyle,styles.fieldLabel]}>
                    {label}
                </Text>
                <TextInput maxLength = {maxLenght} 
                onChangeText = {(inText) => stateHolder.setState(() => {
                    const obj = { };
                    obj[stateFieldName] = inText;
                    return obj;
                  }
                 )} style = {[styles.textInput,textInputStyle]} />
            </View>
     
        )
    }
}



const styles = StyleSheet.create({
    fieldLabel : { marginLeft : 10 },
    textInput : {
      height : 40,
      marginLeft : 10,
      width : "96%",
      marginBottom : 20,marginTop : 4,
      paddingLeft : 10,
      borderRadius : 8,
      borderColor : "#c0c0c0", 
      borderWidth : 2
    }
  });

  


CustomInputText.propTypes = {
    label : PropTypes.string.isRequired, labelStyle : PropTypes.object,
    maxLength : PropTypes.number, textInputStyle : PropTypes.object,
stateHolder : PropTypes.object.isRequired, stateFieldName : PropTypes.string.isRequired
}

export default CustomInputText
