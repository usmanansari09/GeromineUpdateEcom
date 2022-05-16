import {useNavigation} from '@react-navigation/core';
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Button from '@/components/Button';
import {getColor} from '@/common/tailwind';
import StackHeader from '@/components/StackHeader';
import tailwind from 'tailwind-rn';
import Modal from 'react-native-modal';
import {Icon, Image} from 'react-native-elements';
import PlaceHolderImage from '@/assets/product-view-placeholder.png';
import {getS3Image} from '@/common/helpers';
import NoImage from '@/common/icons/NoImage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
/**
 *
 * @param {{navigation:StackNavigationProp<any,any>,route:RouteProp<any,any>}} props
 * @returns
 */
export default function ProductSearchResults({route, navigation}) {
  const {results, page, values} = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Results',
      header: props => <StackHeader {...props} headerRight={FilterResults} />,
    });
  }, [navigation]);
  return (
    <FlatList
      contentContainerStyle={tailwind('px-6 py-4 bg-gray-100')}
      data={results}
      renderItem={({item, index}) => (
        <View style={tailwind(index > 0 ? 'mt-4' : '')}>
          <Result product={item} />
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
}
function Result({product}) {
  const productImages = JSON.parse(product?.files || '[]').map(image =>
    getS3Image(image),
  );
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigate('search/result/product', {id: product.product_id})
      }
      style={tailwind('bg-white rounded-lg flex-row items-center p-3')}>
      {productImages?.[0] ? (
        <Image
          source={{uri: productImages[0]}}
          resizeMode="contain"
          containerStyle={tailwind('bg-white w-20 h-20')}
        />
      ) : (
        <NoImage />
      )}

      <View style={tailwind('flex-1 ml-2')}>
        <Text
          style={tailwind('text-black text-lg font-bold')}
          numberOfLines={2}>
          {product.name}
        </Text>
        <Text
          style={tailwind('text-black text-lg font-bold')}
          numberOfLines={1}>
          {product.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
function FilterResults() {
  const [visible, setVisible] = useState(false);
  const insets = useSafeAreaInsets();
  return (
    <View>
      <Button
        onPress={() => setVisible(true)}
        title="Filter"
        theme="white"
        type="clear"
        containerStyle={tailwind('items-center')}
        titleStyle={tailwind('text-white')}
        icon={{
          name: 'filter',
          type: 'font-awesome-5',
          size: 12,
          color: getColor('white'),
        }}
      />
      <Modal isVisible={visible} style={tailwind('m-0')}>
        <View
          style={[tailwind('bg-black flex-1 p-6'), {paddingTop: insets.top}]}>
          <View style={tailwind('flex-row justify-between items-center  mb-4')}>
            <Text style={tailwind('text-white text-2xl uppercase font-bold')}>
              Search Filter
            </Text>
            <Icon
              type="ionicon"
              name="close"
              size={32}
              color={getColor('white')}
              onPress={() => setVisible(false)}
            />
          </View>

          <View style={tailwind('mb-4')}>
            <Text style={tailwind('text-white text-base font-semibold')}>
              Categories
            </Text>
            <View style={tailwind('flex-row flex-wrap ')}>
              <FilterButton title="Sling" />
              <FilterButton title="Women's Accessories" />
              <FilterButton title="Women's Shoes" />
              <FilterButton title="Women's Apparel" />
              <FilterButton title="Men's Bags and Acc" />
              <FilterButton title="Shoulder Bag" />
              <FilterButton title="Men's Shoes" />
              <FilterButton title={`Sports & Travel`} />
            </View>
          </View>
          <View style={tailwind('mb-4')}>
            <Text style={tailwind('text-white text-base font-semibold')}>
              Categories
            </Text>
            <View style={tailwind('flex-row flex-wrap ')}>
              <FilterButton title="Bag" />
              <FilterButton title="Wallet" />
              <FilterButton title="Belt" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
function FilterButton({title = ''}) {
  const {width} = useWindowDimensions();
  const truncatedTite = title.substring(0, 17);
  return (
    <Button
      theme="white"
      containerStyle={{...tailwind('p-2'), width: width / 2 - 24}}
      title={truncatedTite}
      titleStyle={tailwind('text-black font-light text-sm')}
    />
  );
}
