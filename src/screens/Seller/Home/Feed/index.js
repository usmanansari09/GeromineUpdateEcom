import React, {useLayoutEffect, useState} from 'react';
import {Text} from 'react-native-elements';
import {View, FlatList, Image} from 'react-native';
import {tailwind} from '@/common/tailwind';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import Button from '@/components/Button';
import {Header} from './components';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Third Item',
  },
];
const SELLER = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e23d72',
    title: 'Third Item',
  },
];
const Item = ({title, index}) => (
  <TouchableOpacity>
    <View style={tailwind('w-28 h-40 rounded-3xl px-2 pb-2 pt-2 bg-black')}>
      <View style={tailwind('h-full flex')}>
        <View style={tailwind('w-full flex flex-row justify-center pb-1')}>
          <View style={tailwind('w-1/3 bg-white rounded-full h-1 ')} />
        </View>
        <View style={tailwind('flex-1 bg-blue-300 rounded-2xl ')}>
          <View
            style={tailwind(
              'absolute inset-x-0 bottom-0 flex items-center pb-2 ',
            )}>
            <View
              style={tailwind(
                'overflow-hidden border-2 border-yellow-500 rounded-full',
              )}>
              <Image
                style={tailwind('h-14 w-14')}
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
              />
            </View>
            <Text style={tailwind('text-sm uppercase  font-bold text-white')}>
              John
            </Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);
const Product = ({item}) => (
  <View
    style={tailwind('bg-white overflow-hidden border border-black rounded-xl')}>
    <Image
      style={tailwind('h-14 w-14')}
      resizeMode={'cover'}
      source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }}
    />
  </View>
);
const Seller = ({item}) => {
  return (
    <View
      style={tailwind(
        'bg-white overflow-hidden border border-black rounded-xl h-14',
      )}>
      <Image
        style={tailwind('flex-1')}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
    </View>
  );
};

export default function Home({navigation, route}) {
  const renderItem = ({item, index}) => (
    <View style={tailwind(`${index === 0 ? '' : 'ml-4'}`)}>
      <Item title={item.title} />
    </View>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => <Header {...props} />,
    });
  }, [navigation]);

  return (
    <ScrollView style={{...tailwind('bg-gray-200 flex-1')}}>
      <View>
        <View style={tailwind('pb-6 px-5 py-3 bg-white')}>
          <Text style={tailwind('text-lg font-bold text-black uppercase')}>
            See All Streams
          </Text>
          <View style={tailwind('mt-5')}>
            <FlatList
              horizontal={true}
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        <View style={tailwind('mt-5 px-5 py-3 bg-white')}>
          <Text style={tailwind('text-lg font-bold text-black uppercase ')}>
            See nearby chipped products
          </Text>
          <View>
            <View style={tailwind('mt-4 flex-row flex-wrap')}>
              {DATA.map(item => (
                <View style={tailwind('p-1')} key={item._id}>
                  <Product title={item.title} />
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={tailwind('mt-5 px-5 py-3 bg-white')}>
          <Text style={tailwind('text-lg font-bold text-black uppercase ')}>
            See seller stores
          </Text>
          <View>
            <View style={tailwind('mt-4 flex-row flex-wrap')}>
              {SELLER.map(item => (
                <View style={tailwind('p-1 w-1/4')} key={item.id}>
                  <Seller title={item.title} />
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
      <View style={tailwind('mt-4 bg-white py-4 px-12 flex-row')}>
        <TouchableOpacity>
          <Text
            style={tailwind(
              'text-lg text-black uppercase font-bold text-center',
            )}>
            Go Live
          </Text>
          <View
            style={tailwind('w-28 h-40 rounded-3xl px-2 pb-2 pt-2 bg-black')}>
            <View style={tailwind('h-full flex')}>
              <View
                style={tailwind('w-full flex flex-row justify-center pb-1')}>
                <View style={tailwind('w-1/3 bg-white rounded-full h-1 ')} />
              </View>
              <View
                style={tailwind('flex-1  bg-white rounded-2xl items-center')}>
                <Text
                  style={tailwind('text-4xl text-black uppercase font-bold')}>
                  Live
                </Text>
                <Text
                  style={tailwind('text-xl text-black uppercase font-bold')}>
                  Stream
                </Text>
                <Image
                  style={{
                    width: 80,
                  }}
                  resizeMode="contain"
                  source={require('@/assets/live-stream-icon.png')}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tailwind('ml-8')}>
          <Text
            style={tailwind(
              'text-lg text-black uppercase font-bold text-center',
            )}>
            Your Store
          </Text>
          <View
            style={tailwind('w-28 h-40 rounded-3xl px-2 pb-2 pt-2 bg-black')}>
            <View style={tailwind('h-full flex')}>
              <View
                style={tailwind('w-full flex flex-row justify-center pb-1')}>
                <View style={tailwind('w-1/3 bg-white rounded-full h-1 ')} />
              </View>
              <View
                style={tailwind('flex-1  bg-white rounded-2xl items-center')}>
                <Text
                  style={tailwind('text-4xl text-black uppercase font-bold')}>
                  My
                </Text>
                <Text
                  style={tailwind('text-xl text-black uppercase font-bold')}>
                  Store
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={tailwind('p-5 bg-black')}>
        <Button
          titleStyle={tailwind('uppercase')}
          onPress={() =>
            navigation.navigate('Auth', {
              screen: 'Register',
            })
          }
          title="Create an Account"
          icon={
            <Icon
              name="create-outline"
              color="white"
              style={tailwind('text-lg text-white mr-2')}
            />
          }
          theme="primary"
          size="md"
        />
      </View>
    </ScrollView>
  );
}
