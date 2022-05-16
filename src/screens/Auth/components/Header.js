import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {tailwind} from '@/common/tailwind';

export default function Header({route, navigation}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{...tailwind('flex-row mt-12')}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <TouchableOpacity onPress={navigation.goBack} style={tailwind('pl-4')}>
        <Icon
          name="arrow-back-outline"
          style={tailwind('text-2xl text-white')}
        />
      </TouchableOpacity>

      <Text style={tailwind('text-2xl text-white uppercase font-bold ml-1')}>
        {route?.name}
      </Text>
    </View>
  );
}
