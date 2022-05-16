import React, {useState} from 'react';

import {View, TouchableOpacity, Text} from 'react-native';

import tailwind from 'tailwind-rn';

import ProductImage from '@/components/Products/ProductImage';

import {Icon} from 'react-native-elements';

import {useNavigation} from '@react-navigation/native';

export default User = ({user, cart}) => {
  const navigation = useNavigation();

  const [userItems, setUserItems] = useState(
    cart?.filter(
      el => el.product.product_owner?._id === user?._id,
    ).length ?? 0,
  );

  return (
    <View style={[tailwind('flex-row'), {top: 8}]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Seller Store', {
            store: user,
          });
        }}>
        <ProductImage
          style={tailwind('rounded-full h-8 w-8')}
          image={user?.profile_pic}
          resizeMode={'cover'}
          containerStyle={tailwind(' w-8 h-8 bg-transparent mr-1')}
        />
      </TouchableOpacity>
      <View style={tailwind('justify-start')}>
        <Text style={[tailwind('font-bold text-lg'), {top: -7}]}>
          {user?.full_name}
        </Text>

        <Text style={[tailwind('text-gray-500 text-xs'), {bottom: 0, top: -8}]}>
          {userItems} {userItems > 1 ? 'items' : 'item'}
        </Text>
      </View>
    </View>
  );
};
