import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StackHeader from '@/components/StackHeader';

import GoLive from '@/screens/LiveStream/GoLive';
import LiveScreen from '@/screens/LiveStream/LiveScreen';
import ViewStream from '@/screens/LiveStream/ViewStream';
import ShareStream from '@/screens/LiveStream/ShareStream';
import DisplayPhotoGallery from '@/screens/LiveStream/GoLive/DisplayPhotoGallery';
import CaptureDisplayPhoto from '@/screens/LiveStream/GoLive/CaptureDisplayPhoto';

const Stack = createStackNavigator();

export default function LiveStreamNavigation() {
  return (
    <Stack.Navigator
      detachInactiveScreens={false}
      options={{
        header: props => <StackHeader {...props} />,
      }}
      detachInactiveScreens={false}>
      <Stack.Screen
        name={'Go Live'}
        component={GoLive}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name={'StreamPhotos'}
        options={{title: 'Photo gallery'}}
        component={DisplayPhotoGallery}
      />
      <Stack.Screen
        name={'CaptureDisplayPhoto'}
        options={{title: 'Display Photo'}}
        component={CaptureDisplayPhoto}
      />
      <Stack.Screen
        name={'StreamView'}
        options={{headerShown: false}}
        component={LiveScreen}
      />
      <Stack.Screen
        name={'ViewStream'}
        options={{headerShown: false}}
        component={ViewStream}
      />
      <Stack.Screen
        name={'ShareStream'}
        options={{title: 'Share Live Stream'}}
        component={ShareStream}
      />
    </Stack.Navigator>
  );
}
