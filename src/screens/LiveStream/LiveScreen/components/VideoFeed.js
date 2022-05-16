import {getColor, tailwind} from '@/common/tailwind';
import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import Button from '@/components/Button';
import {useMutation} from 'react-query';
import wowza from '@/common/services/wowza';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/core';
import {useStreamStatus} from '@/common/hooks/livestream';
import {useModal} from '@/components/Modal';

import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
  ChannelProfile,
  ClientRole,
} from 'react-native-agora';
const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
/**
 *
 * @typedef {{payload:{stream_id:string,stream_name:string,host_port:number,primary_server:string,stream_key:string}}} VideoFeedProps
 */
/**
 *
 * @param {VideoFeedProps} props

 */
export default function VideoFeed({payload = {}}) {
  const [peerId, setPeerId] = useState([]);
  const navigation = useNavigation();
  const [isVisible, toggle] = useModal();
  const isSellLive = payload?.isSellLive || false;
  const [mydata, setMyData] = useState({
    // appId: '022f2eefc5914530a7715eb626bf07a4',
    isHost: payload.isHost,
    appId: '2efd5a06ca084c80927265dc1c584f57',
    channelName: payload?.channel_name,
    token: payload?.token,
    joinSucceed: false,
    peerIds: [],
  });

  useEffect(() => {
    setMyData({
      ...mydata,
      channelName: payload?.channel_name,
      token: payload?.token,
    });
    // init();
    if (payload?.token) {
      // endCall();
      init();
      setTimeout(() => {
        startCall();
      }, 500);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload?.token, payload?.channel_name, payload?.isHost]);
  // }, [payload]);
  useEffect(() => {
    return () => {
      endCall();
    };
  }, []);

  useEffect(() => {
    if (typeof payload.selectViews === 'function') {
      payload?.selectViews(mydata?.peerIds?.length || 0);
    }

    // console.log(
    //   '--------typeof payload?.selectViews ',
    //   typeof payload.selectViews,
    // );

    console.log(
      '----------------------------- selectViews ',
      mydata?.peerIds?.length,
    );
  }, [mydata.peerIds]);

  const init = async () => {
    const {appId} = mydata;
    try {
      const _engine = await RtcEngine.create(appId);
      // Enable the video module.
      await _engine.enableVideo();

      // Set the channel profile as live streaming.
      await _engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
      // Set the usr role as host.
      await _engine.setClientRole(
        mydata.isHost ? ClientRole.Broadcaster : ClientRole.Audience,
      );
      _engine.addListener('Warning', warn => {
        console.log('warn addListener ---------------------------->', warn);
      });
      _engine.addListener('Error', err => {
        console.log(
          'err addListener --------------------------------->',
          JSON.stringify(err),
        );
      });

      // Listen for the UserJoined callback.
      // This callback occurs when the remote user successfully joins the channel.
      _engine.addListener('UserJoined', (uid, elapsed) => {
        // console.log(
        //   '---------------------------------------------------------------------------------',
        // );
        console.log('UserJoined - - - - - ', uid, elapsed);
        const {peerIds} = mydata;
        if (peerIds.indexOf(uid) === -1) {
          setMyData({...mydata, peerIds: [...mydata.peerIds, uid]});
        }
      });

      _engine.addListener('RemoteVideoStats', stats => {
        console.log('RemoteVideoStats Event: ', JSON.stringify(stats));
      });

      _engine.addListener('LocalUserRegistered', (uid, userAccount) => {
        console.log('RemoteVideoStats Event: ', uid, userAccount);
      });

      _engine.addListener('UserInfoUpdated', (uid, userAccount) => {
        console.log('RemoteVideoStats Event: ', uid, userAccount);
      });

      // Listen for the UserOffline callback.
      // This callback occurs when the remote user leaves the channel or drops offline.
      _engine.addListener('UserOffline', (uid, reason) => {
        console.log('UserOffline - - - - - - - ', uid, reason);
        const {peerIds} = mydata;
        setMyData({
          // Remove peer ID from state array
          ...mydata,
          peerIds: peerIds.filter(id => id !== uid),
        });
      });

      // Listen for the JoinChannelSuccess callback.
      // This callback occurs when the local user successfully joins the channel.
      _engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
        console.log(
          'JoinChannelSuccess --------------------- ',
          channel,
          uid,
          elapsed,
        );
        // setPeerId([uid]);
        setMyData({...mydata, joinSucceed: true});
      });
    } catch (err) {
      console.log('Video Feed init catch block, ', JSON.stringify(err));

      // Alert.alert(
      //   'Error!',
      //   'A problem occured with Livestreaming, try again? ',
      //   [
      //     {
      //       text: 'OK',
      //       onPress: () => {
      //         navigation.goBack();
      //       },
      //     },
      //   ],
      // );
    }
  };

  const startCall = async () => {
    const {appId} = mydata;
    try {
      const _engine = await RtcEngine.create(appId);
      await _engine?.joinChannel(payload.token, payload.channel_name, null, 0);
    } catch (err) {
      console.log('Video Feed init catch block, ', JSON.stringify(err));
      // Alert.alert(
      //   'Error!',
      //   'A problem occured with Livestreaming, try again? ',
      //   [
      //     {
      //       text: 'OK',
      //       onPress: () => {
      //         navigation.goBack();
      //       },
      //     },
      //   ],
      // );
    }
  };

  const _renderVideos = () => {
    console.log('peerIds in videos----', mydata?.peerIds?.length);

    const {joinSucceed} = mydata;
    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={payload.channel_name}
          renderMode={VideoRenderMode.Hidden}
        />
      </View>
    ) : null;
  };

  const _renderRemoteVideos = () => {
    const {peerIds, joinSucceed} = mydata;
    // console.log('peerIds in remote videos----', mydata);

    return (
      <View style={styles.remoteContainer}>
        {peerIds.map((value, index, array) => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={payload.channel_name}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={false}
            />
          );
        })}
      </View>
    );
  };

  const endCall = async () => {
    console.log('endCall called -------');
    const {appId} = mydata;
    try {
      const _engine = await RtcEngine.create(appId);
      await _engine?.leaveChannel();
    } catch (error) {
      console.log('- -- --------- EndCall error ', JSON.stringify(error));
    }
    setMyData({...mydata, peerIds: [], joinSucceed: false});
    // navigation.goBack();
  };

  // useEffect(() => {
  //   if (payload?.stream_id && !hasStarted) {
  //     startStream(payload.stream_id, {
  //       onError: err => {
  //         console.log('wowza start stream error :>> ', err?.response?.data);
  //       },
  //       onSuccess: data => {
  //         console.log('wowza start stream sucess :>> ', data);
  //       },
  //     });
  //   }
  // }, [payload?.stream_id, hasStarted]);

  function handleAction(action) {
    toggle(false);
    if (action === 'Share') {
      navigation.replace('ShareStream', {
        previous_screen: 'LiveScreen',
      });
    } else if (action === 'Home') {
      navigation.navigate('HomeScreen');
    }
  }
  return (
    <View style={tailwind('flex-1')}>
      {/* <StreamIntermission
        isVisible={isVisible}
        streamStatus={!mydata.joinSucceed ? 'stopped' : 'starting'}
        onAction={handleAction}
      /> */}
      {/* <NodeCameraView
        style={{width, height}}
        ref={cameraViewRef}
        outputUrl={'rtmp://192.168.0.10/live/stream'}
        camera={config.cameraConfig}
        audio={config.audioConfig}
        video={config.videoConfig}
        onStatus={handleStatus}
      /> */}
      {payload.isHost ? _renderVideos() : _renderRemoteVideos()}

      {/* <View
        style={tailwind(
          'absolute inset-0 flex py-24 px-4 justify-end items-center',
        )}>
        <View style={tailwind('border border-red-500 p-2')}>
          <Text style={tailwind('text-red-500')}>for development only</Text>
          <View
            style={tailwind(
              'flex-row bg-white rounded-full  px-2 items-center self-start',
            )}>
            <View
              style={{
                ...tailwind('h-2 w-2 rounded-full'),
                ...statusCodes[streamStatus].color,
              }}
            />
            <Text style={tailwind('text-sm font-bold ml-2 uppercase')}>
              {statusCodes[streamStatus].description}
            </Text>
          </View>
        </View>
      </View> */}
    </View>
  );
}

