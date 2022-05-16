import React, {useState} from 'react';
import {View} from 'react-native';
import {Input, Text} from '@/components/index';
import {Icon} from 'react-native-elements';
import {useLiveStreamStore} from '@/common/stores';
import {getColor, tailwind} from '@/common/tailwind';

export default function LiveChatInput() {
  const [message, setMessage] = useState('');
  const channel = useLiveStreamStore(s => s.channel);
  function handleSubmit() {
    if (message.length > 0 && channel) {
      channel
        .sendMessage({
          text: message,
        })
        .then(res => {
          setMessage('');
        })
        .catch(err => {
          console.log('error sending message :>> ', err);
        });
    }
  }
  return (
    <Input
      containerStyle={tailwind('flex-1 h-full mb-0 items-center flex-row pl-2')}
      inputStyle={tailwind('rounded-full text-white')}
      placeholder="Comment"
      theme="secondary"
      type="outline"
      onChangeText={setMessage}
      value={message}
      onSubmitEditing={handleSubmit}
      clear
      placeholderTextColor={getColor('white')}
      inputContainerStyle={[
        {borderColor: getColor('white')},
        tailwind('rounded-full'),
      ]}
      editable={false}
      rightIcon={
        <Icon
          type="ionicon"
          name="ellipsis-vertical"
          color={getColor('white')}
        />
      }
    />
  );
}
