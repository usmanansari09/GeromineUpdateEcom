/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Menu from '@/assets/menu.png';
import API, {BASEURL} from '@/common/services/API';
import {tailwind, getColor} from '@/common/tailwind';
import {AuthContext} from '@/common/contexts/AuthContext';
import {Text, Button} from '@/components/index';
import ShopNearbyChippedProducts from './components/ShopNearbyChippedProducts';
import ShopLiveStreamers from './components/ShopLiveStreamers';
import ShopSellerStores from './components/ShopSellerStores';
import useAuthStore from '../../../common/stores/useAuthStore';
import StackHeader from '@/components/StackHeader';
const {width} = Dimensions.get('screen');
import {useProfile} from '@/common/services/hooks';
import {getLocationPermission} from '@/common/utils';
import {useQuery, QueryClient, useQueryClient} from 'react-query';

const useFetchHome = opts => {
  console.log({opts});
  const {accessToken} = useContext(AuthContext);
  return useQuery('home_live', () =>
    API(accessToken).get(
      `home?lat=${opts?.location?.latitude}&long=${opts?.location?.longitude}`,
    ),
  );
};

export default function Home({navigation, route}) {
  const {isSignedIn, accessToken} = useContext(AuthContext);
  // const loadUserId = useAuthStore(s => s.getUserId);

  const [homeData, setHomeData] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  const queryClient = useQueryClient();

  let location;

  // useEffect(() => {
  //   let loc;

  //   async function getLoc() {
  //     loc = await getLocationPermission();
  //     setLocation(loc);
  //   }
  //   getLoc();
  //   setLocation(loc);
  //   console.log(location);
  //   setHomeData(data?.data);
  //   // setisLoading(false);
  // }, [location, accessToken]);

  let ws = useRef(new WebSocket('ws://api.geronimolive.com')).current;
  // let ws = useRef(new WebSocket('ws://192.168.137.1:3000')).current;

  useEffect(() => {
    ws.onclose = e => {
      setTimeout(() => {
        ws = new WebSocket('ws://api.geronimolive.com');
      }, 4000);
    };
    ws.onmessage = e => {
      getHomeData().then();
      console.log('on Message: ', e.data);
    };
    return function cleanup() {
      ws.close();
    };
  }, []);

  const {
    data: user,
    isLoading: _isLoading,
    isSuccess: isSuccessUser,
    isError,
  } = useProfile();

  useEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              title: 'Home',
              isHome: true,
              backButtonShow: true,
              hasGBlog: true,
              hasCart: true,
              hasSearch: true,
            }}
          />
        );
      },
    });
    getLocation();
  }, [navigation]);

  const getLocation = async () => {
    location = await getLocationPermission();
  };

  const getHomeData = async () => {
    location = await getLocationPermission();
    setisLoading(true);

    return API(accessToken)
      .get(`home?lat=${location?.latitude}&long=${location?.longitude}`)
      .then(function (response) {
        setHomeData(response?.data);

        setisLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (accessToken) {
      getHomeData();
    }
  }, [location, accessToken]);

  if (isLoading) {
    return (
      <View style={tailwind('items-center justify-center flex-1')}>
        <ActivityIndicator size="large" color={getColor('brand-primary')} />
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={getHomeData} />
      }
      style={{...tailwind('bg-gray-200 flex-1')}}>
      <View>
        <Text
          style={tailwind(
            'uppercase text-black  font-bold text-3xl text-center py-5',
          )}>
          Geronimo Shoppers
        </Text>
        {/* Shop nearby chipped products */}
        <View style={tailwind(' justify-center')}>
          <ShopNearbyChippedProducts
            dataToRender={homeData?.payload?.nearby?.nearby}
          />
        </View>
        {/* Shop live streamers */}
        <View style={tailwind('mt-5 justify-center')}>
          <ShopLiveStreamers
            dataToRender={homeData?.payload?.liveStreamers?.liveStreamers}
          />
        </View>
        {/* Shop seller stores */}
        <View style={tailwind('mt-5')}>
          <ShopSellerStores
            dataToRender={homeData?.payload?.sellerStores?.sellerStores}
          />
        </View>
        <View style={tailwind(' justify-center items-center')}>
          <Text
            style={tailwind(
              `uppercase font-bold
               ${width > 400 ? 'text-3xl' : 'text-3xl'}`,
            )}>
            Geronimo Sellers
          </Text>
        </View>
        <View style={tailwind('mt-4 mb-8 py-4 flex-row justify-center')}>
          {/* <TouchableOpacity
            style={tailwind('mr-3')}
            // onPress={() => navigation.navigate('LiveStream')}
          >
            <View
              style={tailwind(
                'h-24 w-28 justify-center items-center rounded-3xl  bg-black',
              )}>
              <Text
                style={tailwind(
                  'text-2xl text-white uppercase font-bold text-center leading-6',
                )}>
                Sell Live
              </Text>
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={tailwind('mr-3')}
            // onPress={() => navigation.navigate('LiveStream')}
          >
            <View
              style={tailwind(
                'h-24 w-28 justify-center items-center rounded-3xl  bg-black',
              )}>
              <Text
                style={tailwind(
                  'text-2xl text-white uppercase font-bold text-center leading-6',
                )}>
                Stream {'\n'} Live
              </Text>
            </View>
          </TouchableOpacity> */}

          {/* {!isSignedIn?
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
            </View> */}

          <TouchableOpacity
            onPress={() => {
              ws.send('livestream_create Connected HOME');
              if (user?.payload?.user?.role === 'Seller') {
                // console.log('User:', user?.payload?.user?.role);
                if (user?.payload?.user?.products_count === 0) {
                  navigation.navigate('StoreNavigation', {
                    screen: 'StoreSplashOut',
                  });
                  return;
                }
                if (user?.payload?.user?.products_count > 0) {
                  navigation.navigate('Seller Store');
                  return;
                }
              } else {
                navigation.navigate('StoreNavigation', {
                  screen: 'StoreSplash',
                });
              }
              // navigation.navigate('Seller Store');
            }}>
            <View
              style={tailwind(
                'justify-center items-center rounded-3xl bg-black -mt-4 h-20 mr-4 ml-4',
              )}>
              <Text
                style={tailwind(
                  'text-white uppercase font-bold text-center text-lg leading-6 px-6',
                )}>
                To Sell or Stream Live
              </Text>
              <Text
                style={tailwind(
                  'text-2xl text-white uppercase font-bold text-center mt-1 leading-6 ',
                )}>
                Go To My Store
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {!isSignedIn && !isLoading && (
        <View style={tailwind('p-5 bg-black')}>
          <Button
            titleStyle={tailwind('uppercase')}
            onPress={() => {
              navigation.navigate('Register');
            }}
            title="Create an Account"
            icon={
              <Icon
                name="create-outline"
                color="white"
                type="ionicon"
                size={28}
              />
            }
            theme="black"
            type="outline"
            size="md"
          />
        </View>
      )}
    </ScrollView>
  );
}
