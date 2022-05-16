import React, {useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {tailwind, getColor} from '@/common/tailwind';
import StackHeader from '@/components/StackHeader';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MobileNumberScreen from './MobileNumber';
import EmailScreen from './ViaEmail';

const Tab = createMaterialTopTabNavigator();

export default function Verify({navigation, route}) {
  console.log(`Verify params: `, route?.params);
  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              title: `Verify ${
                route?.params?.type === 'phone' ? 'Phone Number' : 'Email'
              }`,
            }}
          />
        );
      },
      setPrams: {
        phone: route?.params?.phone,
      },
    });
  }, [navigation]);
  return (
    <View style={tailwind('bg-black flex-1')}>
      <View style={tailwind('flex-1 px-7')}>
        <Text
          style={tailwind('text-2xl font-normal mt-8 text-white text-center')}>
          {/*{`Verify ${route?.params?.type === 'phone' ? 'Phone' : 'Email'}`}*/}
        </Text>
        <Tab.Navigator
          sceneContainerStyle={tailwind('bg-black')}
          tabBarInactiveTintColor={getColor('white')}
          tabBarOptions={{
            activeTintColor: getColor('white'),
            inactiveTintColor: getColor('gray-600'),
            indicatorStyle: tailwind('bg-brand-primary h-1'),
            labelStyle: tailwind('normal-case text-2xl text-gray-200 mb-3'),
            style: tailwind('bg-black'),
          }}>
          {route?.params?.type === 'phone' ? (
            <Tab.Screen name="Verification code on your phone number">
              {() => <MobileNumberScreen {...route?.params} />}
            </Tab.Screen>
          ) : (
            // <Tab.Screen name="Mobile Number" component={MobileNumberScreen}/> :
            <Tab.Screen name="Verification code on your email address">
              {() => <EmailScreen {...route?.params} />}
            </Tab.Screen>
          )}
        </Tab.Navigator>
      </View>
    </View>
  );
}
