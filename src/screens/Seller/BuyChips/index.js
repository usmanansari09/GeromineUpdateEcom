import Button from '@/components/Button';
import React from 'react';
import {View, Text, Image, Dimensions, ScrollView} from 'react-native';
import tailwind from 'tailwind-rn';

const {width} = Dimensions.get('screen');
export default function BuyChips() {
  return (
    <View style={tailwind('flex-1 bg-black')}>
      <View style={tailwind('flex-1 pb-16')}>
        <Image
          source={require('@/assets/buy-chips-img.png')}
          style={{
            width: width,
            ...tailwind('flex-1'),
          }}
        />
        <View style={tailwind('items-center absolute bottom-0 inset-x-0')}>
          <Image source={require('@/assets/gero-chip.png')} />
        </View>
      </View>
      <View style={tailwind('px-6 flex-1')}>
        <Text
          style={tailwind('text-white font-bold  text-lg text-center my-6')}>
          The GERONIMO Bluetooth Chip allows users UNLIMITED uploads to sell
          their new or pre-owned products.
        </Text>
        <Button title="Order Chips" theme="white" size="md" />
      </View>
    </View>
  );
}
