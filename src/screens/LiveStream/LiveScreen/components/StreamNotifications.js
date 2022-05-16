import {getColor, tailwind} from '@/common/tailwind';
// import {AnimatePresence, View as MotiView} from 'moti';
import React from 'react';
import {} from 'react-native';
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import {Icon} from 'react-native-elements';

export default function StreamNotifications({show}) {
  const {height} = useWindowDimensions();
  return (
    // <AnimatePresence>
    //   {show && (
    //     <MotiView
    //       from={{
    //         translateY: -height - 100,
    //       }}
    //       animate={{
    //         translateY: 0,
    //       }}
    //       exit={{
    //         translateY: -height,
    //       }}
    //       transition={{type: 'timing'}}>
    //       <FlatList
    //         data={Array.from({length: 16})}
    //         contentContainerStyle={tailwind('items-end')}
    //         showsVerticalScrollIndicator={false}
    //         renderItem={({_, index}) => (
    //           <Pressable
    //             style={[tailwind('flex-row bg-gray-200 rounded-xl p-2 mb-4')]}>
    //             <Text style={tailwind('text-xs text-black')}>Jon12345</Text>
    //             <Text style={tailwind('font-bold text-xs text-black')}>
    //               Hi Jane Smith
    //             </Text>
    //           </Pressable>
    //         )}
    //         keyExtractor={(_, index) => `${index}`}
    //       />
    //     </MotiView>
    //   )}
    // </AnimatePresence>

    <Text>Consult the source code</Text>
  );
}
