import {tailwind} from '@/common/tailwind';
import {useNavigation} from '@react-navigation/core';
import {Icon} from 'react-native-elements';
import React, {useCallback} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  FlatList,
  FlatListProps,
} from 'react-native';

import ProductImage from '../ProductImage';
/**
 *
 * @param {{products:Array,flatListProps:FlatListProps,ProductComponent:React.FC<{product:Object,index:number}>,isPaginated:boolean,LoadingComponent:React.ReactNode,loading:boolean,error:boolean}} props
 * @returns
 */
export default function ProductList({
  products = [],
  isPaginated = true,
  flatListProps = {},
  ProductComponent = Product,
  loading = false,
  error = false,
  user,
  LoadingComponent = LoadingProductsComponent,
}) {
  const renderItem = useCallback(
    ({item, index}) => <ProductComponent product={item} />,
    [products],
  );
  // console.log('products are ----', products);

  // const allProducts = products?.reduce((allProducts, group) => {
  //   if (isPaginated) {
  //     return [...allProducts, ...group.data];
  //   } else {
  //     return [...allProducts, group];
  //   }
  // }, []);

  if (loading) {
    return <LoadingComponent />;
  } else if (error) {
    return <ErrorComponent />;
  }
  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      contentContainerStyle={{}}
      alwaysBounceHorizontal={false}
      keyExtractor={(item, index) => `${item._id}`}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={products?.length ? EmptyList : null}
      ListFooterComponent={products?.length > 5 ? ProductsFooter : null}
      {...flatListProps}
    />
  );

  function ProductsFooter() {
    const navigation = useNavigation();
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.replace('My Products', {
            store: user,
          })
        }
        style={tailwind('p-4 items-center justify-center flex-1')}>
        <Icon
          type="ionicon"
          name="arrow-forward-circle-outline"
          color="white"
          size={48}
        />
        <Text style={tailwind('text-base text-white')}>View All</Text>
      </TouchableOpacity>
    );
  }
}
function EmptyList() {
  return (
    <View style={tailwind('justify-center items-center')}>
      <Text style={tailwind('text-black text-lg text-center')}>
        This seller has not listed any products
      </Text>
    </View>
  );
}
function LoadingProductsComponent() {
  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
}
function ErrorComponent() {
  return (
    <View style={tailwind('flex-1 items-center justify-center')}>
      <Text style={tailwind('text-black')}>Error</Text>
    </View>
  );
}

function Product({product}) {
  const {navigate} = useNavigation();
  const {width} = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={() => navigate('ProductView', {product})}
      style={{
        // ...tailwind('p-1'),
        ...tailwind(''),
        width: width / 3 - 16,
        height: width / 2.5,
      }}>
      <View
        style={{
          ...tailwind('flex-row items-center pt-3'),
        }}>
        <ProductImage
          // image={product?.images[0].absolute_path}
          image={product?.images ? product?.images[0].absolute_path : ''}
          style={tailwind('w-28 h-28 rounded-lg')}
          resizeMode="contain"
          containerStyle={tailwind('rounded-lg w-28 h-28 p-1 bg-white')}
        />
      </View>
    </TouchableOpacity>
  );
}
