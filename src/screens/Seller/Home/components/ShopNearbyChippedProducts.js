import React from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import {Text, Button} from '@/components/index';
import {tailwind} from '@/common/tailwind';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import {useProfile, useStoreProducts} from '@/common/services/hooks';
import ProductList from '@/components/Products/ProductList';
import ProductImage from '@/components/Products/ProductImage';
import Skeleton from '@/components/Skeleton';

const {width} = Dimensions.get('screen');

/**
 *
 * @param {{product:Object,style:StyleProp<ViewStyle>}} props
 */
function Product(prop) {
  const {navigate} = useNavigation();
  const {product} = prop;

  return (
    <TouchableOpacity
      key={product?.images}
      onPress={() => navigate('ProductView', {product})}
      // onPress={() => navigate('ProductView', {id: item.id, type: 'seller'})}
      style={tailwind('mr-1')}>
      <View style={tailwind('rounded')}>
        <ProductImage
          image={product?.images ? product?.images[0] : ''}
          containerStyle={tailwind('w-24 bg-gray-100 h-28')}
          resizeMode={'cover'}
        />
      </View>
    </TouchableOpacity>
  );
}

function ProductsFooter() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('My Products')}
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

export default function ShopNearbyChippedProducts(props) {
  const navigation = useNavigation();
  const {data: user} = useProfile();
  const {dataToRender} = props;

  // const {
  //   data: store,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   refetch,
  // } = useStoreProducts(user?.store_id);

  return (
    <View style={tailwind('')}>
      <View style={tailwind('flex-row justify-center items-center')}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NearbyProducts')}
          style={tailwind('bg-black justify-center items-center rounded-lg')}>
          <Text
            style={[
              tailwind('uppercase px-5 py-3 text-white font-bold text-xl '),
            ]}>
            Shop nearby products
          </Text>
        </TouchableOpacity>
      </View>
      <View style={tailwind('flex-row justify-center items-center')}>
        <View style={tailwind('')}>
          <ProductList
            products={dataToRender}
            isPaginated={false}
            loading={false}
            ProductComponent={Product}
            flatListProps={{
              ListFooterComponent: null,
              // dataToRender?.length > 5 ? ProductsFooter : null,
              ListEmptyComponent: () => (
                <View style={tailwind('flex-1 items-center justify-center')}>
                  <Text style={tailwind('text-black text-base text-center')}>
                    No nearby products found
                  </Text>
                </View>
              ),
              horizontal: true,
              numColumns: 1,
              contentContainerStyle: tailwind('mt-4'),
            }}
          />
          {/* ) : null} */}
        </View>
      </View>
    </View>
  );
}
