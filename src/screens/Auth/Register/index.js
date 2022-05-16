import React, {
  useEffect,
  useRef,
  useState,
  LegacyRef,
  useLayoutEffect,
} from 'react';
import {View, Text, Switch, TouchableOpacity, Alert} from 'react-native';
import {Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
// import * as ImagePicker from 'expo-image-picker';
// import ImagePicker from 'react-native-image-picker';
import {AxiosError} from 'axios';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import schema from './registerSchema';

import {Button, Input, Modal} from '@/components/index';
import GImage from '@/assets/G.png';
import API from '@/common/services/API';
import {getColor, tailwind} from '@/common/tailwind';
import useUpdateEffect from '@/common/hooks/useUpdateEffect';
import BirthDate from './components/DateOfBirth';
import {useMutation, UseMutationOptions} from 'react-query';
import axios, {AxiosInstance} from 'axios';
import useAuthStore from '@/common/stores/useAuthStore';
import {ScrollView} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useModal} from '@/components/Modal';
/**
 *
 * @param {UseMutationOptions} opts
 * @returns
 */
const ImagePicker = require('react-native-image-picker');
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const useRegisterAccount = setErrorMessages => {
  return useMutation(formData => {
    console.log('formdata is', formData);
    axios
      .post('http://geronimo-api.winterwind.com/api/registration', formData, {
        Accept: 'application/json',
      })
      .then(function (response) {
        console.log('response', response);
        setLoginData(response?.data?.token, response?.data?.user_id);
      })
      .catch(function (error) {
        console.log('error is', error);
        let serverValidationErrors = error?.response.data?.errors;
        // console.log(`serverValidationErrors`, serverValidationErrors);
        let fieldErrors = [];
        if (serverValidationErrors) {
          for (const [key, value] of Object.entries(serverValidationErrors)) {
            fieldErrors.push(value[0]);
          }
        }
        setErrorMessages(fieldErrors);
        console.log('errors are', fieldErrors);
      });
  });
};

