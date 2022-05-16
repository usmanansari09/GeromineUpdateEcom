import {tailwind, getColor} from '@/common/tailwind';
import {Bubble} from '@/components/Messaging';
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  Dispatch,
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

// import {
//   SendBirdInstance,
//   GroupChannel,
//   UserMessage,
//   PreviousMessageListQuery,
//   OpenChannel,
// } from 'sendbird';
import {AppContext} from '@/common/contexts/AppContext';
import Button from '@/components/Button';
// import * as ImagePicker from 'expo-image-picker';
import useUpdateEffect from '@/common/hooks/useUpdateEffect';

/**
 *
 * TODO:
 * []-handle failed sent messages
 * []-add retry feature to failed to send messages
 * []-handle quuery status when fetching message i.e. when a query is still processing avoid to
 * perform another query
 * []- add confirmation screen before sending file message
 * []- temporarily disable sending videos as message
 * []-restrict image size to 2mb
 * FIXME:
 * []-occsional react failed to perform state update/memory leak in
 * ChannelsHeader Component
 *
 */

/**
 *
 * @param {{channel:OpenChannel | GroupChannel}} props
 */
export default function Chat({channel = {}}) {
  // /**
  //  * @type {{sendbird:SendBirdInstance}}
  //  */
  const {sendbird} = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * @type {[query:PreviousMessageListQuery,setQuery:Dispatch<PreviousMessageListQuery>]}
   */
  const [query, setQuery] = useState(null);
  const {url: channel_url = null} = channel;

  useEffect(() => {
    if (!channel_url) return;
    sendbird.addChannelHandler(channel_url, channelHandler);
    let eventListner = AppState.addEventListener('change', handleStateChange);

    refresh();

    return () => {
      sendbird.removeChannelHandler(channel_url);
      // AppState.removeEventListener('change', handleStateChange);
      eventListner.remove()
    };
  }, [channel_url]);

  useEffect(() => {
    if (query) next(true);
  }, [query]);

  const handleStateChange = newState => {
    if (newState === 'active') {
      sendbird.setForegroundState();
    } else {
      sendbird.setBackgroundState();
    }
  };

  // Channel Events
  const channelHandler = new sendbird.ChannelHandler();
  channelHandler.onMessageReceived = (targetChannel, message) => {
    console.log('message :>> ', message);
    setMessages(prev => [message, ...prev]);
    // if (channel.isGroupChannel) {
    //     channel.markAsRead();
    // }
  };

  const next = (reset = false) => {
    if (query.hasMore && !query.isLoading) {
      query.limit = 20;
      query.reverse = true;
      query.load((fetchedMessages, err) => {
        if (!err) {
          console.log('fetchedMessages :>> ', fetchedMessages);
          if (reset) {
            setMessages(fetchedMessages);
          } else {
            setMessages(prev => {
              console.log('prev.length', prev.length);
              if (prev.length) {
                return [...prev, ...fetchedMessages];
              } else {
                return fetchedMessages;
              }
            });
          }
          setIsLoading(false);
        } else {
          console.log('fetch messages err', err);
          setIsError('Failed to fetch messages,please check your connection');
        }
      });
    }
  };
  const refresh = () => {
    // Call the markAsRead() when the current user views unread messages in a channel.
    // if (channel.isGroupChannel) {
    //     channel.markAsRead();
    // }
    setQuery(channel.createPreviousMessageListQuery());
  };

  /**
   *
   * @param {UserMessage} message
   */
  function handleSentMessage(message) {
    setMessages(prev => {
      let isMessageShown =
        prev.find(m => m.reqId === message.reqId) !== undefined;
      if (isMessageShown) {
        return prev.map(m => {
          if (m.reqId == message.reqId) {
            return message;
          } else {
            return m;
          }
        });
      } else {
        return [message, ...prev];
      }
    });
  }
  // /**
  //  *
  //  * @param { SendBird.UserMessage | SendBird.FileMessage } message
  //  * @param {number} index
  //  */
  function isSameSender(message, index) {
    if (sendbird.currentUser.userId === message.sender.userId || index === 0) {
      return;
    }
    let currentSender = message.sender.userId;
    let prevSender = messages[index - 1].sender.userId;

    return currentSender === prevSender;
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
      ) : !isLoading && messages.length === 0 ? (
        <View style={tailwind('justify-center items-center flex-1')}>
          <Text style={tailwind('text-white')}>No Comments</Text>
        </View>
      ) : (
        <FlatList
          inverted={true}
          contentContainerStyle={tailwind('p-6')}
          data={messages}
          renderItem={
            /**
             *
             * @param {{item:}} param0
             * @returns
             */
            ({item, index}) => (
              <Bubble
                messageTheme="secondary"
                replyTheme="tertiary"
                type={
                  sendbird.currentUser.userId !== item.sender.userId
                    ? 'reply'
                    : 'message'
                }
                message={item}
                sameSender={isSameSender(item, index)}
              />
            )
          }
          keyExtractor={(item, index) => `${index}`}
          showsVerticalScrollIndicator={false}
          onEndReached={() => next()}
          onEndReachedThreshold={0.5}
        />
      )}
      <MessageField
        channel={channel}
        onSentMessage={handleSentMessage}
        onSendingMessage={message => {
          setMessages(prev => {
            return [message, ...prev];
          });
        }}
      />
    </View>
  );
}

