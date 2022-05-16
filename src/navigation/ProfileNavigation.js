import React, {useContext, useEffect, useLayoutEffect} from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import StackHeader from '@/components/StackHeader';
import {tailwind, getColor} from '@/common/tailwind';
const Stack = createStackNavigator();

import Profile from '@/screens/Profile';
import EditProfile from '@/screens/Profile/EditProfile2';
import PurchaseHistory from '@/screens/Profile/PurchaseHistory';
import SalesHistory from '@/screens/Profile/SalesHistory';
import AddProduct from '@/screens/Profile/AddProduct';
import SellerPayout from '@/screens/Profile/SellerPayout';
import ShippingAddress from '@/screens/Cart/ShippingAddress';
import AddNewShippingAddress from '@/screens/Cart/AddShippingAddress';
import MyProducts from '@/screens/Profile/MyProducts';
import MyPaymentInfo from '@/screens/Profile/MyPaymentInfo';
import OrderView from '../screens/Profile/OrderView';

//My Videos
import MyVideos from '@/screens/Profile/MyVideos';
import SingeVideo from '@/screens/Profile/MyVideos/ViewVideo';
import {AuthContext} from '@/common/contexts/AuthContext';
import {View, Text} from 'react-native';
import Button from '@/components/Button';
import ShippingPreference from '@/screens/Profile/SellerPayout/ShippingPreference';
import BankAccounts from '@/screens/Profile/SellerPayout/BankAccounts';
import BankCredentials from '@/screens/Profile/SellerPayout/BankAccounts/BankCredentials';
import RegisterChip from '@/screens/BuyChips/RegisterChip';
import AddProductSelectCondition from '@/screens/Profile/AddProduct/components/SelectCondition';

/**
 *
 * @param {{navigation:StackNavigationProp<any>}} props
 */
export default function ProfileNavigation({navigation, route}) {
  const {isSignedIn} = useContext(AuthContext);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('tabPress', e => {
  //     // Prevent default behavior
  //     // console.log("tab press event :>> ", e);
  //     // navigation.navigate(route.name, { screen: "User Profile" });
  //     // Do something manually
  //     // ...
  //   });
  //   return unsubscribe;
  // }, [navigation]);
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
  //       This section is under development
  //     </Text>
  //   </View>
  // )

  return (
    <Stack.Navigator
      detachInactiveScreens={false}
      options={{
        header: props => <StackHeader {...props} />,
      }}>
      <Stack.Screen
        name="User Profile"
        options={{title: 'My Profile'}}
        component={Profile}
      />

      <Stack.Screen
        name="Edit Profile"
        options={{title: 'Edit Profile'}}
        component={EditProfile}
      />
      <Stack.Screen
        name="Purchase History"
        options={{
          title: 'Purchase\nHistory',
          headerActions: {
            hasBuyChips: true,
            hasSearch: true,
          },
        }}
        component={PurchaseHistory}
      />
      <Stack.Screen
        name="Sales History"
        options={{
          headerActions: {
            hasSearch: true,
          },
        }}
        component={SalesHistory}
      />
      <Stack.Screen
        name="OrderView"
        options={{
          title: 'Oreder View',
        }}
        component={OrderView}
      />

      {/* My Videos */}
      <Stack.Screen
        name="My Videos"
        component={MyVideos}
        options={{
          headerActions: {
            hasSearch: true,
          },
          title: 'Live Stream\nGallery',
        }}
      />
      <Stack.Screen
        name="View Single Video"
        component={SingeVideo}
        options={{
          headerActions: {
            hasSearch: true,
          },
          title: 'My Videos',
        }}
      />
      {/* <Stack.Screen
        name="My Products"
        options={{
          headerActions: { hasSearch: true },
        }}
        component={MyProducts}
      /> */}
      <Stack.Screen name="My Payment Info" component={MyPaymentInfo} />

      {/* <Stack.Screen
        name="AddProduct"
        options={{ title: 'Add New Product' }}
        component={AddProduct}
      /> */}

      <Stack.Screen
        name="Select Condition"
        options={{
          title: 'Condition',
          headerActions: {
            hasSearch: false,
          },
        }}
        component={AddProductSelectCondition}
      />

      {/* <Stack.Screen
        name="EditProduct"
        options={{ title: 'Edit Product' }}
        component={EditProduct}
      /> */}
      <Stack.Screen
        name="ShippingAddress"
        options={{
          title: 'Shipping Address',
          headerActions: {hasUser: true},
        }}
        component={ShippingAddress}
      />
      <Stack.Screen
        name="AddShippingAddress"
        options={{
          title: 'Add New Address',
        }}
        component={AddNewShippingAddress}
      />
      <Stack.Screen name="Register Chip" component={RegisterChip} />
      {/* Seller Payout and Screens */}
      <Stack.Screen
        name="payout"
        options={{
          title: 'Seller Payout',
          // headerActions: {hasUser: true},
        }}
        component={SellerPayout}
      />
      <Stack.Screen
        name="shipping-preference"
        options={{
          title: 'Ship with Geronimo',
        }}
        component={ShippingPreference}
      />
      <Stack.Screen
        name="bank-accounts"
        options={{
          title: 'Select Bank Account',
        }}
        component={BankAccounts}
      />
      <Stack.Screen
        name="bank-accounts/bank"
        options={{
          title: 'Enter Credentials',
        }}
        component={BankCredentials}
      />
    </Stack.Navigator>
  );
}
