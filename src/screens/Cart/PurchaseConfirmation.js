import {tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {Avatar, Image} from 'react-native-elements';
import Svg, {Circle, Defs, G, Path} from 'react-native-svg';
import ProductImage from '@/components/Products/ProductImage';
import {ScrollView} from 'react-native-gesture-handler';
import {clearCart} from '@/common/appStorageService/cartService';
import {CommonActions, useNavigation} from '@react-navigation/native';

export default function PurchaseConfirmation({navigation, route}) {
  const cart = route?.params?.cart;
  const grandTotal = route?.params?.grandTotal;
  const shippingAddr = route?.params?.shippingAddr;
  const payload = route?.params?.payload;
  const user = route?.params?.user;

  useEffect(() => {
    async function clearMyCart() {
      let response = await clearCart();
    }
    clearMyCart();
    BackHandler.addEventListener('hardwareBackPress', function () {
      navigation.navigate('HomeTab', {screen: 'Home'});
      return true;
    });

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', function () {
        navigation.navigate('HomeTab', {screen: 'Home'});
        return true;
      });
  }, []);

  const navigateToHome = () => {
    // navigation.popToTop();
    // navigation.popToTop();
    navigation.replace('HomeScreen');
  };

  return (
    <View style={tailwind('flex-1 bg-gray-100')}>
      <View style={tailwind('bg-black py-10')}>
        <View style={tailwind('bg-white px-6 py-1 flex-row items-center')}>
          <View style={tailwind('flex-1')}>
            <Text style={tailwind('text-black uppercase font-bold text-3xl')}>
              Thanks for
            </Text>
            <Text style={tailwind('text-black uppercase font-bold text-3xl')}>
              your order
            </Text>
          </View>
          <CartCheckIcon />
        </View>
      </View>
      {/*  */}
      <View style={tailwind('px-6 mt-2 justify-between flex-1')}>
        <View>
          <View>
            <Text style={tailwind('text-black uppercase text-base')}>
              Order Number:
            </Text>
            <Text style={tailwind('text-black uppercase text-base')}>
              {payload?.order_number || 12345678}
            </Text>
          </View>
          {/*  */}
          <ScrollView
            style={tailwind('h-3/5 mt-2 border border-gray-300 rounded-xl')}
            scrollEnabled={true}
            showsVerticalScrollIndicator={true}
            alwaysBounceVertical={true}>
            {cart?.map((item, index) => {
              return (
                <View style={tailwind('flex-row items-center mt-0 py-2 px-1')}>
                  <ProductImage
                    image={item?.product?.images[0] || null}
                    style={[tailwind('self-start rounded-xl h-24 w-20')]}
                    resizeMode="cover"
                    containerStyle={tailwind('w-20 h-24 bg-transparent')}
                  />
                  <View style={tailwind('ml-2 mt-0')}>
                    <View>
                      <Text
                        numberOfLines={2}
                        style={[
                          tailwind(
                            'uppercase text-black font-bold text-base  py-2',
                          ),
                          {width: 150},
                        ]}>
                        {item?.product?.name}
                      </Text>
                    </View>
                    <View>
                      <View style={tailwind('flex-row items-center')}>
                        <Text
                          style={tailwind(
                            'uppercase text-black font-bold text-base',
                          )}>
                          ${(item?.product?.price * item.quantity).toFixed(2)}{' '}
                        </Text>
                        <Text
                          style={tailwind('text-gray-500 normal-case text-xs')}>
                          {item?.product?.shippingFee || 'free shipping'}
                        </Text>
                      </View>
                      <View style={tailwind('flex-row items-center  ')}>
                        <Text style={tailwind('mr-1 text-gray-500')}>
                          From:
                        </Text>
                        <Avatar
                          source={{
                            uri:
                              item?.product?.product_owner?.cover_pic
                                ?.absolute_path ||
                              item?.product?.product_owner?.profile_pic
                                ?.absolute_path ||
                              'https://i.imgur.com/E9Dzd0e.png',
                          }}
                          rounded
                        />
                        <View style={tailwind('ml-2')}>
                          <Text
                            style={tailwind('text-black font-bold text-base')}>
                            {item?.product?.product_owner?.full_name}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          {/*  */}

          <View style={tailwind('mt-6 mb-2')}>
            {/* <Text style={tailwind("text-black")}>
                            We would like to inform you that your payment has
                            been recieved and being process. Once the item has
                            been packed the seller they will be shipped to you
                            immediately.
                        </Text>
                        <Text>Thank You!</Text> */}
            <View style={tailwind('')}>
              <Image
                source={require('@/assets/geronimo-wordmark.png')}
                style={tailwind('h-6 w-20')}
                resizeMode="contain"
              />
              <Text>Team</Text>
            </View>
          </View>
        </View>
        <View style={[tailwind('items-center mb-8')]}>
          <Button
            onPress={navigateToHome}
            containerStyle={tailwind('items-center')}
            title="Back to Home"
            titleStyle={tailwind('justify-center mt-1 text-xl font-bold')}
            size="md"
            theme="white"
            buttonStyle={tailwind('bg-transparent')}
            type="outline"
          />
        </View>
      </View>
    </View>
  );
}
function CartCheckIcon() {
  return (
    <Svg
      style={tailwind('text-black w-32')}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 105.81 103.66">
      <Defs></Defs>
      <G id="cart_1_" transform="translate(22 45.572)">
        <Circle
          fill="currentColor"
          id="Ellipse_1623_1_"
          cx="15.48"
          cy="45.2"
          r="12.82"
        />
        <Path
          fill="currentColor"
          id="Path_245_1_"
          d="M56.57,32.25L56.57,32.25c-7.12-0.7-13.45,4.5-14.15,11.62c-0.7,7.12,4.5,13.45,11.62,14.15
            c7.12,0.7,13.45-4.5,14.15-11.62c0.08-0.84,0.08-1.69,0-2.54C67.58,37.72,62.72,32.86,56.57,32.25z"
        />
        <Path
          fill="currentColor"
          id="Path_246_1_"
          d="M82.96-16.56c-0.64-0.95-1.72-1.52-2.86-1.49H65.9v-0.25c0-15.06-12.2-27.27-27.26-27.27
            s-27.27,12.2-27.27,27.26c0,0,0,0.01,0,0.01v0.25H0.79l-3.61-16.44c-0.4-1.67-1.89-2.85-3.61-2.86H-22v7.47h12.58L2.16,23.29
            c0.31,1.75,1.84,3.01,3.61,2.99h65.12c1.72-0.01,3.21-1.19,3.61-2.86l9.21-36.86C83.98-14.54,83.7-15.7,82.96-16.56z M38.64,1.5
            c-10.94,0-19.8-8.86-19.8-19.8s8.86-19.8,19.8-19.8c10.94,0,19.8,8.86,19.8,19.8c0,0,0,0,0,0C58.44-7.36,49.57,1.5,38.64,1.5z"
        />
        <Path
          fill="currentColor"
          id="Path_247_1_"
          d="M35.65-17.93L28.8-24.9l-5.35,5.23l9.46,9.59c0.69,0.7,1.63,1.11,2.62,1.12c0.97,0.05,1.92-0.32,2.62-1
            l15.69-14.82l-5.1-5.48L35.65-17.93z"
        />
      </G>
    </Svg>
  );
}
