import React, {useContext, useRef, useState, useReducer} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import * as yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {VALIDATION} from '@/common/validation-messages';
import API from '@/common/services/API';
import {useMutation} from 'react-query';
import {AuthContext} from '@/common/contexts/AuthContext';
// import Input from '@/components/Input';
import {Input} from 'react-native-elements';
import {Alert} from 'react-native';
import CustomModal from '@/components/Modal/CustomModal';

const schema = yup.object().shape({
  email: yup.string().email(VALIDATION.email).required(VALIDATION.required),
});

const useResetWithEmail =
  /**
   *
   * @param {UseMutationOptions} opts
   * @returns
   */
  opts => {
    const {accessToken} = useContext(AuthContext);
    return useMutation(formData => {
      return API(accessToken).post('password-reset/email', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }, opts);
  };

const Stack = createStackNavigator();
/**
 *
 * @param {{navigation:MaterialTopTabNavigationProp<any,any>}} props
 * @returns
 */
export default function MobileNumberScreen({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Enter Email" component={EnterEmail} />
      <Stack.Screen name="EnterCode" component={EnterCode} />
    </Stack.Navigator>
  );
}

function EnterEmail({navigation}) {
  const [email, setEmail] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const {errors, control} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const [requestError, setRequestError] = useState(null);

  const [errorModal, toggleErrorModal] = useReducer(s => !s, false);
  const [errorModalMessage, setErrorModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState([]);

  function resetPassword() {
    if (!email) {
      setErrorModalMessage('Please enter your email');
      toggleErrorModal();
      setModalButtons([
        {
          text: 'Close',
          style: {},
          theme: 'primary',
          action: toggleErrorModal,
        },
      ]);
    } else {
      setisLoading(true);
      let params = {
        email: email,
      };
      console.log(params);
      API()
        .post('auth/forget-password', params)
        .then(function (response) {
          // console.log('register Response', response?.status);
          if (response?.status === 200) {
            console.log(
              'auth/forget-password ----------------- ',
              response?.data,
            );
            setisLoading(false);
            setErrorModalMessage(response?.data?.message);
            toggleErrorModal();
            setModalButtons([
              {
                text: 'Close',
                style: {},
                theme: 'primary',
                action: () => {
                  navigation.navigate('EnterCode', email);
                },
              },
            ]);

            // Alert.alert('Alert', response.data.message, [
            //   {
            //     text: 'OK',
            //     onPress: () => {
            //       navigation.navigate('EnterCode', email);
            //     },
            //   },
            // ]);
            // navigation.navigate('ForgotPassword');
          }

          // Alert.alert('Alert', response);
        })
        .catch(reason => {
          console.log(
            'auth/forget-password API error:---------------------------- ',
            JSON.stringify(reason?.response?.data),
          );
          // Alert.alert(
          //   'Error',
          //   reason?.response
          //     ? reason.response?.data?.message
          //     : 'An error occured. Cannot send email at this time. Please contact the Admin.',
          //   [
          //     {
          //       text: 'OK',
          //     },
          //   ],
          // );

          setErrorModalMessage(
            reason?.response
              ? reason.response?.data?.message
              : 'An error occured. Cannot send email at this time. Please contact the Admin.',
          );
          toggleErrorModal();
          setModalButtons([
            {
              text: 'Close',
              style: {},
              theme: 'primary',
              action: toggleErrorModal,
            },
          ]);
          setisLoading(false);
        });
    }
    // if (isLoading) return;
  }
  return (
    <View style={tailwind('bg-black flex-1')}>
      <CustomModal
        show={errorModal}
        msg={errorModalMessage}
        toggle={toggleErrorModal}
        btn={modalButtons || []}
      />
      <View style={tailwind('bg-black')}>
        <View style={tailwind('items-center mt-8')}>
          {requestError !== null && (
            <View style={tailwind('bg-red-500 rounded-lg p-3 my-4')}>
              <Text style={tailwind('text-white text-sm')}>{requestError}</Text>
            </View>
          )}
          <Text style={tailwind('text-lg text-gray-600 text-center mb-5')}>
            Please enter your email and we’ll send you a reset code
          </Text>

          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <Input
                onChangeText={text => setEmail(text)}
                onBlur={onBlur}
                value={email}
                clear
                type="underline"
                label="Email"
                keyboardType="email-address"
                errorMessage={errors?.email?.message}
                inputStyle={tailwind('text-white font-normal')}
                defaultValue=""
                autoCapitalize="none"
              />
            )}
          />
          <Button
            onPress={() => resetPassword()}
            loading={isLoading}
            title={'Continue'}
            size="md"
            theme={'primary'}
            containerStyle={tailwind('w-36 mt-8')}
          />
        </View>
      </View>
    </View>
  );
}
const RESET_CODE_LENGTH = 4;
const CODE_ARRAY = Array.from({length: RESET_CODE_LENGTH}).fill(0);
const verifyCodeSchema = yup.object().shape({
  email: yup.string().required(VALIDATION.required),
  code: yup
    .string()
    .matches(/^\d+$/, 'Enter a valid code')
    .required(VALIDATION.required),
});
const useVerifyCode =
  /**
   *
   * @param {UseMutationOptions} opts
   * @returns
   */
  (opts = {}) => {
    const {accessToken} = useContext(AuthContext);
    return useMutation(
      formData =>
        API(accessToken)
          .post('password-reset/verification', formData)
          .then(res => res.data),
      opts,
    );
  };