export default function Register({navigation, route}) {
  const [form, setform] = useState({
    full_name: '',
    password: '',
    retPass: '',
    // username: '',
    email: '',
    // phone: '',
    // address: '',
    // state: '',
    // zip_code: '',
    // country: '',
    // image: '',
    // profile_visibility: true,
    // 'file[]': null,
  });

  const {control, errors, handleSubmit} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  /**
   * @type {LegacyRef<KeyboardAwareScrollView>}
   */

  const scrollViewRef = useRef(null);
  const [isLoading, setisLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);
  const setLoginData = useAuthStore(s => s.login);
  const setPersonId = useAuthStore(s => s.personId);

  function registerAccount(values) {
    console.log('values are====>', values);
    // setisLoading(false);

    // if (isLoading) return;
    // setErrorMessages(null);
    if (
      values.full_name &&
      // values.username &&
      values.email &&
      values.password
    ) {
      setisLoading(true);

      let formData = new FormData();
      Object.entries(values).map(([key, value]) => formData.append(key, value));
      console.log('form data is', formData);
      API()
        .post('auth/register', formData)
        .then(function (response) {
          console.log('Auth Register response', response);
          if (response.status) {
            // navigation.replace('HomeScreen');

            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'HomeScreen'}],
              }),
            );
            setLoginData(response?.data?.payload?.Authorization);
            setPersonId(response?.data?.payload?.Person?._id);
          }
          setisLoading(false);

          // Alert.alert('Alert', response);
        })
        .catch(reason => {
          console.log(`auth\register Error`, JSON.stringify(reason));
          if (reason.response.status === 400) {
            alert(reason.response.data.message);
          }
          setisLoading(false);
        });
    } else {
      alert('All fields are required');
    }
  }

  selectImage = image => {
    image
      ? setform({...form, image: image?.image, 'file[]': null})
      : setform({...form, image: ''});
    console.log('select image', image?.image);
    console.log('form image', form?.image);
  };

  return (
    <KeyboardAwareScrollView
      bounces={false}
      ref={scrollViewRef}
      style={tailwind('')}
      contentContainerStyle={[tailwind('bg-black flex '), {flex: 1}]}>
      <View style={tailwind('absolute -mt-14 -mr-3 right-0 bg-black')}>
        <Image
          source={GImage}
          style={{
            width: 100,
            height: 290,
          }}
          resizeMode="contain"
        />
      </View>
      <View style={tailwind('flex-row items-center pb-10 mt-14 px-6')}>
        {navigation.canGoBack() && (
          <Icon
            type="ionicon"
            name="arrow-back"
            color="white"
            size={32}
            onPress={() => navigation.canGoBack() && navigation.goBack()}
          />
        )}

        <Text style={tailwind('text-white text-2xl font-bold uppercase')}>
          Register
        </Text>
      </View>
      <View style={tailwind('flex-1  px-6  pb-16')}>
        <Controller
          control={control}
          render={({onBlur, onChange, value}) => (
            <Input
              label="Name"
              type="underline"
              clear
              // onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              autoCapitalize="none"
              inputStyle={tailwind('font-normal text-gray-400')}
              errorMessage={
                form.full_name?.length < 3 && form.full_name?.length !== 0
                  ? 'Invalid Full Name'
                  : null
              }
              onChangeText={text => setform({...form, full_name: text})}
            />
          )}
          name="full_name"
          defaultValue=""
        />
        <Controller
          control={control}
          render={({onBlur, onChange, value}) => (
            <Input
              label="Username"
              // onChangeText={onChange}
              type="underline"
              onBlur={onBlur}
              value={value}
              autoCapitalize="none"
              inputStyle={tailwind('font-normal text-gray-400')}
              errorMessage={
                form.username?.length < 3 && form.username?.length !== 0
                  ? 'Invalid Username'
                  : null
              }
              onChangeText={text => setform({...form, username: text})}
            />
          )}
          name="username"
          defaultValue=""
        />
        {/* <Controller
          control={control}
          render={({onBlur, onChange, value}) => (
            <BirthDate
              onChange={onChange}
              onBlur={onBlur}
              error={errors?.date_of_birth?.message}
            />
          )}
          name="date_of_birth"
          defaultValue=""
        />*/}
        <Controller
          control={control}
          render={({onBlur, onChange, value}) => (
            <Input
              type="underline"
              label="Email"
              // onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              inputStyle={tailwind('font-normal text-gray-400')}
              keyboardType="email-address"
              autoCapitalize="none"
              errorMessage={
                !/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/.test(
                  form.email,
                ) && form.email?.length !== 0
                  ? 'Invalid Email'
                  : null
              }
              onChangeText={text => setform({...form, email: text})}
            />
          )}
          name="email"
          defaultValue=""
        />
        {/* <Controller
          control={control}
          render={({onBlur, onChange, value}) => (
            <Input
              type="underline"
              label="Phone Number"
              // onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              keyboardType="phone-pad"
              inputStyle={tailwind('font-normal text-gray-400')}
              errorMessage={
                !/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(
                  form.phone,
                ) && form.phone?.length !== 0
                  ? 'Invalid Phone'
                  : null
              }
              onChangeText={text => setform({...form, phone: text})}
            />
          )}
          name="phone"
          defaultValue=""
        /> */}

        {/* <Controller
          control={control}
          render={({onBlur, onChange, value}) => (
            <Input
              type="underline"
              label="Address"
              // onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              inputStyle={tailwind('font-normal text-gray-400')}
              errorMessage={
                form.address?.length < 3 && form.address?.length !== 0
                  ? 'Invalid Address'
                  : null
              }
              onChangeText={text => setform({...form, address: text})}
            />
          )}
          name="address"
          defaultValue=""
        /> */}
        {/* <Controller
          control={control}
          render={({onBlur, onChange, value}) => (
            <Input
              type="underline"
              label="State"
              // onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              inputStyle={tailwind('font-normal text-gray-400')}
              errorMessage={
                form.state?.length < 2 && form.state?.length !== 0
                  ? 'Invalid State'
                  : null
              }
              onChangeText={text => setform({...form, state: text})}
            />
          )}
          name="state"
          defaultValue=""
        /> */}
        {/* <Controller
          control={control}
          render={({onBlur, onChange, value}) => (
            <Input
              type="underline"
              label="Zip Code"
              keyboardType={'numeric'}
              inputStyle={tailwind('font-normal text-gray-400')}
              // onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              // errorMessage={
              //   form.zip_code?.length === 0
              //     ? 'Invalid Zip Code'
              //     : null
              // }
              onChangeText={text => setform({...form, zip_code: text})}
            />
          )}
          name="zip_code"
          defaultValue=""
        /> */}
        {/* <Controller
          control={control}
          render={({onBlur, onChange, value}) => (
            <Input
              type="underline"
              label="Country"
              // onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              inputStyle={tailwind('font-normal text-gray-400')}
              errorMessage={
                form.country?.length < 2 && form.country?.length !== 0
                  ? 'Invalid Country'
                  : null
              }
              onChangeText={text => setform({...form, country: text})}
            />
          )}
          name="country"
          defaultValue=""
        /> */}

        <Controller
          control={control}
          render={({onBlur, onChange, value}) => (
            <Input
              type="underline"
              label="Password"
              mode="password"
              // onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              inputStyle={tailwind('font-normal text-gray-400')}
              autoCapitalize="none"
              errorMessage={
                form.password?.length < 6 && form.password?.length !== 0
                  ? 'Invalid Password'
                  : null
              }
              onChangeText={text => setform({...form, password: text})}
            />
          )}
          name="password"
          defaultValue=""
        />
        <Controller
          control={control}
          render={({onBlur, onChange, value}) => (
            <Input
              label="Retype Password"
              type="underline"
              mode="password"
              inputStyle={tailwind('font-normal text-gray-400')}
              // onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              errorMessage={
                form.retPass?.length < 6 && form.retPass?.length !== 0
                  ? 'Please make sure your passwords match'
                  : null
              }
              onChangeText={text => setform({...form, retPass: text})}
            />
          )}
          name="confirmedPassword"
          defaultValue=""
        />
        {/* <Controller
          control={control}
          render={({onBlur, onChange, value}) => (
            <Visibility
              onChange={changedValue => {
                // console.log(`form on profile visibility: `, form);
                setform({
                  ...form,
                  profile_visibility: changedValue,
                });
              }}
              onBlur={onBlur}
              error={errors?.profile_visibility?.message}
              value={form.profile_visibility}
            />
          )}
          name="profile_visibility"
          defaultValue={true}
        /> */}
        {/* <Controller
          control={control}
          render={({onBlur, onChange}) => (
            <ProfilePhoto
              preSelectImages={form?.image}
              selectImage={selectImage}
              onChange={imageRes => {
                setform({
                  ...form,
                  'file[]': {
                    uri: imageRes.uri,
                    name: 'photo.jpg',
                    type: imageRes.type,
                  },
                });
              }}
              onBlur={onBlur}
              error={errors?.image?.message}
            />
          )}
          name="image"
          defaultValue={{}}
        /> */}
        {errorMessages !== null && (
          <Text style={tailwind('text-red-500 text-sm')}>{errorMessages}</Text>
        )}
        <View style={tailwind('items-center')}>
          <Button
            theme="primary"
            title={'Sign Up'}
            size={'md'}
            loading={isLoading}
            containerStyle={tailwind('w-40 mt-7')}
            onPress={() => registerAccount(form)}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

