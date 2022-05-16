import {tailwind, getColor} from '@/common/tailwind';
import format from 'date-fns/format';
import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Avatar, Image, Icon} from 'react-native-elements';
// import { FileMessage, UserMessage } from "sendbird";
const themeStyle = {
  primary: {
    user: tailwind('text-brand-primary'),
    time: tailwind('text-brand-primary'),
    message: tailwind('text-brand-primary'),
    background: tailwind('bg-brand-primary bg-opacity-20'),
  },
  secondary: {
    user: tailwind('text-white'),
    time: tailwind('text-gray-200'),
    message: tailwind('text-white'),
    background: tailwind('bg-gray-500'),
  },
  tertiary: {
    user: tailwind('text-white'),
    time: tailwind('text-gray-200'),
    message: tailwind('text-white'),
    background: tailwind('bg-gray-700'),
  },
};
/**
 *
 * @param {{type:'message'|'reply',replyTheme:"primary"|"secondary"|"tertiary",messageTheme:"primary"|"secondary"|"tertiary",message:UserMessage|FileMessage,sameSender:Boolean}} props
 */
export default function Bubble({
  type,
  replyTheme = 'primary',
  messageTheme = 'primary',
  message,
  sameSender,
}) {
  const bubblePosition =
    type === 'reply' ? tailwind('self-start') : tailwind('self-end');
  const selectedTheme =
    type === 'message' ? themeStyle[messageTheme] : themeStyle[replyTheme];
  return (
    <View
      style={[
        bubblePosition,
        tailwind('mb-3 w-full'),
        // { width: "50%" },
      ]}>
      <View style={[bubblePosition, tailwind('flex-row ')]}>
        {message.sendingStatus === 'pending' && (
          <ActivityIndicator
            size="small"
            color={getColor('brand-primary')}
            style={tailwind('self-end mr-2')}
          />
        )}
        <View style={[tailwind('flex-row '), {maxWidth: '75%', width: '100%'}]}>
          {type === 'reply' && !sameSender && (
            <Avatar
              rounded
              source={{
                uri: message.sender.profileUrl,
              }}
              containerStyle={tailwind('mr-1')}
            />
          )}
          {type === 'reply' && sameSender && <View style={tailwind('mr-9')} />}

          <View
            style={[
              tailwind('px-3 py-2 rounded-xl flex-1'),
              selectedTheme.background,
            ]}>
            <View style={tailwind('flex-row items-center flex-1')}>
              <Text style={[tailwind('text-sm font-bold'), selectedTheme.user]}>
                {message.sender.nickname}
              </Text>
              <View
                style={tailwind('w-1 mx-1 h-1 bg-brand-primary rounded-full')}
              />
              <Text style={[tailwind('text-sm'), selectedTheme.time]}>
                {format(message.createdAt, 'p')}
              </Text>
            </View>
            {message.isFileMessage() ? (
              <FileMessageAttachment url={message.url} />
            ) : (
              <Text style={[tailwind('text-sm'), selectedTheme.message]}>
                {message.message}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
function FileMessageAttachment({url}) {
  const IMAGE_MAX_SIZE = 240;
  const DEFAULT_IMAGE_WIDTH = 240;
  const DEFAULT_IMAGE_HEIGHT = 160;
  const [width, setWidth] = useState(DEFAULT_IMAGE_WIDTH);
  const [height, setHeight] = useState(DEFAULT_IMAGE_HEIGHT);
  useEffect(() => {
    if (!url) return;
    Image.getSize(url, (measureWidth, measureHeight) => {
      const scaleWidth = IMAGE_MAX_SIZE / measureWidth;
      const scaleHeight = IMAGE_MAX_SIZE / measureHeight;
      const scale = Math.min(
        scaleWidth <= scaleHeight ? scaleWidth : scaleHeight,
        1,
      );
      setWidth(measureWidth * scale);
      setHeight(measureHeight * scale);
    });
  }, [url]);
  return (
    <View>
      {url ? (
        <Image
          source={{uri: url}}
          onL
          style={{...tailwind('rounded-lg'), width, height}}
        />
      ) : (
        <View style={tailwind('flex-row items-center')}>
          <Icon name="image" type="ionicons" color={getColor('white')} />
          <Text style={tailwind('text-white')}>Sending Attachemnt</Text>
        </View>
      )}
    </View>
  );
}
