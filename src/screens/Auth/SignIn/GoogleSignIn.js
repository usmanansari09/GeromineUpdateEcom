import {tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import React, {useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';
import API from '@/common/services/API';
import useAuthStore from '@/common/stores/useAuthStore';
import Icon from 'react-native-vector-icons/AntDesign';

GoogleSignin.configure({
  webClientId:
    '437521357056-b34qhcfr3pv9n6430q7pgan50g47tlpd.apps.googleusercontent.com',
  forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
  // accountName: '', // [Android] specifies an account name on the device that should be used
  androidCliendId:
    '451216403874-b9e087gikcmr3bd8b9tlf29u0v00tl0o.apps.googleusercontent.com',
  iosClientId:
    '437521357056-5h3ap2jco3i87on4qv9rpjdt5eskdmrf.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  // googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  offlineAccess: true,
  //   iosClientId: "470899243196-g686j7bgcb97m21ckbjvaft8gfvs3tqi.apps.googleusercontent.com",
});

export default function GoogleSignIn(props) {
  const {navigateTo} = props;

  const [isLoading, setisLoading] = useState(false);
  const setLoginData = useAuthStore(s => s.login);

  const onGoogleButtonPress = async () => {
    setisLoading(true);
    try {
      // await GoogleSignin.hasPlayServices();
      // // Get the users ID token
      // const response = await GoogleSignin.signIn();
      // console.log("response is", response);
      // return response;
      // const response = await GoogleSignin.signIn();
      // Create a Google credential with the token
      // const googleCredential = awiat auth.GoogleAuthProvider.credential(idToken);
      // console.log("googleCredential is ", googleCredential);
      // Sign-in the user with the credential
      // return auth().signInWithCredential(googleCredential);
    } catch (error) {
      setisLoading(false);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const useLogin = params => {
    const {idToken} = params;
    const formData = new FormData();
    formData.append('id_token', idToken);

    API()
      .post('auth/google', formData)
      .then(async res => {
        if (res.status === 201) {
          await setLoginData(res?.data?.token, res?.data?.user_id);
          navigateTo('HomeScreen');
          setisLoading(false);
        }
        setisLoading(false);
        navigateTo('HomeScreen');
        console.log('response in apiiiiiiiiii ========', res.data);
      });
  };
  return (
    <Button
      title="Google"
      size={'sm'}
      containerStyle={tailwind('w-1/2 mt-2')}
      icon={<Icon name="google" size={18} />}
      theme={'white'}
      titleStyle={tailwind('text-brand-primary ml-3 mr-4 text-black')}
      loading={isLoading}
      onPress={async () => {
        // const res = await onGoogleButtonPress();
        // useLogin(res);
        Alert.alert(
          'Feature In Progress',
          'Google Login is still in development',
          [
            {
              text: 'OK',
            },
          ],
        );
      }}
    />
  );
}
