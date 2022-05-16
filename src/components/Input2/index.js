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
    underline: tailwind('text-gray-500'),
  },
};
const inputContainerType = {
  primary: {
    underline: {
      ...{borderBottomWidth: 1},
      borderColor: getColor('gray-300'),
    },
  },
};
const labelType = {
  primary: tailwind('text-gray-800'),
};
const iconStyle = {
  primary: {
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
        ...tailwind('font-medium text-base'),
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
