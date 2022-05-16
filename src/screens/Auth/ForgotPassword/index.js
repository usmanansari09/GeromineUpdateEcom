/* eslint-disable react-native/no-inline-styles */
import React, {useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import Header from '../components/Header';
import {tailwind, getColor} from '@/common/tailwind';
import {Icon} from 'react-native-elements';
import StackHeader from '@/components/StackHeader';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MobileNumberScreen from './MobileNumber';
import EmailScreen from './ViaEmail';

const Tab = createMaterialTopTabNavigator();

export default function ForgotPassword({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return <StackHeader props={{...props, title: 'Forgot Password'}} />;
      },
    });
  }, [navigation]);
  return (
    <View style={tailwind('bg-black flex-1')}>
      <View style={tailwind('flex-1 px-7')}>
        <Text
          style={tailwind('text-2xl font-normal mt-8 text-white text-center')}>
          Verify Via
        </Text>
        <Tab.Navigator
          sceneContainerStyle={tailwind('bg-black')}
          tabBarInactiveTintColor={getColor('white')}
          tabBarOptions={{
            activeTintColor: getColor('white'),
            inactiveTintColor: getColor('gray-600'),
            indicatorStyle: tailwind('bg-brand-primary h-2'),
            labelStyle: tailwind('normal-case font-bold text-lg mb-3'),
            style: tailwind('bg-black'),
          }}>
          <Tab.Screen name="Mobile Number" component={MobileNumberScreen} />
          <Tab.Screen name="Email" component={EmailScreen} />
        </Tab.Navigator>
      </View>
    </View>
  );
}
