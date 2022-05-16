import React from 'react';
import {Text} from 'react-native-elements';
import {View} from 'react-native';
import {tailwind} from '@/common/tailwind';
export default function Home() {
  return (
    <View>
      <View>
        <Text style={tailwind('text-lg font-bold text-black uppercase')}>
          See All Streams
        </Text>
      </View>
      <View style={tailwind('mt-6')}>
        <Text style={tailwind('text-lg font-bold text-black uppercase ')}>
          See nearby products
        </Text>
      </View>
      <View style={tailwind('mt-6')}>
        <Text style={tailwind('text-lg font-bold text-black uppercase ')}>
          See seller stories
        </Text>
      </View>
    </View>
  );
}
