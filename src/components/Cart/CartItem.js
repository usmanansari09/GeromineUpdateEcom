import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {useMutation, useQueryClient} from 'react-query';
import Toast from 'react-native-toast-message';
import Modal from 'react-native-modal';
import {Avatar, Icon} from 'react-native-elements';

import API from '@/common/services/API';
import {AuthContext} from '@/common/contexts/AuthContext';
import {getS3Image} from '@/common/helpers';
import ProductImage from '@/components/Products/ProductImage';
import {tailwind} from '@/common/tailwind';
import {useModal} from '../Modal';

const useDeleteCartItem = () => {
  const {accessToken} = useContext(AuthContext);
  return useMutation(id => API(accessToken).delete(`cart/${id}/delete`));
};
export default function CartItem({products, isEditing = false, seller}) {
  const {mutate, isLoading} = useDeleteCartItem();
  const [isVisible, toggle] = useModal();
  const queryClient = useQueryClient();
  function handleDelete(id) {
    if (isLoading) return;
    toggle(true);
    mutate(id, {
      onError: err => {
        console.log('Delete item in cart error :>> ', err?.response?.data);
        let message = err?.response?.data?.error || 'Error, try again';
        toggle(false);
        Toast.show({text2: message, type: 'error'});
      },
      onSuccess: () => {
        queryClient.setQueryData('cart', old => {
          let data;
          if (!old) data = old;
          else data = old.filter(d => d?.id !== id);
          toggle(false);
          return data;
        });
        queryClient.invalidateQueries('cart');
      },
    });
  }
  return (
    <View>
      <Modal isVisible={isVisible}>
        <View
          style={tailwind(
            'bg-white rounded-lg p-4 items-center justify-center',
          )}>
          <Text style={tailwind('text-base font-bold text-black')}>
            Deleting Item
          </Text>
        </View>
      </Modal>
      <View
        style={tailwind('flex-row items-center border-t border-gray-300 pt-3')}>
        <Avatar
          source={{
            uri: getS3Image(seller.image),
          }}
          rounded
        />
        <View style={tailwind('ml-2')}>
          <Text style={tailwind('text-black font-bold text-base')}>
            {seller.username}
          </Text>
          <Text style={tailwind('text-gray-500 text-sm')}>
            {`${products.length} ${products.length > 1 ? 'items' : 'item'}`}
          </Text>
        </View>
      </View>
      <View>
        {products.map(product => (
          <View
            key={product.id}
            style={tailwind('flex-row items-center justify-center')}>
            <View style={tailwind('flex-row items-center mt-3 flex-1')}>
              <ProductImage
                image={product.product_image}
                style={tailwind('w-20 h-20 rounded-lg')}
                containerStyle={tailwind('rounded-lg p-1')}
                resizeMode="contain"
              />
              <View style={tailwind('ml-3 flex-1')}>
                <Text
                  style={[
                    tailwind('uppercase text-black font-bold text-base'),
                    {lineHeight: 16},
                  ]}
                  numberOfLines={2}>
                  {product.product_name}
                </Text>
                <View style={tailwind('flex-row items-center')}>
                  <Text
                    style={tailwind(
                      'uppercase text-black font-bold text-base',
                    )}>
                    ${parseFloat(product.price)}.00
                  </Text>
                  <Text style={tailwind('text-gray-400 normal-case text-xs')}>
                    {' + shipping'}
                  </Text>
                </View>
              </View>
            </View>
            {isEditing && (
              <Icon
                containerStyle={tailwind('pl-2')}
                onPress={() => {
                  handleDelete(product.id);
                }}
                name="close-circle-outline"
                type="ionicon"
                size={32}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
