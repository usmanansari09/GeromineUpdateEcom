import {tailwind} from '@/common/tailwind';
import BottomSheet from '@/components/BottomSheet';
import Button from '@/components/Button';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Image} from 'react-native-elements';

const {width} = Dimensions.get('screen');
export default function ProductView({onClose, show}) {
  return (
    <BottomSheet
      isVisible={show}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      onBackdropPress={onClose}
      hasBackdrop={false}>
      <View style={tailwind('p-6 bg-black bg-opacity-60 rounded-t-3xl')}>
        <Image
          source={require('@/assets/live-stream-featured-product.png')}
          style={tailwind('h-36')}
          resizeMode="cover"
        />
        <View style={tailwind('flex-row justify-between mt-2')}>
          <Text
            style={tailwind('text-white text-2xl font-bold')}
            numberOfLines={1}>
            Women's Jumpsuit
          </Text>
          <View>
            <Text
              style={tailwind(
                'text-white text-3xl text-brand-primary font-bold',
              )}>
              $75
            </Text>
            <Text
              style={[
                tailwind('text-white text-lg font-bold'),
                {textDecorationLine: 'line-through'},
              ]}>
              $75
            </Text>
          </View>
        </View>
        <Text style={tailwind('text-white text-xs')} numberOfLines={3}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        </Text>
        <ProductSizes />
        <View style={tailwind('flex-row mt-5')}>
          <Button
            title="Add to Cart"
            theme="primary"
            size="md"
            containerStyle={tailwind('flex-1')}
          />
          <Button
            title="Buy Now"
            theme="primary"
            size="md"
            containerStyle={tailwind('flex-1 ml-4')}
          />
        </View>
      </View>
    </BottomSheet>
  );
}
/**
 *
 * @param {{onPress:Function,style:StyleProp<ViewStyle>}} props
 */
function ProductSizes({onPress, style}) {
  const [selected, setSelected] = useState(null);
  const sizes = ['S', 'M', 'L', 'XL'];
  return (
    <View style={style}>
      <Text style={[tailwind('text-base font-bold text-white')]}>Size</Text>
      <View style={tailwind('flex-row mt-2')}>
        {sizes.map((size, index) => (
          <View
            key={index}
            style={tailwind(`${index !== 0 ? 'ml-2' : ''} flex-1`)}>
            <ProductSize
              title={size}
              onClick={setSelected}
              selected={selected === size}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
/**
 *
 * @param {{title:String,selected:Boolean,onClick:Function}} props
 */
function ProductSize({title, selected, onClick}) {
  return (
    <TouchableOpacity onPress={() => onClick(title)}>
      <View
        style={tailwind(
          `${
            selected ? 'bg-white' : 'bg-transparent'
          } text-lg border-2 border-white rounded-lg px-4 py-2`,
        )}>
        <Text
          style={tailwind(
            `${selected ? 'text-black' : 'text-white'} text-center font-bold`,
          )}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
