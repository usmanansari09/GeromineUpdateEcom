/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  View,
  BackHandler,
  UIManager,
  LayoutAnimation,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {Image, Icon, Badge} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {useMutation} from 'react-query';
import Modal from 'react-native-modal';

import {getColor, tailwind} from '@/common/tailwind';
import {getS3Image} from '@/common/helpers';

import {useProfile} from '@/common/services/hooks';
import API from '@/common/services/API';

import {AuthContext} from '@/common/contexts/AuthContext';
import {Button, Text} from '@/components/index';
import {FeaturedProducts, StreamViews} from '../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import ToastUpcomingFeature from '@/common/helpers/ToastUpcomingFeature';

import {
  StreamNotifications,
  VideoFeed,
  LiveChat,
  LiveChatInput,
} from './components';
import {useModal} from '@/components/Modal';
import ProductView from '../ViewStream/components/ProductView';
import CustomAlert from '@/components/Modal/CustomAlert';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getLocationPermission} from '@/common/utils';

import GoLiveIcon from '@/common/icons/GoLiveIcon';

const DEV_FALLBACK_STREAM_PAYLOAD = {
  stream_id: '9pk4qtjl',
  stream_name: 'user-28-stream',
  host_port: 1935,
  primary_server: 'rtmp://47398a.entrypoint.cloud.wowza.com/app-M89C2272',
  stream_key: 'VVYzeDFr',
};
/**
 *
 * TODO:
 * []- live stream views
 * []-finalize product cart design
 * []- live comments
 * []- getstream integration
 */
const LINEAR_GRADIENT_PROPS = {
  colors: [
    'rgba(60, 60, 60, 1)',
    'rgba(240, 240, 240, 0)',
    'rgba(240, 240, 240, 0)',
    'rgba(60, 60, 60, 1)',
  ],
  locations: [0, 0.1, 0.9, 1],
};
/* live sell */
const initSellLive = opts => {
  const {accessToken} = useContext(AuthContext);
  // console.log('initStreamLive--------------');
  return useMutation(
    values => API(accessToken).post(`sell-live`, values),
    opts,
  );
};

const endSellLive = opts => {
  const {accessToken} = useContext(AuthContext);
  return useMutation(
    values => API(accessToken).get(`sell-live/end`, values),
    opts,
  );
};
/* live sell */

/* live STream */
const initStreamLive = opts => {
  const {accessToken} = useContext(AuthContext);
  // console.log('initStreamLive-------------------');
  return useMutation(values => {
    console.log({values});
    return API(accessToken).post(`livestream`, values);
  }, opts);
};

// const endtStreamLive = opts => {
//   const {accessToken} = useContext(AuthContext);
//   console.log('endtStreamLive-------------------');

//   return useMutation(
//     values => API(accessToken).post(`livestream/end/${values}`),
//     opts,
//   );
// };

/* live STream */

/**
 *
 * @param {{route:RouteProp<any,any>,navigation:StackNavigationProp<any>}} props
 */
