import React, {useLayoutEffect, useState} from 'react';
import {View, ImageBackground} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import StackHeader from '@/components/StackHeader';

import {getColor, tailwind} from '@/common/tailwind';
import {Button, Text, Image} from '@/components/index';
import BackgroundImage from '@/assets/my-store-bg.png';
import {useProfile, useStoreProducts} from '@/common/services/hooks';

import ProductList from '@/components/Products/ProductList';
import MessageSeller from './components/MessageSeller';
import {getS3Image} from '@/common/helpers';

const buidlSellerName = name => {
  if (!name) return '';
  let firstName = name.split(' ')[0];
  let isLastCharS = firstName[firstName.length - 1] === 's';
  return isLastCharS ? firstName + "'" : firstName + "'s";
};

/**
 *
 * @param {{navigation:StackNavigationProp<any>,route:RouteProp<any,any>}} props
 */
export default function SellerStore({navigation, route}) {
  const [showMessage, setShowMessage] = useState(false);
  const seller_id = route?.params?.seller_id || '';
  const store_id = route?.params?.store_id || '';
  const {data: seller, isSuccess: sellerProfileSuccess} = useProfile(seller_id);
  const {
    data: store,
    isLoading,
    isSuccess,
    isError,
  } = useStoreProducts(store_id);

  useLayoutEffect(() => {
    const sellerName = sellerProfileSuccess
      ? buidlSellerName(seller.full_name) + ' Store' //seller?.data?.full_name
      : 'Store';
    navigation.setOptions({
      headerTitle: sellerName,
      header: props => (
        <StackHeader
          {...props}
          headerRight={() => (
            <Button
              onPress={() => setShowMessage(true)}
              icon={{
                type: 'onicons',
                name: 'chat-bubble-outline',
                color: getColor('white'),
                size: 20,
              }}
              title="Chat"
              size="sm"
              titleStyle={tailwind('uppercase')}
              type="outline"
              theme="black"
            />
          )}
        />
      ),
    });
  }, [navigation, seller, sellerProfileSuccess]);

  return (
    <View style={tailwind('flex-1')}>
      <ImageBackground
        source={store?.background ? {uri: getS3Image(store.background)} : null}
        style={tailwind('w-full flex-1 pb-10 justify-between ')}
        resizeMode="cover">
        <View style={tailwind('')}>
          <Button
            title="Follow"
            icon={{
              type: 'ionicon',
              name: 'add',
              color: getColor('white'),
            }}
            type="outline"
            theme="black"
            containerStyle={tailwind('self-start p-4')}
            buttonStyle={tailwind('bg-transparent rounded-full pr-4')}
            size="sm"
          />
          <View style={tailwind('bg-black bg-opacity-50 px-6 py-1')}>
            <Text style={tailwind('text-2xl text-white font-bold uppercase')}>
              {/* {buidlSellerName(seller?.data?.full_name)} Products */}
            </Text>
          </View>
          <ProductList
            loading={isLoading}
            products={store?.products}
            isPaginated={false}
            flatListProps={{
              numColumns: 1,
              horizontal: true,
              contentContainerStyle: tailwind('px-6 pt-3'),
            }}
          />
        </View>
        <Button
          title={'Buy\nChips'}
          onPress={() =>
            navigation.navigate('Buy Chips', {
              screen: 'Buy',
            })
          }
          theme="black"
          type="outline"
          size="sm"
          titleStyle={tailwind('uppercase')}
          buttonStyle={tailwind('bg-transparent p-2')}
          containerStyle={tailwind('self-end px-6')}
        />

        <MessageSeller
          show={showMessage}
          onClose={() => setShowMessage(false)}
        />
      </ImageBackground>
    </View>
  );
}
