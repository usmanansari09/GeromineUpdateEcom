import React, {useState, useEffect, useLayoutEffect, useReducer} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '@/components/Button';
import Input from '@/components/Input';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {getColor, tailwind} from '@/common/tailwind';

import schema from './signInSchema';
import API from '@/common/services/API';
import GImage from '@/assets/G.png';
import GoogleSignIn from './GoogleSignIn';
import InstagramLogin from './InstagramLogin';
import FacebookLogin from './FacebookLogin';
import {Icon} from 'react-native-elements';
import useAuthStore from '@/common/stores/useAuthStore';
import {useMutation} from 'react-query';
import {Alert} from 'react-native';
import Modal from 'react-native-modal';
import StackHeader from '@/components/StackHeader';
import CustomModal from '@/components/Modal/CustomModal';
const {height} = Dimensions.get('screen');

function ModalStyle() {
  if (height > 600) {
    return 'bg-white rounded-lg p-4 mt-96 h-48 w-64 items-center justify-center rounded-2xl';
  } else if (height > 480) {
    return 'bg-white rounded-lg p-4 mt-64 h-48 w-72 items-center justify-center rounded-2xl';
  } else {
    return 'bg-white rounded-lg p-4 mt-56 h-48 w-72 items-center justify-center rounded-2xl';
  }
}

