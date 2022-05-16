import {tailwind, getColor} from '@/common/tailwind';
import {Bubble} from '@/components/Messaging';
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  Dispatch,
  useCallback,
} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  AppState,
  Platform,
} from 'react-native';
import Input from '@/components/Input';
import BaseStackHeader from '@/components/BaseStackHeader';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Avatar} from 'react-native-elements';
// import {SendBirdInstance, GroupChannel, UserMessage} from 'sendbird';
import {AppContext} from '@/common/contexts/AppContext';
import Button from '@/components/Button';
// import * as ImagePicker from 'expo-image-picker';
import useUpdateEffect from '@/common/hooks/useUpdateEffect';
import {AuthContext} from '@/common/contexts/AuthContext';
import {
  Channel,
  UserResponse,
  MessageResponse,
  ChannelAPIResponse,
} from 'stream-chat';
import {AxiosError} from 'axios';
/**
 *
 * TODO:
 *[]-refactor to axios instead of react query
 * []-handle failed sent messages
 * []-add retry feature to failed to send messages
 * [x]-handle quuery status when fetching message i.e. when a query is still processing avoid to
 * perform another query
 * []- add confirmation screen before sending file message
 * []- temporarily disable sending videos as message
 * []-restrict image size to 2mb
 * []-handle when sendbird.currentUser null
 * FIXME:
 * []-occsional react failed to perform state update/memory leak in
 * ChannelsHeader Component
 *
 */
const useMessages =
  /**
   *
   * @param {Channel} channel
   * @param {{inverted:Boolean}} opts
   * @returns
   */
  (channel, opts = {inverted: true}) => {
    const [status, setStatus] = useState('idle');
    /**
     * @type {[data:MessageResponse[]]}
     */
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const getData = useCallback(() => {
      const fn = async () => {
        try {
          // the id of the last message on the page
          setStatus('loading');
          const lastMessageId = channel.lastMessage().id;
          const result = await channel.query({
            messages: {
              limit: 20,
              id_lte: lastMessageId,
              offset: 0,
            },
          });
          setData(result.messages.reverse());
          setStatus('success');
        } catch (error) {
          setStatus('error');
          setError(error);
        }
      };
      fn();
    }, [channel]);
    const updateMessages = newMessage => {
      setData(prev => {
        return [newMessage, ...prev];
      });
    };
    useEffect(() => {
      if (channel?.cid) {
        console.log('channel.cid :>> ', channel);
        getData();
      }
    }, [channel]);

    return {
      data,
      isIdle: status === 'idle',
      isLoading: status === 'loading',
      isSuccess: status === 'success',
      isError: status === 'error',
      error,
      updateMessages,
      refetch: () => {
        channel?.cid !== undefined && channel.markRead();
        getData();
      },
    };
  };
/**
 *
 * @param {{route:RouteProp<any,any>,navigation:StackNavigationProp<any>}} param0
 */
