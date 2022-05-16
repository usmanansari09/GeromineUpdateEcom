import {tailwind} from '@/common/tailwind';
import React from 'react';
import {View, Text} from 'react-native';
// const bundleItems = (items = []) => {
//   if (items.length === 0) return [];
//   return Object.entries(
//     items.reduce((prevValue, curValue) => {
//       if (prevValue?.[curValue.username]) {
//         prevValue[curValue.username].push(curValue);
//       } else {
//         prevValue[curValue.username] = [curValue];
//       }
//       return prevValue;
//     }, {}),
//   ).map(v => v[1]);
// };
export default function CartSummary({items = []}) {
  // const bundledItems = bundleItems(items);
  if (items.length === 0) {
    return null;
  }
  return (
    <View>
      <Text style={tailwind('text-sm text-black pb-2')}>
        <Text style={tailwind('font-bold')}>{`${items.length} `}</Text>
        <Text style={tailwind('text-sm text-black')}>
          {`${items.length > 1 ? 'items' : 'item'} `}
        </Text>
        from
        <Text style={tailwind('text-sm text-black font-bold')}>
          {/* {` ${Object.entries(bundledItems).length}  `} */}
        </Text>
        <Text style={tailwind('text-sm text-black')}>
          {/* {`${Object.entries(bundledItems).length > 1 ? 'shops' : 'shop'} `} */}
        </Text>
      </Text>
    </View>
  );
}
