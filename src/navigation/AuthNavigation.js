import React, {useState, useEffect} from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import SignIn from '@/screens/Auth/SignIn';
import Register from '@/screens/Auth/Register';
import ForgotPassword from '@/screens/Auth/ForgotPassword';
import CreateNewPassword from '@/screens/Auth/CreateNewPassword';
import useAuthStore from '@/common/stores/useAuthStore';

import SplashScreen from 'react-native-splash-screen';
import {CommonActions} from '@react-navigation/native';
import {getColor, tailwind} from '@/common/tailwind';
const Stack = createStackNavigator();

export default function Auth(props) {
  const loadTokens = useAuthStore(s => s.getToken);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    // console.log('res is ------', props);

    loadTokens().then(res => {
      if (res) {
        // console.log('res is ------', props);
        props.navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        });
        // props.current.dispatch(
        //   CommonActions.reset({
        //     index: 1,
        //     routes: [{name: 'HomeScreen'}],
        //   }),
        // );
      }
    });
    setisLoading(false);
    // SplashScreen.show();
  }, []);
  return (
    <Stack.Navigator
      // options={{
      //   header: props => <StackHeader {...props} />,
      // }}
      screenOptions={{headerShown: false}}
      detachInactiveScreens={false}
      >
      <Stack.Screen
        name="SignIn"
        options={{headerShown: false}}
        component={SignIn}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Forgot Password" component={ForgotPassword} />
      <Stack.Screen
        name="CreateNewPassword"
        options={{title: 'Create New Password'}}
        component={CreateNewPassword}
      />
    </Stack.Navigator>
  );
}
/**
 * @type {{
 * [key:string]:{screen:()=>React.ReactNode,options:StackNavigationOptions}
 * }}
 */
export const AuthScreens = {
  SignIn: {
    screen: SignIn,
    options: {title: 'Sign In', headerShown: false},
  },
  Register: {
    screen: Register,
    options: {headerShown: false},
  },
  ForgotPassword: {
    screen: ForgotPassword,
    // options: {headerShown: false},
  },
  CreateNewPassword: {
    screen: CreateNewPassword,
    options: {title: 'New Password', headerShown: true},
  },
};
