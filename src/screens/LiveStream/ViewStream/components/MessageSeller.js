import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomSheet from '@/components/BottomSheet';
import {tailwind} from '@/common/tailwind';

import {AppContext} from '@/common/contexts/AppContext';
// import Sendbird from 'sendbird';
import Chat from '@/components/Chat';
const TEST_CHANNEL_URL =
  'sendbird_group_channel_90402984_b6de964ba9a4afe5a6c45aa650426233b2540a5a';
const {height} = Dimensions.get('window');
/**
 *
 *
 * @param {{show:boolean}} props
 */
export default function MessageSeller({show}) {
  //   /**
  //    * @type {{sendbird:Sendbird.SendBirdInstance}}
  //    */
  const {sendbird} = useContext(AppContext);
  const [channel, setChannel] = useState(null);
  useEffect(() => {
    if (sendbird) {
      sendbird.GroupChannel.getChannel(
        TEST_CHANNEL_URL,
        function (groupChannel, error) {
          if (!error) {
            setChannel(groupChannel);
          }
        },
      );
    }
  }, [sendbird]);
  return (
    <View>
      <BottomSheet
        isVisible={show}
        backdropOpacity={0}
        containerStyle={tailwind('bg-black bg-opacity-80 pt-5')}
        propagateSwipe>
        <View style={[tailwind(''), {height: height / 2}]}>
          {/* <Chat channel={channel} /> */}
        </View>
      </BottomSheet>
    </View>
  );
}
