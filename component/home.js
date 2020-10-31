import React from 'react'
import { View,Text, Button, Alert ,Image } from 'react-native'

const Home = () => {
    return(
        <View>
            <Text>Hello , Lokesh How are you???</Text>
            <Image  source = {require("./Images/Home.jpg")} style = {{height:100,width:100}}/>
        </View>
    )
}

export default Home