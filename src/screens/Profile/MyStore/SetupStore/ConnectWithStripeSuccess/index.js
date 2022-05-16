import React, {useEffect, useState, useContext, useLayoutEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
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
import stripeConnectedTick from '@/assets/stripe-connected-tick.png';
import {useProfile} from '@/common/services/hooks';

const STORE_LENGTH = 128;

export default function ConnectWithStripeSuccess({navigation, route}) {
  const {
    data: user,
    isLoading,
    isSuccess: isSuccessUser,
    isError,
  } = useProfile();

  const isSellerConnected = route?.params?.isSellerConnected;
  const role = user?.payload?.user?.role;
  console.log({role});

  useEffect(() => {
    navigation.setOptions({
      header: props => {
        return <StackHeader props={{...props, title: 'Connect with Stripe'}} />;
      },
    });
  }, []);

  const [updating, setUpdating] = useState(false);

  if (isLoading) {
    return (
      <View style={tailwind('items-center justify-center flex-1')}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={tailwind('flex px-4 py-4 h-full')}>
        <Text
          style={[
            tailwind(
              'text-gray-800 mb-4 text-lg text-center px-12 mt-16',
            ) /* {fontSize: 22} */,
          ]}>
          Congratulations! You have successfully connected your account.
        </Text>
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
            placeholderStyle={tailwind('bg-white')}>
            <ImageBackground
              // onPress={() => setShowModal(!showModal)}
              //   source={{uri: 'https://i.imgur.com/COzKNgN.png'}}
              source={stripeConnectedTick}
              resizeMode={'contain'}
              style={[
                tailwind('absolute top-4 right-2'),
                {
                  height: 30,
                  width: 30,
                },
              ]}
              resizeMode="cover"
              PlaceholderContent={
                <ActivityIndicator
                  size="large"
                  color={getColor('brand-primary')}
                />
              }
              placeholderStyle={tailwind('bg-white')}></ImageBackground>
          </ImageBackground>
        </View>

        <View
          style={tailwind(
            'mt-4 px-6 items-center w-full h-1/2 justify-center',
          )}>
          <Button
            onPress={() =>
              navigation.navigate('StoreNavigation', {
                screen: 'StoreBillingAddress',
              })
            }
            title="Next"
            disabled={!isSellerConnected}
            theme="black"
            size="smLg"
            loading={updating}
            containerStyle={[tailwind('p-2'), {width: '50%'}]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
