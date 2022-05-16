import React from 'react';
import {Text} from 'react-native';

export default function MoreInfo({text, linesToTruncate}) {
  const [clippedText, setClippedText] = React.useState(false);
  return (
    <Text
      numberOfLines={linesToTruncate}
      ellipsizeMode={'tail'}
      onTextLayout={event => {
        const {lines} = event.nativeEvent;
        let text = lines
          .splice(0, linesToTruncate)
          .map(line => line.text)
          .join('');
        setClippedText(text.substr(0, text.length - 9));
      }}>
      {text}
    </Text>
  );
}
