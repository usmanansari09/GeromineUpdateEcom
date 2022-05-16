import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import API from '@/common/services/API';
import {useQuery, UseQueryOptions, useQueryClient} from 'react-query';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Avatar} from 'react-native-elements';
import {getColor, tailwind} from '@/common/tailwind';
import {AuthContext} from '@/common/contexts/AuthContext';
import {Image, Button, Text} from '@/components/index';
import {getS3Image} from '@/common/helpers';
import StackHeader from '@/components/StackHeader';
import ProductImage from '@/components/Products/ProductImage';
import ToastUpcomingFeature from '@/common/helpers/ToastUpcomingFeature';
import {FlatList} from 'react-native-gesture-handler';

export default function SellerStores() {
  const {accessToken} = useContext(AuthContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [sellerStores, setSellerStores] = useState();
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState();

  useEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{...props, title: 'Seller Stores', hasSearch: true}}
          />
        );
      },
    });
    getSellerStores();
  }, []);

  const getSellerStores = async () => {
    setIsLoadingMore(true);
    API(accessToken)
      .get(`/seller/all?page=${page}&size=20`)
      .then(response => {
        setIsLoadingMore(false);
        setIsLoading(false);
        if (response.status === 200) {
          let {sellerStores, ...meta} = response?.data?.payload?.sellerStores;
          setSellerStores(prev => {
            return prev ? [...prev, ...sellerStores] : sellerStores;
          });
          setMeta(meta);
          setPage(page + 1);
        }
      })
      .catch(error => {
        setIsLoadingMore(false);
        setIsLoading(false);
        console.log('getSellerStores API Error ---------- ', error);
      });
  };

  // if (isLoading) {
  //   return (
  //     <SkeletonPlaceholder>
  //       <View style={tailwind('flex-row justify-between')}>
  //         {Array.from({length: 5}, (_, index) => (
  //           <View key={index} style={tailwind('w-14 h-14 rounded-lg')} />
  //         ))}
  //       </View>
  //     </SkeletonPlaceholder>
  //   );
  // }

  return (
    <StoreList
      stores={sellerStores}
      getSellerStores={getSellerStores}
      setIsLoadingMore={setIsLoadingMore}
      isLoadingMore={isLoadingMore}
      isLoading={isLoading}
      meta={meta}
    />
  );
}
function StoreList({
  stores = [],
  getSellerStores,
  setIsLoadingMore,
  meta,
  isLoadingMore,
  isLoading,
}) {
  const navigation = useNavigation();
  const {isSignedIn} = useContext(AuthContext);
  const {navigate} = useNavigation();
  const {width} = useWindowDimensions();

  const handlePress = store => {
    if (!isSignedIn) {
      navigate('Seller Store');
      //navigate("Register");
    } else {
      navigate('Seller Store', {
        store: store._id,
      });
    }
  };

  const StoreItem = useCallback(({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Seller Store', {store: item});
        }}
        style={tailwind('flex-row justify-between items-center mt-6 px-6')}
        key={item?._id}>
        <View style={tailwind('flex-row items-center')}>
          <Avatar
            size="large"
            rounded
            containerStyle={tailwind('border-4 rounded-full border-white')}
            source={{
              uri:
                item.profile_pic?.absolute_path ||
                'https://i.imgur.com/E9Dzd0e.png',
            }}
          />
          <View style={tailwind('ml-2')}>
            <Text
              style={tailwind('text-black font-bold text-lg')}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item?.full_name}
            </Text>
            <Text style={tailwind('text-xs')}>@{item.username}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={tailwind('')}
          onPress={() => ToastUpcomingFeature({position: 'bottom'})}>
          <View style={tailwind('border-2 rounded-xl flex-row px-4 py-1')}>
            <Text style={tailwind('')}>+ </Text>
            <Text style={tailwind('font-black text-base')}>Follow</Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }, []);

  if (isLoading) {
    return (
      <View style={tailwind('flex-1 items-center justify-center')}>
        <ActivityIndicator size="large" color={getColor('brand-primary')} />
      </View>
    );
  }

  return (
    <View style={tailwind('')}>
      <FlatList
        data={stores}
        renderItem={StoreItem}
        contentContainerStyle={tailwind('pb-20')}
        onEndReachedThreshold={1}
        onEndReached={() => {
          if (meta?.hasNextPage) {
            getSellerStores();
          }
        }}
        // ListFooterComponent={() => (
        //   <View style={tailwind('mt-6 mb-24')}>
        //     <Text style={tailwind('text-center text-gray-400')}>
        //       End of List
        //     </Text>
        //   </View>
        // )}
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
              {!meta?.hasNextPage ? (
                <Text style={tailwind('text-gray-500')}>
                  {stores?.length || 0} Stores found.
                </Text>
              ) : (
                <View />
              )}
            </View>
          );
        }}
      />
    </View>
  );
}
