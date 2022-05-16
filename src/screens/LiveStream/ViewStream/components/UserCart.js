import {useCartCount} from '@/common/services/hooks';
import {getColor, tailwind} from '@/common/tailwind';
import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '@/components/index';
import {Icon} from 'react-native-elements';
import ToastUpcomingFeature from '@/common/helpers/ToastUpcomingFeature';
import {CartContext} from '@/common/contexts/CartContext';

export default function UserCart({toggleExitModal}) {
  const navigation = useNavigation();
  const {cartContext, fetchCart} = useContext(CartContext);
  fetchCart();

  return (
    <View style={tailwind('ml-2')}>
      <TouchableOpacity
        onPress={() => {
          if (typeof toggleExitModal == 'function') {
            toggleExitModal();
          }
          // navigation.replace('HomeScreen', {screen: 'ShoppingCart'});
        }}
        style={tailwind('ml-2')}>
        <Icon
          type="ionicon"
          size={28}
          name="cart-outline"
          color={getColor('white')}
        />
      </TouchableOpacity>

      {cartContext > 0 && (
        <View
          style={tailwind(
            'absolute right-0 top-0 p-1 -mr-1 -mt-2 bg-brand-primary w-5 h-5 border border-black rounded-full items-center justify-center',
          )}>
          <Text style={[tailwind('text-white absolute'), {fontSize: 9}]}>
            {cartContext > 9 ? '9+' : cartContext || 0}
          </Text>
        </View>
      )}
    </View>
  );

  // return (
  //   <View style={tailwind('ml-2 ')}>
  //     <Icon
  //       type="ionicon"
  //       size={28}
  //       name="cart-outline"
  //       color={getColor('white')}
  //       // onPress={() =>
  //       //   navigation.navigate('HomeScreen', {
  //       //     screen: 'ShoppingCart',
  //       //   })
  //       // }

  //       onPress={() => ToastUpcomingFeature({position: 'bottom'})}
  //     />
  //     {isSuccess && (
  //       <View
  //         style={tailwind(
  //           'absolute right-0 top-0 p-1 -mr-1 -mt-2 bg-brand-primary w-5 h-5 border border-white rounded-full items-center justify-center',
  //         )}>
  //         <Text style={[tailwind('text-white'), {fontSize: 10}]}>
  //           {cartCount > 10 ? `${cartCount}+` : cartCount}
  //         </Text>
  //       </View>
  //     )}
  //   </View>
  // );
}
