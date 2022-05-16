import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StackHeader from '@/components/StackHeader';

import Dashboard from '@/screens/Seller/Dashboard';
import Home from '@/screens/Seller/Home';

import NewsFeed from '@/screens/NewsFeed';

import ChippedProducts from '@/screens/Profile/ChippedProducts';
import {tailwind} from '@/common/tailwind';
import AllStreams from '@/screens/LiveStream/AllStreams';
import RegisterChip from '@/screens/BuyChips/RegisterChip';
import GBlog from '@/screens/Blog/GBlog';

const Stack = createStackNavigator();

export default function DashboardNavigation() {
  return (
    <Stack.Navigator
    detachInactiveScreens={false}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen
        name="AllStreams"
        options={{
          title: 'Live Streamers',
          headerActions: {
            hasSearch: true,
            hasGoLive: true,
          },
        }}
        component={AllStreams}
      />
      <Stack.Screen
        name="ChippedProducts"
        options={{
          // title: 'Shop Nearby\n Chipped Product',
          // headerTitleStyle: tailwind('text-center flex-1'),
          headerShown: false,
        }}
        component={ChippedProducts}
      />
      <Stack.Screen
        name="NewsFeed"
        component={NewsFeed}
        options={{
          headerActions: {
            hasCart: true,
            hasSearch: true,
          },
        }}
      />
      <Stack.Screen
        options={{
          headerActions: {
            hasCart: true,
            hasSearch: true,
          },
        }}
        name={'GBlog'}
        component={GBlog}
      />

      <Stack.Screen name="Register Chip" component={RegisterChip} />
    </Stack.Navigator>
  );
}
