import React from 'react';
import StackHeader from '@/components/StackHeader';
import {createStackNavigator} from '@react-navigation/stack';

import SearchProduct from '@/screens/Search/SearchProduct';
import SearchExactProduct from '@/screens/Search/SearchExactProduct';
import ProductDetails from '@/screens/Search/SearchProductDetails';
import SearchResults from '@/screens/Search/SearchResults';
import ProductSearchResults from '@/screens/Search/ProductSearchResults';
import ProductResult from '@/screens/Product/ProductResult';

const Stack = createStackNavigator();

export default function SearchNavigation() {
  return (
    <Stack.Navigator options={{header: props => <StackHeader {...props} />}}
      detachInactiveScreens={false}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Search_Home"
        component={SearchProduct}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Search_ExactProducts"
        component={SearchExactProduct}
      />
      <Stack.Screen name="search/results" component={ProductSearchResults} />
      <Stack.Screen
        options={{headerShown: false}}
        name="Search_ProductDetails"
        component={ProductDetails}
      />
      <Stack.Screen name="results" component={SearchResults} />
      <Stack.Screen
        name="search/result/product"
        options={{
          headerActions: {
            hasSearch: true,
          },
        }}
        component={ProductResult}
      />
    </Stack.Navigator>
  );
}
