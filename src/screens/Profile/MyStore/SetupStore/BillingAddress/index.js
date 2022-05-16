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
import {Text, Button, Input} from '@/components/index';
import {tailwind, getColor} from '@/common/tailwind';
import API from '@/common/services/API';
import StackHeader from '@/components/StackHeader';
import {useProfile} from '@/common/services/hooks';
import TouchableFields from '@/screens/Profile/AddProduct/components/TouchableFields';
import CountryPicker from 'react-native-country-picker-modal';
import {useMutation, UseMutationOptions} from 'react-query';
import {CommonActions} from '@react-navigation/routers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AddBillingAddress = opts => {
  const {accessToken} = useContext(AuthContext);
  return useMutation(
    values => API(accessToken).post(`seller/billing-address`, values),
    opts,
  );
};

export default function StoreBillingAddress({navigation, route}) {
  const {
    data: user,
    isLoading,
    isSuccess: isSuccessUser,
    isError,
  } = useProfile();

  const [country, setCountry] = useState('');
  const [fLName, setFLName] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [showCountry, setShowCountry] = useState('');

  const [isFail, setIsFail] = useState(false);

  const [updating, setUpdating] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); //modal

  const [isSuccessStripe, setIsSuccessStripe] = useState(false); //modal success

  const [errorMsg, setErrorMsg] = useState('');

  const formLabelSize = 18;

  const {
    mutate: mutateAddBillingAddress,
    isLoading: _isLoading,
    isError: _isError,
    isSuccess: _isSuccess,
    error,
  } = AddBillingAddress({
    onError: err => {
      setErrorMsg(err?.response?.data?.message);
      setIsFail(true);
      console.log('AddBillingAddress error :>> ', err?.response?.data);
    },
    onSuccess: response => {
      // setIsSuccessStripe(true);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: 'StoreSplashOut',
            },
          ],
        }),
      );
      console.log('AddBillingAddress successfully :>> ', response?.data);
    },
  });

  const {control, errors, handleSubmit, reset: resetForm} = useForm();
  useEffect(() => {
    navigation.setOptions({
      header: props => {
        return <StackHeader props={{...props, title: 'ADD BILLING ADDRESS'}} />;
      },
    });
  }, [navigation]);

  useEffect(() => {
    const _user = user?.payload?.user;
    if (isSuccessUser) {
      setCountry(_user?.country ?? '');
      setFLName(_user?.full_name ?? '');
      setAddress(_user?.address ?? '');
      setZip(_user?.zip_code ?? '');
      setState(_user?.state ?? '');
    }
  }, [isSuccessUser]);

  const DescriptionUpdate = () => {
    const formdata = new FormData();
    // formdata.append('store_description', description);

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
            {errorMsg
              ? `Error: ${errorMsg}`
              : 'An error occured while adding your Billing Address'}
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

  function SuccessModal() {
    return (
      <Modal isVisible={isSuccessStripe}>
        <View
          style={tailwind(
            'bg-white rounded-2xl p-4 items-center justify-center',
          )}>
          <Text
            style={tailwind('text-black text-center text-lg mb-4 font-bold')}>
            Billing Address added successfully
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
      {isLoading || _isLoading ? <LoadingIndicatorView /> : null}
      <View style={[tailwind('py-8 px-6 flex-1')]}>
        {/* <DescriptionUpdate /> */}
        <FailModal />
        <SuccessModal />
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
        <View style={tailwind('items-center px-4')}>
          <Text
            style={[
              tailwind('text-gray-800 text-2xl text-center capitalize '),
              // {fontSize: 24},
            ]}>
            Add your billing address
          </Text>

          <Text
            style={[
              tailwind('mt-2 text-gray-500 text-base text-center'),
              // {fontSize: 17},
            ]}>
            We need this for you to sell on Geronimo
          </Text>
        </View>

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
                label={'First Name & Last Name'}
                onBlur={onBlur}
                placeholder=""
                theme="secondary"
                type="underline"
                clear
                autoCapitalize="words"
                keyboardType="default"
                style={tailwind('')}
                value={fLName}
                inputStyle={tailwind('font-normal text-gray-600')}
                onChangeText={text => setFLName(text)}
                mandatory={true}
                errorMessage={
                  fLName?.length <= 3 && fLName?.length !== 0
                    ? 'Invalid Name'
                    : (fLName?.split(' ')?.length <= 1 &&
                        fLName?.length !== 0) ||
                      (fLName?.split(' ')?.length > 1 &&
                        !fLName?.split(' ').slice(-1)[0] &&
                        fLName?.length !== 0)
                    ? 'enter First & Last Name'
                    : ''
                }
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
                label="State, province or Region"
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
            name="City"
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <Input
                labelStyle={[
                  tailwind('font-black mt-2'),
                  {fontSize: formLabelSize},
                ]}
                label="City"
                onBlur={onBlur}
                placeholder=""
                theme="secondary"
                type="underline"
                clear
                value={city}
                inputStyle={tailwind('font-normal text-gray-600')}
                onChangeText={text => setCity(text)}
                mandatory={true}
                errorMessage={
                  city?.length < 3 && city.length !== 0
                    ? 'Invalid City Name'
                    : null
                }
              />
            )}
          />

          <Controller
            control={control}
            name="zip"
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <Input
                labelStyle={[
                  tailwind('font-black mt-2'),
                  {fontSize: formLabelSize},
                ]}
                label="Zip or Postal Code"
                onBlur={onBlur}
                placeholder=""
                theme="secondary"
                type="underline"
                clear
                keyboardType={'decimal-pad'}
                value={zip}
                inputStyle={tailwind('font-normal text-gray-600')}
                onChangeText={text => setZip(text)}
                mandatory={true}
                errorMessage={
                  zip?.length < 3 && zip.length !== 0
                    ? 'Invalid Zip Code'
                    : null
                }
              />
            )}
          />
        </View>
        <View style={tailwind('mb-24 items-center')}>
          <Button
            onPress={() => {
              mutateAddBillingAddress({
                country,
                fLName,
                address,
                state,
                city,
                zip,
              });

              // navigation.navigate('StoreNavigation', {
              //   screen: 'StoreSplashOut',
              // });
            }}
            style={tailwind('mt-10')}
            title="Next"
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
