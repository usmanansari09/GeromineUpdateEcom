import React, {useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {getColor, tailwind} from '@/common/tailwind';
import {useMutation} from 'react-query';
import {useNavigation} from '@react-navigation/native';

import API from '@/common/services/API';
import {useAuthStore, useStreamChatStore} from '@/common/stores';
import {Button} from '@/components/index';
import {CommonActions} from '@react-navigation/native';

// const useLogout = () => {
//   const accessToken = useAuthStore(s => s.accessToken);
//   return useMutation(() =>
//     API(accessToken)
//       .get('logout')
//       .then(res => res.data),
//   );
// };
export default function Logout() {
  const logoutAuth = useAuthStore(s => s.logout);
  // const disconnect = useStreamChatStore(s => s.disconnect);
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(true);
  // const {mutate, isLoading, error} = useLogout();

  const startLogout = () => {
    logoutAuth();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'SignIn'}],
      }),
    );
    setisLoading(false);
    // logoutAuth();
    // // disconnect();
    // mutate(
    //   {},
    //   {
    //     onSuccess: async data => {
    //       logoutAuth();
    //       navigation.dispatch(
    //         CommonActions.reset({
    //           index: 1,
    //           routes: [{name: 'SignIn'}],
    //         }),
    //       );
    //       // disconnect();
    //       // navigate("SignIn");
    //     },
    //   },
    // );
  };
  return (
    <View
      style={tailwind('flex-1 bg-gray-100 items-center justify-center')}
      onLayout={startLogout}>
      {/* {!error ? (
        <View style={tailwind('justify-center items-center')}>
          <Text>Failed to logout</Text>
          <Button title="Try again" theme="primary" onPress={startLogout} />
        </View>
      ) : ( */}
      {isLoading && (
        <View>
          <ActivityIndicator size="small" color={getColor('brand-primary')} />
          <Text style={tailwind('text-gray-500 text-center')}>Logging out</Text>
        </View>
      )}

      {/* )} */}
    </View>
  );
}
