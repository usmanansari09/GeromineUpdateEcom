import React, {useEffect, useState, useContext, useLayoutEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {AuthContext} from '@/common/contexts/AuthContext';
import {Icon, Image} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import {Text, Button, Input} from '@/components/index';
import {tailwind, getColor} from '@/common/tailwind';
import {useIsFocused} from '@react-navigation/core';
import API from '@/common/services/API';
import {useQuery, UseQueryOptions} from 'react-query';
import {WebView} from 'react-native-webview';
import StackHeader from '@/components/StackHeader';
import stripeButtonBg from '@/assets/Connect-with-stripe.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const STORE_LENGTH = 128;

const getProfileWithPayment = opts => {
  const {accessToken} = useContext(AuthContext);
  const isFocused = useIsFocused();
  return useQuery(
    ['user', accessToken],
    () =>
      API(accessToken)
        .get(`user`)
        .then(result => {
          // console.log(
          //   'result of getProfileWithPayment -------------',
          //   result?.data?.payload?.user,
          // );
          return result?.data?.payload?.user;
        })
        .catch(err => {
          // console.log(
          //   'error getProfileWithPayment --------',
          //   err?.data?.message,
          // );
        }),
    {enabled: isFocused && accessToken.length !== 0, ...opts},
  );
};
export default function StorePayment({navigation, route}) {
  useEffect(() => {
    navigation.setOptions({
      header: props => {
        return <StackHeader props={{...props, title: 'Connect with Stripe'}} />;
      },
    });
  }, []);

  const {isSignedIn, accessToken} = useContext(AuthContext);
  const [updating, setUpdating] = useState(false);

  const {
    data: profile,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = getProfileWithPayment();

  const [email, setEmail] = useState(profile?.email.email || '');

  // const [password, setPassword] = useState(profile?.password.password || '');
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const {control, errors, handleSubmit, reset: resetForm} = useForm();

  useEffect(() => {
    setEmail(profile?.email.email);
    // setPassword(profile?.password.password);
    setFullName(profile?.full_name);
  }, [isSuccess]);

  if (isLoading) {
    return (
      <View style={tailwind('items-center justify-center flex-1')}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
  return (
    <KeyboardAwareScrollView>
      <View style={tailwind('flex px-4 py-4')}>
        <View style={tailwind('items-center')}>
          <ImageBackground
            // onPress={() => setShowModal(!showModal)}
            //   source={{uri: 'https://i.imgur.com/COzKNgN.png'}}
            source={{
              uri: 'https://woocommerce.com/wp-content/uploads/2011/12/stripe-logo-blue.png',
            }}
            resizeMode={'contain'}
            style={[
              tailwind(''),
              {
                height: 140,
                width: 300,
              },
            ]}
            resizeMode="cover"
            PlaceholderContent={
              <ActivityIndicator
                size="large"
                color={getColor('brand-primary')}
              />
            }
            placeholderStyle={tailwind('bg-white')}
          />
          {/* powered by stripe logo */}
          {/* <Image
                // onPress={() => setShowModal(!showModal)}
                source={{uri: 'https://i.imgur.com/M2DtgD4.png'}}
                style={[
                    tailwind('-mt-6 ml-24'),
                    {
                    height: 80,
                    width: 100,
                    },
                ]}
                resizeMode="cover"
                PlaceholderContent={
                    <ActivityIndicator
                    size="small"
                    color={getColor('brand-primary')}
                    />
                }
                placeholderStyle={tailwind('bg-white')}
                /> */}
          <Text
            style={[
              tailwind('text-gray-400 text-center mb-2'),
              {fontSize: 16},
            ]}>
            Hi, {fullName}!
          </Text>
          <Text
            style={[
              tailwind(
                'text-gray-800 mb-4 font-black text-lg text-center',
              ) /* {fontSize: 22} */,
            ]}>
            Connect your Stripe account to Geronimo! App and get paid
          </Text>
        </View>

        <View style={tailwind('mt-4 px-6 items-center w-full')}>
          <Text
            style={[
              tailwind('px-6 text-gray-400 text-center') /* {fontSize: 22} */,
            ]}>
            Enter the email address you’ll use for your payout
          </Text>

          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                containerStyle={[tailwind('mt-10 px-4'), {width: 360}]}
                labelStyle={{fontWeight: '800'}}
                label=""
                theme="secondary"
                type="outline"
                keyboardAppearance="default"
                multiline={false}
                placeholder="Enter your Email"
                clear
                style={[tailwind('text-gray-500'), {height: 56}]}
                onBlur={onBlur}
                value={email}
                onChangeText={text => {
                  setEmail(text);
                }}
                errorMessage={''}
              />
            )}
            name={'email'}
          />
          {/* <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <Input
                  containerStyle={[
                    tailwind('mt-10 px-4'),
                    {width: 360, bottom: 30},
                  ]}
                  labelStyle={{fontWeight: '800'}}
                  label=""
                  theme="secondary"
                  type="outline"
                  keyboardAppearance="default"
                  multiline={false}
                  placeholder="Enter your Password"
                  clear
                  style={[tailwind('text-gray-500'), {height: 56}]}
                  onBlur={onBlur}
                  value={'password'}
                  onChangeText={text => {
                    setPassword(text);
                  }}
                  errorMessage={''}
                />
              )}
              name={'password'}
            /> */}
          <Button
            onPress={() =>
              navigation.navigate('StoreNavigation', {
                screen: 'ConnectWithStripe',
                params: {email},
              })
            }
            title="Next"
            theme="black"
            size="smLg"
            loading={updating}
            containerStyle={[tailwind('p-2'), {width: '50%'}]}
          />
          {/* <TouchableOpacity
              style={[tailwind('w-full mt-6 items-center')]}
              onPress={() =>
                navigation.navigate('StoreNavigation', {
                  screen: 'ConnectWithStripe',
                  // screen: 'ConnectWithStripeSuccess', // TESTING
                  // params: {email, isSellerConnected: true}, //TESTING
                  params: {email},
                })
              }>
              <ImageBackground
                resizeMode="contain"
                style={[
                  tailwind(''),
                  {
                    height: '38%',
                    width: '70%',
                    borderRadius: 12,
                    overflow: 'hidden',
                  },
                ]}
                source={stripeButtonBg}
              />
            </TouchableOpacity> */}
          {/* <Button
            onPress={() =>
              navigation.navigate('StoreNavigation', {
                screen: 'ConnectWithStripe',
              })
            }
            title="Connect with Stripe"
            theme="black"
            size="smLg"
            loading={updating}
            containerStyle={[tailwind('p-2'), {width: '80%'}]}
          /> */}
          {/* <Button
              onPress={() =>
                navigation.navigate('StoreNavigation', {
                  screen: 'StoreSplashOut',
                })
              }
              title="Next"
              theme="black"
              size="smLg"
              loading={updating}
              containerStyle={[tailwind('p-2'), {width: '50%'}]}
            /> */}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
