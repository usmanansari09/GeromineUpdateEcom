import React from 'react';
import {View, Text} from 'react-native';
import tailwind from 'tailwind-rn';

export default function LabelText({text, asteriskCondition}) {
  return (
    <View style={tailwind('flex-row')}>
      <Text style={[tailwind('font-bold'), {fontSize: 16}]}>{text}</Text>
      <Text style={[tailwind('-mt-1 text-red-600'), {fontSize: 14}]}>
        {asteriskCondition ? '' : ' *'}
      </Text>
    </View>
  );
}
