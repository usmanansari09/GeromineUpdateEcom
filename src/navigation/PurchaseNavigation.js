import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import StackHeader from '@/components/StackHeader';

import Cart from '@/screens/Cart';
import Checkout from '@/screens/Cart/Checkout';
import PurchaseConfirmation from '@/screens/Cart/PurchaseConfirmation';
import ShippingAddress from '@/screens/Cart/ShippingAddress';
import AddShippingAddress from '@/screens/Cart/AddShippingAddress';
import PaymentPlatforms from '@/screens/Cart/PaymentPlatforms';
import {AuthContext} from '@/common/contexts/AuthContext';
import Button from '@/components/Button';
import {tailwind} from '@/common/tailwind';
import PlaceOrder from '@/screens/Cart/PlaceOrder';
import GeroChips from '@/screens/Cart/GeroChips';

const Stack = createStackNavigator();

export default function CartNavigation({navigation}) {
  const {isSignedIn, accessToken} = useContext(AuthContext);
  // console.log(
  //   'isSignedIn & Token in CartNavigation, ----------------- ',
  //   isSignedIn,
  //   accessToken,
  // );

  if (!isSignedIn) {
    return (
      <View style={tailwind('items-center justify-center flex-1 p-6')}>
        <View>
          <Text style={tailwind('text-lg text-black text-center pb-2')}>
            Create an account now to start using Geronimo
          </Text>
          <Button
            onPress={() => {
              navigation.navigate('SignIn');
            }}
            title="Sign in"
            theme="primary"
            size="sm"
            containerStyle={tailwind('flex-shrink-0')}
          />
        </View>
      </View>
    );
  }
  // return (
  //   <View style={tailwind('items-center justify-center flex-1 p-6')}>
  //     <Text style={tailwind('text-lg text-black text-center pb-2')}>
  //       This section is under development
  //     </Text>
  //   </View>
  // );

  return (
    <Stack.Navigator
      detachInactiveScreens={false}
      options={{
        header: props => <StackHeader {...props} />,
      }}
      // initialRouteName={'GeroCart'}
    >
      <Stack.Screen name="Cart" options={{title: 'My Cart'}} component={Cart} />
      <Stack.Screen
        name="GeroCart"
        options={{title: 'Gero Chip Cart'}}
        component={GeroChips}
      />
      <Stack.Screen
        name="cart/checkout"
        options={{title: 'Checkout'}}
        component={Checkout}
      />
      <Stack.Screen
        name="cart/order/confirmed"
        options={{headerShown: false}}
        component={PurchaseConfirmation}
      />
      <Stack.Screen
        name="Cart_ShippingAddress"
        options={{title: 'Shipping Address'}}
        component={ShippingAddress}
      />
      <Stack.Screen
        name="AddShippingAddress"
        options={{title: 'Add New Address'}}
        component={AddShippingAddress}
      />
      <Stack.Screen
        name="Cart_PaymentPlatforms"
        options={{title: 'Choose Your\n Payment Platform'}}
        component={PaymentPlatforms}
      />
      <Stack.Screen
        name="cart/place-order"
        options={{title: 'Checkout'}}
        component={PlaceOrder}
      />
    </Stack.Navigator>
  );
}
