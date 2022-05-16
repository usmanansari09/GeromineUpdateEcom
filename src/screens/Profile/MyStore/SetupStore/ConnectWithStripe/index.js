import {tailwind, getColor} from '@/common/tailwind';
import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  View,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '@/common/contexts/AuthContext';
import {Svg, Path} from 'react-native-svg';
import {WebView} from 'react-native-webview';
import {Text, Button, Input} from '@/components/index';
import StackHeader from '@/components/StackHeader';
import Modal from 'react-native-modal';
import API from '@/common/services/API';
import {useMutation, UseMutationOptions} from 'react-query';

const stripeConenctAPI = opts => {
  const {accessToken} = useContext(AuthContext);
  return useMutation(
    values => API(accessToken).get(`seller/stripe/connect?code=${values}`),
    opts,
  );
};

export default function ConnectWithStripe({navigation, route}) {
  const webViewRef = useRef();
  const CLIENT_ID = 'ca_Kzfxv7FP585aGtZ8iXhehMm90fHGCFZA';
  const STATE = 'GeronimoConnect';

  const [isSuccessStripe, setIsSuccessStripe] = useState(false); //modal success
  const [isFail, setIsFail] = useState(false); //modal fail

  console.log('route-------------------', route);
  const [email, setEmail] = useState(route?.params?.email || '');
  const [resCode, setResCode] = useState('');

  const [URL, setURL] = useState(
    `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&scope=read_write&state=${STATE}&stripe_user[email]=${email}`,
  );

  const {mutate, isLoading, isError, isSuccess, error} = stripeConenctAPI({
    onError: err => {
      console.log('stripeConenctAPI error :>> ', err?.response);
    },
    onSuccess: response => {
      //
      console.log('stripeConenctAPI successfully :>> ', response?.data);
    },
  });

  useEffect(() => {
    navigation.setOptions({
      header: props => {
        return <StackHeader props={{...props, title: 'Connect with Stripe'}} />;
      },
    });
  }, [email]);

  useEffect(() => {
    if (isSuccess) {
      // setIsSuccessStripe(true);
      navigation.navigate('StoreNavigation', {
        screen: 'ConnectWithStripeSuccess',
        params: {isSellerConnected: isSuccess},
      });
    }

    if (isError) {
      setIsFail(true);
    }
  }, [isSuccess, isError]);

  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color={getColor('brand-primary')}
        size="large"
        style={[
          tailwind('absolute inset-0 z-50'),
          {backgroundColor: 'rgb(255, 255, 255)'},
          // {backgroundColor: 'rgba(128, 128, 128, 0.7)'},
        ]}
      />
    );
  }

  function processSuccess(data) {
    navigation.navigate('StoreNavigation', {
      screen: 'ConnectWithStripe',
    });
  }

  function onMessage(data) {
    console.log('onMessage Stripe:', data);
  }

  function SuccessModal() {
    return (
      <Modal isVisible={isSuccessStripe}>
        <View
          style={tailwind(
            'bg-white rounded-2xl p-4 items-center justify-center',
          )}>
          <Text
            style={tailwind('text-black text-center text-lg mb-4 font-bold')}>
            Stripe connected successfully
          </Text>
          <Button
            title="Close"
            theme="primary"
            onPress={() => {
              console.log(isSuccess);
              setTimeout(() => {
                setIsSuccessStripe(false);
                navigation.navigate('StoreNavigation', {
                  screen: 'ConnectWithStripeSuccess',
                  params: {isSellerConnected: isSuccess},
                });
              }, 200);
            }}
            containerStyle={tailwind('w-1/2')}
          />
        </View>
      </Modal>
    );
  }

  function FailModal() {
    return (
      <Modal isVisible={isFail}>
        <View
          style={tailwind(
            'bg-white rounded-2xl p-4 items-center justify-center',
          )}>
          <Text
            style={tailwind('text-black text-center text-lg mb-4 font-bold')}>
            Stripe connection failed.
          </Text>
          <Button
            title="Retry"
            theme="black"
            onPress={() => {
              console.log(isFail, ' ', isError);
              navigation.goBack();
              setIsFail(false);
              setURL(`${URL}&dummy=test`);
            }}
            containerStyle={tailwind('w-1/2')}
          />

          <Button
            title="Close"
            theme="primary"
            onPress={() => {
              setIsFail(false);
              setTimeout(() => {
                setIsSuccessStripe(false);
                navigation.navigate('StoreNavigation', {
                  screen: 'StorePayment',
                });
              }, 200);
            }}
            containerStyle={tailwind('mt-2 w-1/2')}
          />
        </View>
      </Modal>
    );
  }

  function processResponse(response) {
    console.log('onLoad event: process Res:', response);
    if (response) {
      const rparts = response?.url.split('?');
      //pos
      if (
        rparts &&
        rparts[0] &&
        rparts[0].includes('https://connect.stripe.com/connect') &&
        rparts[1] &&
        rparts[1].includes('code=ac')
      ) {
        const resQuery = rparts[1]
          .split('&')
          .reduce(
            (acc, val) => ({...acc, [val.split('=')[0]]: val.split('=')[1]}),
            {},
          );
        if (resQuery?.code !== CLIENT_ID) {
          console.log('connected to Stripe------------', resQuery);
          if (isLoading) return;
          mutate(resQuery.code);
          // setIsSuccessStripe(true);
        }
      }

      //err
    }
  }

  return (
    <View style={tailwind('flex-1')}>
      <TouchableOpacity style={tailwind('absolute inset-x-0 top-0 z-50')}>
        <Text style={tailwind('text-gray-300')}></Text>
      </TouchableOpacity>
      <SuccessModal />
      <FailModal />
      {isLoading || isSuccess || isError ? <LoadingIndicatorView /> : null}
      <WebView
        ref={webViewRef}
        allowsBackForwardNavigationGestures={true}
        onLoadStart={syntheticEvent => {
          setIsFail(false);
          const {nativeEvent} = syntheticEvent;
          this.isLoading = nativeEvent.loading;
        }}
        onLoad={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          //   console.log('onLoad event:', nativeEvent);
          //   processSuccess();
          //   setIsSuccess(true);
          processResponse(nativeEvent);
          this.url = nativeEvent.url;
        }}
        onNavigationStateChange={navState => {
          this.canGoBack = navState.canGoBack;
        }}
        startInLoadingState={true}
        pullToRefreshEnabled={true}
        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically={true}
        overScrollMode={'never'}
        renderLoading={LoadingIndicatorView}
        source={{
          uri: URL,
        }}
        // onMessage={onMessage}
        onMessage={event => {
          const {data} = event.nativeEvent;
          console.log(data);
          console.log('onMessage event:', event);
        }}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
          setIsFail(true);
          //   Alert.alert('Error', 'Error connecting with Stripe', [
          //     {
          //       text: 'Retry',
          //       onPress: () => {
          //         console.log('error retry');
          //         // setURL(`${URL}`);
          //         // setTimeout(() => {
          //         //   navigation.navigate('StoreNavigation', {
          //         //     screen: 'ConnectWithStripe',
          //         //   });
          //         // }, 200);
          //       },
          //     },
          //     {
          //       text: 'Close',
          //       onPress: () => {
          //         console.log('error closed.');
          //         setTimeout(() => {
          //           navigation.navigate('StoreNavigation', {
          //             screen: 'StorePayment',
          //           });
          //         }, 200);
          //       },
          //     },
          //   ]);
        }}
      />
    </View>
  );
}
