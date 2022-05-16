import React from 'react';
import {View, Text, StyleProp} from 'react-native';
import {Icon} from 'react-native-elements';

import {useStreamMetrics} from '@/common/hooks/livestream';
import {getColor, tailwind} from '@/common/tailwind';
const DEFAULT_TEXT_STYLES = tailwind('text-white');
/**
 *
 * @param {{id:number,textStyle:StyleProp<Text>}} param0
 * @returns
 */
export default function StreamViews({textStyle = DEFAULT_TEXT_STYLES, views}) {
  // const views = useStreamMetrics(id);
  return (
    <View style={tailwind(' flex-row items-center')}>
      <Icon
        type="ionicon"
        name="eye-sharp"
        size={18}
        color={getColor('white')}
        style={textStyle}
      />
      <Text style={[tailwind('text-xs ml-1'), textStyle]}>
        {`${views || 0}`} views
      </Text>
    </View>
  );
}
