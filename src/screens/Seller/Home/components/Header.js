import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {tailwind} from '@/common/tailwind';
import Icon from 'react-native-vector-icons/Ionicons';

import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {RouteProp, useNavigation} from '@react-navigation/native';
import useUpdateEffect from '@/common/hooks/useUpdateEffect';
import Modal from 'react-native-modal';
import Button from '@/components/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AuthContext} from '@/common/contexts/AuthContext';
const MENU_ITEMS = [
  {
    title: 'Dashboard',
    route: 'Dashboard',
    requiresAuth: true,
  },
  {
    title: 'My Profile',
    route: 'ProfileTab',
    params: {
      screen: 'User Profile',
    },
    requiresAuth: true,
  },
  {
    title: 'My Messages',
    route: 'MessagesScreen',
    param: {
      screen: 'Messages_Home',
    },
    requiresAuth: true,
  },

  {
    title: 'Contact Us',
    route: 'Contact Us',
    requiresAuth: true,
  },
  {
    title: 'Sign In',
    route: 'Auth',
    params: {
      screen: 'Sign In',
    },
    requiresAuth: false,
  },
  {
    title: 'Register',
    route: 'Auth',
    params: {
      screen: 'Register',
    },
    requiresAuth: false,
  },
  {
    title: 'Logout',
    route: 'Logout',
    requiresAuth: true,
  },
  {
    title: 'How it Works',
    route: 'How it Works',
    alwaysShown: true,
  },
];
/**
 *
 * @param {{scene:StackScreenProps<any,any>,route:RouteProp<any,any>,navigation:StackNavigationProp<any,any>}} props
 */
export default function Header({scene, previous, navigation}) {
  const insets = useSafeAreaInsets();

  const {options} = scene?.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View
      style={{
        ...tailwind(
          'bg-black py-4 px-3 flex-row justify-between items-center ',
        ),
        paddingTop: insets.top,
      }}>
      <View style={tailwind('flex-row items-center')}>
        <TouchableOpacity
          onPress={() => {
            // setMenuOpen((prev) => !prev);
            navigation.navigate('FlyOutMenu');
          }}>
          <Icon name="menu-outline" style={tailwind('text-white text-4xl')} />
        </TouchableOpacity>
        {/* <Menu
                    show={menuOpen}
                    onClose={() => setMenuOpen(false)}
                    onClick={(name, params) => {
                        setMenuOpen(false);
                        navigation.navigate(name, params);
                    }}
                /> */}
        <Text style={tailwind('text-white text-2xl uppercase font-bold')}>
          {title}
        </Text>
      </View>
      <View style={tailwind('flex-row items-center')}>
        <Button
          title="Buy Chips"
          titleStyle={tailwind('uppercase text-white text-base')}
          onPress={() => navigation.navigate('Buy Chips', {screen: 'Buy'})}
          size="sm"
          type="outline"
          theme="black"
          buttonStyle={tailwind('rounded-md px-2 py-1')}
        />

        <View style={tailwind('flex-row')}>
          <Icon
            onPress={() => {
              navigation.navigate('ShoppingCart', {
                screen: 'Cart',
              });
            }}
            name="cart-outline"
            style={tailwind('text-brand-primary ml-2 text-3xl')}
          />
          <Icon
            onPress={() => navigation.navigate('SearchScreen')}
            name="search-outline"
            style={tailwind('text-brand-primary ml-2 text-3xl')}
          />
        </View>
      </View>
    </View>
  );
}
/**
 *
 * @param {{isLoggedIn:Boolean,show:Boolean,onClose:Function,onClick:Function}} props
 */
function Menu({isLoggedIn = true, show = false, onClose, onClick, onHidden}) {
  const {isSignedIn} = useContext(AuthContext);

  return (
    <Modal
      isVisible={show}
      onBackdropPress={onClose}
      style={tailwind('m-0')}
      animationOutTiming={100}
      onBackButtonPress={onClose}>
      <View style={tailwind('flex-1 bg-black px-5 py-12')}>
        <Icon
          onPress={onClose}
          name="close-outline"
          style={tailwind('text-white text-4xl')}
        />
        <View style={tailwind('justify-between flex-1')}>
          <View>
            {MENU_ITEMS.filter(item => {
              if (item.alwaysShown) {
                return true;
              } else if (item?.requiresAuth && isSignedIn) {
                return true;
              } else if (!item?.requiresAuth && !isSignedIn) {
                return true;
              }
            }).map((item, index) => (
              <TouchableOpacity
                onPress={() => onClick(item.route, item.params)}
                key={index}>
                <Text
                  style={{
                    ...tailwind(
                      'text-white text-3xl uppercase font-bold text-center py-1',
                    ),
                  }}>
                  {item.title}
                </Text>
                <View style={tailwind('border-b border-gray-700')} />
              </TouchableOpacity>
            ))}
          </View>
          <Button
            onPress={() => onClick('LiveStream')}
            title={'Start Stream'}
            theme="primary"
            size="md"
            titleStyle={tailwind('normal-case')}
            containerStyle={tailwind('mt-8')}
          />
          <View>
            <TouchableOpacity
              onPress={() => {
                onClick('Privacy Policy');
              }}>
              <Text style={tailwind('text-white text-lg text-center')}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onClick('Terms of Use');
              }}>
              <Text style={tailwind('text-white text-lg text-center')}>
                Terms and Conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