/**
 *
 * @param {{streamStatus:StreamState}} props
 * @returns
 */
function StreamIntermission({
  isVisible,
  streamStatus: status,
  onAction = () => {},
}) {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.6}>
      {status === 'stopped' || status === 'stopping' ? (
        <View>
          <View
            style={tailwind(
              'p-4 rounded-xl bg-white justify-center items-center',
            )}>
            <Text
              style={tailwind('text-black text-lg mb-3 text-center font-bold')}>
              Live stream ended. Do You Want To Share This Video To your Social
              Media?
            </Text>
            <Button
              onPress={() => onAction('Share')}
              theme="primary"
              containerStyle={tailwind('w-1/2 mb-4')}
              title="Yes"
            />
            <Button
              onPress={() => onAction('Home')}
              theme="black"
              containerStyle={tailwind('w-1/2')}
              title="No, Thanks"
            />
          </View>
        </View>
      ) : (
        <View>
          <ActivityIndicator size="large" color={getColor('brand-primary')} />
          <Text style={tailwind('text-white text-center text-lg')}>
            Preparing Stream
          </Text>
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  max: {
    flex: 1,
  },
  buttonHolder: {
    height: 100,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0093E9',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
  },
  remoteContainer: {
    width: '100%',
    height: '100%',
    // position: 'absolute',
    // top: 5,
    // right: 0,
    // right: 200,
    // backgroundColor: 'green',
  },
  remote: {
    width: '100%',
    height: '100%',
    // flex: 1,
    marginHorizontal: 2.5,
    zIndex: 10,
    // position: 'absolute',
    // top: 29,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
  fullView: {
    // top: 150,
    width: dimensions.width,
    height: dimensions.height,
  },
});
