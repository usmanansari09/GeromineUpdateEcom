import React, {useMemo} from 'react';
import {Image as RNImage, ImageProps} from 'react-native-elements';

import NoImage from '@/common/icons/NoImage';
import {tailwind} from '@/common/tailwind';
/**
 *
 * @param {{url:string}& ImageProps} param0
 * @returns
 */
export default function Image({url = null, ...RNImagProps}) {
  const path = useMemo(() => (url ? {uri: url} : null), [url]);
  return (
    <RNImage
      PlaceholderContent={<NoImage />}
      placeholderStyle={tailwind('bg-gray-200 flex-1')}
      source={path}
      {...RNImagProps}
    />
  );
}
