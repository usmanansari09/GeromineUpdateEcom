import React, {useState, useEffect} from 'react';
import {View, useWindowDimensions, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {tailwind, getColor} from '@/common/tailwind';
import {useProduct} from '@/common/services/hooks';
import {getS3Image} from '@/common/helpers';
import {Text, BottomSheet, Button, Carousel} from '@/components/index';
import AddToCartButton from '@/components/Button/AddToCartButton';

const SIZES = ['S', 'M', 'L', 'XL'];

/**
 *
 * @param {{id:string|number,onClose:()=>void}} props
 * @returns
 */
export default function ProductDetails({id = 0, onClose = () => {}}) {
  const [size, setSize] = useState('');
  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
  } = useProduct(id, {enabled: id !== 0});
  const navigation = useNavigation();
  const productImages = product?.images?.map(el => el.absolute_path);
  const {height} = useWindowDimensions();
  return (
    <BottomSheet
      isVisible={id !== 0}
      containerStyle={{
        backgroundColor: 'rgba(60, 60, 60, 0.9)',
        ...tailwind('p-4'),
      }}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      backdropColor={getColor('gray-700')}>
      {isLoading ? (
        <View
          style={[
            tailwind('items-center justify-center'),
            {height: height / 3},
          ]}>
          <ActivityIndicator size="large" color={getColor('brand-primary')} />
        </View>
      ) : isSuccess ? (
        <View>
          <Carousel
            height={height / 4}
            images={productImages}
            containerStyle={tailwind('rounded-2xl overflow-hidden mb-4')}
          />
          <View style={tailwind('mb-4')}>
            <View style={tailwind('flex-row justify-between items-center')}>
              <Text
                numberOfLines={2}
                style={tailwind('text-white text-xl font-bold flex-1')}>
                {product?.name}
              </Text>
              <Text style={tailwind('text-white text-2xl font-bold')}>
                ${product?.price}
              </Text>
            </View>
            <Text numberOfLines={3} style={tailwind('text-white text-base')}>
              {product.description}
            </Text>
          </View>
          <SizeSelector onChange={setSize} />
          <View style={tailwind('flex-row justify-between')}>
            <AddToCartButton productId={product?.id} />
            <Button
              onPress={() =>
                navigation.navigate('ShoppingCart', {
                  screen: 'cart/place-order',
                  params: {product: product.id},
                })
              }
              title="Buy Now"
              theme="primary"
              containerStyle={tailwind('flex-1 ml-4')}
            />
          </View>
        </View>
      ) : isError ? (
        <View>Error</View>
      ) : null}
    </BottomSheet>
  );
}

function SizeSelector({onChange = () => {}}) {
  const [selected, setSelected] = useState('');
  useEffect(() => {
    onChange(selected);
  }, [selected]);
  function handlePress(selectedSize) {
    setSelected(selected !== selectedSize ? selectedSize : '');
  }
  return (
    <View style={tailwind(' mb-4')}>
      <Text style={tailwind('text-white text-base')}>Select size</Text>
      <View style={tailwind('flex-row')}>
        {SIZES.map((size, index) => (
          <Button
            title={size}
            key={index}
            size="md"
            containerStyle={tailwind('mr-4 w-14 h-14')}
            buttonStyle={tailwind(
              selected !== size ? 'bg-transparent h-full' : ' h-full',
            )}
            theme={selected === size ? 'primary' : 'black'}
            type={selected === size ? 'solid' : 'outline'}
            onPress={() => handlePress(size)}
          />
        ))}
      </View>
    </View>
  );
}
