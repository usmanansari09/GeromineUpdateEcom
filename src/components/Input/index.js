import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Input as RNEInput, InputProps, Icon} from 'react-native-elements';
import {getColor, tailwind} from '@/common/tailwind';

const sizes = {
  sm: {...tailwind('py-2 text-lg'), lineHeight: 24},
  md: tailwind('py-4 text-2xl'),
  lg: tailwind('py-6 text-3xl'),
};

const inputType = {
  primary: {
    solid: tailwind('text-white'),
    outline: tailwind('text-white'),
    underline: tailwind('text-white'),
  },
  secondary: {
    solid: tailwind('text-black'),
    outline: tailwind('text-black'),
    underline: tailwind('text-black'),
  },
};
const inputContainerType = {
  primary: {
    solid: {
      ...{borderBottomWidth: 1},
      ...tailwind('rounded-lg bg-black px-3'),
    },
    outline: {
      ...{
        borderBottomWidth: 1,
        borderWidth: 1,
        borderColor: getColor('white'),
      },
      ...tailwind('rounded-lg bg-black px-3'),
    },
    underline: {
      ...{borderBottomWidth: 1},
      borderColor: getColor('white'),
      ...tailwind(' bg-black'),
    },
  },
  secondary: {
    solid: {
      ...{borderBottomWidth: 0},
      ...tailwind('rounded-lg bg-white px-3'),
    },
    outline: {
      ...{
        borderBottomWidth: 1,
        borderWidth: 1,
        borderColor: getColor('black'),
      },
      ...tailwind('rounded-lg bg-white px-3'),
    },
    underline: {
      borderBottomWidth: 1,
      borderColor: getColor('black'),
      ...tailwind(' bg-white'),
    },
  },
};
const labelType = {
  primary: tailwind('text-gray-400'),
  secondary: tailwind('text-black'),
};
const iconStyle = {
  primary: {
    solid: getColor('white'),
    outline: getColor('white'),
    underline: '#848484',
  },
  secondary: {
    solid: getColor('black'),
    outline: getColor('black'),
    underline: getColor('black'),
  },
};

const customLabelStyle = tailwind('font-normal text-base');
/**
 *
 * @param {{theme:'primary'|'secondary',size:"sm"|"md"|"lg",type:'solid'|'outline'|'outline'|'underline',mode:'default'|'password'|'number'|'search',clear:Boolean}& InputProps} props
 */
export default function Input({
  theme = 'primary',
  size = 'sm',
  type = 'solid',
  mode = 'default',
  clear = false,
  ...RNEInputProps
}) {
  const [isShown, setIsShown] = useState(false);
  const {errorMessage} = RNEInputProps;
  const ModeIcon = useCallback(() => {
    switch (mode) {
      case 'password': {
        return (
          <Icon
            onPress={() => setIsShown(prev => !prev)}
            type="ionicon"
            name={isShown ? 'eye-off-outline' : 'eye-outline'}
            color={iconStyle[theme][type]}
            containerStyle={tailwind('pr-2')}
          />
        );
      }
      case 'search': {
        return (
          <Icon
            type="ionicon"
            name="search"
            color={iconStyle[theme][type]}
            containerStyle={tailwind('pr-2')}
          />
        );
      }
      default: {
        return null;
      }
    }
  }, [mode, theme, type]);
  const isTextEntrySecured = useMemo(() => {
    if (mode === 'default') return false;
    return !(mode === 'password' && isShown);
  }, [isShown, mode]);
  const clearStyles = clear ? {backgroundColor: 'none'} : {};
  return (
    <RNEInput
      style={RNEInputProps.inputContainerStyle}
      rightIcon={() => <ModeIcon />}
      rightIconContainerStyle={tailwind('m-0 p-0')}
      {...RNEInputProps}
      inputStyle={{
        ...sizes[size],
        ...inputType[theme][type],
        ...RNEInputProps.inputStyle,
      }}
      containerStyle={StyleSheet.flatten([
        tailwind('p-0 mb-4'),
        RNEInputProps.containerStyle,
      ])}
      inputContainerStyle={StyleSheet.flatten([
        {borderBottomWidth: 0},
        inputContainerType[theme][type],
        clearStyles,
        RNEInputProps.inputContainerStyle,
        errorMessage ? tailwind('border-red-500') : {},
      ])}
      renderErrorMessage={false}
      secureTextEntry={isTextEntrySecured}
      labelStyle={StyleSheet.flatten([
        customLabelStyle,
        labelType[theme],
        RNEInputProps.labelStyle,
      ])}
      errorStyle={tailwind('text-red-500 text-sm')}
    />
  );
}
