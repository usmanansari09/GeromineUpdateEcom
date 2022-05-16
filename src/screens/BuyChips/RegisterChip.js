import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import GeroChip from '@/assets/gero-chip.png';
import Modal from 'react-native-modal';
import {useMutation, UseMutationOptions} from 'react-query';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Icon, Image} from 'react-native-elements';
import {Input, Button, Text} from '@/components/index';
import {getColor, tailwind} from '@/common/tailwind';
import API from '@/common/services/API';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
import {AuthContext} from '@/common/contexts/AuthContext';
import {VALIDATION} from '@/common/validation-messages';
import {useNavigation} from '@react-navigation/core';
import Toast from 'react-native-toast-message';
import {useModal} from '@/components/Modal';

/**
 *
 * @param {UseMutationOptions} opts
 * @returns
 */
const useRegisterChip = (opts = {}) => {
  const {accessToken, userId} = useContext(AuthContext);
  return useMutation(
    formData =>
      API(accessToken)
        .post(`profile/${userId}/chips/register`, formData)
        .then(res => res.data),
    opts,
  );
};
const schema = yup.object().shape({
  serial_number: yup.string().required(VALIDATION.required),
});
export default function RegisterChip() {
  const {mutate, isLoading, isSuccess, isError, reset} = useRegisterChip();
  const [isVisible, toggle] = useModal();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    reset: resetForm,
    errors,
  } = useForm({resolver: yupResolver(schema)});
  const registerChip = values => {
    if (isLoading) return;
    mutate(values, {
      onError: err => {
        Toast.show({
          type: 'error',
          text1: 'Failed to register chip, try again',
        });
      },
      onSuccess: data => {
        console.log('data :>> ', data);
        toggle(true);
      },
    });
  };
  return (
    <View style={[tailwind('flex-1 bg-gray-100 p-6')]}>
      <View style={tailwind('justify-center items-center mb-4')}>
        <Image source={GeroChip} style={tailwind('w-32 h-32 mb-4')} />
        <Text style={tailwind('text-base text-black font-bold text-center')}>
          Geronimo Chip Registration
        </Text>
        <Text style={tailwind('text-sm text-black text-center')}>
          Simply enter the serial number located on the back of your chip. Hit
          enter and you're ready to start selling
        </Text>
      </View>
      <Controller
        name="serial_number"
        defaultValue=""
        control={control}
        render={({onChange, onBlur, value}) => (
          <Input
            theme="secondary"
            label="Serial Number"
            type="underline"
            clear={true}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            errorMessage={errors?.serial_number?.message}
          />
        )}
      />

      <Button
        title="Enter"
        theme="primary"
        size="md"
        onPress={handleSubmit(registerChip)}
        loading={isLoading}
      />
      <Modal isVisible={isVisible}>
        <View style={tailwind('bg-white rounded-2xl p-4')}>
          <Icon
            type="ionicon"
            name="close"
            color={getColor('black')}
            containerStyle={tailwind('absolute right-0 top-0 pr-4 pt-4')}
            onPress={() => toggle()}
          />
          <View style={tailwind('mt-6 flex-row items-center justify-center')}>
            <Icon
              type="ionicon"
              name="checkmark-circle"
              color={getColor('black')}
            />
            <Text style={tailwind('text-black font-bold text-lg')}>
              Your Chip is Registered
            </Text>
          </View>
          <View style={tailwind('mt-4')}>
            <Text style={tailwind('text-center text-gray-400')}>
              Do you want to start selling?
            </Text>
            <Button
              containerStyle={tailwind('w-1/2 self-center mt-4')}
              title="Yes,Please"
              theme="primary"
              onPress={() => {
                toggle(false);
                navigation.navigate('My Store');
              }}
            />
            <Button
              containerStyle={tailwind('w-1/2 self-center mt-4')}
              title="Maybe Later"
              theme="black"
              onPress={() => {
                toggle(false);
                navigation.navigate('NotSellingOnGeronimo');
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
