import {AuthContext} from '@/common/contexts/AuthContext';
import API from '@/common/services/API';
import {getColor, tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import Skeleton from '@/components/Skeleton';
import StackHeader from '@/components/StackHeader';
import {useIsFocused} from '@react-navigation/core';
import React, {useContext, useEffect, useLayoutEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {Image} from 'react-native-elements';
import {useQuery} from 'react-query';

const useSalesHistory = opts => {
  const {accessToken} = useContext(AuthContext);
  // const isFocused = useIsFocused();
  return useQuery(
    ['salesHistory'],
    () => API(accessToken).get(`checkout/sales-history`),
    // {enabled: isFocused && userId?.length !== 0, ...opts},
  );
};
// const useSalesHistory = opts => {
//   const {accessToken} = useContext(AuthContext);
//   // const isFocused = useIsFocused();
//   return useQuery(['SalesHistory'], () =>
//     API(accessToken).get(`checkout/sales-history`),
//   );
// };

export default function SalesHistory({navigation}) {
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     header: props => {
  //       return (
  //         <StackHeader
  //           props={{
  //             ...props,

  //             title: 'SALES HISTORY',
  //             iconName: 'arrow-back-outline',
  //             hasSearch: true,
  //           }}
  //         />
  //       );
  //     },
  //   });
  // }, [navigation]);
  // const query = useSalesHistory();
  // const {data, isLoading, isFetching, isSuccess, isError, refetch} = query;
  // console.log('check Salesssss history ===========', query);

  // const {data, isLoading, isSuccess, isError, refetch} = useSalesHistory();
  // const isFocused = useIsFocused();
  // useEffect(() => {
  //   if (isFocused) {
  //     refetch();
  //   }
  // }, [isFocused]);
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     header: props => {
  //       return <StackHeader props={{...props, title: 'SALES HISTORY'}} />;
  //     },
  //   });
  // }, [navigation]);
  return (
    <View>
      {/* <ProductHisotry /> */}
      {/* {isLoading ? (
        <Skeleton isLoading={true}>
          {Array.from({length: 5}, (_, index) => (
            <View
              key={index}
              style={[
                tailwind('h-20 rounded-lg bg-blue-500'),
                tailwind(index > 0 ? 'mt-4' : ''),
              ]}
            />
          ))}
        </Skeleton>
      ) : isError ? (
        <View style={tailwind('items-center flex-1 justify-center')}>
          <Text style={tailwind('text-center text-black text-base')}>
            Error
          </Text>
          <Button title="Try Again" onPress={refetch} theme="primary" />
        </View>
      ) : isSuccess ? (
        <SalesList sales={data.data} />
      ) : null} */}
    </View>
  );
}
// function SalesList({sales = []}) {
//   const renderItem = ({item, index}) => (
//     <Sale item={item} style={tailwind(`${index > 0 ? 'mt-4' : ''}`)} />
//   );
//   if (sales.length === 0) {
//     return (
//       <View style={tailwind('text-center items-center flex-1 justify-center')}>
//         <Text style={tailwind('text-black text-base text-center')}>
//           No history found
//         </Text>
//       </View>
//     );
//   }
//   return (
//     <FlatList
//       data={sales}
//       renderItem={renderItem}
//       keyExtractor={(item, index) => `${index}`}
//     />
//   );
// }
// function Sale({item, style}) {
//   return (
//     <View
//       style={{
//         ...tailwind('flex-row bg-white rounded-lg p-4'),
//         ...style,
//       }}>
//       <Image source={{uri: item.image}} style={tailwind('w-20')} />

//       <View style={tailwind('ml-3')}>
//         <Text style={tailwind('text-sm text-black')}>
//           Item:<Text style={tailwind('font-bold')}>{item.name}</Text>
//         </Text>
//         <Text style={tailwind('text-sm text-black')}>
//           Buyer:
//           <Text style={tailwind('font-bold text-brand-primary')}>
//             {item.buyer}
//           </Text>
//         </Text>
//         <Text style={tailwind('text-sm text-black')}>
//           Price:
//           <Text style={tailwind('font-bold')}>${item.price}</Text>
//         </Text>
//         <Text style={tailwind('text-sm text-black')}>
//           Date Sold:
//           <Text style={tailwind('font-bold')}>{item.date_sold}</Text>
//         </Text>
//         <Text style={tailwind('text-sm text-black')}>
//           Date Delivered:
//           <Text style={tailwind('font-bold')}>{item.date_delivered}</Text>
//         </Text>
//       </View>
//     </View>
//   );
// }
