import {tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import React, {useRef, LegacyRef} from 'react';
import {View, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import RNInstagramLogin from "react-native-instagram-login";

export default function InstagramLogin() {
  /**
   * @type {LegacyRef<InstagramLogin>}
   */
  const instagramLoginRef = useRef();
  return (
    <>
      <Button
        title="Instagram"
        icon={<Icon name="instagram" size={22} />}
        size={'sm'}
        containerStyle={tailwind('w-1/2 mt-2')}
        theme={'white'}
        titleStyle={tailwind('text-brand-primary ml-2 text-black')}
        onPress={() => {
          //   instagramLoginRef.current.show();
          Alert.alert(
            'Feature In Progress',
            'Instagram Login is still in development',
            [
              {
                text: 'OK',
              },
            ],
          );
        }}
      />
      {/* <RNInstagramLogin
        ref={instagramLoginRef}
        // appId="your-app-id"
        // appSecret="your-app-secret"
        // redirectUrl="your-redirect-Url"
        // scopes={["user_profile", "user_media"]}
        // onLoginSuccess={this.setIgToken}
        // onLoginFailure={(data) => console.log(data)}
      /> */}
    </>
  );
}