export default function LiveScreen({route, navigation}) {
  // console.log(`livestream params`, route?.params?.isSellLive);
  let liveSellingRef = React.useRef();
  const isSellLive = route?.params?.isSellLive || false;
  const [liveStreamPayload, setLiveStreamPayload] = useState({});
  const [toggleProductView, setToggleProductView] = useReducer(s => !s, false);
  const [toggleLiveStream, setToggleLiveStream] = useReducer(s => !s, false);
  const [selectedProd, setSelectedProd] = useState({});

  const [views, setViews] = useState();

  let ws = useRef(new WebSocket('ws://api.geronimolive.com')).current;

  const selectViews = views => {
    setViews(views || 0);
  };

  // const [streamViews, setStreamViews] = useState(0);
  const {
    mutate,
    isLoading,
    isSuccess: isSuccessEndStreamLive,
  } = useStopStream();
  const product = route.params?.selected_products;
  const backHandleRef = useRef(null);
  let location = null;
  /* sell live */

  const [isStreamEnded, setIsStreamEnded] = useState(false);
  const {
    mutate: mutateInitSellLive,
    isLoading: isLoadingSellLive,
    isError: isErrorSellLive,
    isSuccess: isSuccessSellLive,
    error: errorSellLive,
  } = initSellLive({
    onError: err => {
      console.log(
        'isSellLive -> initSellLive error ----------------:>> ',
        err?.response?.data,
      );
    },
    onSuccess: response => {
      ws.send('selllive created');
      console.log('isSellLive successfully --------:>> ');
    },
  });

  const {
    mutate: mutateInitStreamLive,
    isLoading: isLoadingStreamLive,
    isError: isErrorStreamLive,
    isSuccess: isSuccessStreamLive,
    error: errorStreamLive,
  } = initStreamLive({
    onError: err => {
      console.log(
        'isErrorStreamLive error ----------------:>> ',
        err?.response?.data,
      );
    },
    onSuccess: res => {
      ws.send('livestream created');
      console.log(
        'isSuccessStreamLive successfully --------:>> ',
        res?.data?.payload,
      );
      setLiveStreamPayload({
        channel_name: res.data.payload.channelName,
        stream_name: res.data.payload.channelName,
        liveStream_id: res.data.payload.channelName,
        livestream: res.data.payload,
        host_port: null,
        primary_server: null,
        token: res.data.payload.token,
      });
    },
  });

  useEffect(() => {
    ws.onclose = e => {
      setTimeout(() => {
        ws = new WebSocket('ws://api.geronimolive.com');
      }, 4000);
    };
    if (product[0] && !isSuccessSellLive) {
      sellLive();
      liveSellingRef.current = setInterval(sellLive, 60000);
    }
    return () => {
      clearInterval(liveSellingRef.current);
    };
  }, []);

  const sellLive = async () => {
    location = await getLocationPermission();
    // console.log('isSellLive loc successfully --------:>> ', location);

    mutateInitSellLive({product: product?.map(el => el._id), location});
  };

  const streamLive = async () => {
    const formdata = new FormData();
    formdata.append('products', JSON.stringify(product.map(el => el._id)));
    mutateInitStreamLive(formdata);
  };

  useEffect(() => {
    if (toggleLiveStream) {
      streamLive();
    } else if (liveStreamPayload?.livestream?.id) {
      mutate(liveStreamPayload?.livestream?.id);
      ws.send('livestream Ended');
      // mutateEndStreamLive(liveStreamPayload?.livestream?.id);
    }
  }, [toggleLiveStream]);

  const backAction = () => {
    backHandleRef.current();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }, []);

  const ProductViewFn = product => {
    setToggleProductView();
    setSelectedProd(product);
  };

  const closeProductView = () => {
    setToggleProductView();
  };
  function SellLiveBanner() {
    return (
      <View style={tailwind('flex-row justify-between w-full')}>
        {/* <View style={tailwind('flex-row items-center')}>
          <TouchableOpacity style={tailwind('')}>
            <Icon
              type="ionicon"
              color={getColor('white')}
              name="close"
              style={''}
              size={30}
            />
          </TouchableOpacity>
          <Text
            style={tailwind(
              `bg-brand-primary px-2 py-1 text-white font-bold rounded-full`,
            )}>
            {isSuccessSellLive ? 'You are Selling Live' : 'Loading...'}
          </Text>
        </View>
        <View style={tailwind('flex-row items-center justify-center')}>
          <Text
            style={tailwind(
              `bg-brand-primary px-2 py-1 text-white font-bold rounded-full`,
            )}>
            {isSuccessSellLive ? 'You are Streaming Live' : 'Loading...'}
          </Text>
          <TouchableOpacity style={tailwind('')}>
            <Icon
              type="ionicon"
              color={getColor('white')}
              name="close"
              style={''}
              size={30}
            />
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }

  function StreamEndedModal() {
    return (
      <Modal
        isVisible={isStreamEnded}
        style={tailwind('items-center justify-center p-6')}>
        <View
          style={tailwind(
            'bg-white rounded-3xl mt-80 p-4 items-center w-full',
          )}>
          <Text style={tailwind('text-xl justify-center font-bold text-black')}>
            Stream Live Ended.
          </Text>

          <Text
            style={tailwind(
              'text-xl justify-center font-bold text-center text-black',
            )}>
            Do you want to share this video to your social media?
          </Text>

          <Button
            title={'Yes'}
            size={'md'}
            theme={'primary'}
            containerStyle={tailwind('mt-4 w-9/12')}
            onPress={() => {
              // setModalOpen(false);
              // navigation.navigate('ShareStream');
              ToastUpcomingFeature({position: 'top'});
            }}
          />
          <Button
            title={'No, Thanks'}
            size={'md'}
            theme={'black'}
            containerStyle={tailwind('mt-4 w-9/12')}
            onPress={() => {
              // navigation.goBack();
              setIsStreamEnded(false);
              // onEndedStream();
              // toggleLivestreamEnded();
              // navigation.navigate('NotSellingOnGeronimo');
            }}
          />
        </View>
      </Modal>
    );
  }

  return (
    // <SafeAreaView style={tailwind('flex-1 bg-gray-600')}>
    <ImageBackground
      source={require('@/assets/go-live-img.png')}
      style={tailwind('px-3 pt-5')}>
      <View style={tailwind('absolute inset-0 w-full h-full')}>
        {toggleLiveStream && (
          <VideoFeed
            payload={{
              ...liveStreamPayload,
              isHost: true,
              isSellLive,
              selectViews,
            }}
          />
        )}
      </View>
      <View style={tailwind('h-full justify-between pt-5 pb-4')}>
        {/* <LinearGradient
            colors={LINEAR_GRADIENT_PROPS.colors}
            locations={LINEAR_GRADIENT_PROPS.locations}
            style={tailwind('flex-1 absolute inset-0 w-full')}
          /> */}
        {/* <SellLiveBanner /> */}

        <StreamHeader
          isStreamEnded={isStreamEnded}
          setIsStreamEnded={setIsStreamEnded}
          backHandleRef={backHandleRef}
          liveSellingRef={liveSellingRef}
          live_stream={liveStreamPayload}
          isSellLive={isSellLive}
          isLoadingSellLive={isLoadingSellLive}
          isSuccessSellLive={isSuccessSellLive}
          setToggleLiveStream={setToggleLiveStream}
          toggleLiveStream={toggleLiveStream}
          isLoadingStreamLive={isLoadingStreamLive}
          isSuccessStreamLive={isSuccessStreamLive}
          views={views}
        />

        <View style={tailwind('')}>
          <ProductView
            show={toggleProductView}
            onClose={closeProductView}
            product={selectedProd}
          />
          <StreamFooter
            productView={ProductViewFn}
            id={liveStreamPayload?.livestream?.id}
            stream_chat_id={''}
            products={product}
          />
          <StreamEndedModal />
        </View>
      </View>
    </ImageBackground>
    // </SafeAreaView>
  );
}

