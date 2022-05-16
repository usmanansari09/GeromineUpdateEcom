import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StackHeader from '@/components/StackHeader';

import SupportCenter from '@/screens/SupportCenter';
import SupportChat from '@/screens/SupportCenter/SupportChat';
const Stack = createStackNavigator();

export default function BuyChipsNavigation() {
  return (
    <Stack.Navigator
      options={{
        header: props => <StackHeader {...props} />,
      }}
      detachInactiveScreens={false}
      >
      <Stack.Screen name={'SupportCenterHome'} component={SupportCenter} />
      {/* <Stack.Screen name={'SupportCenterChat'} component={SupportChat} /> */}
    </Stack.Navigator>
  );
}
