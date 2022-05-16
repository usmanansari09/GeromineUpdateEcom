/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useImperativeHandle, forwardRef} from 'react';
import {View, Text, UIManager, LayoutAnimation} from 'react-native';

import {tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import {useModal} from '@/components/Modal';

function SellingModal(props, ref) {
  const {onAddNewProduct = () => {}, onExistingproduct = () => {}} = props;
  const [visible, toggle] = useModal();
  useEffect(() => {
    toggle();
  }, []);
  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    toggle: () => {
      toggle();
    },
  }));

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }, []);
  return (
    <View style={tailwind('items-center justify-center')}>
      <Modal
        isVisible={visible}
        onBackButtonPress={toggle}
        onBackdropPress={toggle}>
        <View
          style={tailwind(
            'bg-white rounded-xl p-4 justify-center items-center',
          )}>
          <Icon
            type="ionicon"
            name="close"
            onPress={toggle}
            containerStyle={tailwind('items-end w-full')}
          />
          <Text style={tailwind('text-lg text-black text-center font-bold')}>
            ARE YOU SELLING
          </Text>
          <View style={tailwind('flex-row items-center my-4')}>
            <Button
              title={'A New \n Product'}
              theme="primary"
              //   containerStyle={tailwind('w-1/1.5 mb-4')}
              // onPress={() => onPress()}
              onPress={() => {
                toggle(false);
                onAddNewProduct();
              }}
            />
            <Text
              style={tailwind('px-3 text-lg text-black text-center font-bold')}>
              or
            </Text>
            <Button
              title={'An Existing \n Product'}
              theme="primary"
              //   containerStyle={tailwind('w-1/1.5 mb-4')}
              // onPress={() => onPress()}
              onPress={() => {
                toggle(false);
                onExistingproduct();
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default forwardRef(SellingModal);
