/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, Text, UIManager, LayoutAnimation} from 'react-native';

import {tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import {useModal} from '@/components/Modal';

export default function CustomModal(props) {
  const {show, msg, btn, toggle} = props;

  // useEffect(() => {
  //   UIManager.setLayoutAnimationEnabledExperimental &&
  //     UIManager.setLayoutAnimationEnabledExperimental(true);
  //   LayoutAnimation.easeInEaseOut();
  // }, []);

  return (
    <View style={tailwind('items-center justify-center')}>
      <Modal
        isVisible={show}
        onBackButtonPress={toggle}
        // onBackdropPress={toggle}
      >
        <View
          style={tailwind(
            'bg-white rounded-xl p-4  mx-4 justify-center items-center',
          )}>
          <Icon
            type="ionicon"
            name="close"
            onPress={toggle}
            containerStyle={tailwind('items-end w-full')}
          />
          <Text
            style={tailwind('text-lg text-black font-bold text-center mb-4')}>
            {msg}
          </Text>
          <View style={tailwind('items-center')}>
            {btn?.map(button => (
              <Button
                style={[button?.style, tailwind('my-1')]}
                title={button?.text}
                theme={button?.theme}
                //   containerStyle={tailwind('w-1/1.5 mb-4')}
                onPress={button?.action}
              />
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}
