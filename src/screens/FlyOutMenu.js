/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useContext, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {tailwind} from '@/common/tailwind';
import Icon from 'react-native-vector-icons/Ionicons';

import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import Button from '@/components/Button';
import {AuthContext} from '@/common/contexts/AuthContext';
import {Image} from 'react-native-elements';
import {StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('screen');
import StackHeader from '@/components/StackHeader';
import {clearCart} from '@/common/appStorageService/cartService';

const formatTitle = (titles, idx, isSplit, isSignedIn) => {
  const t = titles.split(' ');
  return (
    <View>
      {!isSplit ? (
        <Text
          style={{
            ...tailwind(
              `uppercase font-bold text-center py-0 text-brand-primary
                                 ${
                                   width > 400
                                     ? 'text-4xl'
                                     : isSignedIn
                                     ? 'text-3xl'
                                     : 'text-2xl'
                                 }`,
            ),
          }}>
          {titles}
        </Text>
      ) : (
        // <Text
        //   style={{
        //     ...tailwind(
        //       `uppercase font-bold text-center py-0 text-brand-primary
        //                        ${
        //                          width > 400
        //                            ? 'text-5xl'
        //                            : isSignedIn
        //                            ? 'text-2xl'
        //                            : 'text-4xl'
        //                        }`,
        //     ),
        //   }}>
        //   {titles}
        // </Text>
        t.map((title, index) => (
          <Text
            key={index}
            style={{
              ...tailwind(
                `uppercase font-bold text-center py-0 text-brand-primary
                                 ${
                                   idx == index || idx == null
                                     ? width > 400
                                       ? 'text-5xl'
                                       : isSignedIn
                                       ? 'text-3xl'
                                       : 'text-3xl'
                                     : width > 400
                                     ? 'text-3xl'
                                     : isSignedIn
                                     ? 'text-2xl'
                                     : 'text-xl'
                                 }`,
              ),
            }}>
            {title}
          </Text>
        ))
      )}
    </View>
  );
};
const MENU_ITEMS = [
  {
    title: 'My Profile',
    route: 'ProfileTab',
    params: {
      screen: 'User Profile',
    },
    titleIdx: 0,
    split: true,
    requiresAuth: true,
  },
  {
    title: 'My Messages',
    route: 'MessagesScreen',
    param: {
      screen: 'Messages_Home',
    },
    isSingle: false,
    split: true,
    titleIdx: 0,
    requiresAuth: true,
  },
  {
    title: 'Sign In',
    route: 'SignIn',
    isSingle: false,
    split: false,
    requiresAuth: false,
  },
  {
    title: 'Register',
    route: 'Register',
    isSingle: false,
    split: false,
    requiresAuth: false,
  },
  {
    title: 'G Blog',
    route: 'GBlog',
    isSingle: false,
    split: true,
    requiresAuth: true,
  },
  {
    title: 'How it Works',
    route: 'How it Works',
    isSingle: true,
    split: false,
    alwaysShown: true,
  },
  {
    title: 'Contact Us',
    route: 'Contact Us',
    isSingle: true,
    titleIdx: 1,
    split: false,
    requiresAuth: true,
  },
];
/**
 *
 * @param {{scene:StackScreenProps<any,any>,route:RouteProp<any,any>,navigation:StackNavigationProp<any,any>}} props
 */
export default function FlyOutMenu({navigation}) {
  const {isSignedIn} = useContext(AuthContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              title: 'Menu',
              iconName: 'close-outline',
              iconSize: 40,
            }}
          />
        );
      },
    });
  }, [navigation]);
  const NotSignedIn = () => {
    return (
      <View style={tailwind('flex-1 justify-center items-center')}>
        <View style={tailwind('flex-row')}>
          <TouchableOpacity
            onPress={() => navigateTo('SignIn')}
            style={styles.notSignedView}>
            <Text
              style={{
                ...tailwind(
                  `uppercase font-bold text-center py-0 text-brand-primary
                                 ${'text-2.5xl'}`,
                ),
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateTo('Register')}
            style={styles.notSignedView}>
            <Text
              style={{
                ...tailwind(
                  `uppercase font-bold text-center py-0 text-brand-primary
                                 ${'text-2.5xl'}`,
                ),
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigateTo('How it Works')}
          style={styles.notSignedView}>
          <Text
            style={{
              ...tailwind(
                `uppercase font-bold text-center py-0 text-brand-primary
                                 ${'text-2.5xl'}`,
              ),
            }}>
            How It Works
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const navigateTo = (screen, params) => {
    navigation.navigate(screen, params);
  };
  const SignedIn = () => {
    return (
      <View style={tailwind('flex-1 justify-center items-center')}>
        <View style={tailwind('flex-row')}>
          <TouchableOpacity
            onPress={() => navigateTo('User Profile', {screen: 'FlyOutMenu'})}
            style={styles.notSignedView}>
            <Text
              style={{
                ...tailwind(
                  `uppercase font-bold text-center py-0 text-brand-primary
                                 ${'text-2.5xl'}`,
                ),
              }}>
              {`MY\nProfile`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[tailwind(''), styles.notSignedView]}>
            <Text
              style={tailwind(
                `font-bold text-center text-brand-primary text-3xl`,
              )}>
              {`MY`}
            </Text>
            <Text
              style={{
                ...tailwind(
                  `uppercase font-bold text-center py-0 text-brand-primary
                                 ${width < 400 ? `text-2.5xl` : `text-2.5xl`}`,
                ),
              }}>
              {`MESSAGES`}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tailwind('flex-row')}>
          <TouchableOpacity
            style={styles.notSignedView}
            onPress={() => navigateTo('GBlog')}>
            <Text
              style={{
                ...tailwind(
                  `uppercase font-bold text-center py-0 text-brand-primary
                                 ${'text-2.5xl'}`,
                ),
              }}>
              {`G\nBlog`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateTo('How it Works')}
            style={styles.notSignedView}>
            <Text
              style={{
                ...tailwind(
                  `uppercase font-bold text-center py-0 text-brand-primary
                                 ${'text-2.5xl'}`,
                ),
              }}>
              {`How it\nWorks`}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.notSignedView, {width: width / 2.2, height: 145}]}>
          <Text
            style={{
              ...tailwind(
                `uppercase font-bold text-center mt-3 text-brand-primary
                                 ${'text-2.5xl'}`,
              ),
            }}>
            {`Contact\nUs`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={tailwind('flex-1 bg-black')}>
      <ScrollView alwaysBounceVertical={false}>
        <View style={tailwind('px-1')}>
          <View style={tailwind('justify-between items-center flex-1')}>
            {isSignedIn ? <SignedIn /> : <NotSignedIn />}

            {/* <View style={tailwind('flex-wrap flex-row')}>
              {MENU_ITEMS.filter(item => {
                if (item.alwaysShown) {
                  return true;
                } else if (item?.requiresAuth && isSignedIn) {
                  return true;
                } else if (!item?.requiresAuth && !isSignedIn) {
                  return true;
                }
              }).map((item, index) => (
                <View
                  key={index}
                  style={[tailwind('p-5 h-44'), {width: `${100 / 2}%`}]}>
                  <TouchableOpacity
                    // onPress={() => navigation.navigate(item.route, item.params)}
                    key={index}
                    style={[
                      !isSignedIn
                        ? item.isSingle
                          ? tailwind(`bg-white rounded-md justify-center h-full items-center 
                                                            ${
                                                              width > 400
                                                                ? ' w-44 mx-24'
                                                                : 'w-40 mx-16'
                                                            }`)
                          : tailwind(
                              `bg-white rounded-md justify-center h-full items-center`,
                            )
                        : item.isSingle
                        ? tailwind(`bg-white rounded-md justify-center h-full items-center 
                                                            ${
                                                              width > 400
                                                                ? item.signedAddedStyle400
                                                                : item.signedAddedStyle300
                                                            }`)
                        : tailwind(
                            `bg-white rounded-md justify-center h-full items-center`,
                          ),
                    ]}>
                    {item?.icon !== undefined && (
                      <Image
                        source={item.icon}
                        style={tailwind('w-14 h-14')}
                        resizeMode="contain"
                      />
                    )}

                    {formatTitle(
                      item.title,
                      item.titleIdx,
                      item.split,
                      isSignedIn,
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </View> */}

            <View
              style={[
                tailwind('mt-2'),
                {
                  height: isSignedIn ? height / 4.5 : height / 3,
                  justifyContent: 'flex-end',
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Privacy Policy');
                }}>
                <Text style={tailwind('text-white text-lg text-center')}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Terms of Use');
                }}>
                <Text style={tailwind('text-white my-2 text-lg text-center')}>
                  Terms and Conditions
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Return Policy');
                }}>
                <Text style={tailwind('text-white text-lg text-center')}>
                  14-day Return Policy
                </Text>
              </TouchableOpacity>
              {isSignedIn && (
                <Button
                  onPress={async () => {
                    await clearCart();
                    navigation.replace('Logout');
                  }}
                  title="Log out"
                  type="clear"
                  theme="primary"
                  containerStyle={tailwind('mt-0')}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  notSignedView: {
    margin: 5,
    height: 150,
    borderRadius: 6,
    // alignItems: 'center',
    justifyContent: 'center',
    width: width / 2 - 20,
    backgroundColor: 'white',
  },
});