function EnterCode({route, navigation}) {
  const inputRef1 = useRef(1);
  const inputRef2 = useRef(1);
  const inputRef3 = useRef(11);
  const inputRef4 = useRef(1);
  const [isLoading, setisLoading] = useState(false);
  const [one, setOne] = useState();
  const [two, setTwo] = useState();
  const [three, setThree] = useState();
  const [four, setFour] = useState();

  const [errorModal, toggleErrorModal] = useReducer(s => !s, false);
  const [errorModalMessage, setErrorModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState([]);

  const veriftOTP = async () => {
    if (!(one && two && three && four)) {
      setErrorModalMessage('Verification code is incorrect');
      toggleErrorModal();
      setModalButtons([
        {
          text: 'Close',
          style: {},
          theme: 'primary',
          action: toggleErrorModal,
        },
      ]);
      return;
    }
    setisLoading(true);
    let params = {
      email: route?.params,
      code: one + two + three + four,
    };
    console.log('====> params', params);
    API()
      .post('auth/forget-password/verify-email', params)
      .then(res => {
        setisLoading(true);
        if (res.status === 200) {
          navigation.navigate('CreateNewPassword', {
            email: route?.params,
            token: res.data.payload.token,
          });
        }
      })
      .catch(reason => {
        if (reason.response.status === 400) {
          setErrorModalMessage(reason?.response?.data?.message);
        } else {
          setErrorModalMessage('An error occured\nPlease try again.');
        }
        toggleErrorModal();
        setModalButtons([
          {
            text: 'Close',
            style: {},
            theme: 'primary',
            action: toggleErrorModal,
          },
        ]);
        setisLoading(false);
      });
  };
  const onTextChange1 = text => {
    text = (text.match(/[0-9]/g) || []).join('');

    if (text.length > 0) {
      setOne(text);
      inputRef2.current.focus();
    } else {
      setOne(text);
    }
  };
  const onTextChange2 = text => {
    text = (text.match(/[0-9]/g) || []).join('');

    if (text.length > 0) {
      setTwo(text);
      inputRef3.current.focus();
    } else {
      setTwo(text);
      if (text.length !== 0) {
        inputRef1.current.focus();
      }
    }
  };
  const onTextChange3 = text => {
    text = (text.match(/[0-9]/g) || []).join('');

    if (text.length > 0) {
      setThree(text);
      inputRef4.current.focus();
    } else {
      setThree(text);
      if (text.length !== 0) {
        inputRef2.current.focus();
      }
    }
  };
  const onTextChange4 = text => {
    text = (text.match(/[0-9]/g) || []).join('');
    if (text.length > 0) {
      setFour(text);
    } else {
      setFour(text);
      if (text.length !== 0) {
        inputRef3.current.focus();
      }
    }
  };
  const keyPress2 = event => {
    if (event.nativeEvent.key === 'Backspace') {
      inputRef1.current.focus();
    }
  };
  const keyPress3 = event => {
    if (event.nativeEvent.key === 'Backspace') {
      inputRef2.current.focus();
    }
  };
  const keyPress4 = event => {
    if (event.nativeEvent.key === 'Backspace') {
      inputRef3.current.focus();
    }
  };

  return (
    <View style={tailwind('flex-1 bg-black')}>
      <CustomModal
        show={errorModal}
        msg={errorModalMessage}
        toggle={toggleErrorModal}
        btn={modalButtons || []}
      />
      <Text
        style={tailwind('text-lg font-normal text-gray-600 text-center mt-8')}>
        Enter 4 digit code we have sent to {route.params}
      </Text>
      <View style={tailwind('mt-4')}>
        <View style={tailwind('flex-row')}>
          <Input
            ref={inputRef1}
            containerStyle={tailwind('w-1/4')}
            maxLength={1}
            inputStyle={tailwind('text-white text-center text-4xl font-bold')}
            keyboardType={'numeric'}
            onChangeText={text => onTextChange1(text)}
            value={one}
            autoFocus={true}
          />
          <Input
            ref={inputRef2}
            containerStyle={tailwind('w-1/4')}
            maxLength={1}
            inputStyle={tailwind('text-white text-center text-4xl font-bold')}
            keyboardType={'numeric'}
            onChangeText={text => onTextChange2(text)}
            value={two}
            onKeyPress={keyPress2}
            // autoFocus={focus2}
          />
          <Input
            ref={inputRef3}
            containerStyle={tailwind('w-1/4')}
            maxLength={1}
            inputStyle={tailwind('text-white text-center text-4xl font-bold')}
            keyboardType={'numeric'}
            onChangeText={text => onTextChange3(text)}
            value={three}
            onKeyPress={keyPress3}
            // autoFocus={focus3}
          />
          <Input
            ref={inputRef4}
            containerStyle={tailwind('w-1/4')}
            maxLength={1}
            inputStyle={tailwind('text-white text-center text-4xl font-bold')}
            keyboardType={'numeric'}
            onChangeText={text => onTextChange4(text)}
            value={four}
            returnKeyType="done"
            onKeyPress={keyPress4}
            // autoFocus={focus4}
          />
        </View>
        <View style={tailwind('mt-2 items-center')}>
          <Button
            title={'Continue'}
            size="md"
            theme={'primary'}
            // containerStyle={tailwind('mt-8')}
            onPress={veriftOTP}
            loading={isLoading}
            containerStyle={tailwind('w-36 mt-8')}
          />
        </View>
      </View>
    </View>
  );
}