export default function MessageConversation({navigation, route}) {
  const {StreamChatClient} = useContext(AppContext);
  /**
   * @type {{channel:Channel}}
   */
  const {channel} = route.params;
  const {data, isLoading, isSuccess, isError, refetch, updateMessages} =
    useMessages(channel);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!channel?.cid) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('MessagesScreen', {
          screen: 'Messages_Home',
        });
      }
    }
  }, [channel?.cid]);

  useEffect(() => {
    if (!isFocused) return;
    // Mark messages
    channel.markRead();

    const handleNewMessage = channelEvent => {
      if (isFocused) channel.markRead();
      updateMessages(channelEvent.message);
    };
    channel.on('message.new', handleNewMessage);
    return () => {
      channel.off('message.new', handleNewMessage);
    };
  }, [channel, isFocused]);

  useLayoutEffect(() => {
    let {user: inConversationWith} = Object.entries(channel.state.members).find(
      ([key, value]) => value.user_id !== StreamChatClient.userID,
    )[1];

    navigation.setOptions({
      header: props => (
        <BaseStackHeader {...props}>
          <View
            style={tailwind(
              'flex-row justify-between self-start items-center pl-4',
            )}>
            <Avatar
              source={{
                uri: inConversationWith?.image || null,
              }}
              size="medium"
              rounded
            />
            <View style={tailwind('ml-2')}>
              <Text
                style={[
                  tailwind('text-base font-bold text-white'),
                  {lineHeight: 16},
                ]}>
                {inConversationWith.name || 'Loading'}
              </Text>
              {inConversationWith?.online ? (
                <View style={tailwind('flex-row items-center')}>
                  <Text style={tailwind('text-base text-white')}>
                    {'Active Now'}
                  </Text>
                  <View
                    style={tailwind(
                      'w-2 h-2 bg-brand-primary rounded-full ml-1',
                    )}
                  />
                </View>
              ) : null}
            </View>
          </View>
        </BaseStackHeader>
      ),
    });
  }, [navigation, channel, StreamChatClient]);

  // /**
  //  *
  //  * @param {UserMessage} message
  //  */
  function handleSentMessage(message) {
    // setMessages((prev) => {
    //     let isMessageShown =
    //         prev.find((m) => m.reqId === message.reqId) !== undefined;
    //     if (isMessageShown) {
    //         return prev.map((m) => {
    //             if (m.reqId == message.reqId) {
    //                 return message;
    //             } else {
    //                 return m;
    //             }
    //         });
    //     } else {
    //         return [message, ...prev];
    //     }
    // });
  }

  if (isError) {
    return (
      <View style={tailwind('flex-1 bg-white')}>
        <View style={tailwind('items-center justify-center h-full ')}>
          <Text style={tailwind('text-lg text-red-500')}>Error</Text>
          <Text style={tailwind('text-base w-3/4 text-center')}>
            Something went wrong. Please try again.
          </Text>
          <Button
            title={'Try again'}
            buttonStyle={tailwind('bg-red-700')}
            containerStyle={tailwind('mt-10')}
            onPress={refetch}
            size="sm"
          />
        </View>
      </View>
    );
  }
  return (
    <View style={tailwind('flex-1')}>
      {isLoading ? (
        <View style={tailwind('justify-center items-center flex-1')}>
          <ActivityIndicator size="large" color={getColor('brand-primary')} />
        </View>
      ) : isSuccess ? (
        <MessageList conversation={data} channel={channel} />
      ) : null}
      <MessageField
        channel={channel}
        onSentMessage={handleSentMessage}
        onSendingMessage={updateMessages}
      />
    </View>
  );
}
/**
 *
 * @param {{conversation:MessageResponse[],channel:Channel}} props
 * @returns
 */
