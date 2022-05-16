import {getColor, tailwind} from '@/common/tailwind';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  FlatListProps,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Button from '../Button';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

// const bundleItems = (items = []) => {
//   console.log('items.reduce---->>>');
//   if (items.length === 0) return [];
//   return Object.entries(
//     items.reduce((prevValue, curValue) => {
//       if (prevValue?.[curValue.username]) {
//         prevValue[curValue.username].push(curValue);
//       } else {
//         prevValue[curValue.username] = [curValue];
//       }
//       return prevValue;
//     }, {}),
//   ).map(v => v[1]);
// };

/**
 *
 * @param {{cartItems:array,CartItemComponent:React.FC<{products:any,isEditing:boolean,seller:any}>,isEditing:boolean,flatListProps:FlatListProps,containerStyle:StyleProp<ViewStyle>,hasSummary:boolean,CartEmptyComponent:React.FC<{}>,CartErrorComponent:React.FC<{}>,loading:boolean,error:boolean}} props
 * @returns
 */
export default function CartItemsList({
  cartItems = [],
  CartItemComponent = CartItem,
  CartEmptyComponent = ListEmptyComponent,
  CartErrorComponent = CartError,
  isEditing = false,
  flatListProps = {},
  containerStyle = {},
  hasSummary = true,
  loading = true,
  error = false,
}) {
  const renderItem = ({item, index}) => {
    return (
      <CartItemComponent
        products={item}
        isEditing={isEditing}
        seller={item[0]}
      />
    );
  };
  // const bundledItems = bundleItems(cartItems);
  if (loading) {
    return (
      <View style={tailwind('flex-1 items-center justify-center')}>
        <ActivityIndicator size="large" color={getColor('brand-primary')} />
      </View>
    );
  } else if (error) {
    return <CartErrorComponent />;
  }
  return (
    <View style={containerStyle}>
      <FlatList
        // data={bundledItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}`}
        ItemSeparatorComponent={() => (
          <View style={tailwind('border-b border-gray-400')} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={CartEmptyComponent}
        ListHeaderComponent={hasSummary && <CartSummary items={cartItems} />}
        {...flatListProps}
      />
    </View>
  );
}
function CartError() {
  return (
    <View style={tailwind('flex-1 items-center justify-center')}>
      <Text style={tailwind('text-black')}>Error</Text>
    </View>
  );
}
function ListEmptyComponent() {
  const navigation = useNavigation();
  return (
    <View style={tailwind('flex-1 items-center justify-center')}>
      <View style={tailwind('justify-center items-center')}>
        {/* <Icon name="shopping-bag" color={getColor('black')} size={100} /> */}
        {/* <Text style={tailwind('mb-4')}>No Items in your bag</Text> */}
        {/* <Button
          onPress={() => navigation.navigate('HomeTab')}
          // title="Start shopping now"
          // theme="black"
          // size="sm"
        /> */}
      </View>
    </View>
  );
}
