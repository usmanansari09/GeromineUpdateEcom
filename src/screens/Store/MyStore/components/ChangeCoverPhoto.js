import React, {useContext, useEffect} from 'react';
import {Alert, Platform, TouchableOpacity, View, Image} from 'react-native';
import {useMutation} from 'react-query';
let ImagePicker = require('react-native-image-picker');
import {Icon} from 'react-native-elements';
import Toast from 'react-native-toast-message';

import {Button, Modal, Text} from '@/components/index';
import {AuthContext} from '@/common/contexts/AuthContext';
import API from '@/common/services/API';
import {useProfile} from '@/common/services/hooks';
import {tailwind} from '@/common/tailwind';
import {useModal} from '@/components/Modal';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

/**
 *
 * @param {number} id - id of the store
 */
// const useSetCoverImage = id => {
//   const {accessToken} = useContext(AuthContext);
//   return useMutation(formData =>
//     API(accessToken).post(`api/store/${id}/change-cover`, formData, {
//       headers: {
//         'Content-Type': 'mutipart/form-data',
//       },
//     }),
//   );
// };
const requestPermission = async () => {
  if (Platform.OS !== 'web') {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission required',
        'Sorry, we need camera roll permissions to make this work!',
      );
      return false;
    } else {
      return true;
    }
  }
};

export default function ChangeCoverPhoto({setCoverPhoto}) {
  const {data: user} = useProfile();
  // const [image, setImage] = React.useState('');

  // const {control, errors, handleSubmit, reset: resetForm} = useForm();

  // const {mutate, isLoading, isSuccess, isError} = useSetCoverImage(
  //   user?.store_id,
  // );

  const navigation = useNavigation();
  const [image, setImage] = React.useState(
    {uri: user?.payload?.user?.cover_pic?.absolute_path} || {},
  );
  const [isVisible, toggle] = useModal();
  const options = {
    title: 'Select Avatar',
    quality: 1,
    maxWidth: 250,
    maxHeight: 250,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const pickImage = async () => {
    Alert.alert('Please Select', '', [
      {
        text: 'Camera',
        onPress: () => {
          openCamera();
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          openGallery();
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancle presed'),
      },
    ]);
  };
  const openGallery = async () => {
    ImagePicker.launchImageLibrary(options, response => {
      console.log('========> response', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        selectImage({uri: response?.assets[0]});
      }
    });
  };
  const openCamera = async () => {
    await ImagePicker.launchCamera(
      {
        mediaTypes: 'photo',
        aspect: [4, 3],
        quality: 1,
      },
      result => {
        console.log('camera result is ', result);
        if (result.didCancel === true) {
          return null;
        } else {
          selectImage({uri: result?.assets[0]});
        }
      },
    );
  };

  const selectImage = image => {
    console.log('image is', image);
    //////photo gallery//////
    if (image?.image) {
      setImage({uri: image.image});
      setCoverPhoto({image: image.image});
    } else if (image?.uri) {
      //////camera/gallery//////
      setImage({uri: image.uri.uri});
      setCoverPhoto({uri: image.uri});
    } else {
      setImage('');
    }
    console.log('select image', image);
  };

  return (
    <View style={tailwind('flex-1')}>
      <Text style={tailwind('font-black text-lg px-6')}>Cover Photo</Text>
      <Text style={[tailwind('text-gray-800 mt-4 px-6'), {fontSize: 16}]}>
        Click the photo below to update your cover photo.
      </Text>
      <View style={tailwind('z-50 items-center mt-2 mb-8')}>
        <TouchableOpacity
          // onPress={pickImage}
          onPress={toggle}
          style={tailwind('bg-white rounded w-28 h-28 border border-gray-300')}>
          <View style={tailwind('absolute top-0 right-0 z-50 -mt-1')}>
            <Icon
              name="camera"
              type="ionicon"
              style={tailwind('text-xl p-1')}
            />
          </View>
          {image?.uri ? (
            <Image
              source={{uri: image.uri}}
              style={tailwind('w-full h-full')}
            />
          ) : (
            <View style={tailwind('items-center justify-center h-full -mt-1')}>
              <Icon
                name="ios-person-circle-sharp"
                type="ionicon"
                size={100}
                style={tailwind('text-black')}
              />
              <Text style={tailwind('text-black text-sm font-bold -mt-2')}>
                Upload Picture
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <Modal isVisible={isVisible} onClose={toggle} closeButton={true}>
          <Text
            style={tailwind('text-black text-xl mb-6 text-center font-bold')}>
            Choose your store cover photo
          </Text>
          <Button
            onPress={() => {
              toggle();
              pickImage();
            }}
            title="Take New Photo"
            containerStyle={tailwind('mb-4')}
            theme="primary"
          />
          <Button
            onPress={() => {
              toggle();
              navigation.navigate('PhotoGallery', {
                selectImage: selectImage,
                type: 'cover',
              });
            }}
            title="Select Existing Photo On Geronimo"
            theme="primary"
          />
        </Modal>
      </View>
    </View>
  );
}
