import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import StackHeader from '@/components/StackHeader';

import SignIn from './SignIn';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import CreateNewPassword from './CreateNewPassword';
const Stack = createStackNavigator();

export default function Auth() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <StackHeader {...props} />,
      }}>
      <Stack.Screen name="Sign In" component={SignIn} />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen
        name="CreateNewPassword"
        options={{title: 'Create New Password', headerShown: false}}
        component={CreateNewPassword}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
