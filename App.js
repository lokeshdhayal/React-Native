import React from 'react';
import { StyleSheet,Image,View,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import RestaurenScreen from './component/restuarentScreen'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from './component/home';
import A from './component/A';
import DecisionScreen from './component/DecisionScreen';
import WhosGoingScreen from './component/WhosGoingScreen';
import PrefilterScreens from './component/prefilterScreen';
import Icon from 'react-native-vector-icons/FontAwesome'
import ChoiceScreen from './component/ChoiceScreen';
import DescisionNavigation from './component/DescisionNavigation';
import PeopleNavigation from './component/PeopleNavigation';
//import { white } from 'react-native-paper/lib/typescript/src/styles/colors';
export default function App() {
  const MatarialTopNavigator = createMaterialBottomTabNavigator()
  return (
    <NavigationContainer>
      <MatarialTopNavigator.Navigator>
        <MatarialTopNavigator.Screen
        name = "Home" 
        component = {PeopleNavigation} 
        options = {{tabBarLabel:"Lokesh",
        tabBarIcon:()=>(<Icon name="group" size={22} color="black" />)}} />
        <MatarialTopNavigator.Screen name = "Descision" 
        component = {DescisionNavigation} 
        options = {{tabBarLabel:"poeple",tabBarIcon:()=>(<Icon name="question" size={22} color="black" />)}}/>
        <MatarialTopNavigator.Screen name = "Restaurent" component = {RestaurenScreen}
        options = {{tabBarLabel:"Restaurent",tabBarIcon:()=>(<Icon name="heart" size={22} color="black" />)}} />
      </MatarialTopNavigator.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
