import {getColor, tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import React, {useState, useLayoutEffect, useContext, useEffect} from 'react';
import {View, Text, Alert, ActivityIndicator, Platform} from 'react-native';
import StackHeader from '@/components/StackHeader';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import CheckBox from '@/components/CheckBox';
import {AuthContext} from '@/common/contexts/AuthContext';
import API from '@/common/services/API';
import FormLabelText from '@/components/FormLabelText';
import {Controller} from 'react-hook-form';
import {useProfile} from '@/common/services/hooks';

import {
  useMutation,
  UseMutationOptions,
  QueryClient,
  useQueryClient,
} from 'react-query';

import {
  CardField,
  CardFieldInput,
  CardForm,
  useStripe,
  ApplePayButton,
  useApplePay,
  useGooglePay,
  GooglePayButton,
} from '@stripe/stripe-react-native';

import {
  clearCart,
  getCart,
  deleteFromCart,
  quantityMutateCart,
} from '@/common/appStorageService/cartService';

const AppleClientSecret = opts => {
  const {accessToken} = useContext(AuthContext);
  return useMutation(
    values => API(accessToken).post(`checkout/apple-pay`, values),
    opts,
  );
};

const payUsingCard = opts => {
  const {accessToken} = useContext(AuthContext);
  return useMutation(values => API(accessToken).post(`checkout`, values), opts);
};

export default function PlaceOrder({navigation, route}) {
  const {data: user} = useProfile();
  const {accessToken} = useContext(AuthContext);
  const [card, setCard] = useState('4242424242424242');
  const [expiry, setExpiry] = useState('10/22');
  const [cvv, setCVV] = useState('878');
  // const[saveInfo, setSaveInfo] = useState(false)
  // const[shipping_address, setShippingAddress] = useState('id')
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const [cardDetails, setCardDetails] = useState();

  const grandTotal = route?.params?.grandTotal;

  const shippingAddr = route?.params?.shippingAddr;

  const [isFail, setIsFail] = useState(false);

  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const [cart, setCart] = useState([]);

  const [failMsg, setFailMsg] = useState('');

  useEffect(() => {
    async function fetchMyCart() {
      let response = await getCart();
      setCart(response);
    }
    fetchMyCart();
  }, []);

  const {isApplePaySupported, presentApplePay, confirmApplePayPayment} =
    useApplePay();
  const {
    mutate: clientSecret,
    isLoading: _isLoading,
    isError: _isError,
    isSuccess: _isSuccess,
  } = AppleClientSecret({
    onError: err => {
      console.log('AppleClientSecret error is :>> ', JSON.stringify(err));
      setIsFail(true);
    },
    onSuccess: async response => {
      console.log('response is :>> ', response);

      if (response?.status === 200) {
        const {error: confirmError} = await confirmApplePayPayment(
          response?.data?.payload?.clientSecret,
        );

        if (confirmError) {
          console.log('confirmError is----', confirmError);
        } else {
          console.log('payment processed successfully');
          Alert.alert('Success', 'The payment was confirmed successfully.');

          mutatePayment({
            cart: cart?.map(el => {
              return {
                product: el?.product?._id,
                quantity: el.quantity,
              };
            }),
            clientSecret: response?.data?.payload?.clientSecret,
            isApplePay: true,
            saveInfo: false,
            shipping_address: shippingAddr,
          });

          setIsPaymentProcessing(false);
        }
      }
    },
  });

  const titleCase = s =>
    s.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );

  const {
    mutate: mutatePayment,
    isLoading: _paymentIsLoading,
    isError: _paymentIsError,
    isSuccess: _paymentIsSuccess,
  } = payUsingCard({
    onError: err => {
      console.log('AppleClientSecret error is :>> ', {err});

      let msg = err?.response?.data?.payload
        ? titleCase(err?.response?.data?.payload)
        : '';
      setFailMsg(msg);
      setTimeout(() => {
        setIsFail(true);
      }, 300);
    },
    onSuccess: async response => {
      if (response?.status === 200) {
        console.log('PayUsingCard response is :>> ', response?.data?.payload);
        navigation.navigate('cart/order/confirmed', {
          grandTotal,
          user: user?.payload?.user,
          cart,
          shippingAddr,
          payload: response?.data?.payload,
        });
      }
    },
  });

  const onPressApplePay = async () => {
    if (!isApplePaySupported) return;
    const cartItems = cart?.reduce((curr, val) => {
      return [
        ...curr,
        {
          amount: (val.quantity * val.product.price).toString(),
          label: val.product.name,
        },
      ];
    }, []);

    const {error} = await presentApplePay({
      cartItems: cartItems,
      country: 'US',
      currency: 'USD',
      // shippingMethods: [
      //   {
      //     amount: '20.00',
      //     identifier: 'DPS',
      //     label: 'Courier',
      //     detail: 'Delivery',
      //     type: 'final',
      //   },
      // ],
      requiredShippingAddressFields: ['emailAddress', 'phoneNumber'],
      requiredBillingContactFields: ['phoneNumber', 'name'],
    });
    if (error) {
      console.log('error is----', error);
    } else {
      await clientSecret({
        name: user?.payload?.user?.full_name,
        email: user.payload.user?.email?.email,
        total: grandTotal,
      });
    }
  };

  /* Google play */

  const {
    isGooglePaySupported,
    initGooglePay,
    presentGooglePay,
    loading: googlePlayLoading,
    createGooglePayPaymentMethod,
  } = useGooglePay();

  const [googlePlayInit, setGooglePlayInit] = useState(false);

  const [googlePlayButtonDisable, setGooglePlayButtonDisable] = useState(false);

  /* GPay init */
  const initialize = async () => {
    // if (!(await isGooglePaySupported({testEnv: true}))) {
    //   Alert.alert('Google Pay is not supported.');
    //   return;
    // }

    const {error} = await initGooglePay({
      testEnv: true,
      merchantName: 'Test',
      countryCode: 'US',
      billingAddressConfig: {
        format: 'FULL',
        isPhoneNumberRequired: true,
        isRequired: true,
      },
      existingPaymentMethodRequired: false,
      isEmailRequired: true,
    });

    if (error) {
      Alert.alert(error?.code, error?.message);
      return;
    }
    setGooglePlayInit(true);
  };

  /* Gpay */

  useEffect(() => {
    if (Platform.OS === 'android') {
      initialize();
    }
  }, []);

  const onPressGooglePay = async () => {
    let googleClientSecret;
    setIsPaymentProcessing(true);
    setGooglePlayButtonDisable(true);
    try {
      const res = await API(accessToken).post(`checkout/google-pay`, {
        name: user?.payload?.user?.full_name,
        email: user?.payload?.user?.email?.email,
        total: grandTotal,
      });

      console.log('onPressGooglePay client secret: ', res?.data?.payload);

      googleClientSecret = res?.data?.payload?.clientSecret;

      // const {error} = await presentGooglePay({
      //   clientSecret,
      //   forSetupIntent: false,
      // });

      const {error} = await presentGooglePay({
        clientSecret: googleClientSecret,
        forSetupIntent: false,
      });

      if (error) {
        // Alert.alert(error.code, error.message);
        setIsFail(true);
        setIsPaymentProcessing(false);
        setTimeout(() => {
          setGooglePlayButtonDisable(false);
        }, 1000);
        return;
      }

      Alert.alert('Success', 'The payment was confirmed successfully.');

      mutatePayment({
        clientSecret,
        isGooglePay: true,
        saveInfo: false,
        shipping_address: shippingAddr,
      });

      setIsPaymentProcessing(false);
      // navigation.navigate('cart/order/confirmed', {
      //   grandTotal,
      //   user,
      //   cart,
      //   shippingAddr,
      // });

      setGooglePlayInit(false);
    } catch (error) {
      if (error?.response?.data?.payload) {
        console.error(error?.response?.data?.payload);
      }
      console.error(error);
    }

    setTimeout(() => {
      setGooglePlayButtonDisable(false);
    }, 1000);
  };

  /*  */
  /*  */
  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              title: 'PAYMENT',
              iconName: 'arrow-back-outline',
            }}
          />
        );
      },
    });
  }, [navigation]);

  function FailModal() {
    return (
      <Modal
        isVisible={isFail}
        collapsable={true}
        onClose={() => setIsFail(false)}>
        <View
          style={tailwind('bg-white rounded-2xl  items-center justify-center')}>
          <Text
            style={tailwind('text-black text-center text-lg mb-4 font-bold')}>
            {`${failMsg || 'Payment Unsuccessful'}, Please try again.`}
          </Text>
          <Button
            title="Retry"
            theme="black"
            onPress={() => {
              setIsFail(false);
              setGooglePlayButtonDisable(false);
            }}
            containerStyle={tailwind('w-1/2')}
          />

          <Button
            title="Go Back"
            theme="primary"
            onPress={() => {
              setIsFail(false);
              setTimeout(() => {
                navigation.canGoBack() && navigation.goBack();
              }, 200);
            }}
            containerStyle={tailwind('mt-2 w-1/2')}
          />
        </View>
      </Modal>
    );
  }

  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color={getColor('brand-primary')}
        size="large"
        style={[tailwind('absolute inset-0 z-50')]}
      />
    );
  }
  if (isPaymentProcessing || _isLoading || _paymentIsLoading) {
    return <LoadingIndicatorView />;
  }
  return (
    <ScrollView>
      <FailModal />

      <View style={tailwind('p-6 flex-1 bg-gray-50')}>
        {isApplePaySupported && (
          <ApplePayButton
            onPress={onPressApplePay}
            type="plain"
            buttonStyle="black"
            borderRadius={4}
            style={{
              width: '100%',
              height: 50,
            }}
          />
        )}

        {/* GPay */}
        {Platform.OS === 'android' && (
          <GooglePayButton
            disabled={
              !googlePlayInit || googlePlayLoading || googlePlayButtonDisable
            }
            // style={styles.payButton}
            style={{
              width: '100%',
              height: 50,
            }}
            type="pay"
            onPress={onPressGooglePay}
          />
        )}

        {/*  */}

        <View style={tailwind('flex-1')}>
          <View
            style={tailwind(
              'flex-1 flex-row py-3 items-center justify-center',
            )}>
            <View style={[tailwind('border-b border-gray-300 px-16')]}></View>
            <Text style={tailwind('text-sm text-gray-500')}>
              {' '}
              Or pay using{' '}
            </Text>
            <View style={tailwind('border-b border-gray-300 px-16')}></View>
          </View>
          <View style={tailwind('py-3')}>
            <Text style={tailwind('text-left font-bold text-sm')}>
              DEBIT OR CREDIT CARD
            </Text>

            <Text style={[tailwind('py-3 flex-wrap text-sm text-gray-600')]}>
              We do not share your personal details with the merchant.
            </Text>

            <View>
              <CardField
                accessible={true}
                autofocus={false}
                postalCodeEnabled={false}
                dangerouslyGetFullCardDetails={true}
                // placeholder={{
                //   number: '4242 4242 4242 4242',
                //   cvc: '123',
                // }}
                cardStyle={{
                  backgroundColor: '#FFFFFF',
                  textColor: '#000000',
                }}
                style={{
                  width: '100%',
                  height: 50,
                  marginVertical: 20,
                }}
                onCardChange={cardDetails => {
                  setCardDetails(cardDetails);
                }}
                onFocus={focusedField => {
                  // console.log('focusField', focusedField);
                }}
              />
              {/* {cardDetails?.complete === false && (
                <Text style={tailwind('text-red-500')}>
                  Card details are either invalid or incomplete.
                </Text>
              )} */}
            </View>
          </View>
        </View>

        <View style={tailwind('flex-row items-center')}>
          <CheckBox value={selected} onValueChange={setSelected} />
          <Text style={tailwind('text-gray-600 py-6')}>
            {' '}
            Save this card for future Geronimo payments.{' '}
          </Text>
        </View>
        <Button
          onPress={() => {
            mutatePayment({
              cart: cart?.map(el => {
                return {
                  product: el?.product?._id,
                  quantity: el.quantity,
                };
              }),
              card: cardDetails?.number,
              expiry: `${cardDetails?.expiryMonth}/${cardDetails?.expiryYear}`,
              cvv: '878',
              saveInfo: false,
              shipping_address: shippingAddr,
            });
            // navigation.replace('cart/order/confirmed');
            // console.log({cardDetails});
            // setIsFail(true);

            // navigation.navigate('cart/order/confirmed', {
            //   grandTotal,
            //   user: user?.payload?.user,
            //   cart,
            //   shippingAddr,
            //   // payload: response?.data?.payload,
            // });
          }}
          loading={_paymentIsLoading}
          // disabled={_paymentIsLoading}
          disabled={_paymentIsLoading || !cardDetails?.complete}
          style={tailwind(' py-8')}
          title={`Pay USD $${grandTotal}`}
          titleStyle={tailwind('uppercase')}
          size="md"
          theme="primary"
        />
      </View>
    </ScrollView>
  );
}
