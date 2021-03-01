import React from 'react'
import Login from './screens/login'
import CLogin from './screens/clogin'
import Signup from './screens/signup'
import CSignup from './screens/csignup'
import StudentHome from './screens/studenthome'
import CompanyHome from './screens/chome'
import Adminlogin from './screens/adminlogin'
import AdminPanel from './screens/adminpanel'
import Profile from './screens/profile.js'
import CProfile from './screens/cprofile.js'
import CviewProfile from './screens/cviewprofile.js'
import ApplyCompany from './screens/applycompany.js'
import Apply from './screens/apply.js'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const Stack = createStackNavigator();
  return(
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Login" component={Login}   options={{headerShown: false}}/>
    <Stack.Screen name="CLogin" component={CLogin}   options={{headerShown: false}}/>
    <Stack.Screen name="Signup" component={Signup}   options={{headerShown: false}}/>
    <Stack.Screen name="CSignup" component={CSignup}   options={{headerShown: false}}/>
    <Stack.Screen name="CHome" component={CompanyHome}   options={{headerShown: false}}/>
    <Stack.Screen name="Home" component={StudentHome}   options={{headerShown: false}}/>
    <Stack.Screen name="Profile" component={Profile}   options={{headerShown: false}}/>    
    <Stack.Screen name="CProfile" component={CProfile}   options={{headerShown: false}}/>
    <Stack.Screen name="Adminlogin" component={Adminlogin}   options={{headerShown: false}}/>
    <Stack.Screen name="AdminPanel" component={AdminPanel}   options={{headerShown: false}}/>    
    <Stack.Screen name="CviewProfile" component={CviewProfile}   options={{headerShown: false}}/>    
    <Stack.Screen name="ApplyCompany" component={ApplyCompany}   options={{headerShown: false}}/>    
    <Stack.Screen name="Apply" component={Apply}   options={{headerShown: false}}/>    
    </Stack.Navigator>
  </NavigationContainer>
  )
}