function MessageList({conversation, channel}) {
  let conversationList = conversation;
  const {StreamChatClient} = useContext(AppContext);

  const renderItem =
    /**
     *
     * @param {{item:MessageResponse}}
     * @returns
     */
    ({item, index}) => {
      return (
        <Bubble
          messageTheme="secondary"
          replyTheme="primary"
          type={item.user.id === StreamChatClient.userID ? 'reply' : 'message'}
          message={item}
          sameSender={
            index !== 0 && item.user.id == conversation[index - 1].user.id
          }
        />
      );
    };
  if (conversation.length === 0) {
    <View>
      <Text>No Message/s for this conversation</Text>
    </View>;
  }
  return (
    <FlatList
      inverted={true}
      contentContainerStyle={tailwind('py-6 px-3')}
      data={conversationList}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.id}`}
      showsVerticalScrollIndicator={false}
      // onEndReached={() => next()}
      // onEndReachedThreshold={0.5}
    />
  );
}
/**
 *
 * @param {{onSentMessage:Function<UserMessage>,channel:Channel}} props
 * @returns
 */
function MessageField({onSentMessage, onSendingMessage, channel}) {
  const [messageInput, setMessageInput] = useState('');
  const {StreamChatClient} = useContext(AppContext);
  function sendMessage() {
    if (messageInput.length > 0) {
      channel
        .sendMessage({
          text: messageInput,
        })
        .then(res => {
          console.log('res :>> ', res);
          onSentMessage(res.message);
        })
        .catch(err => {
          console.log('error sending message :>> ', err);
        });
      // onSendingMessage(pendingMessage);
      setMessageInput('');
    }
  }
  //   /**
  //    *
  //    * @param {ImagePicker.ImagePickerResult} params
  //    */
  async function sendFileMessage(params) {
    if (params?.cancelled) return;
    const ACCEPTED_EXTENSIONS = ['jpg', 'png', 'jpeg'];

    let filename = params.uri.split('/').pop();
    let extension = filename.split('.').pop().toLowerCase();
    console.log('filename :>> ', filename);
    if (!ACCEPTED_EXTENSIONS.includes(extension)) {
      // TODO: show prompt message image is not a valid image
      console.log('file is not supported :>> ');
      return;
    }

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let file = {
      uri: params.uri,
      name: filename,
      type,
    };

    const fileResponse = await channel
      .sendImage(params.uri, undefined, 'multipart/form-data')
      .then(response => response)
      .catch(
        /**
         *
         * @param {AxiosError} error
         *
         */
        error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('Error Data', error.response.data);
            console.log('Error Status', error.response.status);
            console.log('Error headers', error.response.headers);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error Message', error.message);
          }
          console.log('Error Config', error.config);
          return error;
        },
      );

    if (fileResponse?.file) {
      channel
        .sendMessage({
          attachments: [
            {
              type: 'image',
              thumb_url: fileResponse.file,
              asset_url: fileResponse.file,
            },
          ],
          text: messageInput,
        })
        .then(response => onSentMessage(response.file))
        .catch(err => {
          console.log(
            'error sending message with attachement, try again :>> ',
            err,
          );
        });
    }
  }
  return (
    <View style={tailwind('flex-row  items-center border-t bg-black p-3')}>
      <FileMessageField onChange={sendFileMessage} />
      <Input
        placeholder="Type a message..."
        theme="white"
        placeholderTextColor="white"
        onChangeText={setMessageInput}
        value={messageInput}
        size="sm"
        containerStyle={{
          ...tailwind('self-center flex-1 mb-0 ml-3'),
        }}
        inputStyle={{
          ...tailwind('border-0 bg-transparent text-white'),
        }}
        inputContainerStyle={tailwind('border-0')}
      />
      <TouchableOpacity onPress={sendMessage}>
        <Text style={tailwind('text-lg text-brand-primary font-bold')}>
          Send
        </Text>
      </TouchableOpacity>
    </View>
  );
}
// /**
//  *
//  * @param {{onChange:(params:ImagePicker.ImagePickerResult)=>any}} props
//  * @returns
//  */
function FileMessageField({onChange}) {
  //   /**
  //    * @type {[imageParams:ImagePicker.ImagePickerResult]}
  //    */
  const [imageParams, setImageParams] = useState(null);

  useUpdateEffect(() => {
    if (imageParams) {
      onChange(imageParams);
      setImageParams(null);
    }
  }, [imageParams]);

  const requestPermission = async () => {
    // if (Platform.OS !== 'web') {
    //   const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //   console.log('status :>> ', status);
    //   if (status !== 'granted') {
    //     // Alert.alert(
    //     //     "Permission Denied",
    //     //     "We need your permission to send an image",
    //     //     [
    //     //         {
    //     //             text: "OK",
    //     //             onPress: () => {},
    //     //         },
    //     //     ]
    //     // );
    //     alert('Sorry, we need camera roll permissions to make this work!');
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }
  };

  const pickImage = async () => {
    // const permissionGranted = await requestPermission();
    // console.log('permissionGranted :>> ', permissionGranted);
    // if (!permissionGranted) return;
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    // setImageParams(result);
  };
  return (
    <TouchableOpacity
      onPress={pickImage}
      style={{transform: [{rotate: '-45deg'}]}}>
      <Icon
        name="attach-outline"
        size={32}
        style={[tailwind('text-white z-10')]}
      />
    </TouchableOpacity>
  );
}
