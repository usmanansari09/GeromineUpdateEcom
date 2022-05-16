import React from 'react';
import {Text} from 'react-native';

import MoreLessComponent from '@/components/TextParagraph/components/MoreLessComponents';

export default function TextParagraph({text, linesToTruncate, style}) {
  const [clippedText, setClippedText] = React.useState(false);
  return clippedText ? (
    <MoreLessComponent
      style={style}
      truncatedText={clippedText}
      fullText={text}
    />
  ) : (
    <Text
      numberOfLines={linesToTruncate}
      ellipsizeMode={'tail'}
      style={style}
      onTextLayout={event => {
        const {lines} = event.nativeEvent;
        if (lines?.length > linesToTruncate) {
          let text = lines
            .splice(0, linesToTruncate)
            .map(line => line.text)
            .join('');

          setClippedText(text.substring(0, text.length - 9));
        }
      }}>
      {text}
    </Text>
  );
}
