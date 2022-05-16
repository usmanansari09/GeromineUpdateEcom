import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StackHeader from '@/components/StackHeader';

import BuyChips from '@/screens/BuyChips';
import BuyChipsCart from '@/screens/BuyChips/ChipsCart';
import ChipDetails from '@/screens/BuyChips/ChipDetails';
import PaymentInfo from '@/screens/Cart/PaymentInfo';
import ShippingAddress from '@/screens/Cart/ShippingAddress';

import {AuthContext} from '@/common/contexts/AuthContext';
import {Text, View} from 'react-native';
import Button from '@/components/Button';
import {tailwind} from '@/common/tailwind';
import RegisterChip from '@/screens/BuyChips/RegisterChip';
import AddShippingAddress from '@/screens/Cart/AddShippingAddress';

const Stack = createStackNavigator();

export default function BuyChipsNavigation({navigation}) {
  const {isSignedIn} = useContext(AuthContext);
  if (!isSignedIn) {
    return (
      <View style={tailwind('items-center justify-center flex-1 p-6')}>
        <View>
          <Text style={tailwind('text-lg text-black text-center pb-2')}>
            Create an account now to start using geronimo
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
  //       this section is under development
  //     </Text>
  //   </View>
  // );

  return (
    <Stack.Navigator
      options={{
        header: props => <StackHeader {...props} />,
      }}
      detachInactiveScreens={false}>
      <Stack.Screen
        name={'Buy'}
        options={{
          headerActions: {
            hasCart: true,
            hasSearch: true,
          },
          headerShown: false,
          // title: 'Buy chips',
        }}
        component={BuyChips}
      />
      <Stack.Screen
        name={'Details'}
        options={{
          title: 'Chip Details',
        }}
        component={ChipDetails}
      />
      <Stack.Screen
        name={'Buy Chips Cart'}
        options={{
          title: 'Buy Chips',
        }}
        component={BuyChipsCart}
      />
      <Stack.Screen
        name="chips/payment-info"
        options={{
          title: 'Payment Info',
          headerActions: {hasUser: true},
        }}
        component={PaymentInfo}
      />
      <Stack.Screen
        name="chips/payment-info/shipping-address"
        options={{
          title: 'Shipping Address',
        }}
        component={ShippingAddress}
      />
      <Stack.Screen
        name="AddShippingAddress"
        options={{
          title: 'Add New Address',
        }}
        component={AddShippingAddress}
      />
      <Stack.Screen
        name="chips/register-chip"
        options={{title: 'Register Chip'}}
        component={RegisterChip}
      />
    </Stack.Navigator>
  );
}
