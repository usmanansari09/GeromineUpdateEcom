import {getColor, tailwind} from '@/common/tailwind';
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Switch,
  Dimensions,
} from 'react-native';
import CameraIcon from '@/common/icons/Camera';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('screen');
const ProfilePhoto = require('@/assets/profile-photo-placeholder.png');

export default function Profile() {
  return (
    <ScrollView style={tailwind('pt-6 bg-black flex-1  px-6')}>
      {/*<View style={tailwind('items-center')}>
        <ImageBackground
          style={{
            ...tailwind('w-28 h-28 rounded-full bg-gray-500 border-2'),
            borderColor: getColor('brand-primary'),
          }}
          source={ProfilePhoto}>
          <CameraIcon style={tailwind('absolute bottom-0 right-0')} />
        </ImageBackground>
        <Text
          style={{
            ...tailwind(
              'text-white text-2xl uppercase font-bold text-center mt-2',
            ),
          }}>
          Jane Lee Smith
        </Text>
        <Text style={tailwind('text-gray-500 text-lg text-center')}>
          jane24_smith
        </Text>
      </View>
      <View style={tailwind('mt-10 flex-row flex-wrap')}>
        <TouchableOpacity
          style={{
            ...tailwind('bg-white rounded-lg py-4 flex-shrink-0 m-1'),
            width: width / 3 - 24,
          }}>
          <Text
            style={tailwind(
              'text-brand-primary text-2xl font-bold text-center uppercase',
            )}>
            My
          </Text>
          <Text
            style={tailwind(
              'text-brand-primary text-2xl font-bold text-center uppercase',
            )}>
            Store
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...tailwind('bg-white rounded-lg py-1 flex-shrink-0 m-1 h-24'),
            width: width / 3 - 24,
          }}>
          <Text
            style={tailwind(
              'text-brand-primary text-xl font-bold text-center uppercase',
            )}>
            My
          </Text>
          <Text
            style={tailwind(
              'text-brand-primary text-lg font-bold text-center uppercase',
            )}>
            Payment
          </Text>
          <Text
            style={tailwind(
              'text-brand-primary text-xl font-bold text-center uppercase',
            )}>
            Info
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...tailwind('bg-white rounded-lg py-4 flex-shrink-0 m-1 h-24'),
            width: width / 3 - 24,
          }}>
          <Text
            style={tailwind(
              'text-brand-primary text-2xl font-bold text-center uppercase',
            )}>
            Sales
          </Text>
          <Text
            style={tailwind(
              'text-brand-primary text-xl font-bold text-center uppercase leading-6',
            )}>
            History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...tailwind(
              'bg-white rounded-lg py-4 flex-shrink-0 m-1 h-24 justify-center',
            ),
            width: width / 3 - 24,
          }}>
          <Text
            style={tailwind(
              'text-brand-primary text-base font-bold text-center uppercase',
            )}>
            Purchase
          </Text>
          <Text
            style={tailwind(
              'text-brand-primary text-xl font-bold text-center uppercase',
            )}>
            History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...tailwind(
              'bg-white rounded-lg py-4 flex-shrink-0 m-1 h-24 justify-center',
            ),
            width: width / 3 - 24,
          }}>
          <Text
            style={tailwind(
              'text-brand-primary text-xl font-bold text-center uppercase',
            )}>
            My
          </Text>
          <Text
            style={tailwind(
              'text-brand-primary text-xl font-bold text-center uppercase',
            )}>
            Videos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...tailwind(
              'bg-white rounded-lg py-4 flex-shrink-0 m-1 h-24 justify-center',
            ),
            width: width / 3 - 24,
          }}>
          <Text
            style={tailwind(
              'text-brand-primary text-xl font-bold text-center uppercase',
            )}>
            Edit
          </Text>
          <Text
            style={tailwind(
              'text-brand-primary text-xl font-bold text-center uppercase',
            )}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
      <View style={tailwind('items-center flex-row justify-between mt-6')}>
        <View style={tailwind('flex-row items-center')}>
          <Icon name="chatbox-outline" style={tailwind('text-white text-lg')} />
          <Text style={tailwind('text-base text-white font-bold ml-2')}>
            Disable Chat
          </Text>
        </View>
        <Switch
          trackColor={{
            false: '#767577',
            true: getColor('green-500'),
          }}
          thumbColor={getColor('white')}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
      <View style={tailwind('flex-row items-center justify-center mt-8 mb-10')}>
        <Icon
    name="person-add-outline"
    style={tailwind('text-yellow-500 text-2xl')}/>
        <Text style={tailwind('text-white ml-2')}>{'5,700'} Followers</Text>
      </View>*/}
    </ScrollView>
  );
}
