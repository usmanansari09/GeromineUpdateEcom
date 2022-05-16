import React, {useContext, useLayoutEffect} from 'react';
import {View, Text, FlatList, ImageBackground, Dimensions} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

import StackHeader from '@/components/StackHeader';
import Button from '@/components/Button';
import {getColor, tailwind} from '@/common/tailwind';
import {useQuery} from 'react-query';
import {AuthContext} from '@/common/contexts/AuthContext';
import API from '@/common/services/API';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import Skeleton from '@/components/Skeleton';

const {width} = Dimensions.get('screen');
const useVideos = () => {
  const {userId, accessToken} = useContext(AuthContext);
  const isFocused = useIsFocused();
  return useQuery(
    ['user', userId, 'videos'],
    () =>
      API(accessToken)
        .get(`profile/${userId}/videos`, {})
        .then(res => res.data)
        .catch(err => {
          throw new Error(err);
        }),
    {
      enabled: isFocused && userId?.length !== 0,
    },
  );
};

/**
 *
 * @param {{navigation:StackNavigationProp<any>}} props
 */
export default function UserVideos({navigation, route}) {
  const {data: videos, isLoading, isSuccess, isError, refetch} = useVideos();

  useLayoutEffect(() => {
    console.log('hello :>> ', navigation);
    navigation.setOptions({
      header: props => {
        return <StackHeader {...props} headerRight={HeaderRight} />;
      },
    });
  }, [navigation]);

  if (isLoading) {
    return (
      <Skeleton>
        <View style={tailwind('p-6 flex-row flex-wrap')}>
          {Array.from({length: 12}, (_, index) => (
            <View style={{padding: 2}}>
              <View
                key={index}
                style={{
                  width: width / 3 - 20,
                  ...tailwind('h-36'),
                }}
              />
            </View>
          ))}
        </View>
      </Skeleton>
    );
  }
  return (
    <View style={tailwind('p-6 bg-gray-100 flex-1')}>
      {/* {isSuccess ? (
        <VideoList videos={videos} />
      ) : isError ? (
        <View style={tailwind('items-center justify-center flex-1')}>
          <Text style={tailwind('text-black text-base text-center w-3/4')}>
            Error encountered while loading your videos
          </Text>
          <Button
            title="Try Again"
            theme="primary"
            size="sm"
            onPress={refetch}
          />
        </View>
      ) : null} */}
    </View>
  );
}
function HeaderRight() {
  return (
    <View>
      <Button title="Buy Chips" theme={'primary'} type="outline" size="sm" />
    </View>
  );
}
function VideoList({videos = []}) {
  const {navigate} = useNavigation();

  const renderItem = ({item, index}) => (
    <Video
      item={item}
      onClick={videoID => navigate('View Single Video', {id: videoID})}
    />
  );
  if (videos.length === 0) {
    return (
      <View style={tailwind('flex-1 justify-center items-center')}>
        <Text style={tailwind('text-base text-black text-center')}>
          You have no videos
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={videos}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${index}`}
      numColumns={3}
    />
  );
}
/**
 *
 * @param {{onClick:Function}} props
 */
function Video({item, onClick}) {
  return (
    <View
      style={{
        width: width / 3 - 16,
        ...tailwind('p-1'),
      }}>
      <TouchableOpacity
        onPress={() => {
          onClick(1);
        }}>
        <ImageBackground
          source={{
            uri: item.thumbnail,
          }}
          style={tailwind(
            'w-full h-36 rounded-2xl justify-end overflow-hidden',
          )}>
          <View style={tailwind('items-center py-2')}>
            <Avatar
              source={{uri: item.user.avatar}}
              containerStyle={tailwind(
                'border-2 w-12 h-12 border-yellow-500 rounded-full overflow-hidden',
              )}
            />
            <Text style={tailwind('text-white uppercase font-bold text-xs')}>
              {item.user.first_name}
            </Text>
          </View>
        </ImageBackground>
        <Text style={tailwind('text-sm text-black')}>
          Date:
          <Text style={tailwind('font-bold')}>{item.date_created}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
