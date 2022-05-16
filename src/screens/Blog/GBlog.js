import React, {useLayoutEffect, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {tailwind} from '@/common/tailwind';
import {Avatar, Image, Icon} from 'react-native-elements';
import {getS3Image} from '@/common/helpers';
import StackHeader from '@/components/StackHeader';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DUMMY_BLOGS = [
  {
    id: 1,
    avatar: 'profiles/28/images/c2xBLPWtNA71konCN4zcBinqpT0EIIzLSFAp83EJ.png',
    name: 'John23',
    product:
      'profiles/28/products/MXHouhS65cDFPlYJ4gR1qrEtqtRvXDrdQOCnBfsX.jpg',
  },
  {
    id: 2,
    avatar: 'profiles/31/images/xCF2t0XD3NEvaVvkrBmGobOswFHlcrq6Bgr6EKWD.png',
    name: 'Sheena',
    product:
      'profiles/28/products/ioiP2QPPYKjh7dEWpwuGARwH2iiEYfmdrGd2jnip.jpg',
  },
  {
    id: 3,
    avatar: 'profiles/31/images/xCF2t0XD3NEvaVvkrBmGobOswFHlcrq6Bgr6EKWD.png',
    name: 'Sally45',
    product:
      'profiles/28/products/LOUXjJ3G50ojCpiZXq96BI9NJYDDjggfDod2X1XW.jpg',
  },
  {
    id: 4,
    avatar: 'profiles/31/images/xCF2t0XD3NEvaVvkrBmGobOswFHlcrq6Bgr6EKWD.png',
    name: 'Joana_1678',
    product:
      'profiles/28/products/IOiIAzEn3TWTs5LxhsessVqqIjyV5JvCl5C0BO2m.jpg',
  },
  {
    id: 5,
    avatar: 'profiles/31/images/xCF2t0XD3NEvaVvkrBmGobOswFHlcrq6Bgr6EKWD.png',
    name: 'Shane_Smith',
    product:
      'profiles/28/products/znO7fGM9DCQgunFoNknW0Oj7Lw1d7z2Qs4Lr5sQl.jpg',
  },
];

export default function GBlog({navigation, route}) {
  useEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{...props, title: 'GBlog', hasSearch: true, hasCart: true}}
          />
        );
      },
    });
  }, [navigation]);
  return (
    <View style={tailwind('flex-1 bg-gray-100 px-6 pt-6')}>
      {/* {isLoading ? ( */}
      {/* <View style={tailwind("items-center justify-center flex-1")}>
                    <ActivityIndicator
                        color={getColor("brand-primary")}
                        size="large"
                    />
                </View> */}
      {/* ) : isError ? ( */}
      {/* <View style={tailwind("items-center justify-center flex-1")}>
                    <Text style={tailwind("text-center text-base text-black")}>
                        Failed to load feed
                    </Text>
                    <Button
                        title="Try Again"
                        theme="primary"
                        onPress={refetch}
                    />
                </View> */}
      {/* ) : isSuccess ? ( */}
      <BlogList blog={DUMMY_BLOGS} />
      {/* ) : null} */}
    </View>
  );
}

function BlogList({blog = []}) {
  const renderItem = ({item, index}) => (
    <View style={tailwind(`${index > 0 ? 'mt-4' : ''}`)}>
      <Blog item={item} />
    </View>
  );
  if (blog.length === 0) {
    return (
      <View style={tailwind('flex-1 items-center justify-center')}>
        <Text style={tailwind('text-base text-black')}>No Blog found</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={blog}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tailwind('pb-6')}
    />
  );
}

function Blog({item}) {
  return (
    <View style={tailwind('p-3 rounded-lg bg-white flex-row justify-between')}>
      <View style={tailwind('flex-1')}>
        <View style={tailwind('flex-row items-center')}>
          <Avatar rounded source={{uri: getS3Image(item.avatar)}} />
          <Text style={tailwind('ml-2')}>{item.name}</Text>
        </View>
        <Text style={tailwind('text-black text-sm leading-4 font-bold p-1')}>
          Lorem ipsum dolor sit amet cons ectetur adipiscing elit imum sur
        </Text>
        <Text style={tailwind('text-xs p-1 text-gray-500')}>3 months ago</Text>
      </View>
      <Image
        style={[tailwind('w-20 rounded-lg'), {marginVertical: 4}]}
        source={{uri: getS3Image(item.product)}}
      />
    </View>
  );
}
