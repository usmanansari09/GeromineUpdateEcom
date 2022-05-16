import {tailwind} from '@/common/tailwind';
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

export default function Stream({item, onPress, style}) {
  return (
    <TouchableOpacity style={style} onPress={() => onPress(item.id)}>
      <View style={tailwind('w-28 h-40 rounded-3xl px-2 pb-2 pt-2 bg-black')}>
        <View style={tailwind('h-full flex')}>
          <View style={tailwind('w-full flex flex-row justify-center pb-1')}>
            <View style={tailwind('w-1/3 bg-white rounded-full h-1 ')} />
          </View>
          <View style={tailwind('flex-1 bg-blue-300 rounded-2xl ')}>
            <View
              style={tailwind(
                'absolute inset-x-0 bottom-0 flex items-center pb-2 ',
              )}>
              <View
                style={tailwind(
                  'overflow-hidden border-2 border-yellow-500 rounded-full',
                )}>
                <Image
                  style={tailwind('h-14 w-14')}
                  source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                  }}
                />
              </View>
              <Text style={tailwind('text-sm uppercase  font-bold text-white')}>
                John
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