/**
 *
 * @param {{onSentMessage:Function<UserMessage>,channel:GroupChannel|OpenChannel}} props
 * @returns
 */
function MessageField({onSentMessage, onSendingMessage, channel}) {
  /**
   * @type{{sendbird:SendBirdInstance}}params
   */
  const {sendbird} = useContext(AppContext);
  const [messageInput, setMessageInput] = useState('');
  function sendMessage() {
    if (messageInput.length > 0) {
      const params = new sendbird.UserMessageParams();
      params.message = messageInput;

      const pendingMessage = channel.sendUserMessage(params, (message, err) => {
        if (!err) {
          onSentMessage(message);
        } else {
          console.log('Failed to send message :>> ', err);
        }
      });
      onSendingMessage(pendingMessage);
      setMessageInput('');
    }
  }
  //   /**
  //    *
  // //    * @param {ImagePicker.ImagePickerResult} params
  //    */
  function sendFileMessage(params) {
    // if (params?.cancelled) return;

    const ACCEPTED_EXTENSIONS = ['jpg', 'png', 'jpeg'];
    let filename = params.uri.split('/').pop();
    let extension = filename.split('.').pop().toLowerCase();

    if (!ACCEPTED_EXTENSIONS.includes(extension)) {
      // TODO: show prompt message image is not a valid image
      return;
    }

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    const fileParams = new sendbird.FileMessageParams();
    fileParams.file = {
      uri: params.uri,
      name: filename,
      type,
    };
    const pendingMessage = channel.sendFileMessage(
      fileParams,
      (message, err) => {
        if (!err) {
          // console.log("message :>> ", message);
          onSentMessage(message);
        } else {
          console.log('Failed to send file message :>> ', err);
        }
      },
    );
    onSentMessage(pendingMessage);
  }
  return (
    <View
      style={tailwind(
        'flex-row  items-center border-t bg-black bg-opacity-50 p-3 flex-shrink-0',
      )}>
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
    //     if (Platform.OS !== 'web') {
    //       const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //       console.log('status :>> ', status);
    //       if (status !== 'granted') {
    //         // Alert.alert(
    //         //     "Permission Denied",
    //         //     "We need your permission to send an image",
    //         //     [
    //         //         {
    //         //             text: "OK",
    //         //             onPress: () => {},
    //         //         },
    //         //     ]
    //         // );
    //         alert('Sorry, we need camera roll permissions to make this work!');
    //         return false;
    //       } else {
    //         return true;
    //       }
    //     }
  };

  const pickImage = async () => {
    const permissionGranted = await requestPermission();
    console.log('permissionGranted :>> ', permissionGranted);
    if (!permissionGranted) return;

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
      style={{transform: [{rotate: '45deg'}]}}>
      <Icon
        name="attach-outline"
        size={32}
        style={[tailwind('text-white z-10')]}
      />
    </TouchableOpacity>
  );
}
