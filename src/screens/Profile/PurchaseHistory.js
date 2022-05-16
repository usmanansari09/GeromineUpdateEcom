import React, {useLayoutEffect, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import StackHeader from '@/components/StackHeader';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '@/common/contexts/AuthContext';
import API from '@/common/services/API';
import {getColor, tailwind} from '@/common/tailwind';
import {Avatar} from 'react-native-elements';
const GImage = require('@/assets/G.png');

export default function PurchaseHistory({navigation, route}) {
  const {accessToken} = useContext(AuthContext);
  console.log(route?.params);

  const isSalesHistory = route?.params?.isSalesHistory;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [orders, setOrders] = useState();
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,

              title: isSalesHistory ? 'SALES HISTORY' : 'PURCHASE HISTORY',
              iconName: 'arrow-back-outline',
              hasSearch: true,
            }}
          />
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    if (isSalesHistory) {
      getSales();
      return;
    }
    getOrders();
  }, []);

  function Order({item}) {
    let avatarLen;
    if (item) {
      avatarLen =
        item?.products_list?.length >= 4 ? 4 : item?.products_list?.length;
    }

    let schema = [
      ['w-20 h-20 border-2 border-gray-300 rounded-full absolute -mt-2'],
      [
        'w-16 h-16 border-2 border-gray-300 rounded-full absolute -top-2',
        'w-14 h-14 border-2 border-gray-300 rounded-full absolute left-6 top-4',
      ],
      [
        'w-14 h-14 border-2 border-gray-300 rounded-full absolute',
        'w-12 h-12 absolute border-2 border-gray-300 rounded-full left-6 top-4',
        'w-8 h-8 absolute border-2 border-gray-300 rounded-full left-12 top-8',
      ],
      [
        'w-16 h-16 border-2 border-gray-300 rounded-full absolute -top-2',
        'w-12 h-12 absolute border-2 border-gray-300 rounded-full left-6 top-4',
        'w-8 h-8 absolute border-2 border-gray-300 rounded-full left-12 top-8',
        'w-8 h-8 absolute border-2 border-gray-300 rounded-full top-10',
      ],
    ];
    return (
      <View style={tailwind('w-full')}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('OrderView', {id: item?._id, isSalesHistory})
          }>
          <View
            style={tailwind(
              'flex-row justify-between bg-white rounded-lg mb-2 px-4 py-4',
            )}>
            <View style={tailwind('mr-4')}>
              <View style={tailwind('mt-4')}>
                {item?.products_list?.map((prod, index, arr) => {
                  if (index === 4) {
                    return;
                  }
                  {
                    console.log({prod});
                  }
                  return (
                    <View>
                      <Avatar
                        source={{
                          uri: prod?.images[0]?.absolute_path,
                        }}
                        style={[
                          tailwind(schema[avatarLen - 1][index]),
                          styles.shadow,
                        ]}
                        rounded={true}
                      />
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={tailwind('ml-8')}>
              <View style={tailwind('flex-row')}>
                <View>
                  <Text style={tailwind('text-sm text-black')}>Order No:</Text>
                </View>
                <View style={tailwind('ml-1')}>
                  <Text style={tailwind('font-bold text-sm text-black')}>
                    {item?.order_number}
                  </Text>
                </View>
              </View>
              {!isSalesHistory && (
                <View style={tailwind('flex-row')}>
                  <View>
                    <Text style={tailwind('text-sm text-black')}>Paid by:</Text>
                  </View>
                  <View style={tailwind('ml-1')}>
                    <Text style={tailwind('font-bold text-sm text-black')}>
                      {item?.method}
                    </Text>
                  </View>
                </View>
              )}
              <View style={tailwind('flex-row')}>
                <View>
                  <Text style={tailwind('text-sm text-black')}>
                    {isSalesHistory ? 'Total Price:' : 'Price:'}
                  </Text>
                </View>
                <View style={tailwind('ml-1')}>
                  <Text style={tailwind('font-bold text-sm text-black')}>
                    ${item?.total}
                  </Text>
                </View>
              </View>

              <View style={tailwind('flex-row')}>
                <View>
                  <Text style={tailwind('text-sm text-black')}>
                    Date Purchase:
                  </Text>
                </View>
                <View style={tailwind('ml-1')}>
                  <Text style={tailwind('font-bold text-sm text-black')}>
                    {item?.created_At?.split('T')[0]}
                  </Text>
                </View>
              </View>

              <View style={tailwind('flex-row')}>
                <View>
                  <Text style={tailwind('text-sm text-black')}>
                    Date Delivered:
                  </Text>
                </View>
                <View style={tailwind('ml-1')}>
                  <Text style={tailwind('font-light text-sm text-black')}>
                    (in process)
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  const getOrders = async () => {
    setIsLoading(true);

    API(accessToken)
      .get(`checkout/orders?page=${page}&size=20`)
      .then(response => {
        setIsLoadingMore(false);
        setIsLoading(false);
        if (response.status === 200) {
          let {orders, ...meta} = response?.data?.payload;
          setOrders(prev => {
            return prev ? [...prev, ...orders] : orders;
          });
          setMeta(meta);
          setPage(page + 1);
        }
      })
      .catch(error => {
        console.log(
          'getOrders API Error ---------- ',
          JSON.stringify(error?.response?.data?.message || error),
        );
      });
  };

  const getSales = async () => {
    setIsLoading(true);

    API(accessToken)
      .get(`checkout/sales-history?page=${page}&size=10`)
      .then(response => {
        setIsLoadingMore(false);
        setIsLoading(false);
        if (response.status === 200) {
          let {orders, ...meta} = response?.data?.payload;
          setOrders(prev => {
            return prev ? [...prev, ...orders] : orders;
          });
          setMeta(meta);
          setPage(page + 1);
        }
      })
      .catch(error => {
        console.log(
          'getOrders API Error ---------- ',
          JSON.stringify(error?.response?.data?.message || error),
        );
      });
  };

  if (!orders?.length && isLoading) {
    return (
      <View style={tailwind('flex-1 items-center justify-center')}>
        <ActivityIndicator size="large" color={getColor('brand-primary')} />
      </View>
    );
  }

  return (
    <View style={tailwind('')}>
      <FlatList
        style={tailwind('')}
        contentContainerStyle={tailwind('mt-6 px-8')}
        data={orders}
        renderItem={({item, index}) => <Order item={item} />}
        alwaysBounceHorizontal={false}
        keyExtractor={(item, index) => `${item._id}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}
        // ListEmptyComponent={() => {
        //   return (
        //     <View style={tailwind('flex-1 items-center justify-center')}>
        //       <Text style={tailwind('text-black text-lg text-center')}>
        //         No products found.
        //       </Text>
        //     </View>
        //   );
        // }}
        numColumns={1}
        horizontal={false}
        onEndReached={() => {
          if (meta?.hasNextPage) {
            setIsLoadingMore(true);
            getOrders();
          }
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => {
          return isLoadingMore ? (
            <View style={tailwind('h-full pb-16')}>
              <ActivityIndicator
                size="large"
                color={getColor('brand-primary')}
              />
            </View>
          ) : (
            <View style={tailwind('my-6 mt-8 mb-10 items-center')}>
              {isSalesHistory ? (
                <Text style={tailwind('text-gray-500')}>
                  {orders?.length < 1 ? 'No order yet' : ''}
                </Text>
              ) : (
                <Text style={tailwind('text-gray-500')}>
                  {orders?.length < 1 ? 'No purchases yet' : ''}
                </Text>
              )}
            </View>
          );
        }}
        // ListEmptyComponent={EmptyList}
        // {...flatListProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  shadow: {
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
});
