import React, {useEffect, useLayoutEffect, useContext, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import PayPalFull from '@/common/icons/PaypalFull';
import useCalculateVisibleScreen from '@/common/hooks/useVisibeScreen';
import {useCartItems} from '@/common/services/hooks';
import {CartItemsList} from '@/components/Cart';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import StackHeader from '@/components/StackHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import Image from '@/components/Image';
import API from '@/common/services/API';
import {saveKey, getKeyValue, deleteValue} from '@/common/SecureStore';

import Product from '@/screens/Cart/components/Product';
import User from '@/screens/Cart/components/User';
import {useQuery} from 'react-query';
import {AuthContext} from '@/common/contexts/AuthContext';
import {
  clearCart,
  getCart,
  deleteFromCart,
  quantityMutateCart,
} from '@/common/appStorageService/cartService';
import ToastUpcomingFeature from '@/common/helpers/ToastUpcomingFeature';

export default function Checkout({route, navigation}) {
  const {accessToken} = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchMyCart() {
      let response = await getCart();
      setCart(response);
    }
    fetchMyCart();
    // console.log({cart});
  }, []);

  const {
    data: shippingAddress,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useQuery('buyer_shipping_addr', () =>
    API(accessToken).get('user/checkout/getShippingAddresses'),
  );

  const [shippingAddr, setShippingAddr] = useState(null);

  let itemsCount = cart?.length || 0;

  let uniqShops = cart
    ?.map(el => el.product?.product_owner)
    ?.filter(
      (el, index) =>
        cart
          ?.map(el => el.product?.product_owner)
          .findIndex(obj => obj?._id == el?._id) === index,
    );

  let totalItemPrice =
    cart
      ?.reduce((curr, val) => {
        return curr + val.product.price * val.quantity;
      }, 0)
      .toFixed(2) || 0;

  let totalShipping =
    cart?.reduce((curr, val) => {
      return curr + val.product.shippingFee;
    }, 0) || 0;

  let grandTotal =
    Number.parseFloat(totalItemPrice + totalShipping).toFixed(2) || 0;

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              title: 'CHECKOUT',
              iconName: 'arrow-back-outline',
            }}
          />
        );
      },
    });
  }, [navigation]);
  useEffect(() => {
    if (!shippingAddr) {
      if (shippingAddress) {
        getAddressID();
      }
    }
  }, [isSuccess]);
  const getAddressID = async () => {
    const shippingID = await getKeyValue('@defaultAddressID');
    const {payload} = shippingAddress?.data;
    const address = payload?.shippingAddresses?.filter(item => {
      return item?._id === shippingID;
    });
    if (address) {
      setShippingAddr(address[0]);
    }
  };
  const selectShippingAddr = shipping => {
    console.log('shipping is', shipping);
    saveKey('@defaultAddressID', shipping._id);
    setShippingAddr(shipping);
  };

  const onPressShippingAddr = () => {
    navigation.navigate('Cart_ShippingAddress', {
      selectShippingAddr,
      shippingAddr,
    });
  };
  // console.log('cartitemlist---', CartItemsList);
  return (
    <ScrollView>
      <View style={tailwind('flex-1 px-5 py-3')}>
        <View style={tailwind('border-b border-gray-300 py-3')}>
          <Text style={tailwind('font-bold')}>
            {itemsCount + ' '}
            <Text style={tailwind('font-light text-gray-500')}>
              items from
            </Text>{' '}
            {uniqShops?.length}
            <Text style={tailwind('font-light text-gray-500')}> shops</Text>
          </Text>
        </View>
        {/* {Data.map((item, index) => {
          console.log('item is-----', item);
          return (
            <View key={index} style={[tailwind('flex-row py-3 items-center ')]}>
              <Image source={{uri: item.url}} style={{height: 90, width: 90}} />
              <View style={tailwind('pl-3')}>
                <Text
                  style={[
                    tailwind('font-bold text-base  '),
                    {flexWrap: 'wrap'},
                  ]}>
                  {item.product}
                </Text>

                <View style={[tailwind('flex-row items-center flex-wrap')]}>
                  <Text style={tailwind('font-bold text-base')}>
                    {item.price}
                  </Text>
                  <Text style={[tailwind('text-base text-gray-600')]}>
                    + shipping
                  </Text>
                </View>
              </View>
            </View>
          );
        })} */}

        {uniqShops?.map((user, index) => {
          return (
            <View key={user?._id} style={tailwind('')}>
              {/* user */}
              {/* <User user={user} cart={cart} /> */}

              {cart
                ?.filter(el => el.product.product_owner?._id === user?._id)
                .map((item, innerIndex, arr) => {
                  // console.log('item ------------ ', item);
                  return (
                    <Product
                      item={item}
                      user={user}
                      cart={cart}
                      checkout={true}
                    />
                  );
                })}
            </View>
          );
        })}

        {/* <CartItemsList
        // cartItems={items}
        isEditing={false}
        loading={isLoading}
        error={isError}
        flatListProps={{
          contentContainerStyle: tailwind('p-6'),
          ListFooterComponent: () => ( */}

        <View style={tailwind('py-1')}>
          <Text
            style={tailwind('text-black uppercase text-base mb-2 font-bold')}>
            Total
          </Text>
          <View style={tailwind()}>
            <View
              style={tailwind(
                'justify-between flex-row  border-b border-gray-300 py-1',
              )}>
              <Text style={tailwind('text-lg font-normal text-gray-600')}>
                Item Price
              </Text>
              <Text style={tailwind('text-lg font-normal text-gray-600')}>
                {/* ${calculateTotalPrice(items)}.00 */} $ {totalItemPrice}
              </Text>
            </View>
            <View
              style={tailwind(
                'justify-between flex-row border-b border-gray-300 py-1',
              )}>
              <Text style={tailwind('text-lg font-normal text-gray-600')}>
                Shipping
              </Text>
              <Text style={tailwind('text-lg font-normal text-gray-500')}>
                $ {totalShipping}
              </Text>
            </View>
            <View style={tailwind('justify-between flex-row  py-1')}>
              <Text style={tailwind('text-lg font-normal text-gray-600')}>
                Total
              </Text>
              <Text style={tailwind('text-lg text-black font-bold')}>
                {/* ${calculateTotalPrice(items) + 10} */}$ {grandTotal}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={tailwind(
            ` mt-4 ${!shippingAddr ? 'border border-red-500 rounded p-1' : ''}`,
          )}>
          <Text
            style={tailwind(
              `uppercase text-base font-bold ${
                shippingAddr ? 'text-black' : 'text-red-500'
              }`,
            )}>
            Shipping Address
          </Text>
          <TouchableOpacity onPress={onPressShippingAddr}>
            <View
              style={tailwind(
                'justify-between flex-row items-center border-b border-gray-300 py-1',
              )}>
              <Text
                numberOfLines={1}
                style={tailwind('text-lg text-gray-600 w-11/12')}>
                {shippingAddr?.address} {shippingAddr?.state}{' '}
                {shippingAddr?.zip} {shippingAddr?.country}
              </Text>
              <Entypo
                name="chevron-small-right"
                color={!shippingAddr ? 'red' : 'black'}
                size={30}></Entypo>
            </View>
          </TouchableOpacity>
        </View>

        <View style={tailwind('mt-8 px-12 pb-16')}>
          <Button
            onPress={() =>
              shippingAddr
                ? navigation.navigate('cart/place-order', {
                    grandTotal,
                    shippingAddr,
                    cart,
                  })
                : ToastUpcomingFeature({
                    position: 'top',
                    text1: 'Please Add Shipping Address First',
                  })
            }
            title={PaypalText}
            // disabled={shippingAddr ? false : true}
            size="md"
            theme="white"
            buttonStyle={tailwind(' bg-black py-3 mt-5')}
          />
          {/* <Text style={tailwind('text-center text-base  py-4')}>Or</Text>
              <Button
                onPress={() => navigation.navigate('cart/place-order')}
                title="Debit or Credit Card"
                size="md"
                theme="white"
                style={tailwind('border-black border-2 rounded-xl')}
                titleStyle={tailwind('text-black ')}
              /> */}
        </View>
      </View>
    </ScrollView>
  );
}
function PaypalText() {
  return (
    <View style={tailwind('flex-row items-center ')}>
      {/* <PayPalFull style={{width: 110, height: 30}} / */}
      <Text style={tailwind('uppercase text-lg text-white font-bold')}>
        Checkout
      </Text>
    </View>
  );
}
