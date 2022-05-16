import React, {useLayoutEffect} from 'react';
import Icon from 'react-native-elements';
import {View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Dashboard from '@/navigation/DashboardNavigation';
import BuyChips from '@/screens/BuyChips';
import {tailwind} from '@/common/tailwind';

const Tab = createBottomTabNavigator();
export default function Seller({navigation, route}) {
  useLayoutEffect(() => {
    if (route.name === 'HomeTab') {
      navigation.setOptions({
        headerLeft: () => (
          <View style={tailwind('flex-row items-center')}>
            <TouchableOpacity>
              <Icon
                name="menu-outline"
                style={tailwind('text-white text-4xl')}
              />
            </TouchableOpacity>
            {/* <Menu
                            show={menuOpen}
                            onClose={() => setMenuOpen(false)}
                        /> */}
          </View>
        ),
      });
    }
  }, [navigation, route]);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Shopping Bag') {
            iconName = focused ? 'shopping-bag' : 'shopping-bag-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-outline' : 'person';
          }

          if (route.name === 'Shopping Bag') {
            return (
              <Icon
                name={'lock'}
                type="material-community"
                size={size}
                color={color}
              />
            );
          }
          if (route.name === 'Buy Chips') {
            return (
              <Icon
                name={'lock'}
                type="material-community"
                size={size}
                color={color}
              />
            );
          }
          // You can return any component that you like here!
          return (
            <Icon
              name={'lock'}
              type="material-community"
              size={size}
              color={color}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        showLabel: false,
        style: tailwind('bg-black'),
      }}>
      <Tab.Screen
        name="HomeTab"
        component={Dashboard}
        options={{tabBarBadge: 99}}
      />
      <Tab.Screen name="Shopping Bag" component={Dashboard} />
      <Tab.Screen name="Profile" component={Dashboard} />
      <Tab.Screen name="Buy Chips" component={BuyChips} />
    </Tab.Navigator>
  );
}
