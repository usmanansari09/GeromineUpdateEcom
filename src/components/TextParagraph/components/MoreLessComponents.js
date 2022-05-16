import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import tailwind from 'tailwind-rn';

export default function MoreLessComponent({truncatedText, fullText, style}) {
  const [more, setMore] = React.useState(false);
  return (
    <Text style={[style, tailwind('flex-row')]}>
      {!more ? `${truncatedText}...` : fullText}
      <TouchableOpacity style={tailwind('')} onPress={() => setMore(!more)}>
        <Text style={[style, tailwind('text-blue-400 font-normal text-base')]}>
          {more ? '   ' : ' more'}
        </Text>
      </TouchableOpacity>
    </Text>
  );
}
