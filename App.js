/* /**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { View,Text,StyleSheet }from 'react-native'

import Home from './Screens/Home'
import CreateEmp from './Screens/CreateEmp'
import Profile from './Screens/Profile'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import { reducer } from "./reducers/reducer";

const store = createStore(reducer)

const Stack = createStackNavigator();


const myOptions={

  //title:"Home",
  headerTintColor:'white',
  headerStyle:{
  backgroundColor:"#006aff"
  }
}
function App(){

  return(
    <View style ={styles.container}>
      <Stack.Navigator >
        <Stack.Screen name = "Home" component={Home}
        options={myOptions}
        />
        <Stack.Screen name = "Create" component={CreateEmp}
         options={{...myOptions,title:"Create Employee"}}
        />
        <Stack.Screen name = "Profile" component={Profile}
         options={myOptions}
        />
      </Stack.Navigator>
    </View>
  )
}

export default ()=>{
  return(
    <Provider store = {store}>
    <NavigationContainer>
      <App />
    </NavigationContainer>
    </Provider>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#ded9d9",
    
  }
})  

