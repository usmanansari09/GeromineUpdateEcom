import {getColor, tailwind} from '@/common/tailwind';
import {Bubble} from '@/components/Messaging';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
// import SendBird from 'sendbird';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
// import SendBirdDesk from 'sendbird-desk';
import Input from '@/components/Input';
import {AppContext} from '@/common/contexts/AppContext';
import GeroChip from '@/assets/gero-chip.png';
import useUpdateEffect from '@/common/hooks/useUpdateEffect';
// import * as ImagePicker from "expo-image-picker";
import Button from '@/components/Button';
import RequestConfirmation from './RequestConfirmation';
const TICKET_CLOSED_TYPES = [
  'NOTIFICATION_MANUAL_CLOSED',
  'SendBirdDesk.Message.DataType.TICKET_CLOSE',
];
const isMessageViewableByCustomer =
  // /**
  //  *
  //  * @param {SendBird.UserMessage | SendBird.FileMessage | SendBird.AdminMessage} message
  //  * @returns
  //  */
  message => {
    // console.log("message :>> ", message);

    let data = {};
    try {
      data = message.data ? JSON.parse(message.data || '{}') : null;
    } catch (e) {
      console.log('data property not found in message :>> ', e);
      return true;
    }

    // let isSystemMessage =
    //   message?.customType === 'SENDBIRD_DESK_ADMIN_MESSAGE_CUSTOM_TYPE';
    // let isAssigned = data?.type === SendBirdDesk.Message.DataType.TICKET_ASSIGN;
    // let isTransferred =
    //   data?.type === SendBirdDesk.Message.DataType.TICKET_TRANSFER;
    // let isClosed = TICKET_CLOSED_TYPES.includes(data?.type);

    // return !isSystemMessage && !isAssigned && !isTransferred && !isClosed;
  };
const isMessageRequestingClosure =
  // /**
  //  * @param {SendBird.UserMessage | SendBird.FileMessage | SendBird.AdminMessage} message
  //  */
  message => {
    const parsedData = JSON.parse(message?.data || '{}');
    // const isClosureInquired =
    //   parsedData.type === SendBirdDesk.Message.DataType.TICKET_INQUIRE_CLOSURE;
    // const closureInquiry = parsedData.body;
    // return (
    //   isClosureInquired &&
    //   closureInquiry?.state === SendBirdDesk.Message.ClosureState.WAITING
    // );
  };
