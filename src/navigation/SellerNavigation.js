/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Dashboard from '@/navigation/DashboardNavigation';
import BuyChipsTab from '@/navigation/BuyChipsNavigation';
import ProfileTab from '@/navigation/ProfileNavigation';
import CartTab from '@/navigation/PurchaseNavigation';

import {tailwind} from '@/common/tailwind';
// import {AppContext} from '@/common/contexts/AppContext';
import {getBottomSpace} from 'react-native-iphone-x-helper';

const Tab = createBottomTabNavigator();

/**
 *
 * @param {{navigation:BottomTabNavigationProp<any,any>}} props
 * @returns
 */
export default function Seller({navigation, route}) {
  // const {currentScreen} = useContext(AppContext);

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}
      detachInactiveScreens={true}
      backBehavior="history">
      <Tab.Screen
        name="HomeTab"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            color: 'white',
          },
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={require('@/assets/homeIcon.png')}
              style={{
                height: 30,
                width: 28,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ShoppingCart"
        component={CartTab}
        options={{
          tabBarLabel: 'ShoppingCart',
          tabBarLabelStyle: {
            color: 'white',
          },
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={require('@/assets/shopping-bag.png')}
              style={{
                height: 30,
                width: 28,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            color: 'white',
          },
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={require('@/assets/profile.png')}
              style={{
                height: 30,
                width: 28,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        // headerShown={false}
        name="Buy Chips"
        options={{
          tabBarLabel: 'Buy Chips',
          tabBarLabelStyle: {
            color: 'white',
          },
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={require('@/assets/wishList.png')}
              style={{
                height: 32,
                // width: 35,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
        // listeners={({navigation: buyChipsNavigation}) => ({
        //   tabPress: e => {
        //     if (currentScreen === 'Buy') {
        //       e.preventDefault();
        //       buyChipsNavigation.navigate('Buy Chips', {
        //         screen: 'Details',
        //       });
        //     }
        //   },
        // })}
        component={BuyChipsTab}
      />
    </Tab.Navigator>
  );
}
/**
 *
 * @param {BottomTabBarProps<BottomTabBarOptions>} props
 */
function CustomTabBar(props) {
  const {state, descriptors, navigation, activeTintColor, inactiveTintColor} =
    props;
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={tailwind(
        'flex-row items-center justify-between pl-5 pr-3 py-5 bg-black',
      )}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        // const label =
        //     options.tabBarLabel !== undefined
        //         ? options.tabBarLabel
        //         : options.title !== undefined
        //         ? options.title
        //         : route.name;
        const TabIcon = options.tabBarIcon;

        const isFocused = state.index === index;

        const onPress = () => {
          state.history;

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.key}
            style={{}}>
            <TabIcon
              focused={isFocused}
              size={10}
              color={isFocused ? activeTintColor : inactiveTintColor}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
