import React, {useEffect} from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import PayPalFull from '@/common/icons/PaypalFull';
import useCalculateVisibleScreen from '@/common/hooks/useVisibeScreen';
import {useCartItems} from '@/common/services/hooks';
import {CartItemsList} from '@/components/Cart';
import {ScrollView, View, Text} from 'react-native';

const calculateTotalPrice = (items = []) => {
  return items.reduce(
    (totalPrice, currItem) => totalPrice + parseFloat(currItem.price),
    0,
  );
};
/**
 *
 * @param {{route:RouteProp<any,any>,navigation:StackNavigationProp<any>}} props
 */
export default function GeroChips({route, navigation}) {
  const {data: items, isLoading, isError, isSuccess} = useCartItems();

  return (
    <CartItemsList
      cartItems={items}
      isEditing={false}
      loading={isLoading}
      error={isError}
      flatListProps={{
        contentContainerStyle: tailwind('p-6'),
        ListFooterComponent: () => (
          <View>
            <View>
              <Text
                style={tailwind(
                  'text-black uppercase text-base mb-2 font-bold',
                )}>
                Total
              </Text>
              <View>
                <View
                  style={tailwind(
                    'justify-between flex-row  border-b border-gray-200 py-1',
                  )}>
                  <Text style={tailwind('text-base text-gray-500')}>
                    Item Price
                  </Text>
                  <Text style={tailwind('text-base text-gray-500')}>
                    ${calculateTotalPrice(items)}.00
                  </Text>
                </View>
                <View
                  style={tailwind(
                    'justify-between flex-row border-b border-gray-200 py-1',
                  )}>
                  <Text style={tailwind('text-base text-gray-500')}>
                    Shipping
                  </Text>
                  <Text style={tailwind('text-base text-gray-500')}>
                    $10.00
                  </Text>
                </View>
                <View
                  style={tailwind(
                    'justify-between flex-row border-b border-gray-200 py-1',
                  )}>
                  <Text style={tailwind('text-base text-gray-500')}>Total</Text>
                  <Text style={tailwind('text-base text-black font-bold')}>
                    ${calculateTotalPrice(items) + 10}
                    .00
                  </Text>
                </View>
              </View>
            </View>
            <View style={tailwind(' mt-4')}>
              <Text
                style={tailwind('text-black uppercase text-base font-bold')}>
                Shipping Address
              </Text>
              <View
                style={tailwind(
                  'justify-between flex-row  border-b border-gray-200 py-1',
                )}>
                <Text style={tailwind('text-base')}>
                  1123 Avenue Street, New York
                </Text>
              </View>
            </View>
            <View style={tailwind('mt-4')}>
              <Button
                onPress={() => navigation.navigate('cart/place-order')}
                title={PaypalText}
                size="md"
                theme="white"
                buttonStyle={tailwind(' bg-black')}
              />
              <Text style={tailwind('text-center text-base  py-4')}>Or</Text>
              <Button
                onPress={() => navigation.navigate('cart/place-order')}
                title="Debit or Credit Card"
                size="md"
                theme="white"
                style={tailwind('border-black border-2 rounded-xl')}
                titleStyle={tailwind('text-black ')}
              />
            </View>
          </View>
        ),
      }}
    />
  );
}
function PaypalText() {
  return (
    <View style={tailwind('flex-row items-center ')}>
      <PayPalFull style={{width: 110, height: 30}} />
      <Text style={tailwind('uppercase text-lg ml-2 text-white font-bold')}>
        Checkout
      </Text>
    </View>
  );
}
