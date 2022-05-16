import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {Button as RNEButton, ButtonProps} from 'react-native-elements';
import {getColor, tailwind} from '@/common/tailwind';

const sizes = {
  sm: tailwind('py-2 px-4 text-sm'),
  md: tailwind('py-2 px-4 text-2xl'),
  lg: tailwind('py-4  px-4 text-3xl'),
};
const titleStyles = {
  sm: tailwind('text-sm'),
  smLg: tailwind('text-lg'),
  md: tailwind('text-xl'),
  lg: tailwind('text-2xl'),
  extralg: tailwind('text-3xl'),
};
const buttonType = {
  solid: {
    primary: tailwind('text-white bg-brand-primary'),
    secondary: tailwind('text-white bg-brand-primary'),
    white: tailwind('text-brand-primary bg-white'),
    white_: tailwind('text-black bg-white'),
    black: tailwind('text-white bg-black'),
  },
  outline: {
    primary: {
      borderWidth: 2,
      borderColor: getColor('brand-primary'),
      backgroundColor: getColor('black'),
    },
    secondary: {
      borderWidth: 2,
      ...tailwind('text-white border-brand-primary'),
    },
    white: {
      borderWidth: 2,
      ...tailwind('text-white bg-white'),
      borderColor: getColor('black'),
    },
    black: {
      borderWidth: 2,
      ...tailwind('bg-black'),
      borderColor: getColor('white'),
    },
  },
  clear: {
    primary: {
      backgroundColor: getColor('transparent'),
    },
    secondary: {
      backgroundColor: getColor('transparent'),
    },
    white: {
      backgroundColor: getColor('transparent'),
    },
  },
};
const labelType = {
  solid: {
    primary: tailwind('text-white '),
    secondary: tailwind('text-white '),
    white: tailwind('text-brand-primary'),
    white_: tailwind('text-black'),
    black: tailwind('text-white'),
  },
  outline: {
    primary: tailwind('text-brand-primary'),
    secondary: tailwind('text-white '),
    white: tailwind('text-black'),
    black: tailwind('text-white'),
  },
  clear: {
    primary: tailwind('text-brand-primary'),
    secondary: tailwind('text-white '),
    white: tailwind('text-brand-primary'),
  },
};
const loadingColor = {
  primary: getColor('white'),
  secondary: getColor('white'),
  white: getColor('brand-primary'),
  black: getColor('white'),
};
const style = tailwind('rounded-xl');
const customLabelStyle = tailwind('font-bold');
const toTitleCase = (text = '') => {
  if (typeof text !== 'string') {
    return text;
  }

  let formatted = text.toLowerCase().split(' ');

  //Temporary solution for making button text uppercase
  if (text === 'Order Chips') {
    formatted = text.toUpperCase().split(' ');
  }

  for (var i = 0; i < formatted.length; i++) {
    formatted[i] = formatted[i].charAt(0).toUpperCase() + formatted[i].slice(1);
  }

  return formatted.join(' ');
};
/**
 *
 * @typedef {{
 *  size:'sm'|'md'|'lg',
 *  theme:'primary'|'secondary'|'white'|'black',
 * } & ButtonProps} GButtonProps
 */

/**
 * @param {GButtonProps} props
 */
export default function Button({
  size = 'md',
  theme,
  caseSensitive = false,
  ...rest
}) {
  const buttonAppeanceType = rest?.type ? rest.type : 'solid';
  const formattedTitle = useMemo(() => {
    if (caseSensitive) {
      return rest.title;
    } else {
      return toTitleCase(rest.title);
    }
  }, [rest.title]);
  return (
    <RNEButton
      {...rest}
      title={formattedTitle}
      TouchableComponent={TouchableOpacity}
      buttonStyle={{
        ...sizes[size],
        ...style,
        ...buttonType[buttonAppeanceType][theme],
        ...rest.buttonStyle,
      }}
      titleStyle={{
        ...titleStyles[size],
        ...customLabelStyle,
        ...labelType[buttonAppeanceType][theme],
        ...rest.titleStyle,
      }}
      iconContainerStyle={tailwind('ml-0')}
      loadingProps={{color: loadingColor[theme]}}
    />
  );
}
