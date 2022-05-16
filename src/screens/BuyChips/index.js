import Button from '@/components/Button';
import React from 'react';
import {View, Text, Image, Dimensions, ScrollView} from 'react-native';
import tailwind from 'tailwind-rn';

import GChip from '@/assets/gero-chip.png';
import BuyChip from '@/assets/buy-chips-img.png';
const {width} = Dimensions.get('screen');
export default function BuyChips({navigation}) {
  return (
    <View style={[tailwind('items-center justify-center flex-1')]}>
      <View>
        <Text style={tailwind('text-lg text-black text-center pb-2')}>
          This section is under development
        </Text>
      </View>
    </View>
  );
  //   return (
  //     <View style={tailwind('flex-1 bg-black')}>
  //       <ScrollView>
  //         <View style={tailwind('flex-1 pb-16')}>
  //           <Image
  //             source={BuyChip}
  //             style={{
  //               width: width,
  //               ...tailwind('flex-1'),
  //             }}
  //           />
  //           <View style={tailwind('items-center absolute bottom-0 inset-x-0')}>
  //             <Image source={GChip} />
  //           </View>
  //         </View>
  //         <View style={tailwind('px-6 flex-1 mb-5')}>
  //           <Text
  //             style={tailwind('text-white font-bold  text-lg text-center my-6')}>
  //             The GERONIMO Bluetooth Chip allows users UNLIMITED uploads to sell
  //             their new or pre-owned products.
  //           </Text>
  //           <Button
  //             title="Order Chips"
  //             theme="white_"
  //             size="md"
  //             onPress={() => navigation.navigate('Buy Chips Cart')}
  //           />
  //         </View>
  //       </ScrollView>
  //     </View>
  //   );
}
