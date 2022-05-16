import React, {useEffect, useState, useContext, useLayoutEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from '@/common/contexts/AuthContext';
import Modal from 'react-native-modal';
import {useForm, Controller} from 'react-hook-form';
import {Text, Button, Input} from '@/components/';
import {tailwind, getColor} from '@/common/tailwind';
import API from '@/common/services/API';
import StackHeader from '@/components/StackHeader';
import {useProfile} from '@/common/services/hooks';
import TouchableFields from '@/screens/Profile/AddProduct/components/TouchableFields';
import CountryPicker from 'react-native-country-picker-modal';
import {
  useMutation,
  UseMutationOptions,
  QueryClient,
  useQueryClient,
} from 'react-query';
import {CommonActions} from '@react-navigation/routers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AddShippingAddress = opts => {
  const {accessToken} = useContext(AuthContext);
  return useMutation(
    values => API(accessToken).post(`user/checkout/addShipping`, values),
    opts,
  );
};

export default function AddShipping({navigation, route}) {
  const [country, setCountry] = useState('');
  const [name, setname] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [showCountry, setShowCountry] = useState('');

  const queryClient = useQueryClient();

  const [isFail, setIsFail] = useState(false);

  const [validationFail, setValidationFail] = useState(false);

  const [updating, setUpdating] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); //modal

  const [isSuccessStripe, setIsSuccessStripe] = useState(false); //modal success

  const [errorMsg, setErrorMsg] = useState('');

  const formLabelSize = 17;

  const {
    mutate: mutateAddBillingAddress,
    isLoading: _isLoading,
    isError: _isError,
    isSuccess: _isSuccess,
    error,
  } = AddShippingAddress({
    onError: err => {
      setErrorMsg(err?.response?.data?.message);
      setIsFail(true);
      console.log('AddBillingAddress error :>> ', err?.response?.data);
    },
    onSuccess: response => {
      queryClient.invalidateQueries('buyer_shipping_addr', {exact: true});
      console.log('AddBillingAddress successfully :>> ', response?.data);
      navigation.goBack();
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              title: 'ADD NEW ADDRESS',
              iconName: 'arrow-back-outline',
            }}
          />
        );
      },
    });
  }, [navigation]);

  const {control, errors, handleSubmit, reset: resetForm} = useForm();

  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color={getColor('brand-primary')}
        size="large"
        style={[
          tailwind('absolute inset-0 z-50'),
          {backgroundColor: 'rgba(255, 255, 255, 1)'},
        ]}
      />
    );
  }

  function FailModal() {
    return (
      <Modal isVisible={isFail}>
        <View
          style={tailwind(
            'bg-white rounded-2xl p-4 items-center justify-center',
          )}>
          <Text
            style={tailwind('text-black text-center text-lg mb-4 font-bold')}>
            {'An error occured while adding your Shipping Address'}
          </Text>
          <Button
            title="Retry"
            theme="black"
            onPress={() => {
              setIsFail(false);
            }}
            containerStyle={tailwind('w-1/2')}
          />

          <Button
            title="Close"
            theme="primary"
            onPress={() => {
              setIsFail(false);
              setTimeout(() => {
                setIsSuccessStripe(false);
                navigation.canGoBack() && navigation.goBack();
              }, 200);
            }}
            containerStyle={tailwind('mt-2 w-1/2')}
          />
        </View>
      </Modal>
    );
  }

  function ValidationModal() {
    return (
      <Modal isVisible={validationFail} style={tailwind('p-6')}>
        <View
          style={tailwind(
            'bg-white rounded-2xl p-4 py-8 mb-4 items-center justify-center',
          )}>
          <Text
            style={tailwind('text-black text-center text-lg mb-6 font-bold')}>
            {'All fields are required.'}
          </Text>
          <Button
            title="Retry"
            theme="black"
            onPress={() => {
              setValidationFail(false);
            }}
            containerStyle={tailwind('w-1/2 mb-2')}
          />

          <Button
            title="Close"
            theme="primary"
            onPress={() => {
              setValidationFail(false);
            }}
            containerStyle={tailwind('mt-2 w-1/2')}
          />
        </View>
      </Modal>
    );
  }

  function SuccessModal() {
    return (
      <Modal isVisible={isSuccessStripe}>
        <View
          style={tailwind(
            'bg-white rounded-2xl p-4 items-center justify-center',
          )}>
          <Text
            style={tailwind('text-black text-center text-lg mb-4 font-bold')}>
            Shipping Address added successfully
          </Text>
          <Button
            title="Close"
            theme="primary"
            onPress={() => {
              // console.log(isSuccess);
              setTimeout(() => {
                setIsSuccessStripe(false);
                navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [
                      // {name: 'StoreNavigation'},
                      {
                        name: 'StoreSplashOut',
                      },
                    ],
                  }),
                );
                // navigation.dispatch(
                //   CommonActions.reset({
                //     index: 0,
                //     routes: [
                //       {name: 'Home'},
                //       // {
                //       //   name: 'StoreSplashOut',
                //       //   params: {isBillingAddrAdded: true},
                //       // },
                //     ],
                //   }),

                // navigation.navigate('StoreNavigation', {
                //   screen: 'StoreSplashOut',
                //   params: {isBillingAddrAdded: true},
                // });
              }, 200);
            }}
            containerStyle={tailwind('w-1/2')}
          />
        </View>
      </Modal>
    );
  }
  return (
    <KeyboardAwareScrollView>
      {_isLoading ? <LoadingIndicatorView /> : null}
      <View style={[tailwind('py-4 px-6 flex-1')]}>
        {/* <DescriptionUpdate /> */}
        <FailModal />
        <SuccessModal />
        <ValidationModal />
        <Modal isVisible={isSuccess}>
          <View
            style={tailwind(
              'bg-white rounded-2xl p-4 items-center justify-center',
            )}>
            <Text
              style={tailwind('text-black text-center text-lg mb-4 font-bold')}>
              Store Description updated successfully
            </Text>
            <Button
              title="Close"
              theme="primary"
              onPress={() => {
                setTimeout(() => {
                  setIsSuccess(false);
                  navigation.navigate('StoreNavigation', {
                    screen: 'StorePayment',
                  });
                }, 200);
              }}
              containerStyle={tailwind('w-1/2')}
            />
          </View>
        </Modal>

        <View style={tailwind('w-full')}>
          {/*  */}

          <Modal isVisible={showCountry}>
            <View style={tailwind('bg-white rounded-2xl p-4 h-full')}>
              <CountryPicker
                withFilter={true}
                withAlphaFilter={false}
                withModal={false}
                key={'asd1'}
                preferredCountries={['US', 'GB', 'CA', 'GE']}
                // onSelect={country => setCountry(country?.name || '')}
                onSelect={country => {
                  console.log(country);
                  setCountry(country?.name || '');
                }}
                onClose={() => setShowCountry(false)}
              />
            </View>
          </Modal>
          {/* FORMS */}
          <TouchableFields
            value={country}
            placeholder={'Select Country'}
            label={
              <View style={tailwind('flex-row')}>
                <Text
                  style={[
                    tailwind('font-black text-gray-800'),
                    {fontSize: formLabelSize},
                  ]}>
                  {'Country'}
                </Text>
                <Text style={[tailwind('text-red-600'), {fontSize: 14}]}>
                  {country ? '' : ' *'}
                </Text>
              </View>
            }
            labelSize={formLabelSize}
            onPress={() => setShowCountry(true)}
          />

          <Controller
            control={control}
            name="name"
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <Input
                labelStyle={[
                  tailwind('font-black mt-4'),
                  {fontSize: formLabelSize},
                ]}
                label={'Name'}
                onBlur={onBlur}
                placeholder=""
                theme="secondary"
                type="underline"
                clear
                autoCapitalize="words"
                keyboardType="default"
                value={name}
                inputStyle={tailwind('font-normal text-gray-600')}
                onChangeText={text => setname(text)}
                mandatory={true}
                // errorMessage={}
              />
            )}
          />

          <Controller
            control={control}
            name="Address"
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <Input
                labelStyle={[
                  tailwind('font-black mt-2'),
                  {fontSize: formLabelSize},
                ]}
                label="Address"
                onBlur={onBlur}
                placeholder=""
                theme="secondary"
                type="underline"
                clear
                value={address}
                inputStyle={tailwind('font-normal text-gray-600')}
                onChangeText={text => setAddress(text)}
                mandatory={true}
                errorMessage={
                  address?.length < 3 && address.length !== 0
                    ? 'Invalid Address'
                    : null
                }
              />
            )}
          />

          <Controller
            control={control}
            name="state"
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <Input
                labelStyle={[
                  tailwind('font-black mt-2'),
                  {fontSize: formLabelSize},
                ]}
                label="State"
                onBlur={onBlur}
                placeholder=""
                theme="secondary"
                type="underline"
                clear
                value={state}
                inputStyle={tailwind('font-normal text-gray-600')}
                onChangeText={text => setState(text)}
                mandatory={true}
                errorMessage={
                  state?.length < 2 && state.length !== 0
                    ? 'Invalid State, province or region Name'
                    : null
                }
              />
            )}
          />
          <Controller
            control={control}
            name="Zip Code"
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <Input
                labelStyle={[
                  tailwind('font-black mt-2'),
                  {fontSize: formLabelSize},
                ]}
                label="Zip Code"
                onBlur={onBlur}
                placeholder=""
                theme="secondary"
                type="underline"
                clear
                keyboardType={'phone-pad'}
                value={zip}
                inputStyle={tailwind('font-normal text-gray-600')}
                onChangeText={text => setZip(text)}
                mandatory={true}
                // errorMessage={
                //   city?.length < 3 && city.length !== 0
                //     ? 'Invalid City Name'
                //     : null
                // }
              />
            )}
          />

          <Controller
            control={control}
            name="Phone Number"
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <Input
                labelStyle={[
                  tailwind('font-black mt-2'),
                  {fontSize: formLabelSize},
                ]}
                label={
                  <View style={tailwind('flex-row')}>
                    <Text
                      style={[
                        tailwind('text-gray-900 font-black'),
                        {fontSize: formLabelSize},
                      ]}>
                      Phone Number
                    </Text>
                  </View>
                }
                onBlur={onBlur}
                placeholder=""
                theme="secondary"
                type="underline"
                clear
                keyboardType={'phone-pad'}
                value={phone}
                inputStyle={tailwind('font-normal text-gray-600')}
                onChangeText={text => setPhone(text)}
                // mandatory={true}
                // errorMessage={
                //   zip?.length < 3 && zip.length !== 0
                //     ? 'Invalid Zip Code'
                //     : null
                // }
              />
            )}
          />
        </View>
        <View style={tailwind('mb-24 items-center')}>
          <Button
            onPress={() => {
              if (country && name && address && state && zip && phone) {
                mutateAddBillingAddress({
                  name,
                  address,
                  state,
                  zip,
                  country,
                  phone,
                });
              } else {
                setValidationFail(true);
              }
              // navigation.goBack();
              // navigation.navigate('StoreNavigation', {
              //   screen: 'StoreSplashOut',
              // });
            }}
            style={tailwind('mt-10')}
            title="Save"
            theme="black"
            size="smLg"
            loading={updating}
            containerStyle={[tailwind('p-2 h-full'), {width: '50%'}]}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
