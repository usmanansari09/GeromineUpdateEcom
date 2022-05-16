import React, {useContext} from 'react';
import {View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useMutation, UseMutationOptions} from 'react-query';

import {tailwind} from '@/common/tailwind';
import schema from './addShippingSchema';
import {Button, Input, Text} from '@/components/index';
import API from '@/common/services/API';
import {AuthContext} from '@/common/contexts/AuthContext';
import StateField from './components/StateField';
import CountryField from './components/CountryField';
import Toast from 'react-native-toast-message';

/**
 *
 * @param {UseMutationOptions} opts
 * @returns
 */
const useAddShippingAddress = opts => {
  const {userId, accessToken} = useContext(AuthContext);

  return useMutation(
    values => API(accessToken).post(`profile/${userId}/address/create`, values),
    opts,
  );
};
export default function AddShippingAddress() {
  const {
    control,
    errors,
    handleSubmit,
    reset: resetForm,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const {mutate, isLoading, isError, isSuccess, error} = useAddShippingAddress({
    onError: err => {
      //
      console.log('add product error :>> ', err);
      console.log('add product error :>> ', err?.response);
      scrollViewRef.current?.scrollToPosition(0, 0);
    },
    onSuccess: response => {
      //
      console.log('added product successfully :>> ', response);
      Toast.show({
        type: 'success',
        text1: 'Shipping address added',
        position: 'bottom',
      });
      resetForm({});
    },
  });
  const phoneNumberLabel = () => {
    return (
      <View style={tailwind('flex-row')}>
        <Text style={tailwind('text-black font-bold text-base')}>
          Phone Number
        </Text>
        <Text style={tailwind('text-gray-600 text-base')}> (Optional)</Text>
      </View>
    );
  };
  /**
   *
   * @param {*} errorResponse
   * @returns {Array | String}
   */
  function handleAPIError(errorResponse) {
    return errorResponse?.response.data?.errors || 'Error Encountered, try again';
  }
  function addNewAddress(values) {
    if (isLoading) return;
    mutate(values);
  }
  return (
    <View
      style={tailwind('flex-1 bg-gray-100')}
      contentContainerStyle={tailwind('p-6')}>
      {isError && (
        <View style={tailwind('bg-red-500 rounded-lg p-3 mb-4')}>
          <Text style={tailwind('text-white text-sm')}>
            {Array.isArray(handleAPIError(error)) ? (
              handleAPIError(error).map((e, index) => (
                <Text style={tailwind('text-white text-sm')} key={index}>
                  {e}
                </Text>
              ))
            ) : (
              <Text> {handleAPIError(error)} </Text>
            )}
          </Text>
        </View>
      )}
      <View>
        <Controller
          control={control}
          name="country"
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <CountryField
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              error={errors?.country?.message}
            />
            // <Input
            //     label="Country"
            //     size="sm"
            //     theme="secondary"
            //     clear={true}
            //     type="underline"
            //     value={value}
            //     disabled={true}
            //     onBlur={onBlur}
            //     onChangeText={onChange}
            //     errorMessage={errors?.country?.message}
            // />
          )}
        />
        <Controller
          control={control}
          name="name"
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <Input
              label="Name"
              size="sm"
              theme="secondary"
              clear={true}
              type="underline"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors?.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="address"
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <Input
              label="Address"
              size="sm"
              theme="secondary"
              clear={true}
              type="underline"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors?.address?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="state"
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <StateField
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              error={errors?.state?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="zip_code"
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <Input
              label="Zip Code"
              size="sm"
              type="underline"
              theme="secondary"
              clear={true}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors?.zip_code?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <Input
              label={phoneNumberLabel}
              size="sm"
              theme="secondary"
              clear={true}
              type="underline"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors?.phone?.message}
            />
          )}
        />
      </View>
      <Button
        title="Save"
        size="md"
        style={tailwind('w-1/2 self-center mt-3 mb-5')}
        theme="primary"
        loading={isLoading}
        onPress={handleSubmit(addNewAddress)}
      />
    </View>
  );
}
