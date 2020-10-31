import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListScreen from './ListScreen'
import AddScreen from './AddScreen'

const RestuarentScreen = () => {
    const Stack = createStackNavigator()
    return (
      <Stack.Navigator>
      <Stack.Screen name = "listScreen" component = {ListScreen} />
      <Stack.Screen name = "Home" component = {AddScreen} />
      </Stack.Navigator>
    )
}
export default RestuarentScreen