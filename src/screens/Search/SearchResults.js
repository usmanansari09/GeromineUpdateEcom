import React, {useLayoutEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import StackHeader from '@/components/StackHeader';
import {Icon, Image} from 'react-native-elements';
import {getColor, tailwind} from '@/common/tailwind';
import Modal from 'react-native-modal';
/**
 *
 * @param {{navigation:StackNavigationProp<any>,route:RouteProp<any,any>}} props
 * @returns
 */
export default function SearchResults({navigation, route}) {
  const {q: searchQuery} = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: searchQuery || 'Search Results',
      header: props => <StackHeader {...props} headerRight={FilterResults} />,
    });
  }, [navigation, searchQuery]);
  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          tailwind('flex-row items-center bg-white rounded-lg p-3'),
          tailwind(index > 0 ? 'mt-4' : ''),
        ]}>
        <Image
          source={require('@/assets/chipped-4.png')}
          style={tailwind('w-20 h-20')}
          resizeMode="contain"
        />
        <View style={tailwind('flex-1')}>
          <Text
            style={tailwind('text-lg text-black uppercase font-bold')}
            numberOfLines={2}>
            Louis Vuitton Riverside bag
          </Text>
          <Text
            style={tailwind('text-lg text-brand-primary uppercase font-bold')}>
            $875.59
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={tailwind('flex-1 p-6 bg-gray-100')}>
      <FlatList
        data={Array.from({length: 13})}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
function FilterResults() {
  const [open, setOpen] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={tailwind('items-center flex-row')}>
        <Icon
          type="ionicon"
          name="filter-outline"
          size={32}
          color={getColor('brand-primary')}
        />
        <Text style={tailwind('text-brand-primary text-base ml-1')}>
          Filter
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={open}
        onBackButtonPress={() => setOpen(false)}
        onSwipeComplete={() => setOpen(false)}
        style={tailwind('m-0')}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        swipeDirection={'down'}>
        <View style={tailwind('bg-black flex-1 p-6')}>
          <View style={tailwind('items-center justify-between flex-row')}>
            <Text style={tailwind('text-lg text-white font-bold uppercase')}>
              Search Filter
            </Text>
            <Icon
              onPress={() => setOpen(false)}
              type="ionicon"
              name="close-outline"
              size={32}
              color={getColor('white')}
            />
          </View>
          <View style={tailwind('mt-4')}>
            <Text style={tailwind('text-base text-white font-bold ')}>
              Categories
            </Text>
            <View style={tailwind('flex-row flex-wrap -mx-1')}>
              {Array.from({length: 7}, (_, index) => (
                <FilterButton key={index} />
              ))}
            </View>
          </View>
          <View style={tailwind('mt-4')}>
            <Text style={tailwind('text-base text-white font-bold ')}>
              Product Type
            </Text>
            <View style={tailwind('flex-row flex-wrap -mx-1')}>
              {Array.from({length: 3}, (_, index) => (
                <FilterButton key={index} />
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
function FilterButton() {
  return (
    <View style={[tailwind('p-1'), {width: '50%'}]}>
      <TouchableOpacity style={[tailwind('bg-white rounded-lg px-4 py-3 ')]}>
        <Text style={tailwind('text-black text-sm text-center')}>Sling</Text>
      </TouchableOpacity>
    </View>
  );
}
