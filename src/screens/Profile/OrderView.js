import Button from '@/components/Button';
import React, {useEffect, useLayoutEffect, useContext, useState} from 'react';
import StackHeader from '@/components/StackHeader';
import {tailwind, getColor} from '@/common/tailwind';
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {Avatar, Image} from 'react-native-elements';
import Svg, {Circle, Defs, G, Path} from 'react-native-svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useQuery} from 'react-query';
import {AuthContext} from '@/common/contexts/AuthContext';
import API from '@/common/services/API';
import ProductImage from '@/components/Products/ProductImage';
import ToastUpcomingFeature from '@/common/helpers/ToastUpcomingFeature';
import Clipboard from '@react-native-community/clipboard';

const useOrderDetails = values => {
  const {accessToken} = useContext(AuthContext);
  return useQuery(['user', values?.id, 'orderDetail'], () =>
    API(accessToken).get(
      `/checkout/order-detail/${values?.id}?isSalesHistory=${values?.isSalesHistory}`,
    ),
  );
};

export default function PurchaseConfirmation({route, navigation}) {
  const {id, isSalesHistory} = route?.params;
  const {data, isLoading, isSuccess, isError, refetch} = useOrderDetails({
    id,
    isSalesHistory,
  });
  const [order, setOrder] = useState(data?.data?.payload);

  const [stores, setStores] = useState();
  const [clipb, setClipb] = useState();

  useEffect(() => {
    Clipboard?.getString()?.then(res => {
      setClipb(res);
    });

    setOrder(data?.data?.payload);
    setStores(
      data?.data?.payload?.products_list
        ?.map(el => el.product?.product_owner)
        ?.filter(
          (el, index) =>
            data?.data?.payload?.products_list
              ?.map(el => el.product?.product_owner)
              .findIndex(obj => obj?._id == el?._id) === index,
        ),
    );
  }, [data]);

  // console.log({stores});

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,

              title: isSalesHistory ? 'SALE' : 'PURCHASE',
              iconName: 'arrow-back-outline',
            }}
          />
        );
      },
    });
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={tailwind('flex-1 items-center justify-center')}>
        <ActivityIndicator size="large" color={getColor('brand-primary')} />
      </View>
    );
  }

  function createShippingAddr(addr) {
    console.log(addr);
    let address = '';
    if (addr?.name) {
      address += addr.name + '\n';
    }
    if (addr?.address) {
      address += addr.address;
    }

    if (addr?.state) {
      address += addr.state + ', ';
    }

    if (addr?.zip) {
      address += addr.zip + '\n';
    }

    if (addr?.country) {
      address += addr.country + '\n';
    }

    if (addr?.phone) {
      address += addr.phone;
    }

    return address;
  }

  return (
    <ScrollView>
      <View style={tailwind('flex-1 bg-gray-100 p-0 p-4 justify-between mb-4')}>
        <View style={[tailwind('border-b border-gray-300 py-2')]}>
          <View style={tailwind('flex-row items-center')}>
            <Text style={[tailwind('font-bold text-sm mr-2')]}>
              Order No. {order?.order_number}
            </Text>
            <MaterialCommunityIcons
              name="content-copy"
              size={13}
              color="#ed1a8e"
              style={{
                transform: [{rotateY: '180deg'}],
              }}></MaterialCommunityIcons>
            <TouchableOpacity
              onPress={() => {
                Clipboard?.setString(order?.order_number);
                Clipboard?.getString()?.then(res => {
                  setClipb(res);
                });
              }}>
              <Text style={([tailwind('normal-case')], {color: '#ed1a8e'})}>
                {' '}
                {clipb === order?.order_number ? 'Copied' : 'Copy'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {stores?.map(store => {
          return (
            <View style={tailwind('py-2')}>
              {!isSalesHistory ? (
                <Text style={tailwind('font-bold text-sm')}>
                  {order?.products_list?.reduce((curr, val) => {
                    return val?.product?.product_owner?._id === store?._id
                      ? curr + 1
                      : curr;
                  }, 0)}{' '}
                  <Text style={tailwind('font-light text-gray-600')}>
                    {order?.products_list?.reduce((curr, val) => {
                      return val?.product?.product_owner?._id === store?._id
                        ? curr + 1
                        : curr;
                    }, 0) > 1
                      ? 'items '
                      : 'item '}
                    from
                  </Text>{' '}
                  {store?.username}
                </Text>
              ) : (
                <Text style={tailwind('font-bold text-sm')}>
                  {order?.products_list?.reduce((curr, val) => {
                    return val?.product?.product_owner?._id === store?._id
                      ? curr + 1
                      : curr;
                  }, 0)}{' '}
                  <Text style={tailwind('font-light text-gray-600')}>
                    {order?.products_list?.reduce((curr, val) => {
                      return val?.product?.product_owner?._id === store?._id
                        ? curr + 1
                        : curr;
                    }, 0) > 1
                      ? 'items to'
                      : 'item to'}
                  </Text>
                  {' Deliver'}
                </Text>
              )}
              <Text style={tailwind('text-gray-600')}>
                {' '}
                Status:{' '}
                <Text style={tailwind('font-bold text-black')}>
                  Shipped {Math.random().toString().substring(4, 6)} minutes ago
                </Text>
              </Text>
              {order?.products_list
                ?.filter(el => el.product.product_owner?._id === store?._id)
                .map((item, innerIndex, arr) => {
                  // console.log('item ------------ ', item);
                  return (
                    <View style={tailwind('')}>
                      <View
                        style={tailwind(
                          'flex-row items-center mt-4 border-b border-gray-300',
                        )}>
                        <Avatar
                          source={{
                            uri: item?.product?.images[0]?.absolute_path,
                          }}
                          style={[
                            tailwind('w-24 h-24 rounded-full'),
                            styles.shadow,
                          ]}
                          rounded={true}
                        />

                        <View style={tailwind('ml-2 px-1')}>
                          <View>
                            <Text
                              style={[
                                tailwind(
                                  'uppercase text-black font-bold text-base py-2',
                                ),
                                {width: 220},
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
                                ${item?.product?.price}{' '}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
            </View>
          );
        })}
        <View style={tailwind('border-b border-gray-300 py-3')}>
          <Text style={tailwind('font-bold  text-sm text-base')}>
            Product will be shipped to
          </Text>
          <Text style={([tailwind('text-sm')], {width: 190})}>
            {createShippingAddr(order?.shipping_address)}
          </Text>
        </View>
        <View style={tailwind('border-b border-gray-300 py-3')}>
          <Text style={tailwind('font-bold  text-sm text-base')}>
            Paid{' '}
            <Text style={([tailwind('')], {color: '#ed1a8e'})}>
              ${order?.total?.toFixed(2) || 0.0}
            </Text>{' '}
            with {order?.method}
          </Text>
          <View style={tailwind('justify-between flex-row ')}>
            <Text style={tailwind('text-sm ')}>Product Price:</Text>
            <Text style={tailwind('text-sm ')}>
              $
              {order?.products_list
                ?.reduce((curr, val) => {
                  return curr + val?.product?.price * val?.quantity;
                }, 0)
                ?.toFixed(2)}
            </Text>
          </View>
          <View style={tailwind('justify-between flex-row ')}>
            <Text style={tailwind('text-sm ')}>Shipping Fee:</Text>
            <Text style={tailwind('text-sm ')}>
              $
              {order?.products_list
                ?.reduce((curr, val) => {
                  return curr + (val?.product?.shippingFee || 0) - 0;
                }, 0)
                ?.toFixed(2)}
            </Text>
          </View>
          <View style={tailwind('justify-between flex-row ')}>
            <Text style={tailwind('text-sm ')}>Total:</Text>
            <Text style={tailwind('text-sm ')}>
              ${order?.total?.toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={tailwind('border-b border-gray-300 py-3')}>
          <View style={tailwind('justify-between flex-row ')}>
            <Text>Date Purchased:</Text>
            <Text style={tailwind('text-sm font-bold text-base')}>
              {order?.created_At?.split('T')[0].replace(/[-]/g, '/')}
            </Text>
          </View>
          <View style={tailwind('flex-row py-2 justify-between ')}>
            {!isSalesHistory && <Text style={tailwind('')}>From Seller:</Text>}
            {!isSalesHistory &&
              stores?.map(store => {
                return (
                  <View>
                    <View
                      style={[
                        tailwind('flex-row items-center justify-between'),
                      ]}>
                      <Text></Text>
                      <View style={tailwind('flex-row mx-1 items-center')}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.replace('Seller Store', {store})
                          }>
                          <Avatar
                            source={{
                              uri:
                                store?.cover_pic?.absolute_path ||
                                store?.profile_pic?.absolute_path,
                            }}
                            rounded
                          />
                        </TouchableOpacity>

                        <Text style={tailwind('font-bold pl-1')}>
                          {store?.username}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => ToastUpcomingFeature({position: 'top'})}>
                      <View style={tailwind('flex-row  justify-end  ')}>
                        <MaterialCommunityIcons
                          name="message-outline"
                          size={18}
                          color="#ed1a8e"
                          style={[
                            tailwind('mr-1'),
                            {
                              transform: [{rotateY: '180deg'}],
                            },
                          ]}
                        />
                        <Text style={([tailwind('pl-2')], {color: '#ed1a8e'})}>
                          Contact Seller
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>

          {/* <Image source={require('../../assets/iconmessage.png')}/> */}
        </View>
        <View style={tailwind('border-b border-gray-300 py-3')}>
          <Text style={tailwind('text-sm font-bold text-base')}>
            Shipping Details
          </Text>
          <View style={tailwind('justify-between flex-row ')}>
            <Text>Provider:</Text>
            <Text>USPS</Text>
          </View>
          <View style={[tailwind('justify-between flex-row ')]}>
            <Text>Tracking Number:</Text>
            <Text style={([tailwind('')], {color: '#ed1a8e'})}>
              {Math.random().toString().substring(3, 16)}
            </Text>
          </View>
        </View>
      </View>
      <View style={[tailwind('items-center mb-6')]}>
        <Button
          containerStyle={tailwind('items-center ')}
          title={isSalesHistory ? 'Mark as Delivered' : 'Rate this purchase'}
          onPress={() => ToastUpcomingFeature({position: 'top'})}
          titleStyle={tailwind('justify-center text-white  text-xl font-bold')}
          size="md"
          theme="white"
          buttonStyle={tailwind('bg-black')}
          type="outline"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  shadow: {
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
});
