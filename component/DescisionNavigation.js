import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListScreen from './ListScreen'
import AddScreen from './AddScreen'
import DecisionScreen from './DecisionScreen'
import WhosGoingScreen from './WhosGoingScreen'
import ChoiceScreen from './ChoiceScreen'
import PrefilterScreen from './prefilterScreen'
import PostChoiceComponent from './PostChoiceComponent'

const RestuarentScreen = () => {
    const Stack = createStackNavigator()
    return (
      <Stack.Navigator>
      <Stack.Screen name = "Decision" component = {DecisionScreen} />
      <Stack.Screen name = "whoIsGoing" component = {WhosGoingScreen} />
      <Stack.Screen name = "Choice" component = {ChoiceScreen} />
      <Stack.Screen name = "prefilter" component = { PrefilterScreen} />
      <Stack.Screen name = "postChoice" component = { PostChoiceComponent} />
      </Stack.Navigator>
    )
}
export default RestuarentScreen