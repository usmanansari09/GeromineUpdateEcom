import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import * as ImagePicker from 'expo-image-picker';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Toast from 'react-native-toast-message';
import {Image} from 'react-native-elements';
import {useMutation, UseMutationOptions} from 'react-query';

import StackHeader from '@/components/StackHeader';
import {tailwind} from '@/common/tailwind';
import Select from '@/components/Select/v2';
import schema from './editProfileSchema';
import useUpdateEffect from '@/common/hooks/useUpdateEffect';
import {useProfile} from '@/common/services/hooks';
import {AuthContext} from '@/common/contexts/AuthContext';
import {getS3Image} from '@/common/helpers';
import API from '@/common/services/API';
import {useVisibeScreen} from '@/common/hooks';
import {Modal, Text, Input} from '@/components/index';

/**
 *
 * TODO:
 * -Prevent going back when profile is still saving
 * -show modal to cancel save profile when user closes app
 */

const useEditProfile =
  /**
   * @param {UseMutationOptions} opts
   */
  opts => {
    const {accessToken, userId} = useContext(AuthContext);
    return useMutation(
      formData =>
        API(accessToken)
          .post(`profile/${userId}/update`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(res => res.data),
      opts,
    );
  };
/**
 *
 * @param {{navigation:StackNavigationProp<any>}} props
 */
export default function EditProfile({navigation}) {
  const {control, errors, handleSubmit, reset} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const {userId} = useContext(AuthContext);
  const {
    data: userData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useProfile(userId);
  const scrollViewRef = useRef();
  const {
    dimensions: {height},
    onLayout,
  } = useVisibeScreen();

  const {
    mutate,
    isLoading: isSavingProfile,
    isSuccess: isProfileSaved,
    isError: isProfileEditError,
  } = useEditProfile({
    onError: err => {
      scrollViewRef.current?.scrollToPosition(0, 0);
      Toast.show({
        type: 'error',
        text1: 'Failed to save profile, try again',
      });
    },
    onSuccess: response => {
      Toast.show({text1: response?.data?.message || 'Profile Updated'});
    },
  });

  useEffect(() => {
    if (isSuccess) {
      reset({
        ...userData,
        image: userData?.image
          ? {
              uri: getS3Image(userData?.image),
              filename:
                userData.image.split('/')[userData.image.split('/').length - 1],
              type: 'image',
            }
          : null,
        phone: userData.phone_number,
      });
    }
  }, [isSuccess, userData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => (
        <StackHeader
          {...props}
          headerRight={() => (
            <SaveProfile
              onPress={handleSubmit(saveProfile, err => {
                console.log('err :>> ', err);
              })}
            />
          )}
        />
      ),
    });
  }, [navigation]);
  function saveProfile(values) {
    if (isSavingProfile) return;

    const formData = new FormData();
    formData.append('_method', 'PUT');
    for (let [key, value] of Object.entries(values)) {
      if (key !== 'username') {
        formData.append(key, value);
      }
    }
    // formData.getParts().map((item) => console.log("item :>> ", item));
    mutate(formData);
  }
  return (
    <View onLayout={onLayout} style={tailwind('flex-1')}>
      <Modal></Modal>
      {isSavingProfile && (
        <View
          style={tailwind(
            'absolute top-0 inset-x-0 bg-yellow-300 px-4 py-2 z-50',
          )}>
          <Text style={tailwind('text-yellow-800 text-center font-bold')}>
            Saving Profile
          </Text>
        </View>
      )}

      <View
        ref={scrollViewRef}
        style={tailwind('bg-gray-100 flex-1')}
        contentContainerStyle={tailwind('px-8 py-6')}>
        {isError && (
          <View style={tailwind('bg-red-500 rounded-lg p-3 mb-4')}>
            <Text style={tailwind('text-white text-sm')}>{`${error}`}</Text>
          </View>
        )}
        <Text style={tailwind('text-black font-bold text-lg')}>
          User Details
        </Text>
        <View>
          <View>
            <Text style={tailwind('text-gray-400 absolute right-0 top-0')}>
              You cannot change your username
            </Text>
            <Controller
              control={control}
              name="username"
              defaultValue={''}
              render={({value}) => (
                <Input
                  label="Username"
                  theme="secondary"
                  clear={true}
                  type="underline"
                  value={value}
                  editable={false}
                />
              )}
            />
          </View>
          <Controller
            control={control}
            name="email"
            defaultValue={''}
            render={({onBlur, onChange, value}) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                theme="secondary"
                clear={true}
                type="underline"
                label="Email"
                value={value}
                errorMessage={errors?.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            defaultValue={''}
            render={({value}) => (
              <Input
                label="Password"
                theme="secondary"
                clear={true}
                type="underline"
                value={value}
                mode="password"
              />
            )}
          />
        </View>
        <Text style={tailwind('text-black font-bold text-lg')}>About Me</Text>
        <View>
          <Controller
            control={control}
            name="image"
            defaultValue={null}
            render={({onBlur, onChange, value}) => (
              <ProfilePhoto
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={errors?.image?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="full_name"
            defaultValue={''}
            render={({onBlur, onChange, value}) => (
              <Input
                onChangeText={onChange}
                inputContainerStyle={tailwind('pr-24 ')}
                onBlur={onBlur}
                label="Full Name"
                value={value}
                theme="secondary"
                clear={true}
                type="underline"
                errorMessage={errors?.fullName?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            defaultValue={''}
            render={({onBlur, onChange, value}) => {
              return (
                <Input
                  onChangeText={onChange}
                  onBlur={onBlur}
                  label="Phone Number"
                  value={value}
                  theme="secondary"
                  clear={true}
                  type="underline"
                  errorMessage={errors?.phone?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="interest"
            defaultValue=""
            render={({onBlur, onChange, value}) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                label="Interest"
                value={value}
                theme="secondary"
                clear={true}
                type="underline"
                errorMessage={errors?.interest?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="country"
            defaultValue=""
            render={({onBlur, onChange, value}) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                label="Country"
                value={value}
                theme="secondary"
                clear={true}
                type="underline"
                editable={false}
                errorMessage={errors?.country?.message}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
}
function SaveProfile({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="checkmark-outline" size={32} style={tailwind('text-white')} />
    </TouchableOpacity>
  );
}
function ProfilePhoto({onBlur, onChange, error, value}) {
  const [image, setImage] = useState({uri: '', filename: '', type: ''});

  useUpdateEffect(() => {
    onChange(image);
    onBlur();
  }, [image]);

  const requestPermission = async () => {
    // if (Platform.OS !== 'web') {
    //   const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //   if (status !== 'granted') {
    //     alert('Sorry, we need camera roll permissions to make this work!');
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }
  };

  const pickImage = async () => {
    const permissionGranted = await requestPermission();
    if (!permissionGranted) return;

    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    // const imageUri = !result.cancelled ? result.uri : '';
    // let filename = imageUri.split('/').pop();
    // let match = /\.(\w+)$/.exec(filename);
    // let type = match ? `image/${match[1]}` : `image`;
    // setImage(imageUri ? {uri: imageUri, name: filename, type} : null);
  };
  return (
    <View
      style={{
        ...tailwind(
          'absolute bg-white z-20 right-0 items-center justify-center border-2 border-gray-300 w-20 h-20',
        ),
        ...tailwind(`${error ? 'border-red-500' : ''}`),
      }}>
      <TouchableOpacity onPress={pickImage}>
        {value?.uri ? (
          <Image
            source={{uri: value.uri}}
            style={tailwind('w-16 h-16')}
            containerStyle={tailwind('rounded-full bg-red-500')}
          />
        ) : (
          <Icon
            name="person-circle-outline"
            size={64}
            style={tailwind('text-black ')}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
function Country({onChange, onBlur, error}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  return (
    <View>
      <Select
        onOpen={() => setPickerOpen(true)}
        onClose={() => {
          setPickerOpen(false);
          onBlur();
        }}
        onValueChange={item => onChange(item.value)}
        items={[
          {label: 'USA', value: 1},
          {label: 'Europe', value: 2},
          {label: 'Asia', value: 3},
        ]}
        label="Country"
        errorMessage={error}
      />

      {pickerOpen && <View style={{height: i60}} />}
    </View>
  );
}
