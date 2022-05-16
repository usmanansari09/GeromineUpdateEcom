/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useEffect, useState} from 'react';
import {AppState, StatusBar, LogBox} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {ThemeProvider} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Screens from '@/navigation/index';
import AppProvider from '@/common/contexts/AppContext';
import AuthProvider from '@/common/contexts/AuthContext';
import CartProvider from '@/common/contexts/CartContext';
import {StripeProvider} from '@stripe/stripe-react-native';

// import StreamChatProvider from '@/common/contexts/StreamChatContext';

import toastConfig from '@/components/Toast';

// import {OverlayProvider} from 'stream-chat-react-native';

import {focusManager, QueryClient, QueryClientProvider} from 'react-query';
import {useAuthStore} from '@/common/stores/';
// import {useAuthStore, useStreamChatStore} from '@/common/stores/';
// import shallow from 'zustand/shallow';
const queryClient = new QueryClient();

StatusBar.setBarStyle('light-content');

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    notification: 'red',
  },
};

enableScreens(true);

// React Query manage focus refetch for React native
focusManager.setEventListener(handleFocus => {
  const handleAppStateChange = appState => {
    focusManager.setFocused(appState === 'active');
  };

  let eventListener = AppState.addEventListener('change', handleAppStateChange);

  return () => {
    // AppState.removeEventListener('change', handleAppStateChange);
    eventListener.remove();
  };
});

export default function AppWithSafeAreas() {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
}

function App() {
  // LogBox.ignoreAllLogs(true);
  LogBox.ignoreLogs([
    'Warning',
    'new NativeEventEmitter',
    'EventEmitter.removeListener',
    'EventEmitter.removeListener',
    'new NativeEventEmitter()',
    'Require cycle',
    '[react-native-gesture-handler]',
  ]);
  const navigationRef = useRef();
  const [currentScreen, setCurrentScreen] = useState('');
  // const {bottomInset} = useSafeAreaInsets();

  const loadTokens = useAuthStore(s => s.loadTokens);
  const isTokenStoreReady = useAuthStore(
    s => s.accessToken !== undefined && s.userId !== undefined,
  );
  // const {connectUser, disconnect} = useStreamChatStore(
  //   s => ({connectUser: s.connectUser, disconnect: s.disconnect}),
  //   shallow,
  // );

  useEffect(() => {
    const handler = async () => {
      if (!isTokenStoreReady) {
        loadTokens();
      }

      if (isTokenStoreReady) {
        // connect user to stream chat
        // await connectUser();
        //Comment temporary
        //SplashScreen.hideAsync();
      }
    };
    handler();
  }, [isTokenStoreReady]);

  // useEffect(() => {
  //   return disconnect;
  // }, []);
  // return <View />;
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={MyTheme}
      onStateChange={async () => {
        setCurrentScreen(navigationRef.current.getCurrentRoute()?.name);
      }}>
      {/* <OverlayProvider bottomInset={bottomInset}> */}
      <StripeProvider
        publishableKey="pk_test_51KJZOsBMHLc83LgAW71zyZVtJNr1v0MY7BMNZHguHCxeWYzcPL4btfgOXaOKAKCKJ2PQGzN0vFHFb2WtyUegsOJD00oHFDLqmB"
        merchantIdentifier="merchant.com.geronimolive.geronimo">
        <AppProvider
          value={{
            currentScreen: currentScreen,
          }}>
          {/* <StreamChatProvider> */}
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider>
                <CartProvider>
                  <Screens />
                </CartProvider>
                <Toast
                  config={toastConfig}
                  ref={ref => Toast.setRef(ref)}
                  visibilityTime={5000}
                />
              </ThemeProvider>
            </QueryClientProvider>
          </AuthProvider>
          {/* </StreamChatProvider> */}
        </AppProvider>
      </StripeProvider>
      {/* </OverlayProvider> */}
    </NavigationContainer>
  );
}
