import {getColor, tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import Modal from 'react-native-modal';
// import {Camera, CameraCapturedPicture} from 'expo-camera';
export default function CaptureDisplayPhoto({route}) {
  const [showCamera, setShowCamera] = useState(true);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  return (
    <View style={tailwind('flex-1 p-6 bg-gray-100')}>
      <View>
        {capturedPhoto?.uri !== undefined && (
          <Image
            source={{uri: capturedPhoto.uri}}
            style={tailwind('h-52 mb-4 w-full  rounded-lg')}
          />
        )}

        <Button title="Save" size="md" theme="primary" />
      </View>
      <Modal
        isVisible={showCamera}
        style={tailwind('m-0')}
        onBackButtonPress={() => setShowCamera(false)}>
        <View style={tailwind('bg-white flex-1')}>
          <DisplayCamera
            onCapturedPhoto={photo => {
              setCapturedPhoto(photo);
              setShowCamera(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
}
function DisplayCamera({onCapturedPhoto = () => {}}) {
  const [hasPermission, setHasPermission] = useState(null);
  //   const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef();
  useEffect(() => {
    (async () => {
      //   const {status} = await Camera.requestPermissionsAsync();
      //   setHasPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      /**
       * @type {CameraCapturedPicture}
       */
      let photo = await cameraRef.current.takePictureAsync();

      let filename = photo.uri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      onCapturedPhoto({uri: photo.uri, name: filename, type});
    }
  };
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={tailwind('flex-1')}>
      {/* <Camera
        ref={cameraRef}
        style={tailwind('flex-1')}
        type={type}
        autoFocus={Camera.Constants.AutoFocus.on}>
        <View style={tailwind('self-end justify-between flex-1 p-6 w-full')}>
          <Icon
            containerStyle={tailwind('self-end')}
            name="camera-reverse-outline"
            type="ionicon"
            size={32}
            color={getColor('white')}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          />
          <TouchableOpacity
            onPress={takePhoto}
            style={tailwind('items-center justify-center w-full')}>
            <View
              style={tailwind('w-16 h-16 flex-shrink-0 rounded-full bg-white')}
            />
          </TouchableOpacity>
        </View>
      </Camera> */}
    </View>
  );
}
