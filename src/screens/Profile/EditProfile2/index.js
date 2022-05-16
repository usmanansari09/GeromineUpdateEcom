import {getColor, tailwind} from '@/common/tailwind';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  Dimensions,
  Alert,
  Switch,
} from 'react-native';
import {Image} from 'react-native-elements';
import {
  RouteProp,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import Input from '@/components/Input2';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import * as ImagePicker from 'expo-image-picker';
import Button from '@/components/Button';
// import schema from './editProductSchema';
import {useForm, Controller} from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RouteProp, useIsFocused } from '@react-navigation/native';
// import { useQuery } from 'react-query';
import API from '@/common/services/API';
import {AuthContext} from '@/common/contexts/AuthContext';
// import { getS3Image } from '@/common/helpers';
// import { setDisplayName } from 'recompose';
import Axios from 'axios';
import Modal from '@/components/Modal';
import {DialogBoxModal} from '@/components/DialogBox';
import {useProfile} from '@/common/services/hooks';
import {useMutation} from 'react-query';
// const { width, height } = Dimensions.get('screen');
var ImagePicker = require('react-native-image-picker');

export default function EditProfile({navigation, route}) {
  const {accessToken} = useContext(AuthContext);
  // const {id} = route.params;
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [interest, setInterest] = useState('');
  const [country, setCountry] = useState('');
  const [profilePic, setprofilePic] = useState({});
  const [coverPic, setCoverPic] = useState({});
  const [profileVisibility, setProfileVisibility] = useState(false);
  // const [images, setImages] = useState([]);

  const [isLoading, setisLoading] = useState(true);
  const [isUpdating, setisUpdating] = useState(false);

  const {control, errors, reset} = useForm({
    mode: 'onBlur',
    // resolver: yupResolver(schema),
  });

  useFocusEffect(
    React.useCallback(() => {
      profileDetail();
    }, []),
  );

  useEffect(() => {
    navigation.setOptions({
      // headerRight: HeaderRight,
      headerLeft: HeaderLeft,
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'black',
      },
      style: {
        paddingBottom: 50,
      },
    });
    profileDetail();
  }, [accessToken]);

  function HeaderRight({onNotificationPressed}) {
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={ProfileUpdate}>
        <View style={{flexDirection: 'row', right: 15}}>
          <MaterialIcons
            name="check"
            color="white"
            type="MaterialIcons"
            size={32}
          />
        </View>
      </TouchableOpacity>
    );
  }
  const HeaderLeft = () => {
    const navigation = useNavigation();
    return (
      <View
        style={{
          flexDirection: 'row',
          left: 15,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.canGoBack() && navigation.goBack();
          }}>
          <Icon
            type="ionicon"
            name="arrow-back"
            color="white"
            size={32}
            // onPress={() => navigation.canGoBack() && navigation.goBack()}
          />
        </TouchableOpacity>
        <Text
          style={tailwind(
            'uppercase text-white mt-1 ml-1 font-bold text-xl text-center',
          )}>
          Edit Profile
        </Text>
      </View>
    );
  };

  const profileDetail = () => {
    API(accessToken)
      .get(`user/`)
      .then(res => {
        setisLoading(false);
        // console.log(
        //   'response in Edit Profile -=-=-=-=-=>>>>',
        //   res.data?.payload?.user,
        // );
        const {user} = res?.data?.payload;
        setFullName(user.full_name);
        setUsername(user.username);
        setEmail(user.email?.email);
        setEmailVerified(user.email?.verified);
        setPhone(user.phone?.phone);
        setPhoneVerified(user.phone?.verified);
        setDob(user.dob);
        setAddress(user.address);
        setState(user.state);
        setZip(user.zip_code || '');
        setCountry(user.country);
        setprofilePic(user.profile_pic);
        setProfileVisibility(user.profile_visibility);
        setInterest(user.interest || '');
      })
      .catch(err => {
        setisLoading(false);
        // Alert.alert('Error', 'Error Occurred while getting User data.')
        // throw new Error(err);
        console.log(err);
      });
  };

  const ProfileUpdate = () => {
    const formdata = new FormData();
    formdata.append('full_name', fullName);
    formdata.append('phone', phone);
    formdata.append('email', email);
    formdata.append('dob', dob);
    formdata.append('address', address);
    formdata.append('state', state);
    formdata.append('zip_code', zip);
    formdata.append('country', country);
    formdata.append('interest', interest);
    formdata.append('profile_visibility', profileVisibility);
    if (profilePic) {
      formdata.append('file[]', profilePic);
    }
    // console.log(
    //   'Getting array from child---------------------------------------------------------------------',
    //   formdata,
    // );

    setisUpdating(true);
    API(accessToken)
      .patch('user', formdata, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          _method: 'PATCH',
          Authorization: accessToken,
        },
      })
      .then(response => {
        console.log(`updateProfile user response ------> `, response?.payload);
        if (response.status === 200) {
        }
        Alert.alert('Success', 'Profile has been updated.', [
          {
            text: 'OK',
            onPress: () => {
              setisUpdating(false);
              navigation.goBack();
            },
          },
        ]);
      })
      .catch(error => {
        setisUpdating(false);
        Alert.alert('Error', 'An error occurred while updating profile.', [
          {
            text: 'OK',
            onPress: () => {
              setisUpdating(false);
              navigation.goBack();
            },
          },
        ]);
        // console.log(
        //   'updateProfile user error ---------- ',
        //   JSON.stringify(error?.data),
        // );
      });
  };

  const toggleSwitch = () =>
    setProfileVisibility(previousState => !previousState);

  if (isLoading) {
    return (
      <View style={tailwind('flex-1 items-center justify-center')}>
        <ActivityIndicator size="large" color={getColor('brand-primary')} />
      </View>
    );
  }

  if (isUpdating) {
    return (
      <View style={tailwind('flex-1 items-center justify-center')}>
        <ActivityIndicator size="large" color={getColor('brand-primary')} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={tailwind('flex-1')}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView
        style={tailwind('flex-1')}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tailwind('p-6')}>
        <Text style={tailwind('text-xl font-black mb-6')}>
          {`USER DETAILS`}
        </Text>

        <View style={tailwind('')}>
          <TouchableOpacity style={tailwind('absolute top-0 right-0 z-50')}>
            <Text style={tailwind('text-gray-400')}>
              {`You cannot change your username`}
            </Text>
          </TouchableOpacity>
          <Controller
            control={control}
            style={tailwind('')}
            render={({onChange, onBlur, value}) => (
              <Input
                style={tailwind('')}
                label="Username"
                theme="primary"
                clear={false}
                type="underline"
                onBlur={onBlur}
                disabled={true}
                value={username}
                // onChangeText={Alert.alert('Error', 'You cannot change Username')}
                errorMessage={errors?.username?.message}
              />
            )}
            name="username"
            defaultValue=""
          />
        </View>

        <View>
          <View style={tailwind('w-full items-end')}>
            {emailVerified ? (
              <TouchableOpacity style={tailwind('absolute top-0 right-0 z-50')}>
                <Text style={tailwind('text-gray-400')}>{`Verified`}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={tailwind('top-0 right-0 z-50')}
                onPress={() =>
                  navigation.navigate('Verify', {type: 'email', email: email})
                }>
                <Text style={tailwind('text-pink-400')}>
                  {`Verify your email`}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                label="Email"
                theme="primary"
                clear={true}
                type="underline"
                onBlur={onBlur}
                value={email}
                onChangeText={text => setEmail(text)}
                disabled={true}
                errorMessage={
                  !/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/.test(
                    email,
                  ) && email?.length !== 0
                    ? 'Invalid Email'
                    : null
                }
              />
            )}
            name="email"
            defaultValue=""
          />
        </View>

        <View>
          <View>
            <View style={tailwind('absolute top-0 right-0 z-50')}>
              <Controller
                control={control}
                render={({onBlur, onChange}) => (
                  <ProfilePhoto
                    onChange={imageRes => {
                      setprofilePic({
                        uri: imageRes?.uri,
                        name: 'photo.jpg',
                        type: imageRes?.type,
                      });
                    }}
                    onBlur={onBlur}
                    value={profilePic}
                    error={errors?.image?.message}
                  />
                )}
                name="file[]"
                defaultValue={{}}
              />
            </View>
            <Text style={tailwind('text-xl font-black mb-6')}>
              {`ABOUT ME`}
            </Text>
          </View>

          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                containerStyle={tailwind('')}
                labelStyle={{fontWeight: '800'}}
                label="Full Name"
                theme="primary"
                type="underline"
                clear
                onBlur={onBlur}
                value={fullName}
                onChangeText={text => setFullName(text)}
                errorMessage={
                  fullName?.length < 3 && fullName?.length !== 0
                    ? 'Invalid Full Name'
                    : null
                }
              />
            )}
            name="fullname"
            defaultValue=""
          />
        </View>
        <View style={tailwind('w-full items-end')}>
          {phoneVerified ? (
            <TouchableOpacity style={tailwind('absolute top-0 right-0 z-50')}>
              <Text style={tailwind('text-gray-400')}>{`Verified`}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={tailwind('top-0 right-0 z-50')}
              onPress={() =>
                navigation.navigate('Verify', {type: 'phone', phone: phone})
              }>
              <Text style={tailwind('text-pink-400')}>
                {`Verify your Phone`}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              containerStyle={tailwind('')}
              label="Phone Number"
              labelStyle={{fontWeight: '800'}}
              theme="primary"
              type="underline"
              clear
              onBlur={onBlur}
              value={phone}
              onChangeText={text => setPhone(text)}
              errorMessage={
                !/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(
                  phone,
                ) && phone?.length !== 0
                  ? 'Invalid Phone'
                  : null
              }
            />
          )}
          name="phone"
          defaultValue=""
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              containerStyle={tailwind('mt-4')}
              label="Interest"
              labelStyle={{fontWeight: '800'}}
              theme="primary"
              keyboardType={'default'}
              type="underline"
              clear
              onBlur={onBlur}
              value={interest}
              onChangeText={text => setInterest(text)}
              errorMessage={errors?.price?.message}
            />
          )}
          name="interest"
          defaultValue=""
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              containerStyle={tailwind('mt-4')}
              label="Date of Birth"
              labelStyle={{fontWeight: '800'}}
              theme="primary"
              keyboardType={'default'}
              type="underline"
              clear
              onBlur={onBlur}
              value={dob}
              onChangeText={text => setDob(text)}
              errorMessage={errors?.price?.message}
            />
          )}
          name="dob"
          defaultValue=""
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              containerStyle={tailwind('mt-4')}
              label="Address"
              labelStyle={{fontWeight: '800'}}
              theme="primary"
              keyboardType={'default'}
              type="underline"
              clear
              onBlur={onBlur}
              value={address}
              onChangeText={text => setAddress(text)}
              errorMessage={
                address?.length < 3 && address?.length !== 0
                  ? 'Invalid Address'
                  : null
              }
            />
          )}
          name="address"
          defaultValue=""
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              containerStyle={tailwind('mt-4')}
              label="Zip Code"
              labelStyle={{fontWeight: '800'}}
              theme="primary"
              keyboardType={'numeric'}
              type="underline"
              clear
              onBlur={onBlur}
              value={zip}
              onChangeText={text => setZip(text)}
              errorMessage={
                !/^\d{5}([-]|\s*)?(\d{4})?$/.test(zip) && zip?.length !== 0
                  ? 'Invalid Zip Code'
                  : null
              }
            />
          )}
          name="zip"
          defaultValue=""
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              containerStyle={tailwind('mt-4')}
              label="State"
              labelStyle={{fontWeight: '800'}}
              theme="primary"
              keyboardType={'default'}
              type="underline"
              clear
              onBlur={onBlur}
              value={state}
              onChangeText={text => setState(text)}
              errorMessage={
                state?.length < 2 && state?.length !== 0
                  ? 'Invalid State'
                  : null
              }
            />
          )}
          name="state"
          defaultValue=""
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              containerStyle={tailwind('mt-4')}
              label="Country"
              labelStyle={{fontWeight: '800'}}
              theme="primary"
              keyboardType={'default'}
              type="underline"
              clear
              onBlur={onBlur}
              value={country}
              onChangeText={text => setCountry(text)}
              errorMessage={
                country?.length < 2 && country?.length !== 0
                  ? 'Invalid Country'
                  : null
              }
            />
          )}
          name="country"
          defaultValue=""
        />

        <Controller
          control={control}
          render={({onBlur, onChange, value}) => (
            <View>
              <View
                style={tailwind('flex-row mt-4 items-center justify-between')}>
                <Text style={tailwind('text-base text-gray-800 font-normal')}>
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
                  value={profileVisibility}
                />
              </View>
            </View>
          )}
          name="profileVisibility"
          defaultValue={true}
        />

        <Button
          containerStyle={tailwind('mt-6 mb-6 items-center')}
          buttonStyle={tailwind('px-12')}
          loading={isLoading}
          onPress={ProfileUpdate}
          // onPress={() => console.log(profilePic)}
          theme="primary"
          size="md"
          title="Update"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );

  function ProfilePhoto({onBlur, onChange, error, value}) {
    const [image, setImage] = useState(value);

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
      console.log(`pickimage ----------> image`, image);
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
            () => {
              return null;
            };
            return null;
          } else {
            setImage(result.assets[0]);
            onChange(result.assets[0]);
          }
        },
      );
    };

    return (
      <View style={tailwind('')}>
        <TouchableOpacity
          onPress={pickImage}
          style={tailwind('bg-white rounded w-24 h-24 border border-gray-300')}>
          <View style={tailwind('absolute top-0 right-0 z-50 -mt-1')}>
            <Icon name="camera" style={tailwind('text-xl')} />
          </View>
          {image?.absolute_path || image?.uri ? (
            <View>
              <Image
                source={{uri: image?.uri || image?.absolute_path}}
                style={tailwind('w-full h-full')}
              />
            </View>
          ) : (
            <View style={tailwind('items-center justify-center h-full w-full')}>
              <Icon
                name="ios-person-circle-sharp"
                size={80}
                style={tailwind('text-black')}
              />
            </View>
          )}
        </TouchableOpacity>
        {error !== undefined && (
          <Text style={tailwind('text-red-500 text-sm')}>{error}</Text>
        )}
      </View>
    );
  }
}
