import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
  useRef,
} from 'react';
import {
  View,
  useWindowDimensions,
  Platform,
  ActivityIndicator,
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Image, Icon, Badge} from 'react-native-elements';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useQuery} from 'react-query';

import {getColor, tailwind} from '@/common/tailwind';
import API from '@/common/services/API';
import wowza from '@/common/services/wowza';
import {getS3Image} from '@/common/helpers';

import {AuthContext} from '@/common/contexts/AuthContext';

import {StreamPlayer, UserCart} from './components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomSheet, Button, Input, Text} from '@/components/index';
import {FeaturedProducts, ProductDetails, StreamViews} from '../components';
import {useStreamStatus} from '@/common/hooks/livestream';
import {LiveChat, LiveChatInput} from '../LiveScreen/components';
import Modal from 'react-native-modal';
import {StreamNotifications, VideoFeed} from '../LiveScreen/components';
import ProductView from '../ViewStream/components/ProductView';
import ToastUpcomingFeature from '@/common/helpers/ToastUpcomingFeature';
const LINEAR_GRADIENT_PROPS = {
  colors: [
    'rgba(60, 60, 60, 1)',
    'rgba(240, 240, 240, 0)',
    'rgba(240, 240, 240, 0)',
    'rgba(60, 60, 60, 1)',
  ],
  locations: [0, 0.1, 0.9, 1],
};
/**
 *
 * TODO:
 * []-stop stream on screen remove
 */
const useLiveStream = id => {
  const {accessToken, userId} = useContext(AuthContext);
  return useQuery(
    ['livestream', id],
    () =>
      API(accessToken)
        .get(`livestream/${id}`, {})
        .then(res => res.data),
    {
      enabled: !!id,
      staleTime: Infinity,
    },
  );
};

/**
 *
 * @param {{route:RouteProp<any,any>,navigation:StackNavigationProp<any>}} props
 */
export default function ViewStream({route, navigation}) {
  // console.log('ViewStream params are', route?.params);

  const {params, stream_key, channel_name, user, products} = route;

  const {accessToken, isSignedIn} = useContext(AuthContext);
  const backHandleRef = useRef(null);
  const [exitModal, toggleExitModal] = useReducer(s => !s, false);

  const backAction = () => {
    backHandleRef.current(true);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  // const live_stream_id = route.params?.id;
  // const wowza_stream_id = route.params?.wowza_stream_id;

  // const [playBackURL, setPlayBackURL] = useState('');
  // const {
  //   data: livestream,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error: live_stream_error,
  // } = useLiveStream(live_stream_id);
  // const {state: streamStatus, error: streamStateError} =
  //   useStreamStatus(wowza_stream_id);
  // const {data: vod_list, error: vod_list_error} = useLiveStreamVOD(
  //   !streamStateError &&
  //     streamStatus === 'stopped' &&
  //     livestream?.stream_targets
  //     ? JSON.parse(livestream?.stream_targets)[0].id
  //     : null,
  // );
  // const {data: vod, error: vod_error} = useStreamVOD(vod_list?.[0]?.id);

  // useEffect(() => {
  //   if (streamStateError || !isSuccess) {
  //     return;
  //   } else if (streamStatus === 'started' && isSuccess) {
  //     setPlayBackURL(livestream?.player_hls_playback_url);
  //   } else if (vod?.playback_url) {
  //     setPlayBackURL(vod.playback_url);
  //   }
  // }, [streamStatus, streamStateError, isSuccess, livestream, vod]);

  // useEffect(() => {
  //     console.log(
  //         "vod_list_error?.response?.error :>> ",
  //         vod_list_error?.response?.data
  //     );
  //     console.log(
  //         "vod_error?.response?.data :>> ",
  //         vod_error?.response?.data
  //     );
  //     console.log(
  //         "live_stream_error?.response?.data :>> ",
  //         live_stream_error?.response?.data
  //     );
  // }, [vod_list_error, vod_error, live_stream_error]);
  const [liveStreamPayload, setLiveStreamPayload] = useState({});

  const [views, setViews] = useState();

  const selectViews = views => {
    // console.log('--------------------------------------------------------');
    // console.log({views});
    setViews(views || 0);
  };

  useEffect(() => {
    setLiveStreamPayload({
      channel_name: params?.channel_name,
      stream_key: params?.stream_key,
      host_port: null,
      primary_server: null,
      token: '',
    });
    joinLiveStream();
  }, []);
  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }, []);
  const joinLiveStream = () => {
    // const formdata = new FormData();
    // formdata.append('channelName', params.channel_name);
    API(accessToken)
      .get(
        `livestream/join/${params.stream_key}?channelName=${params.channel_name}`,
        {},
      )
      .then(res => {
        // console.log('===>>>', res);
        if (res.status === 200) {
          setLiveStreamPayload({
            channel_name: params?.channel_name,
            stream_key: params?.stream_key,
            token: res.data.payload.token,
          });
        }
      })
      .catch(err => {
        console.log(err.response);
        // setLiveStreamPayload(DEV_FALLBACK_STREAM_PAYLOAD);
      });
  };

  function ExitModal() {
    return (
      <Modal isVisible={exitModal} style={tailwind('z-50 p-4')}>
        <View
          style={tailwind(
            'bg-white rounded-2xl p-6 items-center justify-center',
          )}>
          <Text
            style={tailwind('text-black text-center text-lg mb-4 font-bold')}>
            {'Do you want to end this\nLivestream and go to my cart?'}
          </Text>
          <Button
            title="Yes"
            theme="black"
            onPress={() => {
              navigation.navigate('HomeScreen', {screen: 'ShoppingCart'});
            }}
            containerStyle={tailwind('w-1/2')}
          />

          <Button
            title="No"
            theme="primary"
            onPress={toggleExitModal}
            containerStyle={tailwind('mt-2 w-1/2')}
          />
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={tailwind('flex-1 bg-black')}>
      <View style={tailwind('absolute inset-0 w-full h-full bg-gray-500')}>
        <ExitModal />
        {/* {isLoading ? (
          <View style={tailwind('flex-1 justify-center items-center')}>
            <ActivityIndicator size="large" color={getColor('brand-primary')} />
          </View>
        ) : isSuccess ? (
          <StreamPlayer url={playBackURL} />
        ) : isError ? (
          <View>
            <Text>Error</Text>
          </View>
        ) : null} */}
        {liveStreamPayload.token !== '' && (
          <VideoFeed payload={{...liveStreamPayload, selectViews}} />
        )}

        <LinearGradient
          colors={LINEAR_GRADIENT_PROPS.colors}
          locations={LINEAR_GRADIENT_PROPS.locations}
          style={tailwind('flex-1 absolute inset-0')}
        />
      </View>
      <View
        style={[
          tailwind('flex-1 justify-between px-6 pb-4 pt-5'),
          Platform.select({
            ios: tailwind('pt-2'),
            default: tailwind('pt-5'),
          }),
        ]}>
        <StreamHeader
          toggleExitModal={toggleExitModal}
          id={params?.stream_key}
          user={params?.user}
          views={views}
          backHandleRef={backHandleRef}
        />
      </View>
      <View style={tailwind('')}>
        <StreamFooter
          toggleExitModal={toggleExitModal}
          products={params?.products || []}
          user={params?.user}
          cid={params?.channel_name}
        />
      </View>
    </SafeAreaView>
  );
}

