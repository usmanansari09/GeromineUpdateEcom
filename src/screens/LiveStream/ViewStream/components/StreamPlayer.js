import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Dimensions, BackHandler, Platform} from 'react-native';
import {NodePlayerView} from 'react-native-nodemediaclient';

import {getColor, tailwind} from '@/common/tailwind';
import {ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

const statusCodes = {
  1000: {
    color: tailwind('bg-yellow-300'),
    description: 'Connecting',
  },
  1001: {
    color: tailwind('bg-green-500'),
    description: 'Streaming',
  },
  1101: {
    color: tailwind('bg-yellow-500'),
    description: 'Buffering',
  },
  1100: {
    color: tailwind('bg-yellow-500'),
    description: 'Buffering',
  },
  1102: {
    color: tailwind('bg-green-500'),
    description: 'Playing',
  },
  1104: {
    color: tailwind('bg-green-500'),
    description: 'Playing',
  },
  1004: {
    color: tailwind('bg-red-500'),
    description: 'Stopped',
  },
  1234: {
    color: tailwind('bg-yellow-500'),
    description: 'Paused',
  },
};

export default function StreamPlayer({url = ''}) {
  const navigation = useNavigation();
  const playerViewRef = useRef(null);
  const [streamStatus, setStreamStatus] = useState(2004);
  const isBuffering =
    streamStatus === 1000 || streamStatus === 1101 || streamStatus === 1100;
  useEffect(() => {
    console.log('url :>> ', url);
    if (url) {
      playerViewRef.current?.start();
    } else {
      playerViewRef.current?.stop();
    }
  }, [url]);

  function handleStatus(code, msg) {
    console.log(`statusCode:${code} message=${msg}`);
    setStreamStatus(code);
  }
  useEffect(() => {
    const backAction = () => {
      playerViewRef.current?.stop();
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const handler = e => {
      playerViewRef.current?.stop();
      return;
    };
    if (Platform.OS === 'ios') {
      navigation.addListener('beforeRemove', handler);
    }
    return () => navigation.removeListener('beforeRemove', handler);
  }, []);

  return (
    <View style={tailwind('flex-1')}>
      {!url || isBuffering ? (
        <View
          style={tailwind(
            'flex-1 items-center justify-center absolute inset-0 z-10',
          )}>
          <ActivityIndicator size="large" color={getColor('brand-primary')} />
        </View>
      ) : null}
      <NodePlayerView
        style={{height, width}}
        ref={playerViewRef}
        inputUrl={url}
        scaleMode={'ScaleAspectFill'}
        renderType={'SURFACEVIEW'}
        bufferTime={300}
        maxBufferTime={1000}
        onStatus={handleStatus}
      />

      {/* <View
                style={tailwind(
                    "absolute inset-0 flex py-24 px-4 justify-end "
                )}
            >
                <View style={tailwind(" border-2 border-red-500 p-2")}>
                    <Text style={tailwind("text-red-500 font-bold mb-4")}>
                        For Development Purposes Only
                    </Text>
                    <View
                        style={tailwind(
                            "flex-row bg-white rounded-full  px-2 items-center self-start"
                        )}
                    >
                        <View
                            style={{
                                ...tailwind("h-2 w-2 rounded-full"),
                                ...(statusCodes[streamStatus]?.color ||
                                    tailwind("bg-yellow-300")),
                            }}
                        />
                        <Text
                            style={tailwind("text-sm font-bold ml-2 uppercase")}
                        >
                            {statusCodes[streamStatus]?.description ||
                                "Loading"}
                        </Text>
                    </View>
                </View>
            </View> */}
    </View>
  );
}
