import {getColor, tailwind} from '@/common/tailwind';
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Switch,
  Dimensions,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';

import CameraIcon from '@/common/icons/Camera';
import {useProfile} from '@/common/services/hooks';
import {Skeleton, Text, Image} from '@/components/index';
import {ActivityIndicator} from 'react-native';

const ProfilePhoto = require('@/assets/no_profile.jpg');
const GBlog = require('@/assets/g_blog.png');
import StackHeader from '@/components/StackHeader';
// import {useProfile} from '@/common/services/hooks';
// import {TranscodingUser} from 'react-native-agora';
const {width, height} = Dimensions.get('screen');
import {useRefetchOnFocus} from '@/common/hooks';

const NAVIGATION = [
  {
    text: () => (
      <>
        <Text style={tailwind(/* 'font-bold' */)}>{'My\n Store'}</Text>
      </>
    ),
    route: 'Seller Store',
  },
  {
    text: () => (
      <>
        <Text>{'Seller\n Payout'}</Text>
      </>
    ),
    route: 'ProfileScreens',
    screen: 'Payout',
  },
  {
    text: () => (
      <>
        <Text /* style={tailwind(' font-bold')} */>{'Sales\n History'}</Text>
      </>
    ),
    route: 'Purchase History',
    isSalesHistory: true,
    // screen: 'SalesHistory',
  },
  {
    text: () => (
      <>
        <Text style={[tailwind('text-base')]}>{'Purchase\n'}</Text>
        <Text style={tailwind('')}>History</Text>
      </>
    ),
    route: 'Purchase History',
  },
  {
    text: () => (
      <>
        <Text>{'My\n Videos'}</Text>
      </>
    ),
    route: 'My Videos',
  },
  {
    text: () => (
      <>
        <Text>{'Edit\n Profile'}</Text>
      </>
    ),
    route: 'Edit Profile',
  },
];
/**
 *
 * @param {{navigation:StackNavigationProp<any>}} props
 */

