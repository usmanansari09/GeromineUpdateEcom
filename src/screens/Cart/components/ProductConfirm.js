import React, {useState} from 'react';

import {View, TouchableOpacity, Text} from 'react-native';

import tailwind from 'tailwind-rn';

import ProductImage from '@/components/Products/ProductImage';

import {Icon} from 'react-native-elements';

import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default Product = ({
  item,
  user,
  cart,
  checkout,
  updateQty,
  deleteProduct,
}) => {
  const navigation = useNavigation();

  const [qty, setQty] = useState(item.quantity ?? 0);

  return (
    <View
      style={tailwind(`flex-row justify-between ${checkout ? 'py-2' : 'py-3'}`)}
      key={item?.product?._id}>
      <View style={[tailwind('flex-row')]}>
        <View style={[tailwind('')]}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductView', {product: item.product})
            }>
            <ProductImage
              style={[tailwind('self-start rounded-lg h-20 w-20')]}
              image={item?.product?.images[0] || null}
              resizeMode={'cover'}
              containerStyle={tailwind(' w-20 h-20 bg-transparent mr-2')}
            />
          </TouchableOpacity>
        </View>

        <View style={[tailwind('mx-2'), {}]}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductView', {product: item.product})
            }>
            <Text style={tailwind('font-bold text-lg')}>
              {item?.product.name}
            </Text>
          </TouchableOpacity>
          <View style={tailwind('flex-row items-center')}>
            <Text style={tailwind('font-black text-base')}>
              $ {(item?.product?.price * item.quantity).toFixed(2)}{' '}
            </Text>
            <Text style={tailwind('font-light text-gray-500 text-xs')}>
              {' +  '}
              {item?.product?.shippingFee || 0}
            </Text>
          </View>
        </View>
      </View>
      <View style={[tailwind('flex-row')]}>
        {/* TRASH */}
        {!checkout && (
          <TouchableOpacity
            style={tailwind('justify-end mr-2')}
            onPress={() => deleteProduct(item)}>
            <Icon
              name="trash-outline"
              type="ionicon"
              color={'gray'}
              size={20}
            />
          </TouchableOpacity>
        )}
        {/* QTY */}
        {!checkout && (
          <View
            style={[
              tailwind(
                'flex-initial h-20 w-8 justify-between border rounded-full bg-blue-50',
              ),
            ]}>
            <TouchableOpacity
              style={tailwind('p-1')}
              onPress={() => {
                // console.error(item?.product?.quantity);
                if (item?.product?.quantity > qty) {
                  setQty(qty + 1);
                  updateQty(item, qty + 1);
                } else {
                  Toast.show({
                    type: 'success',
                    text1: 'No more in the stock.',
                    position: 'top',
                    visibilityTime: 1000,
                  });
                }
              }}>
              <Icon name="caretup" type="antdesign" color={'gray'} size={16} />
            </TouchableOpacity>
            <Text style={tailwind('text-center')}>{qty}</Text>
            <TouchableOpacity
              style={tailwind('p-1')}
              onPress={() => {
                if (qty !== 1) {
                  setQty(qty - 1);
                  updateQty(item, qty - 1);
                }
              }}>
              <Icon
                name="caretdown"
                type="antdesign"
                color={'gray'}
                size={16}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