function StreamFooter({products, id, stream_chat_id, productView}) {
  // console.log(`product view fn,`, productView)
  const [visible, toggle] = useReducer(s => !s, false);
  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }, []);
  return (
    <View style={tailwind('')}>
      {/*<LiveChat channel_cid={stream_chat_id} />*/}
      <FeaturedProducts
        productView={productView}
        products={products}
        show={visible}
      />
      <View style={tailwind('flex-row items-center')}>
        <TouchableOpacity
          onPress={
            toggle
            // productView()
          }>
          <Icon
            type="font-awesome-5"
            name="store"
            containerStyle={tailwind('bg-white self-start p-3 rounded-full')}
            // onPress={toggle}
          />
          <Badge
            value={products?.length || 0}
            badgeStyle={tailwind('bg-brand-primary')}
            containerStyle={tailwind('absolute right-0')}
          />
        </TouchableOpacity>
        <View style={tailwind('flex-1')}>
          <LiveChatInput />
        </View>
      </View>
    </View>
  );
}

function StreamHeader({
  live_stream,
  liveSellingRef,
  backHandleRef,
  isSellLive,
  isLoadingSellLive,
  isSuccessSellLive,
  toggleLiveStream,
  setToggleLiveStream,
  isLoadingStreamLive,
  isSuccessStreamLive,
  setIsStreamEnded,
  isStreamEnded,
  views,
}) {
  const {data: user, isLoading, isSuccess, isError} = useProfile();

  const userInfo = user?.payload?.user;
  const [visible, toggle] = useReducer(s => !s, false);

  const [endStreamModal, toggleEndStreamModal] = useReducer(s => !s, false);
  // const [isStreamEnded, setIsStreamEnded] = useState(false);

  endStreamRef = useRef(null);
  backHandleRef.current = toggle;

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }, []);
  const navigation = useNavigation();

  // if (isStreamEnded) {
  //   return (
  //     <Modal
  //       isVisible={false}
  //       style={tailwind('items-center justify-center p-6')}>
  //       <View
  //         style={tailwind(
  //           'bg-white rounded-3xl mt-80 p-4 items-center w-full',
  //         )}>
  //         <Text style={tailwind('text-xl justify-center font-bold text-black')}>
  //           Stream Live Ended.
  //         </Text>

  //         <Text
  //           style={tailwind(
  //             'text-xl justify-center font-bold text-center text-black',
  //           )}>
  //           Do you want to share this video to your social media?
  //         </Text>

  //         <Button
  //           title={'Yes'}
  //           size={'md'}
  //           theme={'primary'}
  //           containerStyle={tailwind('mt-4 w-9/12')}
  //           onPress={() => {
  //             // setModalOpen(false);
  //             // navigation.navigate('ShareStream');
  //             ToastUpcomingFeature({position: 'top'});
  //           }}
  //         />
  //         <Button
  //           title={'No, Thanks'}
  //           size={'md'}
  //           theme={'black'}
  //           containerStyle={tailwind('mt-4 w-9/12')}
  //           onPress={() => {
  //             // navigation.goBack();
  //             setIsStreamEnded(false);
  //             // onEndedStream();
  //             // toggleLivestreamEnded();
  //             // navigation.navigate('NotSellingOnGeronimo');
  //           }}
  //         />
  //       </View>
  //     </Modal>
  //   );
  // }
  return (
    <View style={tailwind('flex-1 w-full')}>
      {/* two header banners */}
      <View style={tailwind('flex-row justify-between mb-2')}>
        {/* selling Live */}
        <View style={tailwind('flex-row items-center')}>
          <View style={tailwind('rounded-full bg-brand-primary px-2 py-1')}>
            <Text style={tailwind(`text-white text-xs font-bold`)}>
              {isSuccessSellLive ? 'You are Selling Live' : 'Loading...'}
            </Text>
          </View>
          <TouchableOpacity
            style={tailwind('')}
            onPress={() => {
              endStreamRef.current();
              return;
            }}>
            <Icon
              type="ionicon"
              color={getColor('white')}
              name="close"
              style={''}
              size={30}
            />
          </TouchableOpacity>
        </View>
        {/* Streaming Live */}
        <View style={tailwind('flex-row items-center justify-center')}>
          <TouchableOpacity
            onPress={() => {
              if (!isLoadingStreamLive && !toggleLiveStream) {
                setToggleLiveStream();
              }
            }}>
            <View
              style={tailwind(
                `rounded-full px-2 py-1 flex-row justify-center items-center ${
                  toggleLiveStream ? 'bg-brand-primary' : 'border border-white'
                }`,
              )}>
              {!toggleLiveStream && !isLoadingStreamLive && (
                // <View style={tailwind('absolute -top-2')}>
                <Icon type="feather" name="video" color="white" size={20} />
                // </View>
              )}
              <Text style={tailwind(`text-white font-bold text-xs ml-1`)}>
                {toggleLiveStream
                  ? 'You are Streaming Live'
                  : isLoadingStreamLive
                  ? 'Loading...'
                  : 'Add LiveStream'}
              </Text>
            </View>
          </TouchableOpacity>
          {toggleLiveStream && (
            <TouchableOpacity
              style={tailwind('')}
              onPress={() => {
                if (toggleLiveStream) {
                  // setToggleLiveStream();
                  toggleEndStreamModal();
                }
              }}>
              <Icon
                type="ionicon"
                color={getColor('white')}
                name="close"
                style={''}
                size={30}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={tailwind('flex-row')}>
        {/* <View style={tailwind('items-center self-start')}>
          <Image
            rounded
            source={
              userInfo?.profile_pic
                ? {uri: userInfo?.profile_pic?.absolute_path}
                : null
            }
            containerStyle={tailwind('w-16 h-16  rounded-full')}
          />
          <Text
            style={tailwind(
              'text-xs text-white uppercase bg-brand-primary rounded-full py-0\\.5 absolute bottom-0 -mb-2 px-2 font-bold',
            )}>
            Live
          </Text>
        </View> */}
        <View style={tailwind('ml-2 flex-row justify-between flex-1')}>
          <View>
            <Text
              style={{
                ...tailwind('text-sm text-white font-bold'),
              }}>
              {userInfo?.full_name}
            </Text>
            <View style={tailwind('flex-row')}>
              {/* <Text style={tailwind('text-white text-xs')}>
                @{userInfo?.username}
              </Text> */}
              <StreamViews views={views} />
            </View>
          </View>
          <View style={tailwind('flex-row justify-between')}>
            <TouchableOpacity
              // onPress={toggle}
              onPress={() => ToastUpcomingFeature({position: 'bottom'})}>
              <Icon
                type="ionicon"
                name="notifications-outline"
                size={28}
                color={getColor('white')}
              />
            </TouchableOpacity>

            <EndStream
              backHandleRef={backHandleRef}
              liveSellingRef={liveSellingRef}
              onEndedStream={() => {
                // navigation.navigate('Seller Store'); //demo
                navigation.goBack();
                navigation.goBack();
              }}
              navigation={navigation}
              isSellLive={isSellLive}
              id={live_stream?.livestream?.id}
              endStreamRef={endStreamRef}
            />
          </View>
        </View>
      </View>

      {isLoadingStreamLive && !isSuccessStreamLive && (
        <ActivityIndicator
          style={tailwind('absolute inset-0')}
          size="large"
          color={getColor('brand-primary')}
        />
      )}
      <View style={tailwind('flex-1')}>
        {/* <StreamNotifications show={visible} /> */}
      </View>

      <Modal isVisible={endStreamModal}>
        <View
          style={tailwind(
            'p-6 rounded-xl bg-white justify-center items-center rounded-2xl',
          )}>
          <Text
            style={tailwind('text-black text-xl mb-3 text-center font-bold')}>
            Are you sure you want to end this Live Streaming?
          </Text>
          <Button
            onPress={() => {
              setToggleLiveStream();

              setTimeout(() => {
                toggleEndStreamModal();
                // setIsStreamEnded(true);
              }, 200);

              setTimeout(() => {
                setIsStreamEnded(true);
              }, 1000);
            }}
            loading={isLoadingStreamLive}
            theme="primary"
            containerStyle={tailwind('w-1/2 mb-4')}
            title={'Yes'}
          />
          <Button
            onPress={() => {
              setTimeout(() => {
                toggleEndStreamModal();
              }, 200);
            }}
            theme="black"
            containerStyle={tailwind('w-1/2')}
            title="No, Thanks"
          />
        </View>
      </Modal>
    </View>
  );
}

const useStopStream = () => {
  const {accessToken} = useContext(AuthContext);

  return useMutation(id => {
    return API(accessToken)
      .get(`livestream/end/${id}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(
          `Livestream Ending error----------     `,
          JSON.stringify(error?.response?.data),
        );
      });
  });
};

function EndStream({
  onEndedStream = () => {},
  id,
  backHandleRef,
  liveSellingRef,
  navigation,
  endStreamRef,
}) {
  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();

    endStreamRef.current = toggle;
  }, []);

  // const [visible, toggle] = ((s, a) => {
  //   if (typeof a === 'boolean') return a;
  //   return !s;
  // }, false);
  const [visible, toggle] = useReducer(s => !s, false);

  const [livestreamEnded, toggleLivestreamEnded] = useReducer(s => !s, true);

  const {mutateAsync, isLoading} = useStopStream();

  const {
    mutate: mutateEndSellLive,
    isLoading: isLoadingEndSellLive,
    isError: isErrorEndSellLive,
    isSuccess: isSuccessEndSellLive,
  } = endSellLive();

  backHandleRef.current = toggle;

  const onPress = async () => {
    // if (isLoading) return;

    try {
      clearInterval(liveSellingRef.current);
      mutateEndSellLive();
      // toggle();
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
      if (id) {
        await mutateAsync(id);
      }
    } catch (error) {
      console.log('End Stream Errors :>> ', error?.response?.data);
    }
  };

  useEffect(() => {
    const backAction = () => {
      console.log('isLoading :>> ', isLoading);
      if (isLoading) return;
      toggle();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const handler = e => {
      if (!isSuccessEndSellLive) {
        e.preventDefault();
      }
      if (isLoading) return;
      toggle(true);
    };
    if (Platform.OS === 'ios') {
      navigation.addListener('beforeRemove', handler);
    }
    return () => navigation.removeListener('beforeRemove', handler);
  }, [isSuccessEndSellLive]);

  return (
    <View>
      <Modal isVisible={visible}>
        <View
          style={tailwind(
            'p-6 rounded-xl bg-white justify-center items-center',
          )}>
          <Text
            style={tailwind('text-black text-xl mb-3 text-center font-bold')}>
            Are you sure you want to end this Live Selling?
          </Text>
          <Button
            onPress={onPress}
            loading={isLoadingEndSellLive}
            theme="primary"
            containerStyle={tailwind('w-1/2 mb-4')}
            title={isLoadingEndSellLive ? 'Ending Stream' : 'Yes'}
          />
          <Button
            onPress={() => {
              setTimeout(() => {
                toggle();
              }, 200);
            }}
            theme="black"
            containerStyle={tailwind('w-1/2')}
            title="No, Thanks"
          />
        </View>
      </Modal>
      {/* <TouchableOpacity
        style={tailwind('ml-2')}
        onPress={() => {
          toggle();
        }}>
        <Icon
          type="ionicon"
          color={getColor('white')}
          name="close"
          style={''}
          size={28}
        />
      </TouchableOpacity> */}
    </View>
  );
}
