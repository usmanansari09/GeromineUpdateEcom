import React, {useEffect, useState, useContext, useLayoutEffect} from 'react';
import {SafeAreaView, Dimensions, View} from 'react-native';
import {AuthContext} from '@/common/contexts/AuthContext';
import {useForm, Controller} from 'react-hook-form';
import {Text, Button, Input} from '@/components/index';
import {tailwind, getColor} from '@/common/tailwind';
import API from '@/common/services/API';
import StackHeader from '@/components/StackHeader';
import {useProfile} from '@/common/services/hooks';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const STORE_LENGTH = 128;

export default function StoreDescription({navigation, route}) {
  const {
    data: user,
    isLoading,
    isSuccess: isSuccessUser,
    isError,
  } = useProfile();
  const {isSignedIn, accessToken} = useContext(AuthContext);
  const [description, setDescription] = useState('');
  const [updating, setUpdating] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false); //modal

  const {control, errors, handleSubmit, reset: resetForm} = useForm();
  useEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader props={{...props, title: 'Set Store Description'}} />
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    if (isSuccessUser) {
      setDescription(user?.payload?.user?.store_description);
    }
  }, [isSuccessUser]);

  const descriptionUpdate = () => {
    const formdata = new FormData();
    formdata.append('store_description', description);

    setUpdating(true);
    //
    // navigation.navigate('StoreNavigation', {screen: 'StorePayment'});
    // return;
    //

    API(accessToken)
      .patch('user', formdata)
      .then(response => {
        console.log(
          `updateDescription success response ------> `,
          JSON.stringify(response?.data),
        );
        if (response.status === 200) {
          navigation.navigate('StoreNavigation', {
            screen: 'StorePayment',
          });
        }
        setUpdating(false);
        setIsSuccess(true);
      })
      .catch(error => {
        setUpdating(false);
        // Alert.alert('error', JSON.stringify(error));
        console.log(
          'updateProfile user error ----------> ',
          JSON.parse(JSON.stringify(error?.response?.data)),
        );
        // navigation.goBack();
      });
  };
  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color={getColor('brand-primary')}
        size="large"
        style={[
          tailwind('absolute inset-0 z-50'),
          {backgroundColor: 'rgba(128, 128, 128, 0.7)'},
        ]}
      />
    );
  }
  const plural = STORE_LENGTH - description?.length < 2 ? false : true;
  return (
    <SafeAreaView style={[tailwind('flex-1 items-center w-full')]}>
      <KeyboardAwareScrollView>
        {isLoading ? <LoadingIndicatorView /> : null}
        <View
          style={[
            tailwind(' flex-1 items-center w-full'),
            {paddingHorizontal: 38},
          ]}>
          <View style={tailwind('items-center ')}>
            <Text
              style={[
                tailwind('text-gray-800 text-center '),
                {
                  fontSize: 16,
                  top: 35,
                  fontWeight: '400',
                  color: '#000000',
                },
              ]}>
              Tell your buyers about your store and what you're selling
            </Text>
          </View>

          <View style={tailwind('w-full')}>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <Input
                  containerStyle={[tailwind('mt-10 w-full'), {top: 15}]}
                  labelStyle={{fontWeight: '800'}}
                  label=""
                  theme="secondary"
                  type="underline"
                  multiline={true}
                  placeholder="Enter your Description"
                  clear
                  style={[
                    tailwind('text-gray-500'),
                    {fontSize: 16, color: '#5A5A5A'},
                  ]}
                  onBlur={onBlur}
                  value={description}
                  onChangeText={text => {
                    if (
                      text?.length > STORE_LENGTH &&
                      text?.length < description?.length
                    ) {
                      setDescription(text);
                    } else if (text?.length > STORE_LENGTH) {
                    } else {
                      setDescription(text);
                    }
                  }}
                  errorMessage={''}
                />
              )}
              name={'description'}
            />
            <Text
              style={[
                tailwind('text-gray-400 text-right -mt-3'),
                {fontSize: 12, top: 15, color: '#5A5A5A'},
              ]}>
              {STORE_LENGTH - (description?.length || 0)}
              {` character${plural ? 's' : ''} left`}
            </Text>
          </View>

          <Button
            onPress={descriptionUpdate}
            title="Next"
            theme="black"
            size="smLg"
            loading={updating}
            containerStyle={[tailwind('mt-28 p-2 h-full'), {width: '50%'}]}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
