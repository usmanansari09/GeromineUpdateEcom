import {tailwind} from '@/common/tailwind';
import Input from '@/components/Input';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '@/components/Button';
import Modal from 'react-native-modal';
import * as yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useMutation} from 'react-query';
import API from '@/common/services/API';
import {AuthContext} from '@/common/contexts/AuthContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppContext} from '@/common/contexts/AppContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const schema = yup.object().shape({
  brand: yup.string(),
  name: yup.string(),
  id: yup.string(),
  skew: yup.string(),
});
const useSearchProduct = () => {
  const {accessToken} = useContext(AuthContext);
  return useMutation(formData => {
    return API(accessToken)
      .post('product/seller/search', formData)
      .then(res => res.data);
  });
};
/**
 *
 * @param {{navigation:StackNavigationProp<any,any>}} param0
 * @returns
 */
export default function SearchProduct({navigation}) {
  const {handleSubmit, control, errors, watch} = useForm({
    resolver: yupResolver(schema),
  });
  const {ToastActions} = useContext(AppContext);
  const {mutate, data, isSuccess, isLoading, isError, reset} =
    useSearchProduct();
  const currentValues = watch();
  const insets = useSafeAreaInsets();
  function handleSearch(values) {
    console.log('values :>> ', values);
    if (isLoading) return;
    mutate(values, {
      onError: err => {
        ToastActions.current.show('Error encountered, Try again', 'error');
      },
      onSuccess: data => {
        const results = data.data;
        console.log('results :>> ', results);
        if (results.length) {
          navigation.navigate('search/results', {
            results: results,
            page: 1,
            values: values,
          });
        }
      },
    });
  }
  return (
    <View
      contentContainerStyle={[tailwind('p-6'), {paddingTop: insets.top}]}
      style={tailwind('bg-black flex-1')}>
      <Icon
        onPress={navigation.goBack}
        name="close-outline"
        size={40}
        style={tailwind('text-white self-end mt-7 mr-2')}
      />
      <Text
        style={tailwind(
          'uppercase font-bold text-white text-2xl text-center mt-5',
        )}>
        New product search
      </Text>
      <Text style={tailwind('text-white text-2xl text-center')}>
        Find your new products here!
      </Text>
      <View style={tailwind('mt-10 mx-5')}>
        <Controller
          name="brand"
          defaultValue={''}
          control={control}
          render={({onBlur, onChange}) => (
            <Input
              theme="primary"
              type="underline"
              label="Brand"
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={errors?.brand?.message}
            />
          )}
        />
        <Controller
          name="name"
          defaultValue="Test Product Name"
          control={control}
          render={({onBlur, onChange}) => (
            <Input
              label="Product Name"
              theme="primary"
              type="underline"
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue="Test Product Name"
              errorMessage={errors?.name?.message}
            />
          )}
        />
        <Controller
          name="id"
          defaultValue={''}
          control={control}
          render={({onBlur, onChange}) => (
            <Input
              theme="primary"
              type="underline"
              label="Product ID #"
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={errors?.id?.message}
            />
          )}
        />
        <Controller
          name="skew"
          defaultValue={''}
          control={control}
          render={({onBlur, onChange}) => (
            <Input
              theme="primary"
              type="underline"
              label="Skew"
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={errors?.skew?.message}
            />
          )}
        />
      </View>
      <Button
        loading={isLoading}
        onPress={handleSubmit(handleSearch)}
        title="Search"
        theme="primary"
        size="md"
        containerStyle={tailwind('mt-16 mx-5')}
      />
      <NoResultsFound
        show={isSuccess && data?.data?.length === 0}
        onClose={reset}
        onChange={query => {
          handleSearch({...currentValues, name: query});
        }}
      />
    </View>
  );
}
function NoResultsFound({show, onClose, onChange = () => {}}) {
  function handleSubmit(text) {
    onChange(text);
  }
  return (
    <Modal isVisible={show} onBackButtonPress={onClose}>
      <View style={tailwind('flex-1 bg-black')}>
        <Icon
          onPress={onClose}
          name="close-outline"
          size={40}
          style={tailwind('text-white self-end')}
        />
        <Text
          style={tailwind(
            'uppercase font-bold text-white text-2xl text-center mt-5',
          )}>
          Nothing Found
        </Text>
        <Text style={tailwind('text-white text-2xl text-center')}>
          Sorry, but nothing matched your search terms. Please try again.
        </Text>
        <View style={tailwind('mt-10')}>
          <Input
            containerStyle={tailwind('mt-10')}
            placeholder="What are you looking for?"
            size="sm"
            rightIcon={
              <Icon
                name="search-outline"
                size={32}
                style={tailwind('text-brand-primary')}
              />
            }
            returnKeyType="search"
            onSubmitEditing={e => handleSubmit(e.nativeEvent.text)}
          />
        </View>
      </View>
    </Modal>
  );
}
