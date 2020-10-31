import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListScreen from './ListScreen'
import AddScreen from './AddScreen'
import PeopleScreen from './PeopleScreen'
import AddPeopleScreen from './AddPeopleScreen'
class PeopleNavigation extends React.Component{
    render(){
       const Stack = createStackNavigator()
        return (
      <Stack.Navigator>
      <Stack.Screen name = "peopleScreen" component = {PeopleScreen} />
      <Stack.Screen name = "addPeopleScreen" component = {AddPeopleScreen} />
      </Stack.Navigator>
    )
    }
}
export default PeopleNavigation