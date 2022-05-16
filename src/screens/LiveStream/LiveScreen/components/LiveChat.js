import React, {useContext, useEffect, useMemo, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {BottomSheet, Input, Text} from '@/components/index';
import {getColor, tailwind} from '@/common/tailwind';
import {useLiveStreamStore, useStreamChatStore} from '@/common/stores';
import {
  Channel,
  Chat,
  MessageList,
  MessageInput,
  DeepPartial,
  Theme,
} from 'stream-chat-react-native';
import {useQuery} from 'react-query';
import {Icon} from 'react-native-elements';
import {useWindowDimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

/**
 * @type {DeepPartial<Theme>}
 */
const theme = {
  messageList: {
    container: {
      backgroundColor: 'transperant',
    },
  },
  messageSimple: {
    content: {
      textContainer: {
        backgroundColor: 'white',
      },
    },
  },
};

const sort = [{last_message_at: -1}];
const useChannel = cid => {
  const client = useStreamChatStore(s => s.STREAM_CHAT_INSTANCE);
  const memoizedFilters = useMemo(
    () => ({
      type: 'livestream',
      cid: {$eq: cid},
    }),
    [cid],
  );
  return useQuery(
    'channel',
    () =>
      client.queryChannels(memoizedFilters, sort, {watch: true}).then(res => {
        return res[0];
      }),
    {
      enabled: !!cid,
      staleTime: Infinity,
    },
  );
};

/**
 *
 *
 * @param {{channel_cid:string}} props
 */
export default function LiveChat({channel_cid}) {
  const client = useStreamChatStore(s => s.STREAM_CHAT_INSTANCE);
  const setChannel = useLiveStreamStore(s => s.setChannel);
  const {height} = useWindowDimensions();
  const {data: channel, isLoading, isSuccess} = useChannel(channel_cid);
  useEffect(() => {
    if (channel) {
      setChannel(channel);
    }
  }, [channel]);

  return (
    <View style={{height: height / 2.5}}>
      {channel ? (
        <Chat client={client} style={theme}>
          <Channel channel={channel} keyboardVerticalOffset={0}>
            <View style={{flex: 1}} />
            <View style={{flex: 2}}>
              <MaskedView
                style={{flex: 1}}
                maskElement={
                  <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                    style={{
                      flex: 1,
                    }}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}
                    locations={[0, 0.5]}
                  />
                }>
                <MessageList />
              </MaskedView>
              <Text style={tailwind('text-center text-white pb-1')}>
                Live comments will show up here
              </Text>
            </View>
          </Channel>
        </Chat>
      ) : (
        <View style={tailwind('justify-center items-center flex-1')}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
    </View>
  );
}
