import {tailwind} from '@/common/tailwind';
import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import GeroChip from '@/assets/gero-chip.png';
import {Image, Icon} from 'react-native-elements';
import Button from '@/components/Button';
import {useNavigation} from '@react-navigation/core';
const CHIP_PRICE = 56;
export default function ChipsCart() {
  const {navigate} = useNavigation();
  const [count, setCount] = useState(1);
  function addChip() {
    setCount(prev => ++prev);
  }
  function removeChip() {
    if (count === 1) return;
    setCount(prev => --prev);
  }
  return (
    <View style={tailwind('flex-1 bg-gray-100')}>
      <ScrollView>
        <View style={tailwind('bg-white p-2 flex-row')}>
          <Text style={tailwind('font-bold text-lg')}>{count}</Text>
          <Text style={tailwind('text-lg ml-1')}>Chip{count > 1 && '/s'}</Text>
        </View>
        <View style={tailwind('p-6')}>
          <View style={tailwind('self-center')}>
            <Image source={GeroChip} style={tailwind('w-40 h-40 ')} />
            <Text
              style={tailwind('font-bold mt-4 self-center text-black text-lg')}>
              Geronimo Chip
            </Text>
          </View>
          <View style={tailwind('flex-row items-center mt-7 self-center')}>
            <Icon
              onPress={removeChip}
              type="ionicon"
              name="remove-circle-outline"
              size={40}
            />
            <Text
              style={tailwind(
                'w-1/3 text-center text-xl border-b border-gray-200 text-black ml-2 mr-2',
              )}>
              {count}
            </Text>
            <Icon
              onPress={addChip}
              type="ionicon"
              name="add-circle-outline"
              size={40}
            />
          </View>
          <View style={tailwind('  px-3')}>
            <View style={tailwind('border-b pb-4 border-gray-300')}>
              <View style={tailwind('mt-8 flex-row justify-between')}>
                <Text style={tailwind('text-lg text-gray-600')}>Quantity</Text>
                <Text style={tailwind('text-lg text-gray-600')}>{count}</Text>
              </View>
              <View style={tailwind('mt-1 flex-row justify-between')}>
                <Text style={tailwind('text-lg text-gray-600')}>Amount</Text>
                <Text style={tailwind('text-lg text-gray-600')}>
                  ${CHIP_PRICE * count}.00
                </Text>
              </View>
            </View>
            <View style={tailwind('mt-1 flex-row justify-between')}>
              <Text style={tailwind('text-lg text-black font-bold')}>
                Total
              </Text>
              <Text style={tailwind('text-lg text-black font-bold')}>
                ${CHIP_PRICE * count}.00
              </Text>
            </View>
          </View>
          <Button
            title="Checkout"
            theme="primary"
            size="md"
            style={tailwind('w-1/2 self-center mt-5 mb-8')}
            containerStyle={tailwind('mt-4')}
            onPress={() => {
              navigate('chips/payment-info');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
