import React, {useContext, useEffect} from 'react';
import {View, FlatList, Pressable, useWindowDimensions} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {useQuery} from 'react-query';

import API from '@/common/services/API';
import {AuthContext} from '@/common/contexts/AuthContext';
import {tailwind} from '@/common/tailwind';
import {Button, Skeleton, Text, Image} from '@/components/index';
import {getS3Image} from '@/common/helpers';

const useStreams = opts => {
  const {accessToken, isSignedIn} = useContext(AuthContext);
  const isFocused = useIsFocused();
  return useQuery(
    'streams',
    async () => {
      try {
        const response = await API().get('livestream/list', {});
        return response.data.reverse();
      } catch (error) {
        throw new Error(error);
      }

      // DO NOT REMOVE
      // try {
      //     const response = await API(accessToken).get(
      //         "livestream/list",
      //         {}
      //     );
      //     return response.data.reverse();
      // } catch (error) {
      //     throw new Error(error);
      // }
    },
    {
      staleTime: Infinity,
      enabled: isFocused,
      // DO NOT REMOVE
      // staleTime: Infinity,
      // enabled: isFocused && isSignedIn,
    },
  );
};
export default function AllStreams() {
  const {
    data: streams,
    isLoading,
    isSuccess,
    isError,
    isFetching,
    refetch,
  } = useStreams();
  const {width} = useWindowDimensions();

  if (isLoading) {
    return (
      <Skeleton>
        <View style={tailwind('flex-row')}>
          {Array.from({length: 4}, (_, index) => (
            <View
              key={index}
              style={[
                tailwind('rounded-lg'),
                tailwind('mr-4'),
                {
                  width: width / 3.5,
                  height: width / 2.5,
                },
              ]}
            />
          ))}
        </View>
      </Skeleton>
    );
  }
  if (isError) {
    return (
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
    );
  }
  return (
    <StreamList streams={streams} refreshing={isFetching} onRefresh={refetch} />
  );
}

function StreamList({streams = [], refreshing, onRefresh = () => {}}) {
  const navigation = useNavigation();
  const renderItem = ({item, index}) => (
    <Pressable
      onPress={() => {
        navigation.navigate('LiveStream', {
          screen: 'ViewStream',
          params: {id: item.id, wowza_stream_id: item.stream_id},
        });
      }}
      style={tailwind('mr-4')}>
      <View style={tailwind('w-28 h-40 rounded-3xl px-2 pb-2 pt-2 bg-black')}>
        <View style={tailwind('h-full flex')}>
          <View style={tailwind('w-full flex flex-row justify-center pb-1')}>
            <View style={tailwind('w-1/3 bg-white rounded-full h-1 ')} />
          </View>
          <View style={tailwind('flex-1 rounded-2xl overflow-hidden')}>
            <Image containerStyle={tailwind('absolute inset-0 bg-white')} />
            <View
              style={tailwind(
                'absolute inset-x-0 bottom-0 flex items-center pb-2 ',
              )}>
              <Image
                containerStyle={tailwind(
                  'h-14 w-14 bg-white overflow-hidden border-2 border-yellow-500 rounded-full',
                )}
                height="100%"
                width="100%"
                source={{
                  uri: getS3Image(item.user.profile.image),
                }}
              />
              <Text style={tailwind('text-sm uppercase  font-bold text-white')}>
                {item.user.profile.full_name.split(' ')[0]}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
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
      horizontal={true}
      showsHorizontalScrollIndicator={false}
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
