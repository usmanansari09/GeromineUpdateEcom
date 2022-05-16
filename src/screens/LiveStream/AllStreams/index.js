/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {useQuery, useInfiniteQuery} from 'react-query';
import Modal from 'react-native-modal';
import API from '@/common/services/API';
import {AuthContext} from '@/common/contexts/AuthContext';
import {tailwind, getColor} from '@/common/tailwind';
import {Button, Skeleton, Text, Image} from '@/components/index';
import {StreamViews} from '../components';
import {Icon} from 'react-native-elements';
import {useModal} from '@/components/Modal';
import BottomSheet from '@/components/BottomSheet';
import {Alert} from 'react-native';
import StackHeader from '@/components/StackHeader';
import {ScrollView} from 'react-native-gesture-handler';

const useStreams = opts => {
  const {isSignedIn} = useContext(AuthContext);
  const isFocused = useIsFocused();

  return useQuery(
    'AllStreams',
    async () => {
      try {
        const response = await API().get('livestream/list/all?page=1&size=50');
        return response?.data?.payload;
      } catch (error) {
        if (error?.response?.data) {
          console.log(
            `All Livestreams Error: `,
            JSON.stringify(error?.response?.data),
          );
        } else {
          console.log(
            `All Livestreams Error: `,
            JSON.stringify(error?.response),
          );
        }
        throw new Error(error);
      }
    },
    {
      enabled: isFocused && isSignedIn,
    },
  );
};
export default function AllStreams({navigation}) {
  const [isVisible, toggle] = useModal();
  const {
    data: livestreams,
    isLoading,
    isSuccess,
    isError,
    isFetching,
  } = useStreams();
  useEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              title: 'Live Streamers',
              hasGoLive: true,
              hasSearch: true,
            }}
          />
        );
      },
    });
  }, [navigation]);

  /*  */

  const {data, status, fetchNextPage, hasNextPage, refetch} = useInfiniteQuery(
    'livestreamers',
    async ({pageParam = 1}) =>
      API()
        .get(
          `https://api.geronimolive.com/api/livestream/list/all?page=${pageParam}&size=10`,
        )
        .then(result => {
          console.log('result', result?.data?.payload);
          console.log({pageParam});
          return result?.data?.payload;
        }),
    {getNextPageParam: (lastPage, pages) => lastPage.nextPage},
  );

  const RenderItem = ({item, index}) => {
    // console.log({item});
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if (item?.status) {
              navigation.navigate('LiveStream', {
                screen: 'ViewStream',
                params: {
                  stream_key: item._id,
                  channel_name: item.channel_name,
                  user: item.user,
                  products: item.product,
                },
              });
            } else {
              // toggle();
              Alert.alert('Live Streamers', 'Livestream has been ended.');
            }
          }}
          style={tailwind('flex-row mt-4')}>
          <View
            style={tailwind('w-20 h-28 rounded-2xl px-2 pb-2 pt-2 bg-black')}>
            <View style={tailwind('h-full ')}>
              <View
                style={tailwind('w-full flex flex-row justify-center pb-1')}>
                <View style={tailwind('w-1/3 bg-white rounded-full h-1 ')} />
              </View>
              <Image
                source={
                  item?.user?.cover_pic?.absolute_path
                    ? {
                        uri: item?.user?.cover_pic?.absolute_path,
                      }
                    : {
                        uri: item?.user?.profile_pic?.absolute_path,
                      }
                }
                containerStyle={tailwind('flex-1 rounded-lg overflow-hidden')}
                resizeMode="cover"
              />
            </View>
          </View>
          <View style={tailwind('ml-4 justify-between py-2')}>
            <View style={tailwind('flex-row')}>
              <View style={tailwind('bg-black rounded-md')}>
                <Text
                  style={tailwind(
                    'px-3 py-2 text-xs uppercase text-white font-bold',
                  )}>
                  {item.status ? 'Live' : 'Replay'}
                </Text>
              </View>
              <StreamViews
                id={item?.channel_name}
                textStyle={tailwind('text-black')}
              />
            </View>
            <Text
              style={tailwind('text-black font-bold')}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item?.user?.full_name}
            </Text>
            <View style={tailwind('')}>
              <TouchableOpacity
                style={tailwind('flex-row items-center z-50')}
                onPress={() => {
                  navigation.navigate('Seller Store', {
                    store: item?.user,
                  });
                }}>
                <Avatar
                  size="small"
                  rounded
                  containerStyle={tailwind('border border-red-600')}
                  source={{
                    uri: item?.user?.profile_pic?.absolute_path,
                  }}
                />
                <Text style={tailwind('text-black ml-1')}>
                  @{item?.user?.username}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={tailwind('flex-1 bg-gray-100')}>
      {isLoading ? (
        <Skeleton>
          {Array.from({length: 12}, (_, index) => (
            <View
              key={index}
              style={[
                tailwind('h-24 p-2 rounded-lg'),
                tailwind(index > 0 ? 'mt-4' : ''),
              ]}
            />
          ))}
        </Skeleton>
      ) : isSuccess ? (
        <FlatList
          data={data?.pages?.map(item => item?.livestreams).flat()}
          renderItem={RenderItem}
          style={tailwind('px-6')}
          containerStyle={tailwind('mb-12')}
          onEndReached={loadMore}
          // onRefresh={refetch}
          // refreshing={true}
          keyExtractor={(item, index) => item?._id}
          onEndReachedThreshold={2}
          ListFooterComponent={() => (
            <View style={tailwind('h-full py-8')}>
              <ActivityIndicator
                size="small"
                color={getColor('brand-primary')}
              />
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={tailwind('flex-1 items-center justify-center')}>
              <Text style={tailwind('text-black text-base text-center')}>
                No streams at the moment
              </Text>
            </View>
          )}
        />
      ) : isError ? (
        <View style={tailwind('items-center justify-center flex-1')}>
          <View>
            <Text style={tailwind('text-black text-base text-center')}>
              Error encountered, Try again.
            </Text>
            <Button
              title="Retry"
              onPress={refetch}
              buttonStyle={tailwind('bg-red-500')}
            />
          </View>
        </View>
      ) : null}

      {/* <Modal isVisible={isVisible}>
        <View style={tailwind('bg-white rounded-lg p-6')}>
          <Text style={tailwind('text-lg text-black text-center font-bold')}>
            Livestream has ended. Go back?
          </Text>

          <Button
            title="Close"
            theme="primary"
            containerStyle={tailwind('items-center mt-2')}
            onPress={toggle}
          />
        </View>
      </Modal> */}
      {/* <BottomSheet
        isVisible={isVisible}
        onBackdropPress={toggle}
        onBackButtonPress={toggle}
        onSwipeComplete={toggle}
        backdropOpacity={0}
        containerStyle={tailwind('bg-black bg-opacity-80 pt-10')}
        propagateSwipe>
        <View style={tailwind('bg-white rounded-lg p-6')}>
          <Text style={tailwind('text-lg text-black text-center font-bold')}>
            Livestream has ended. Go back?
          </Text>

          <Button
            title="Close"
            theme="primary"
            containerStyle={tailwind('items-center mt-2')}
            onPress={toggle}
          />
        </View>
      </BottomSheet> */}
    </View>
  );
}
function StreamList({streams = [], refreshing, onRefresh = () => {}, toggle}) {
  const navigation = useNavigation();
  const renderItem = ({item, index}) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          if (item?.status) {
            navigation.navigate('LiveStream', {
              screen: 'ViewStream',
              params: {
                stream_key: item._id,
                channel_name: item.channel_name,
                user: item.user,
                products: item.product,
              },
            });
          } else {
            // toggle();
            Alert.alert('Live Streamers', 'Livestream has been ended.');
          }
        }}
        style={tailwind('flex-row mt-4')}>
        <View style={tailwind('w-20 h-28 rounded-2xl px-2 pb-2 pt-2 bg-black')}>
          <View style={tailwind('h-full ')}>
            <View style={tailwind('w-full flex flex-row justify-center pb-1')}>
              <View style={tailwind('w-1/3 bg-white rounded-full h-1 ')} />
            </View>
            <Image
              source={
                item?.user?.cover_pic?.absolute_path
                  ? {
                      uri: item?.user?.cover_pic?.absolute_path,
                    }
                  : {
                      uri: item?.user?.profile_pic?.absolute_path,
                    }
              }
              containerStyle={tailwind('flex-1 rounded-lg overflow-hidden')}
              resizeMode="cover"
            />
          </View>
        </View>
        <View style={tailwind('ml-4 justify-between py-2')}>
          <View style={tailwind('flex-row')}>
            <View style={tailwind('bg-black rounded-md')}>
              <Text
                style={tailwind(
                  'px-3 py-2 text-xs uppercase text-white font-bold',
                )}>
                {item.status ? 'Live' : 'Replay'}
              </Text>
            </View>
            <StreamViews
              id={item?.channel_name}
              textStyle={tailwind('text-black')}
            />
          </View>
          <Text
            style={tailwind('text-black font-bold')}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item?.user?.full_name}
          </Text>
          <View style={tailwind('')}>
            <TouchableOpacity
              style={tailwind('flex-row items-center z-50')}
              onPress={() => {
                navigation.navigate('Seller Store', {
                  store: item?.user,
                });
              }}>
              <Avatar
                size="small"
                rounded
                containerStyle={tailwind('border border-red-600')}
                source={{
                  uri: item?.user?.profile_pic?.absolute_path,
                }}
              />
              <Text style={tailwind('text-black ml-1')}>
                @{item?.user?.username}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  const handleRefresh = () => {
    onRefresh();
  };
  return (
    <FlatList
      data={streams}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.id}`}
      onRefresh={handleRefresh}
      refreshing={refreshing}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <View style={tailwind('flex-1 items-center justify-center')}>
          <Text style={tailwind('text-black text-base text-center')}>
            No streams at the moment
          </Text>
        </View>
      )}
    />
  );
}
