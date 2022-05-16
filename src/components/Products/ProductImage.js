import {getS3Image} from '@/common/helpers';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import NoImage from '@/common/icons/NoImage';
import {Image, ImageProps} from 'react-native-elements';
import {getColor, tailwind} from '@/common/tailwind';
import {View, Platform, Text} from 'react-native';
import {ActivityIndicator} from 'react-native';
import gLogo from './../../assets/G.png';
import Toast from 'react-native-toast-message';

const DEFAULT_STYLES = tailwind('bg-white w-20 h-20');
const isFileArray = val => {
  try {
    const images = JSON.parse(val || '[]');
    return Array.isArray(images);
  } catch {
    return false;
  }
};
const parseFiles = val => {
  try {
    const images = JSON.parse(val || '[]');
    return images;
  } catch {
    return [];
  }
};
/**
 *
 * @param {{image:string}&ImageProps} param0
 * @returns
 */
export default function ProductImage({image, ...RNEImageProps}) {
  // console.log(`image in ProductImage -------> ${image}`, image)
  // console.log(`image in gLogo -------> ${global}`, gLogo)
  if (!image) {
    return (
      <View
        style={[
          tailwind('justify-center items-center'),
          RNEImageProps?.containerStyle || DEFAULT_STYLES,
        ]}>
        <NoImage fill={getColor('gray-300')} />
      </View>
    );
  } else {
    return (
      <Image
        style={tailwind('w-full h-full rounded-2xl')}
        source={{uri: image?.absolute_path || image?.uri}}
        resizeMode="contain"
        {...RNEImageProps}
        containerStyle={{
          ...DEFAULT_STYLES,
          ...RNEImageProps.containerStyle,
        }}
        placeholderStyle={tailwind('bg-white')}
        PlaceholderContent={
          <View style={tailwind('h-full justify-center items-center')}>
            <ActivityIndicator size="large" color={getColor('brand-primary')} />
          </View>
        }
      />
    );
  }
}
