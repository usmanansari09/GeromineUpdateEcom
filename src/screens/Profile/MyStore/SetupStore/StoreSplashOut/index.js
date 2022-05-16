import React, {useEffect, useLayoutEffect} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {tailwind, getColor} from '@/common/tailwind';
import LinearGradient from 'react-native-linear-gradient';
import {Text, Button, Skeleton} from '@/components/index';
import {Icon} from 'react-native-elements';
import StackHeader from '@/components/StackHeader';
import {useProfile} from '@/common/services/hooks';
import {useFocusEffect} from '@react-navigation/native';
import {useRefetchOnFocus} from '@/common/hooks';

export default function StoreSplashOut({navigation}) {
  // const {
  //   data: user,
  //   isLoading,
  //   isError,
  //   refetch,
  //   isSuccess,
  //   isFetching,
  // } = useProfile();

  const query = useProfile();
  const {
    data: user,
    isLoading,
    isError,
    refetch,
    isSuccess,
    isFetching,
  } = query;
  useRefetchOnFocus(query);

  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={[tailwind('w-full'), {alignItems: 'flex-start', left: 15}]}
        onPress={() => navigation.canGoBack() && navigation.goBack()}>
        <Icon type="ionicon" name="close-outline" color="white" size={32} />
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      // console.log('---------------------------');
      refetch();
    }, [navigation]),
  );

  useEffect(() => {
    // refetch();
    // console.log('success ---------------------------');
    if (isSuccess && user?.payload?.user?.products_count > 0) {
      navigation.replace('Seller Store');
      // console.log({isSuccess});
    }
    if (isError) {
      refetch();
    }
  }, [isSuccess, isFetching, isError, isLoading]);

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
    refetch();
  }, []);

  return (
    <View style={tailwind('h-full')}>
      <ImageBackground
        source={{uri: 'https://i.imgur.com/Icj2VmL.jpg'}}
        style={[tailwind('w-full h-full flex-1 z-0'), {opacity: 69}]}
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
          {isLoading || isFetching ? (
            <ActivityIndicator
              color={getColor('brand-primary')}
              size="large"
              style={[
                tailwind('absolute inset-0 z-50'),
                // {backgroundColor: 'rgba(128, 128, 128, 0.7)'},
              ]}
            />
          ) : (
            <View style={tailwind('items-center w-full')}>
              <Text style={[tailwind('text-white'), {fontSize: 20}]}>
                You're ready to
              </Text>
              <Text style={[tailwind('text-white'), {fontSize: 20}]}>
                sell your products
              </Text>

              <Button
                onPress={() => navigation.navigate('AddProduct')}
                // onPress={() => navigation.navigate('Seller Store')}
                title="List your first product"
                theme="white_"
                size="smLg"
                containerStyle={[tailwind('mt-3 p-2'), {width: '72%'}]}
              />
            </View>
          )}
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
