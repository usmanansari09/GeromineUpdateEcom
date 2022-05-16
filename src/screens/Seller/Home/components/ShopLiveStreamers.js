/* eslint-disable no-alert */
/* eslint-disable quotes */
import React from 'react';
import {View, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import {Text, Image} from '@/components/index';
import {tailwind} from '@/common/tailwind';
import {useNavigation} from '@react-navigation/core';

const {width} = Dimensions.get('screen');

function StreamList({streams = [], refreshing, onRefresh = () => {}}) {
  const navigation = useNavigation();
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigate('AllStreams');
        navigation.navigate('LiveStream', {
          screen: 'ViewStream',
          params: {
            stream_key: item._id,
            channel_name: item.channel_name,
            user: item.user,
            products: item.product,
          },
        });
      }}
      style={tailwind('mr-1')}>
      <View style={tailwind('w-24 h-28')}>
        <Image
          containerStyle={tailwind('h-full w-full')}
          source={
            item?.user?.cover_pic?.absolute_path
              ? {
                  uri: item?.user?.cover_pic?.absolute_path,
                }
              : {
                  uri: item?.user?.profile_pic?.absolute_path,
                }
          }
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={streams}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item._id}`}
      // onRefresh={handleRefresh}
      refreshing={refreshing}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      alwaysBounceHorizontal={false}
      ListEmptyComponent={() => (
        <View style={(tailwind('items-center justify-center'), {width: width})}>
          <Text style={tailwind('text-black text-base text-center')}>
            No streams at the moment
          </Text>
        </View>
      )}
    />
  );
}

export default function ShopLiveStreamers(props) {
  const navigation = useNavigation();
  const {dataToRender} = props;

  return (
    <View style={tailwind('justify-center items-center mt-2')}>
      <View style={tailwind('flex-row')}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AllStreams');
          }}
          style={tailwind('bg-black justify-center items-center rounded-lg')}>
          <Text
            style={tailwind(
              `uppercase px-5 py-3 text-white font-bold text-xl`,
            )}>
            Shop live streamers
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tailwind('flex-row mt-5')}>
        <StreamList
          streams={dataToRender}
          refreshing={false}
          onRefresh={null}
        />
      </View>
    </View>
  );
}
