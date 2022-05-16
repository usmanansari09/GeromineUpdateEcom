import React, {useLayoutEffect} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {tailwind} from '@/common/tailwind';
import Input from '@/components/Input';
import {Bubble} from '@/components/Messaging';
/**
 *
 * @param {{route:RouteProp<any,any>,navigation:StackNavigationProp<any>}} props
 */
export default function ProductChat({route, navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              title:
                route?.params?.product_name.substring(0, 17) + '...' ||
                'Product Name',
            }}
          />
        );
      },
    });
  }, [route, navigation]);
  return (
    <View style={tailwind('flex-1 bg-white')}>
      <View
        style={tailwind(
          'flex-row py-4 bg-white border-b border-gray-300 mx-6',
        )}>
        <Image
          source={require('@/assets/product-view-placeholder.png')}
          style={tailwind('w-28 h-20')}
          resizeMode="contain"
        />
        <View>
          <Text style={tailwind('text-sm font-bold text-black w-1/2')}>
            Louis Vuitton Riverside Bag
          </Text>
          <Text style={tailwind('text-lg font-bold text-brand-primary')}>
            $875.59
          </Text>
        </View>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="close" size={32} style={tailwind('text-black')} />
        </TouchableOpacity>
      </View>
      <View style={tailwind('flex-1 bg-white pt-4')}>
        <View style={[tailwind('px-6 mb-3 flex-1')]}>
          {/* <FlatList
                        data={Array.from({ length: 15 })}
                        renderItem={({ item, index }) => (
                            <Bubble
                                type={index % 2 === 0 ? "message" : "reply"}
                                messageTheme="primary"
                                replyTheme="tertiary"
                                reverse
                            />
                        )}
                        keyExtractor={(item, index) => `${index}`}
                    /> */}
        </View>
        <View
          style={tailwind(
            'flex-row  items-center border-t bg-black border-gray-500 px-5 pb-2',
          )}>
          <View>
            <Icon
              name="attach-outline"
              size={32}
              style={[tailwind('text-white z-10')]}
            />
          </View>
          <Input
            placeholder="Type a message..."
            theme="white"
            placeholderTextColor="white"
            size="sm"
            containerStyle={{
              ...tailwind('self-center flex-1 mb-0 ml-3'),
            }}
            inputStyle={{
              ...tailwind('border-0 bg-transparent text-white'),
            }}
            inputContainerStyle={tailwind('border-0')}
          />
          <TouchableOpacity style={tailwind('')}>
            <Text style={tailwind('text-lg text-brand-primary font-bold')}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
