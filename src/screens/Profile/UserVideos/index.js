import React, {useLayoutEffect} from 'react';
import {View, Text, FlatList, ImageBackground, Dimensions} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

import StackHeader from '@/components/StackHeader';
import Button from '@/components/Button';
import {getColor, tailwind} from '@/common/tailwind';

const {width} = Dimensions.get('screen');

const VIDEO = {
  thumbnail:
    'https://images.unsplash.com/photo-1426901013385-803d40bd5558?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&ixid=MXwxfDB8MXxyYW5kb218fHx8fHx8fA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=120',
  user: {
    first_name: 'Emma',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60',
  },
  date_created: '01-01-21',
};
const VIDEOS = Array.from({length: 23}, () => VIDEO);
/**
 *
 * @param {{navigation:StackNavigationProp<any>}} props
 */
export default function UserVideos({navigation, route}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => <StackHeader {...props} headerRight={HeaderRight} />,
    });
  }, [navigation]);
  const renderItem = ({item, index}) => (
    <Video
      item={item}
      onClick={videoID =>
        navigation.navigate('View Single Video', {id: videoID})
      }
    />
  );
  return (
    <View style={tailwind('p-6 bg-gray-200 flex-1')}>
      <FlatList
        data={VIDEOS}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}`}
        numColumns={3}
      />
    </View>
  );
}
function HeaderRight() {
  return (
    <View style={tailwind('flex-row justify-between items-center w-1/3')}>
      <Button title="Buy Chips" theme={'primary'} type="outline" size="sm" />
      <Icon
        onPress={() => {}}
        name="search"
        style={tailwind('text-brand-primary ml-3 text-2xl')}
      />
    </View>
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
