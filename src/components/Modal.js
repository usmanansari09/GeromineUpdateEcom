import {tailwind} from '@/common/tailwind';
import React from 'react';
import {useReducer} from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import {Icon} from 'react-native-elements';
import RNMOdal, {ModalProps} from 'react-native-modal';

/**
 *
 * @param {{hasDismiss:boolean,children:React.ReactNode,onClose:()=>void,containerStyle:StyleProp<ViewStyle>}& ModalProps} param0
 * @returns
 */
export default function Modal({
  hasDismiss = true,
  children,
  onClose = () => {},
  containerStyle = {},
  closeButton = true,
  ...RNModalProps
}) {
  return (
    <RNMOdal
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      {...RNModalProps}
      style={tailwind('px-4')}>
      <View style={tailwind('bg-white rounded-3xl')}>
        {closeButton && (
          <Icon
            type="ionicon"
            name="close"
            size={32}
            color="black"
            onPress={onClose}
            containerStyle={tailwind('p-1 self-end')}
          />
        )}
        <View style={tailwind(`px-6 ${!closeButton ? 'py-8' : 'pb-8'}`)}>
          {children}
        </View>
      </View>
    </RNMOdal>
  );
}
export function useModal() {
  return useReducer((s, a) => (typeof a === 'boolean' ? a : !s), false);
}