function StreamHeader({user, id, views, backHandleRef, toggleExitModal}) {
  const navigation = useNavigation();
  const [isModalOpen, setModalOpen] = useState(false);
  const handleSetModalOpen = () => {
    setModalOpen(true);
  };

  backHandleRef.current = setModalOpen;
  return (
    <View style={tailwind('flex-row')}>
      {isModalOpen ? (
        <Modal isVisible={true} style={tailwind('items-center justify-center')}>
          <View
            style={tailwind(
              'bg-white rounded-lg p-4 mt-80 h-64 w-72 items-center justify-center',
            )}>
            <Text
              style={tailwind('text-xl justify-center font-bold text-black')}>
              Stream Live ended.
            </Text>

            <Text
              style={tailwind('text-xl justify-center font-bold text-black')}>
              Thank you for watching!
            </Text>

            <Text style={tailwind('text-base mt-1 justify-center text-black')}>
              Do You Want To Share This Video To your Social Media?
            </Text>

            <Button
              title={'Yes'}
              size={'md'}
              theme={'primary'}
              containerStyle={tailwind('mt-4 w-9/12')}
              // onPress={() => {
              //   // setModalOpen(false);
              //   // navigation.navigate('ShareStream');
              // }}
              onPress={() => {
                ToastUpcomingFeature({position: 'top'});
              }}
            />
            <Button
              title={'No, Thanks'}
              size={'md'}
              theme={'black'}
              containerStyle={tailwind('mt-4 w-9/12')}
              onPress={() => {
                // setModalOpen(false);
                setTimeout(() => {
                  navigation.goBack();
                }, 500);

                // navigation.navigate('NotSellingOnGeronimo');
              }}
            />
          </View>
        </Modal>
      ) : null}

      <View style={tailwind('items-center self-start')}>
        <TouchableOpacity
          onPress={() => {
            navigation.replace('Seller Store', {store: user});
          }}>
          <Image
            placeholderStyle={tailwind('flex-1')}
            source={{uri: user?.profile_pic?.absolute_path}}
            PlaceholderContent={
              <ActivityIndicator color={getColor('brand-primary')} />
            }
            containerStyle={tailwind('w-16 h-16  rounded-full')}
          />
        </TouchableOpacity>
        <Text
          style={tailwind(
            'text-xs text-white uppercase bg-brand-primary rounded-full py-0\\.5 absolute bottom-0 -mb-2 px-2 font-bold',
          )}>
          Live
        </Text>
      </View>
      <View style={tailwind(' flex-1 ml-2')}>
        <View style={tailwind('flex-row justify-between mb-2')}>
          <View>
            <Text
              style={{
                ...tailwind('text-sm text-white font-bold'),
              }}>
              {user?.full_name}
            </Text>
            <View style={tailwind('flex-row mt-2')}>
              <TouchableOpacity
                onPress={() =>
                  navigation.replace('Seller Store', {store: user})
                }>
                <Text style={tailwind('text-white text-xs mr-2')}>
                  @{user?.username}
                </Text>
              </TouchableOpacity>
              <StreamViews id={id} views={views} />
            </View>
          </View>
          <View style={tailwind('flex-row justify-between')}>
            <UserCart toggleExitModal={toggleExitModal} />
            <TouchableOpacity
              onPress={handleSetModalOpen} //navigation.goBack handleSetModalOpen
            >
              <Icon
                type="ionicon"
                name="close-outline"
                size={32}
                color={getColor('white')}
                containerStyle={tailwind('ml-2')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={tailwind('flex-row justify-between items-center')}>
          <Button
            onPress={() => ToastUpcomingFeature({position: 'bottom'})}
            title="Follow"
            type="outline"
            size="sm"
            theme="black"
            icon={
              <Icon
                type="ionicon"
                name="add"
                size={16}
                color={getColor('white')}
              />
            }
            containerStyle={tailwind('self-start z-50')}
            buttonStyle={tailwind('px-2 py-0\\.5 rounded-full bg-transparent')}
            titleStyle={tailwind('font-light')}
          />
          <Button
            onPress={() => ToastUpcomingFeature({position: 'bottom'})}
            title="Share Live Stream"
            type="outline"
            size="sm"
            theme="black"
            icon={
              <Icon
                type="ionicon"
                name="share-social"
                size={16}
                color={getColor('white')}
              />
            }
            containerStyle={tailwind('self-start')}
            buttonStyle={tailwind('px-2 py-0\\.5 rounded-full bg-transparent')}
            titleStyle={tailwind('font-light')}
          />
        </View>
      </View>
    </View>
  );
}
function StreamFooter({products = [], toggleExitModal, user}) {
  const [visible, toggle] = useReducer(s => !s, false);
  const [productId, setProductId] = useState(0);
  const [toggleProductView, setToggleProductView] = useReducer(s => !s, false);
  const [selectedProd, setSelectedProd] = useState({});

  const ProductViewFn = product => {
    setToggleProductView();
    setSelectedProd(product);
  };

  const closeProductView = () => {
    console.log('on close called');
    setToggleProductView();
  };
  return (
    <View style={tailwind('mb-4')}>
      {/* <LiveChat channel_cid={cid} /> */}
      <ProductView
        toggleExitModal={toggleExitModal}
        setToggleProductView={setToggleProductView}
        show={toggleProductView}
        onClose={closeProductView}
        user={user}
        product={selectedProd}
      />
      <FeaturedProducts
        user={user}
        onProductPress={ProductViewFn}
        onSelect={setProductId}
        show={visible}
        products={products}
        isBuyer={true}
      />
      <View style={tailwind('flex-row px-6 items-center justify-between')}>
        <TouchableOpacity onPress={toggle}>
          <Icon
            type="font-awesome-5"
            name="store"
            containerStyle={tailwind('bg-white self-start p-3 rounded-full')}
            // onPress={toggle}
          />
          <Badge
            value={products.length}
            status="error"
            badgeStyle={tailwind('bg-brand-primary')}
            containerStyle={tailwind('absolute right-0')}
          />
        </TouchableOpacity>
        <LiveChatInput />
        {/* <ShowChat /> */}
        <ProductDetails id={productId} onClose={() => setProductId(0)} />
      </View>
    </View>
  );
}

function ShowChat() {
  const [visible, toggle] = useReducer(s => !s, false);
  const {height} = useWindowDimensions();
  return (
    <View style={tailwind('-mr-2')}>
      <Icon
        type="ionicon"
        name="chatbox-outline"
        size={32}
        color={getColor('white')}
        onPress={toggle}
        containerStyle={tailwind('p-2')}
      />
      <BottomSheet
        isVisible={visible}
        onBackButtonPress={toggle}
        containerStyle={tailwind('bg-gray-700')}
        backdropOpacity={0.4}>
        <View style={[tailwind('p-4'), {height: height / 2.5}]}>
          <Text>Hello</Text>
        </View>
        <View style={tailwind('flex-row')}>
          <Input
            leftIcon={
              <Icon
                name="attach"
                type="ionicon"
                size={32}
                onPress={() => {}}
                color={getColor('white')}
              />
            }
            rightIcon={
              <Text
                onPress={() => {
                  console.log('send message :>> ');
                }}
                style={tailwind(
                  'text-brand-primary uppercase text-base font-bold',
                )}>
                Send
              </Text>
            }
            placeholder="Type a message"
            containerStyle={tailwind('mb-0')}
            inputContainerStyle={tailwind('rounded-none')}
          />
        </View>
      </BottomSheet>
    </View>
  );
}
