import {tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
// import {Video} from 'expo-av';
import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ViewVideo() {
  return (
    <View style={tailwind('flex-1 ')}>
      <VideoPlayer />
      <View style={tailwind('absolute bottom-0 inset-x-0  flex-row p-5')}>
        <Button
          theme={'primary'}
          size="md"
          title="Post again"
          containerStyle={tailwind('flex-1')}
        />
        <Button
          theme={'primary'}
          size="md"
          title="Share"
          containerStyle={tailwind('flex-1 ml-2')}
        />
      </View>
    </View>
  );
}
function VideoPlayer() {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [showControls, setShowControls] = useState(true);
  return (
    <View style={tailwind('flex-1')}>
      {/* <Video
        style={tailwind('h-full')}
        ref={video}
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        resizeMode={Video.RESIZE_MODE_COVER}
        useNativeControls={false}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      /> */}

      <View
        style={tailwind('absolute inset-0 items-center justify-center')}
        onTouchEndCapture={() => setShowControls(prev => !prev)}>
        <Text>{showControls ? 'Has Controls' : 'No Controls'}</Text>
        {status.isPlaying ? (
          <Icon
            accessibilityLabel="Play Video"
            name="pause-circle-outline"
            size={80}
            style={tailwind('text-white')}
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          />
        ) : (
          <Icon
            accessibilityLabel="Play Video"
            name="play-circle-outline"
            size={80}
            style={tailwind('text-white')}
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          />
        )}
      </View>
    </View>
  );
}
