import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  ScrollView,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export default function AgoraLive({navigation}) {
  // const _engine = RtcEngine;
  const [mydata, setMyData] = useState({
    // appId: '022f2eefc5914530a7715eb626bf07a4',
    appId: '022f2eefc5914530a7715eb626bf07a4',
    channelName: 'ag1020',
    token:
      '006022f2eefc5914530a7715eb626bf07a4IAAk+fELNwGJwU7LvWr+2jyQfDoQTNoLKmlvGKPRclz5AojILf4AAAAAEAAZVNxrgaieYQEAAQCBqJ5h',
    joinSucceed: false,
    peerIds: [],
  });
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
        startCall();
      });
    }
    init();
    startCall();
  }, []);
  useEffect(() => {
    startCall();
  }, []);

  const init = async () => {
    const {appId} = mydata;
    const _engine = await RtcEngine.create(appId);
    // Enable the video module.
    await _engine.enableVideo();

    // Listen for the UserJoined callback.
    // This callback occurs when the remote user successfully joins the channel.
    _engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      const {peerIds} = mydata;
      if (peerIds.indexOf(uid) === -1) {
        setMyData({...mydata, peerIds: peerIds.push(uid)});
      }
    });

    // Listen for the UserOffline callback.
    // This callback occurs when the remote user leaves the channel or drops offline.
    // _engine.addListener('UserOffline', (uid, reason) => {
    //   console.log('UserOffline', uid, reason);
    //   const {peerIds} = mydata;
    //   setMyData({
    //     // Remove peer ID from state array
    //     peerIds: peerIds.filter(id => id !== uid),
    //   });
    // });

    // Listen for the JoinChannelSuccess callback.
    // This callback occurs when the local user successfully joins the channel.
    _engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      setMyData({
        ...mydata,
        joinSucceed: true,
      });
    });
  };

  const requestCameraAndAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the cameras & mic');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn('Store Live Loc error: ', err);
    }
  };

  const startCall = async () => {
    const {appId} = mydata;
    const _engine = await RtcEngine.create(appId);
    await _engine?.joinChannel(mydata.token, mydata.channelName, null, 0);
  };

  const _renderVideos = () => {
    const {joinSucceed} = mydata;
    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={mydata.channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        {_renderRemoteVideos()}
      </View>
    ) : null;
  };

  const _renderRemoteVideos = () => {
    const {peerIds} = mydata;
    console.log('peerIds ----', mydata);
    return (
      <ScrollView
        style={styles.remoteContainer}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{paddingHorizontal: 2.5}}
        horizontal={true}>
        {peerIds.map((value, index, array) => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={mydata.channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };

  const endCall = async () => {
    const {appId} = mydata;
    const _engine = await RtcEngine.create(appId);
    await _engine?.leaveChannel();
    setMyData({...mydata, peerIds: [], joinSucceed: false});
    navigation.goBack();
  };

  return (
    <View style={styles.max}>
      <View style={styles.max}>
        <View style={styles.buttonHolder}>
          <TouchableOpacity onPress={startCall} style={styles.button}>
            <Text style={styles.buttonText}> Start Call </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => endCall()} style={styles.button}>
            <Text style={styles.buttonText}> End Call </Text>
          </TouchableOpacity>
        </View>
        {_renderVideos()}
      </View>
    </View>
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
  fullView: {
    width: dimensions.width,
    height: dimensions.height - 100,
  },
  remoteContainer: {
    width: '100%',
    height: 150,
    position: 'absolute',
    top: 5,
  },
  remote: {
    width: 150,
    height: 150,
    marginHorizontal: 2.5,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
});