export default function Profile({navigation, route}) {
  const query = useProfile();
  const {data: user, isLoading, isSuccess, isError} = query;
  useRefetchOnFocus(query);
  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              title: 'My Profile',
              backButtonShow: route?.params ? false : true, //params should not be undefined
            }}
          />
        );
      },
    });
  }, [navigation]);
  return (
    <UserProfile
      user={user}
      loading={isLoading}
      error={isError}
      navigation={navigation}
    />
  );
}
function UserProfile({user, loading, error, navigation}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={tailwind('flex-1 bg-black')}>
      <ScrollView
        contentContainerStyle={{
          // flexGrow: 0,
          ...tailwind('p-6 justify-between '),
        }}>
        <View style={tailwind('flex-1 mt-0 bg-black')}>
          <View style={tailwind('flex-1 items-center')}>
            <View>
              <Image
                containerStyle={tailwind(
                  'border-2 overflow-hidden border-white rounded-full',
                )}
                style={{
                  ...tailwind('w-28 h-28'),
                  borderColor: getColor('brand-primary'),
                }}
                PlaceholderContent={
                  <ActivityIndicator color="black" size="large" />
                }
                source={
                  user?.payload?.user?.profile_pic?.absolute_path
                    ? {
                        uri: user?.payload?.user?.profile_pic?.absolute_path,
                      }
                    : ProfilePhoto
                }
              />
              {/* <CameraIcon style={tailwind('absolute bottom-0 right-0')} /> */}
            </View>
            {loading ? (
              <View style={tailwind('w-1/2 mt-4')}>
                <Skeleton>
                  <View style={tailwind('h-4')} />
                  <View style={tailwind('h-4 mt-2')} />
                </Skeleton>
              </View>
            ) : (
              <>
                <Text
                  style={{
                    ...tailwind(
                      'text-white text-2xl uppercase font-bold text-center mt-2',
                    ),
                  }}>
                  {user?.payload?.user.full_name}
                </Text>
                <Text style={tailwind('text-gray-500 text-lg text-center')}>
                  {user?.payload?.user.username}
                </Text>
              </>
            )}
          </View>
          <View style={tailwind('mt-5 flex-row flex-wrap')}>
            {NAVIGATION.map((item, index) => {
              const {text: Title} = item;
              return (
                <TouchableOpacity
                  disabled={index === 1 || index === 4}
                  key={index}
                  onPress={() => {
                    if (index === 0) {
                      if (user?.payload?.user?.role === 'Seller') {
                        if (user?.payload?.user?.products_count === 0) {
                          navigation.navigate('StoreNavigation', {
                            screen: 'StoreSplashOut',
                          });
                          return;
                        } else {
                          navigation.navigate('Seller Store');
                        }
                      } else {
                        navigation.navigate('StoreNavigation', {
                          screen: 'StoreSplash',
                        });
                      }
                    } else {
                      if (item.screen) {
                        navigation.navigate(item.route, {
                          screen: item.screen,
                        });
                      } else if (item?.isSalesHistory) {
                        navigation.navigate(item.route, {
                          isSalesHistory: item?.isSalesHistory,
                        });
                      } else {
                        navigation.navigate(item.route);
                      }
                    }
                  }}
                  style={{
                    ...tailwind(
                      `${
                        index === 1 && user?.payload?.user?.role === 'Buyer'
                          ? 'bg-gray-400'
                          : 'bg-white'
                      } rounded-lg py-4 flex-shrink-0 m-1 items-center justify-center`,
                    ),
                    width: width / 3 - 24,
                    height: width / 3 - 24,
                  }}>
                  <Text
                    style={[
                      tailwind(
                        'text-brand-primary flex-col text-xl font-black text-center uppercase',
                      ),
                      {lineHeight: 20},
                    ]}>
                    <Title />
                  </Text>
                </TouchableOpacity>
              );
            })}
            <View
              style={tailwind('items-center flex-row justify-center w-full')}>
              {/* <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('payout');
                }}
                style={{
                  ...tailwind(
                    'bg-white rounded-lg py-4 flex-shrink-0 m-1 items-center justify-center',
                  ),
                  width: width / 3 - 24,
                  height: width / 3 - 24,
                }}>
                <Text
                  style={[
                    tailwind(
                      'text-brand-primary flex-col text-lg font-bold text-center uppercase',
                    ),
                    {lineHeight: 20},
                  ]}>
                  {'Seller\n Payout'}
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('GBlog');
                }}
                style={{
                  ...tailwind(
                    'bg-white rounded-lg py-4 flex-shrink-0 m-1 items-center justify-center',
                  ),
                  width: width / 3 - 24,
                  height: width / 3 - 24,
                }}>
                <Image
                  // style={tailwind('h-20 w-20')}
                  style={{
                    width: width / 3 - 52,
                    height: width / 3 - 52,
                  }}
                  resizeMethod="auto"
                  source={GBlog}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={tailwind('flex-row mt-5 items-center justify-between')}>
          <View style={tailwind('flex-row items-center')}>
            <Icon
              type="ionicon"
              name="person-add-outline"
              color={getColor('white')}
              style={{transform: [{rotateY: '180deg'}]}}
              size={15}
            />
            <Text style={tailwind('text-white ml-2 text-lg')}>
              {'0'} followers
            </Text>
          </View>
          <DisableChat />
        </View>
      </ScrollView>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={showModal}
        style={tailwind('')}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <View style={tailwind('h-full w-full')}>
          <Image
            onPress={() => setShowModal(!showModal)}
            style={[
              tailwind('border-4 border-white rounded-full mt-14'),
              {height: height / 2, width: width},
            ]}
            source={{
              uri: user?.payload?.user?.profile_pic?.absolute_path,
            }}
          />
        </View>
      </Modal>
    </View>
  );
}
function DisableChat() {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <View style={[tailwind('items-center flex-row')]}>
      <View style={[tailwind('flex-row items-center'), {right: 4}]}>
        <Icon
          type="ionicon"
          name="chatbox-outline"
          color={getColor('white')}
          style={[tailwind('mr-1'), {transform: [{rotateY: '180deg'}]}]}
          size={15}
        />
        <Text style={[tailwind('text-base text-white font-normal')]}>
          Disable Chat
        </Text>
      </View>

      <Switch
        trackColor={{
          false: getColor('gray-400'),
          true: getColor('brand-primary'),
        }}
        style={[tailwind(''), {transform: [{scaleX: 0.8}, {scaleY: 0.8}]}]}
        thumbColor={getColor('white')}
        ios_backgroundColor={getColor('gray-400')}
        onValueChange={() => setIsEnabled(prev => !prev)}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop: 30,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00ff00',
    padding: 100,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
});
