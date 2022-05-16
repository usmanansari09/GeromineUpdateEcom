import React, {useEffect, useLayoutEffect, useContext} from 'react';
import {View, ImageBackground, TouchableOpacity} from 'react-native';
import {tailwind, getColor} from '@/common/tailwind';
import LinearGradient from 'react-native-linear-gradient';
import {Text, Button, Skeleton} from '@/components/index';
import {Icon} from 'react-native-elements';
import {useProfile} from '@/common/services/hooks';
import {AuthContext} from '@/common/contexts/AuthContext';
// import StackHeader from '@/components/StackHeader';

export default function StoreSplash({navigation}) {
  const {isSignedIn, accessToken} = useContext(AuthContext);
  const {data: user, isLoading, isSuccess, isError} = useProfile();

  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={[tailwind('w-full'), {alignItems: 'flex-start', left: 15}]}
        onPress={() => navigation.canGoBack() && navigation.goBack()}>
        <Icon type="ionicon" name="close-outline" color="white" size={32} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: HeaderLeft,
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'black',
      },
      style: {
        paddingBottom: 50,
      },
    });

    if (isSuccess && user?.payload?.user?.store_description) {
      console.log('Store auto navigate to storeDescription screen');
      navigation.navigate('StoreNavigation', {
        screen: 'StorePayment',
      });
    } else {
      console.log('store Description not found');
    }
  }, []);
  if (!isSignedIn) {
    return (
      <View style={tailwind('items-center justify-center flex-1 p-6')}>
        <View>
          <Text style={tailwind('text-lg text-black text-center pb-2')}>
            Create an account now to start using geronimo
          </Text>
          <Button
            onPress={() => {
              navigation.navigate('SignIn');
            }}
            title="Sign in"
            theme="primary"
            size="sm"
            containerStyle={tailwind('flex-shrink-0')}
          />
        </View>
      </View>
    );
  }
  return (
    <ImageBackground
      source={{uri: 'https://i.imgur.com/Icj2VmL.jpg'}}
      style={[tailwind('w-full h-full flex-1 z-0'), {opacity: 89}]}
      imageStyle={{transform: [{translateX: 0}]}}
      resizeMode="cover">
      <LinearGradient
        colors={[
          'rgba(0, 0, 0, 1)',
          'rgba(44, 44, 44, 0.52)',
          'rgba(128, 128, 128, 0)',
        ]}
        style={{
          flex: 1,
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <View style={tailwind('items-center w-full')}>
          <Text style={[tailwind('text-white'), {fontSize: 22}]}>
            Build your personal
          </Text>
          <Text style={[tailwind('text-white'), {fontSize: 22}]}>
            shopping and selling empire
          </Text>

          <Button
            onPress={() =>
              navigation.navigate('StoreNavigation', {
                screen: 'StoreDescription',
              })
            }
            title="Set up your store"
            theme="white_"
            size="smLg"
            containerStyle={[tailwind('mt-3 p-2'), {width: '69%'}]}
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}
