import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Messages from '@/screens/Messages';
import Message from '@/screens/Messages/MessageConversation';
import AllMessages from '@/screens/Messages/AllMessage';
import SingleMessage from '@/screens/Messages/SingleMessage';
import StackHeader from '@/components/StackHeader';

const Stack = createStackNavigator();
export default function MessagesNavigation() {
  return (
    <Stack.Navigator
      detachInactiveScreens={false}
      options={{
        header: props => <StackHeader {...props} />,
      }}>
      <Stack.Screen
        name="Messages_Home"
        options={{title: 'My Messages'}}
        component={AllMessages}
      />
      <Stack.Screen name="Messages_Conversation" component={SingleMessage} />
    </Stack.Navigator>
  );
}
