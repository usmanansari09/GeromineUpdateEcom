import {tailwind} from '@/common/tailwind';
import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import GHome from '@/assets/GHouse.png';
import GChip from '@/assets/gero-chip.png';
import Beacon from '@/assets/Beacon.png';
import Stream from '@/assets/live-stream-icon.png';
import MegaPhone from '@/assets/megaphone.png';
import Store from '@/assets/store.png';
import GBlogIcon from '@/common/icons/GBlogIcon';
const {width} = Dimensions.get('screen');

/**
 *
 * @param {{navigation:StackNavigationProp<any>}} props
 */
export default function Dashboard({navigation, route}) {
  return (
    <View style={tailwind('bg-black flex-1 justify-center px-6')}>
      <View style={tailwind('flex-row items-center flex-wrap')}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{
            ...tailwind(
              'bg-white rounded-lg  m-2 h-36 justify-center items-center h-36',
            ),
            width: width / 2 - 40,
          }}>
          <Image source={GHome} />
          <Text
            style={tailwind(
              'text-3xl text-brand-primary uppercase font-bold text-center',
            )}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Buy Chips', {screen: 'Buy'})}
          style={{
            ...tailwind(
              'bg-white rounded-lg  m-2 h-36 justify-center items-center',
            ),
            width: width / 2 - 40,
          }}>
          <Image source={GChip} style={tailwind('w-16 h-16')} />
          <Text
            style={tailwind(
              'text-3xl text-brand-primary uppercase font-bold text-center',
            )}>
            Buy
          </Text>
          <Text
            style={tailwind(
              'text-3xl text-brand-primary uppercase font-bold text-center',
            )}>
            Chips
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChippedProducts')}
          style={{
            ...tailwind(
              'bg-white rounded-lg  m-2 h-36 justify-center items-center',
            ),
            width: width / 2 - 40,
          }}>
          <Image source={Beacon} />
          <Text
            style={{
              ...tailwind(
                'text-xl text-brand-primary mt-2 uppercase font-bold text-center',
              ),
              lineHeight: 20,
            }}>
            Nearby
          </Text>
          <Text
            style={{
              ...tailwind(
                'text-xl text-brand-primary uppercase font-bold text-center',
              ),
              lineHeight: 20,
            }}>
            Chipped
          </Text>
          <Text
            style={{
              ...tailwind(
                'text-xl text-brand-primary uppercase font-bold text-center',
              ),
              lineHeight: 20,
            }}>
            Products
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('LiveStream', {
              screen: 'Go Live',
            })
          }
          style={{
            ...tailwind(
              'bg-white rounded-lg  m-2 h-36 justify-center items-center',
            ),
            width: width / 2 - 40,
          }}>
          <Image
            source={Stream}
            style={tailwind('w-16')}
            resizeMode={'contain'}
          />
          <Text
            style={tailwind(
              'text-3xl text-brand-primary uppercase font-bold text-center',
            )}>
            Go
          </Text>
          <Text
            style={tailwind(
              'text-3xl text-brand-primary uppercase font-bold text-center',
            )}>
            Live
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('NewsFeed')}
          style={{
            ...tailwind(
              'bg-white rounded-lg  m-2 h-36 justify-center items-center',
            ),
            width: width / 2 - 40,
          }}>
          <GBlogIcon style={tailwind('w-24 h-24 text-black')} />
          <Text
            style={tailwind(
              'text-3xl text-brand-primary uppercase font-bold text-center',
            )}>
            G Blog
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('My Store')}
          style={{
            ...tailwind(
              'bg-white rounded-lg  m-2 h-36 justify-center items-center',
            ),
            width: width / 2 - 40,
          }}>
          <Image source={Store} />
          <Text
            style={tailwind(
              'text-3xl text-brand-primary uppercase font-bold text-center',
            )}>
            My
          </Text>
          <Text
            style={tailwind(
              'text-3xl text-brand-primary uppercase font-bold text-center',
            )}>
            Store
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
