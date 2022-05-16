import {getColor, tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';

export default function DisplayPhoto() {
  const [isOpen, setIsOpen] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      setIsOpen(false);
    }
  }, [isFocused]);
  const {navigate} = useNavigation();
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={tailwind(
          'border border-white rounded-lg p-1 justify-center  items-center flex-1',
        )}>
        <Icon
          type="ionicon"
          name="camera-outline"
          size={32}
          color={getColor('white')}
        />
        <Text style={tailwind('text-white text-xs font-bold text-center')}>
          Change live stream
        </Text>
        <Text style={tailwind('text-white text-xs font-bold text-center')}>
          display photo
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={isOpen}
        onBackButtonPress={() => setIsOpen(false)}
        onBackdropPress={() => setIsOpen(false)}>
        <View style={tailwind('bg-white rounded-xl p-4')}>
          <Text style={tailwind('text-lg text-center text-black font-bold')}>
            Choose your live stream Display photo.
          </Text>
          <Button
            title="Take new photo"
            size="md"
            theme="primary"
            containerStyle={tailwind('mt-4')}
            onPress={() => navigate('CaptureDisplayPhoto')}
          />
          <Button
            title="Select existing photo on geronimo"
            size="md"
            theme="primary"
            containerStyle={tailwind('mt-4')}
            onPress={() => {
              navigate('StreamPhotos');
            }}
          />
        </View>
      </Modal>
    </>
  );
}
