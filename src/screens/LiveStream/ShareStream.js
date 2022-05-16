/* eslint-disable react/jsx-no-duplicate-props */
import React, {useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {tailwind} from '@/common/tailwind';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '@/components/Button';
import StackHeader from '@/components/StackHeader';
import CheckBox from '@/components/CheckBox';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function ShareStream({route}) {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const products = route.params?.selected_products || [];
  const isSharingEndedLiveStream =
    route?.params?.previous_screen === 'LiveScreen';
  // useEffect(() => {
  //   const handler = e => {
  //     e.preventDefault();
  //     navigation.navigate('Go Live');
  //   };
  //   navigation.addListener('beforeRemove', handler);
  //   return () => {
  //     navigation.removeListener('beforeRemove', handler);
  //   };
  // }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return <StackHeader props={{...props, title: 'Share Live Stream'}} />;
      },
    });
  }, [navigation]);
  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }, []);
  const handlePress = () => {
    Toast.show({
      text1: 'No function yet',
    });
  };
  return (
    <View
      style={tailwind('bg-gray-100 flex-1')}
      contentContainerStyle={tailwind('p-6')}>
      <Text style={tailwind('text-black text-lg my-4 font-bold text-center')}>
        Share
      </Text>
      <View style={tailwind('justify-center items-center')}>
        <Button
          title="Facebook"
          theme="primary"
          onPress={handlePress}
          size="md"
          icon={{
            name: 'facebook',
            type: 'font-awesome',
            size: 24,
            color: 'white',
          }}
          containerStyle={{width: width / 2, ...tailwind('mb-4')}}
        />
        <Button
          title="Instagram"
          containerStyle={tailwind('my-4')}
          buttonStyle={tailwind('bg-yellow-600')}
          theme="primary"
          size="md"
          icon={{
            name: 'instagram',
            type: 'font-awesome',
            size: 24,
            color: 'white',
          }}
          containerStyle={{width: width / 2, ...tailwind('mb-4')}}
          onPress={handlePress}
        />
        <Button
          icon={{
            name: 'twitter',
            type: 'font-awesome',
            size: 24,
            color: 'white',
          }}
          onPress={handlePress}
          title="Twitter"
          buttonStyle={{backgroundColor: '#653614'}}
          theme="primary"
          size="md"
          containerStyle={{width: width / 2}}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CheckBox
            size={40}
            containerStyle={tailwind('self-center my-6 h-10')}
          />
          <Text style={{color: 'gray', fontSize: 16, fontFamily: 'Arial'}}>
            {'Lorem ipsum dolor sit amet, consectetur'}
          </Text>
        </View>

        {/* {isSharingEndedLiveStream && ( */}
        <Button
          title="Go Live"
          theme="black"
          size="md"
          containerStyle={{
            ...tailwind('justify-center items-center'),
          }}
          buttonStyle={{width: width / 2}}
          onPress={() => {
            // navigation.navigate('ViewStream');
            navigation.navigate('StreamView', {
              selected_products: products,
            });
          }}
        />
        {/* )} */}
      </View>
    </View>
  );
}