// /**
//  *
//  * @param {{channel:SendBird.GroupChannel,ticket:SendBirdDesk.Ticket}} props
//  * @returns
//  */
export default function SupportMessages({channel, ticket}) {
  // /**
  //  * @type {[query:SendBird.MessageListQuery]}
  //  */
  const [query, setQuery] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isError, setIsError] = useState(null);
  const [requestsConfirmation, setRequestsConfirmation] = useState(false);
  // /**
  //  * @type {{sendbird:SendBird.SendBirdInstance}}
  //  */
  const {sendbird} = useContext(AppContext);

  // useEffect(() => {
  //   if (channel?.url) {
  //     sendbird.addChannelHandler(channel.url, channelHandler);
  //   }
  //   return () => {
  //     if (channel?.url) {
  //       sendbird.removeChannelHandler(channel.url);
  //     }
  //   };
  // }, [channel.url]);

  useEffect(() => {
    if (query) next(true);
  }, [query]);

  useEffect(() => {
    if (channel?.url) refresh();
  }, [channel.url]);

  const channelHandler = new sendbird.ChannelHandler();

  // channelHandler.onMessageReceived = (targetChannel, newMessage) => {
  //   channel.markAsRead();
  //   if (isMessageViewableByCustomer(newMessage)) {
  //     setMessages(prev => [newMessage, ...prev]);
  //   }
  //   if (isMessageRequestingClosure(newMessage)) {
  //     setRequestsConfirmation(true);
  //   }
  // };
  // channelHandler.onMessageUpdated = (channel, message) => {
  //     let data = JSON.parse(message.data);
  //     const isClosureInquired =
  //         data.type === SendBirdDesk.Message.DataType.TICKET_INQUIRE_CLOSURE;
  //     if (isClosureInquired) {
  //         const closureInquiry = data.body;

  //         switch (closureInquiry.state) {
  //             case SendBirdDesk.Message.ClosureState.WAITING:
  //                 // Implement your code for the UI when there is no response from the customer.
  //                 break;
  //             case SendBirdDesk.Message.ClosureState.CONFIRMED:
  //                 // Implement your code for the UI when the customer confirms to close the ticket.
  //                 break;
  //             case SendBirdDesk.Message.ClosureState.DECLINED:
  //                 // Implement your code for the UI when the customer declines to close the ticket.
  //                 break;
  //         }
  //     }
  // };

  const next = (reset = false) => {
    // to prevent stacking of query loading and to avoid QUERY_IN_PROGRESS error
    if (query.isLoading) return;

    if (query.hasMore) {
      query.limit = 20;
      query.reverse = true;

      query.load(function (fetchedMessages, err) {
        let viewableMessages = fetchedMessages.filter(m =>
          isMessageViewableByCustomer(m),
        );
        // Determine if last message was a request for confirmation to
        // close ticket and resolve the issue
        let hasRequestConfirmationMessage = isMessageRequestingClosure(
          viewableMessages[0],
        );

        if (!err) {
          if (hasRequestConfirmationMessage) setRequestsConfirmation(true);
          if (reset) {
            setMessages(viewableMessages);
          } else {
            setMessages(prev => {
              if (prev.length) {
                return [...prev, ...viewableMessages];
              } else {
                return viewableMessages;
              }
            });
          }
        } else {
          console.log('fetch messages err', err);
          setIsError('Failed to fetch messages,please check your connection');
        }
      });
    }
  };
  const refresh = () => {
    channel.markAsRead();
    setQuery(channel.createPreviousMessageListQuery());
  };
  // /**
  //  *
  //  * @param {SendBird.UserMessage} message
  //  */
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
  /**
   *
   * @param { "yes" | "no"} reply
   */
  function handleRequestFeedback(reply = 'no') {
    const textReply = {
      yes: 'This issue has been resolved.',
      no: "This issue hasn't been resolved yet.",
    };

    const params = new sendbird.UserMessageParams();
    params.message = textReply[reply];
    channel.sendUserMessage(params, (message, err) => {
      if (!err) {
        handleSentMessage(message);
        // SendBirdDesk.Ticket.confirmEndOfChat(
        //   message,
        //   'no',
        //   (currentTicket, error) => {
        //     if (!error) {
        //       setRequestsConfirmation(false);
        //       console.log('currentTicket :>> ', currentTicket);
        //     }
        //     console.log('error :>> ', error);
        //   },
        // );
      } else {
        console.log('Failed to send reply confirmation message :>> ', err);
      }
    });
  }
  const renderItem =
    /**
    //  *
    //  * @param {{item:SendBird.UserMessage|SendBird.FileMessage}} props
    //  * @returns
    //  */
    ({item, index}) => {
      return (
        <Bubble replyTheme="primary" messageTheme="secondary" message={item} />
      );
    };
  return (
    <View style={tailwind('flex-1')}>
      <FlatList
        inverted={true}
        contentContainerStyle={tailwind('p-6 ')}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}`}
        showsVerticalScrollIndicator={false}
        onEndReached={() => next()}
        onEndReachedThreshold={0.5}
      />
      <RequestConfirmation
        show={requestsConfirmation}
        onFeedBackDenied={() => handleRequestFeedback('no')}
        onFeedbackConfirmed={() => handleRequestFeedback('no')}
      />
      <MessageField onSentMessage={handleSentMessage} channel={channel} />
    </View>
  );
}
// /**
//  *
//  * @param {{onSentMessage:Function<UserMessage>,channel:Sendbird.GroupChannel}} props
//  * @returns
//  */
function MessageField({
  onSentMessage = () => {},
  onSendingMessage = () => {},
  channel,
}) {
  /**
   * @type{{sendbird:Sendbird.SendBirdInstance}}params
   */
  const {sendbird} = useContext(AppContext);
  const [messageInput, setMessageInput] = useState('');

  function sendMessage() {
    if (!channel) return;
    if (messageInput.length > 0) {
      const params = new sendbird.UserMessageParams();
      params.message = messageInput;

      const pendingMessage = channel.sendUserMessage(params, (message, err) => {
        if (!err) {
          onSentMessage(message);
        } else {
          console.log('Failed to send message :>> ', err);
          // setTimeout(() => {
          //     dispatch({
          //         type: "error",
          //         payload: { error: "Failed to send a message." },
          //     });
          //     dispatch({
          //         type: "delete-message",
          //         payload: { reqId: pendingMessage.reqId },
          //     });
          // }, 500);
        }
      });
      onSendingMessage(pendingMessage);
      setMessageInput('');
    }
  }
  return (
    <View style={tailwind('flex-row  items-center border-t bg-black px-3')}>
      {/* <FileMessageField /> */}
      <Input
        placeholder="Type a message..."
        theme="white"
        placeholderTextColor="white"
        onChangeText={setMessageInput}
        value={messageInput}
        size="sm"
        containerStyle={{
          ...tailwind('self-center flex-1 mb-0 ml-3 py-2'),
        }}
        inputStyle={{
          ...tailwind('border-0 bg-transparent text-white'),
        }}
        inputContainerStyle={tailwind('border-0')}
      />
      <TouchableOpacity
        onPress={sendMessage}
        style={tailwind('w-1/6 items-center justify-center')}>
        <Text style={tailwind('text-lg text-brand-primary font-bold')}>
          Send
        </Text>
      </TouchableOpacity>
    </View>
  );
}
function FileMessageField({onChange = () => {}}) {
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
    const permissionGranted = await requestPermission();
    console.log('permissionGranted :>> ', permissionGranted);
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
        type="ionicon"
        name="attach-outline"
        size={32}
        color={getColor('white')}
        style={[tailwind('z-10')]}
      />
    </TouchableOpacity>
  );
}
