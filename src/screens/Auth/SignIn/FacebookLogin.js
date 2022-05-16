import {tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import React, {LegacyRef, useRef, useState} from 'react';
import {View, Alert, Text} from 'react-native';
// import {LoginManager, AccessToken} from 'react-native-fbsdk';
import API from '@/common/services/API';
import useAuthStore from '@/common/stores/useAuthStore';
// import {Icon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';

export default function () {
  /**
   * @type {LegacyRef<LoginButton>}
   */
  const [isLoading, setisLoading] = useState(false);

  const facebookLoginRef = useRef();
  const setLoginData = useAuthStore(s => s.login);

  const onFbPress = () => {
    setisLoading(true);

    // LoginManager.logOut();
    // let behavior = Platform.OS === "ios" ? "browser" : "WEB_ONLY";
    // LoginManager.setLoginBehavior(behavior);
    // LoginManager.logInWithPermissions(["public_profile", "email"]).then(
    //   (result) => {
    //     if (result) {
    //       AccessToken.getCurrentAccessToken().then((data) => {
    //         console.log("data is", data);
    //         if (data) {
    //           useLogin(data);
    //         } else {
    //           setisLoading(false);
    //         }
    //       });
    //     } else {
    //       setisLoading(false);
    //     }
    //   },
    //   (error) => {
    //     setisLoading(false);

    //     console.log("error2", error);
    //   }
    // );
  };
  const useLogin = params => {
    const {accessToken} = params;
    const formData = new FormData();
    formData.append('access_token', accessToken);
    API()
      .post('auth/facebook', formData)
      .then(async res => {
        if (res.status === 201) {
          await setLoginData(res?.data?.token, res?.data?.user_id);
          navigateTo('HomeScreen');
          setisLoading(false);
        }
        setisLoading(false);

        console.log('response in apiiiiiiiiii ========', res.status);
      });
  };

  return (
    <View style={tailwind('w-full  mt-5 items-center')}>
      <Button
        title="Facebook"
        icon={<Icon name="sc-facebook" size={25} />}
        size={'sm'}
        containerStyle={tailwind('w-1/2 mt-2')}
        theme={'white'}
        loading={isLoading}
        titleStyle={tailwind('text-brand-primary ml-1 mr-1 text-black')}
        onPress={() => {
          Alert.alert(
            'Feature In Progress',
            'Facebook Login is still in development',
            [
              {
                text: 'OK',
              },
            ],
          );
          // onFbPress();
        }}
      />
      {/* <LoginButton
        ref={facebookLoginRef}
        onLoginFinished={(error, result) => {
          if (error) {
            console.log("login has error: " + result.error);
          } else if (result.isCancelled) {
            console.log("login is cancelled.");
          } else {
            AccessToken.getCurrentAccessToken().then((data) => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log("logout.")}
      /> */}
    </View>
  );
}
