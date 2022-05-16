import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

// import SellerStore from '@/screens/Store/SellerStore';
// import SellerStore from '@/screens/Profile/MyStore/';
import StoreSplash from '@/screens/Profile/MyStore/SetupStore/StoreSplash';
import StoreDescription from '@/screens/Profile/MyStore/SetupStore/StoreDescription';
import StorePayment from '@/screens/Profile/MyStore/SetupStore/StorePayment';
import StoreSplashOut from '@/screens/Profile/MyStore/SetupStore/StoreSplashOut';
import ConnectWithStripe from '@/screens/Profile/MyStore/SetupStore/ConnectWithStripe';
import ConnectWithStripeSuccess from '@/screens/Profile/MyStore/SetupStore/ConnectWithStripeSuccess';
import StoreBillingAddress from '@/screens/Profile/MyStore/SetupStore/BillingAddress';
import StoreSettings from '@/screens/Profile/MyStore/SetupStore/StoreSettings';
import SellerStores from '@/screens/Seller/Stores';
import StackHeader from '@/components/StackHeader';

const Stack = createStackNavigator();

export default function StoreNavigation() {
  return (
    <Stack.Navigator
      detachInactiveScreens={false}
      options={{
        header: props => <StackHeader {...props} />,
      }}>
      <Stack.Screen
        name={'SellerStores'}
        options={{headerShown: true, headerTransparent: false}}
        component={SellerStores}
      />

      <Stack.Screen
        name={'StoreSplash'}
        options={{
          headerShown: true,
          headerTransparent: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        component={StoreSplash}
      />

      <Stack.Screen
        name={'StoreDescription'}
        options={{
          headerShown: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        component={StoreDescription}
      />

      <Stack.Screen
        name={'StorePayment'}
        options={{
          headerShown: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        component={StorePayment}
      />

      <Stack.Screen
        name={'ConnectWithStripe'}
        options={{
          headerShown: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        component={ConnectWithStripe}
      />

      <Stack.Screen
        name={'ConnectWithStripeSuccess'}
        options={{
          headerShown: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        component={ConnectWithStripeSuccess}
      />

      <Stack.Screen
        name={'StoreBillingAddress'}
        options={{
          headerShown: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        component={StoreBillingAddress}
      />

      <Stack.Screen
        name={'StoreSplashOut'}
        options={{
          headerShown: true,
          headerTransparent: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        component={StoreSplashOut}
      />

      <Stack.Screen
        name={'StoreSettings'}
        options={{
          headerShown: true,
          // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        component={StoreSettings}
      />
    </Stack.Navigator>
  );
}