/**
 *
 * @param {{onBlur:Function,onChange:Function,error:string}} props
 */
function Visibility({onChange, onBlur, error, value}) {
  const [isEnabled, setIsEnabled] = useState(!!value);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    onChange(!!isEnabled);
  }, [isEnabled]);

  return (
    <View>
      <View style={tailwind('flex-row mt-6 items-center justify-between')}>
        <Text style={tailwind('text-base text-gray-400 font-bold')}>
          Profile Visibility
        </Text>
        <Switch
          trackColor={{
            false: '#767577',
            true: getColor('pink-500'),
          }}
          thumbColor={getColor('white')}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      {error !== undefined && <Text>{error}</Text>}
    </View>
  );
}
/**
 * @param {{navigation:StackNavigationProp<any>}} props
 */
function ProfilePhoto({onBlur, onChange, error, selectImage, preSelectImages}) {
  console.log('preselect', preSelectImages);
  console.log('image inpp', image);
  useEffect(() => {
    if (preSelectImages) {
      setImage({});
      console.log('useeffecccttttttttttttttt');
    }
    console.log('images', image);
  }, [preSelectImages]);

  const navigation = useNavigation();
  const [image, setImage] = useState({});
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
        const source = {uri: response?.assets[0]?.uri};
        selectImage();
        setImage(response?.assets[0]);
        onChange(response?.assets[0]);
        console.log('source', source?.uri);
      }
    });
  };
  const openCamera = async () => {
    await launchCamera(
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
          selectImage();
          setImage(result.assets[0]);
          onChange(result.assets[0]);
        }
      },
    );
  };
  // setImage(imageUri ? {uri: imageUri, name: filename, type} : null);

  return (
    <View style={tailwind('items-center mt-5')}>
      <TouchableOpacity
        onPress={pickImage}
        // onPress={toggle}
        style={tailwind('bg-white rounded-full overflow-hidden w-40 h-40')}>
        {image?.uri ? (
          <Image source={{uri: image.uri}} style={tailwind('w-full h-full')} />
        ) : preSelectImages ? (
          <Image
            source={{uri: preSelectImages}}
            style={tailwind('w-full h-full')}
          />
        ) : (
          <View style={tailwind('items-center justify-center h-full')}>
            <Icon
              name="ios-person-circle-sharp"
              size={100}
              style={[tailwind('text-black'), {left: 3.5}]}
            />
            <Text style={tailwind('text-black text-sm font-bold -mt-2')}>
              Upload Picture
            </Text>
          </View>
        )}
      </TouchableOpacity>
      {/* <Modal
        isVisible={isVisible}
        onClose={toggle}
        onBackButtonPress={toggle}
        onBackdropPress={toggle}>
        <Text style={tailwind('text-black text-xl mb-4 text-center font-bold')}>
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
              multiSelect: false,
              selectImage,
            });
          }}
          title="Select Existing Photo On Geronimo"
          theme="primary"
        />
      </Modal> */}
      {error !== undefined && (
        <Text style={tailwind('text-red-500 text-sm')}>{error}</Text>
      )}
    </View>
  );
}