const useLogin = () => {
  return useMutation(formData => {
    console.log('uselogin data', formData);
    return API()
      .post('auth/login', formData)
      .then(function (response) {
        // console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  });
};
/**
 * @param {{navigation:StackNavigationProp<any>}} props
 */
export default function SignIn({navigation, route}) {
  const loadTokens = useAuthStore(s => s.getToken);
  const logoutAuth = useAuthStore(s => s.logout);

  const [errorModal, toggleErrorModal] = useReducer(s => !s, false);
  const [errorModalMessage, setErrorModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState([]);

  // const loadUserId = useAuthStore(s => s.getUserId);

  // const getFirstAttempt = useAuthStore(s => s.getFirstAttempt);

  const [isChecking, setisChecking] = useState(true);
  // const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // logoutAuth();
    loadTokens().then(res => {
      if (res) {
        // console.log('res is ------', navigation);
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        });
      }
    });
    // getFirstAttempt().then(res => {
    //   if (!res) {
    //     console.log('getFirsAttempt resp is ------', res);
    //     setIsVisible(true);
    //   }
    // });

    setisChecking(false);
    // SplashScreen.show();
  }, []);
  const [form, setform] = useState({
    email: '',
    password: '',
  });
  const {errors, control, handleSubmit} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const {mutate, isLoading, error: APILoginError} = useLogin();
  const setLoginData = useAuthStore(s => s.login);
  // const setPersonId = useAuthStore(s => s.personId);
  // const setFirstAttempt = useAuthStore(s => s.setFirstTime);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     header: props => {
  //       return <StackHeader props={{...props, title: 'Sign in', backButtonShow: navigation.canGoBack() ? false : true}} />;
  //     },
  //   });
  // }, [navigation]);

  const parseError = () => {
    // console.log('APILoginError in login apiiiii', APILoginError.response);
    return APILoginError?.response.data?.error || null;
  };
  const loginUser = credentials => {
    if (form.email.length >= 3 && form.password.length >= 6) {
      if (isLoading) return;
      mutate(
        {
          email: form.email,
          password: form.password,
        },
        {
          onSuccess: (creds, other) => {
            // console.log('response.data :>> ', {creds}, {other});
            if (creds?.status === 200) {
              // setPersonId(creds?.data?.payload?.Person?._id);
              setLoginData(creds?.data?.payload?.Authorization);
              if (route?.params?.from) {
                navigation.goBack();
              } else {
                navigateTo('HomeScreen');
              }
            } else {
              setErrorModalMessage('Invalid credentials \nPlease try again.');
              toggleErrorModal();
              setModalButtons([
                {
                  text: 'Close',
                  style: {},
                  theme: 'primary',
                  action: toggleErrorModal,
                },
              ]);
            }
          },
          onError: error => {
            console.log('Login error .data :>> ', error);
            setErrorModalMessage(
              'Network error \nUnable to connect to Geronimo, \nPlease check your internet connection.',
            );
            toggleErrorModal();
            setModalButtons([
              {
                text: 'Close',
                style: {},
                theme: 'primary',
                action: toggleErrorModal,
              },
            ]);
          },
        },
      );
    } else {
      // Alert.alert('Alert', 'Please enter a valid email and password');
      setErrorModalMessage(`Please enter a valid email and password`);
      toggleErrorModal();
      setModalButtons([
        {
          text: 'Close',
          style: {},
          theme: 'primary',
          action: toggleErrorModal,
        },
      ]);
      console.log('errors');
      parseError();
    }
  };
  const navigateTo = screen => {
    navigation.replace(screen);
  };

  return (
    <KeyboardAwareScrollView style={tailwind('bg-black flex-1')}>
      <CustomModal
        show={errorModal}
        msg={errorModalMessage}
        toggle={toggleErrorModal}
        btn={modalButtons || []}
      />
      <View style={tailwind('absolute -mt-14 -mr-3 right-0')}>
        <Image
          source={GImage}
          style={{
            width: 100,
            height: 290,
          }}
          resizeMode="contain"
        />
      </View>
      <View style={tailwind('flex-1 px-6 pb-6')}>
        <View style={tailwind('flex-row items-center pb-10 mt-14')}>
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
            Sign In
          </Text>
        </View>
        <View>
          {parseError() !== null && (
            <Text style={tailwind('text-red-500 text-sm mb-4')}>
              {parseError()}
            </Text>
          )}
          <Controller
            render={({onChange, onBlur, value}) => (
              <Input
                onChangeText={text => setform({...form, email: text})}
                onBlur={onBlur}
                label="Email, Username or Phone"
                value={value}
                clear
                type="underline"
                inputStyle={tailwind('font-normal text-gray-400')}
                errorMessage={
                  form?.email?.length < 3 && form?.email?.length !== 0
                    ? 'Invalid Username'
                    : null
                }
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
            name="email"
            control={control}
            // defaultValue="hisile3777@0pppp.com"
            defaultValue=""
            // defaultValue="safela1022@dvdoto.com"
          />
          <Controller
            render={({onChange, onBlur, value}) => (
              <Input
                onChangeText={text => setform({...form, password: text})}
                onBlur={onBlur}
                label="Password"
                mode="password"
                clear
                type="underline"
                inputStyle={tailwind('font-normal text-gray-400')}
                value={value}
                autoCapitalize="none"
                errorMessage={
                  form?.password?.length < 6 && form?.password?.length !== 0
                    ? 'Invalid Password'
                    : null
                }
              />
            )}
            name="password"
            control={control}
            defaultValue=""
          />

          <Button
            onPress={() => !isLoading && navigation.navigate('ForgotPassword')}
            title="Forgot Password?"
            type="clear"
            size="sm"
            titleStyle={tailwind('text-brand-primary font-normal normal-case')}
          />
          <View style={tailwind('mt-6 items-center')}>
            <Button
              title="Sign In"
              size={'md'}
              titleStyle={tailwind(' font-bold text-black')}
              containerStyle={tailwind('w-52')}
              loading={isLoading}
              onPress={loginUser}
              theme={'white'}
            />
            <Text
              style={tailwind('text-center font-bold text-white text-sm mt-2')}>
              Or
            </Text>
            <Button
              title="Create An Account"
              size={'md'}
              titleStyle={tailwind('font-bold')}
              containerStyle={tailwind('w-52 mt-2')}
              theme={'primary'}
              onPress={() => !isLoading && navigation.navigate('Register')}
            />
            <Text
              style={tailwind('font-bold text-center text-white text-sm mt-2')}>
              Or
            </Text>
            <Button
              onPress={() => {
                !isLoading && navigation.replace('HomeScreen');
              }}
              title="Create Account Later"
              type="clear"
              size="sm"
              titleStyle={tailwind('text-white font-normal mt-4')}
            />
          </View>
        </View>
        <View style={tailwind('py-5 items-center')}>
          <Text style={tailwind('text-center text-sm text-white')}>
            Or connect using
          </Text>
          <FacebookLogin />
          <GoogleSignIn />
          <InstagramLogin />
          {/* <Modal
            isVisible={isVisible}
            style={tailwind('items-center justify-center')}>
            <View style={tailwind(ModalStyle())}>
              <Text
                style={tailwind('text-base font-bold text-black uppercase')}>
                Learn about selling {'\n'}&amp; buying on Geronimo
              </Text>

              <Button
                title={'Yes, Please'}
                size="md"
                theme={'primary'}
                containerStyle={tailwind('mt-2')}
                onPress={() => {
                  //toggle(false);
                  setFirstAttempt();
                  setIsVisible(false);
                  navigation.navigate('HowItWorks');
                }}
              />

              <Button
                onPress={() => {
                  setFirstAttempt();
                  setIsVisible(false);
                }}
                title={'No, Thanks'}
                size="md"
                theme={'black'}
                containerStyle={tailwind('mt-2')}
              />
            </View>
          </Modal> */}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
