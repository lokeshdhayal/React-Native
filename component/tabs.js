import {TagNavigator} from 'react-navigation'
//import React from 'react'
import PeopleScreen from "./people-screen"
import Home from './home'
import Restaurent from './retuarent'
import { Image } from 'react-native'
import { Constants } from 'react-native-unimodules'

const tabs = TagNavigator({
    PeopleScreen:{
        screen:PeopleScreen,
        navigationOptions : {
            tabBarlabel:"people",
            tabBarIcon : ({tintColor}) => (
                <Image source = {require("./Images/people.jpg")} 
                style = {{width:32,height:32,tintColor:tintColor}}
                />

            )
        }
    },
    HomeScreen:{
        screen:Home,
        navigationOptions:{
            tabBarlabel:"Home",
            tabBarIcon : ({tintColor}) => (
                <Image source = {require("./Images/Home.jpg")}  
                style = {{width:32,height:32,tintColor:tintColor}}
                />
            )
        }
    },
    RestaurentScreen:{
        screen:Restaurent,
        navigationOptions:{
            tabBarlabel:"Restuarent",
            tabBarIcon : ({tintColor}) => (
                <Image source = {require("./Images/restuarent.jpg")}  
                style = {{width:32,height:32,tintColor:tintColor}}
                />
            )
        }
    }
},{
    initialRouteName: "PeopleScreen",
    animationEnabled:true,
    swipeEnabled:true,
    backBehavior:none,
    lazy:true,
    tabBarPosition:"top",
    tabBarOptions:{
        activeTintColor:"#ff0000",
        showIcon:true,
        style:Constants.statusBarHeight
    }

})


export default tabs