/* eslint-disable no-alert */
import React, {useState, useRef, useReducer} from 'react';
import {View, Text, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {tailwind} from '@/common/tailwind';
import {Input} from 'react-native-elements';
import Button from '@/components/Button';
import API from '@/common/services/API';
import CustomModal from '@/components/Modal/CustomModal';

const Stack = createStackNavigator();
export default function MobileNumberScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Enter Number" component={EnterNumber} />
      <Stack.Screen name="EnterPhoneCode" component={EnterPhoneCode} />
    </Stack.Navigator>
  );
}

function EnterNumber({navigation}) {
  const [phoneNo, setPhoneNo] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const [errorModal, toggleErrorModal] = useReducer(s => !s, false);
  const [errorModalMessage, setErrorModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState([]);

  const sendOtp = async () => {
    if (phoneNo === '') {
      // alert('Please Enter Phone Number');
      setErrorModalMessage('Please Enter Phone Number');
      toggleErrorModal();
      setModalButtons([
        {
          text: 'Close',
          style: {},
          theme: 'primary',
          action: toggleErrorModal,
        },
      ]);
    } else if (phoneNo?.length < 10) {
      setErrorModalMessage('Phone Number is incorrect');
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
      API()
        .post('auth/forget-password', {phone: phoneNo})
        .then(function (response) {
          console.log('register response', response);
          if (response.status === 200) {
            console.log('status is', response);
            setisLoading(false);
            navigation.navigate('EnterPhoneCode', {phone: phoneNo});

            // Alert.alert('Alert', response.data.message, [
            //   {
            //     text: 'OK',
            //     onPress: () => {
            // navigation.navigate('EnterPhoneCode', {phone: phoneNo});
            //     },
            //   },
            // ]);
            // navigation.navigate('ForgotPassword');

            // navigation.replace('HomeScreen');
          }
        })
        .catch(reason => {
          console.log(reason?.response);
          setisLoading(false);
          if (reason?.response?.status === 400) {
            setErrorModalMessage(reason?.response?.data?.message);
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
            setErrorModalMessage(
              reason?.response?.data?.message ||
                'An error Occurred, Please try again.',
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
          }
        });
    }
  };

  return (
    <View style={tailwind('bg-black flex-1')}>
      <CustomModal
        show={errorModal}
        msg={errorModalMessage}
        toggle={toggleErrorModal}
        btn={modalButtons || []}
      />
      <Text style={tailwind('text-lg text-gray-600 text-center mt-8')}>
        Please enter your mobile number and we’ll send you a reset code
      </Text>
      <View style={tailwind('items-center mt-8')}>
        <Input
          label="Phone Number"
          clear
          type="underline"
          keyboardType={'phone-pad'}
          inputStyle={tailwind('text-white font-normal')}
          onChangeText={text => setPhoneNo(text)}
        />
        <Button
          onPress={() => sendOtp()}
          title={'Continue'}
          size="md"
          theme={'primary'}
          containerStyle={tailwind('w-36 mt-8')}
          loading={isLoading}
        />
      </View>
    </View>
  );
}

function EnterPhoneCode({route, navigation}) {
  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();
  const [one, setOne] = useState();
  const [two, setTwo] = useState();
  const [three, setThree] = useState();
  const [four, setFour] = useState();
  const [isLoading, setisLoading] = useState(false);

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

    const {phone} = route.params;
    console.log('===>', one + two + three + four);
    let params = {
      phone: phone,
      code: one + two + three + four,
    };
    console.log('====> params', params);
    setisLoading(true);
    API()
      .post('auth/forget-password/verify-phone', params)
      .then(res => {
        console.log('909090==>', res);
        setisLoading(false);

        if (res.status === 200) {
          navigation.navigate('CreateNewPassword', {
            phone: phone,
            token: res.data.payload.token,
          });
        }
      })
      .catch(reason => {
        console.log(reason);
        setisLoading(false);
        if (reason.response.status === 400) {
          // alert(reason.response.data.message);
          setErrorModalMessage(reason?.response?.data?.message);
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
          setErrorModalMessage('An error occured, please try again.');
          toggleErrorModal();
          setModalButtons([
            {
              text: 'Close',
              style: {},
              theme: 'primary',
              action: toggleErrorModal,
            },
          ]);
        }
      });
  };
  const onTextChange1 = text => {
    text = (text.match(/[0-9]/g) || []).join('');

    if (text.length > 0) {
      setOne(text);
      input2.current.focus();
    } else {
      setOne(text);
    }
  };
  const onTextChange2 = text => {
    text = (text.match(/[0-9]/g) || []).join('');

    if (text.length > 0) {
      setTwo(text);
      input3.current.focus();
    } else {
      setTwo(text);
      if (text.length !== 0) {
        input1.current.focus();
      }
    }
  };
  const onTextChange3 = text => {
    text = (text.match(/[0-9]/g) || []).join('');

    if (text.length > 0) {
      setThree(text);
      input4.current.focus();
    } else {
      setThree(text);
      if (text.length !== 0) {
        input2.current.focus();
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
        input3.current.focus();
      }
    }
  };
  const keyPress2 = event => {
    if (event.nativeEvent.key === 'Backspace') {
      input1.current.focus();
    }
  };
  const keyPress3 = event => {
    if (event.nativeEvent.key === 'Backspace') {
      input2.current.focus();
    }
  };
  const keyPress4 = event => {
    if (event.nativeEvent.key === 'Backspace') {
      input3.current.focus();
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
      <Text style={tailwind('text-lg text-gray-600 text-center mt-8')}>
        Enter 4 digit code we have sent to {route.params?.phone}
      </Text>
      <View style={tailwind('mt-4')}>
        <View style={tailwind('flex-row')}>
          <Input
            ref={input1}
            containerStyle={tailwind('w-1/4')}
            maxLength={1}
            inputStyle={tailwind('text-white text-center text-4xl font-bold')}
            keyboardType={'numeric'}
            onChangeText={text => onTextChange1(text)}
            value={one}
            autoFocus={true}
          />
          <Input
            ref={input2}
            containerStyle={tailwind('w-1/4')}
            maxLength={1}
            inputStyle={tailwind('text-white text-center text-4xl font-bold')}
            keyboardType={'numeric'}
            onChangeText={text => onTextChange2(text)}
            value={two}
            onKeyPress={keyPress2}
          />
          <Input
            ref={input3}
            containerStyle={tailwind('w-1/4')}
            maxLength={1}
            inputStyle={tailwind('text-white text-center text-4xl font-bold')}
            keyboardType={'numeric'}
            onChangeText={text => onTextChange3(text)}
            value={three}
            onKeyPress={keyPress3}
          />
          <Input
            ref={input4}
            containerStyle={tailwind('w-1/4')}
            maxLength={1}
            inputStyle={tailwind('text-white text-center text-4xl font-bold')}
            keyboardType={'numeric'}
            onChangeText={text => onTextChange4(text)}
            value={four}
            returnKeyType="done"
            onKeyPress={keyPress4}
          />
        </View>
        <View style={tailwind('items-center')}>
          <Button
            title={'Continue'}
            size="md"
            theme={'primary'}
            // containerStyle={tailwind('mt-8')}
            onPress={veriftOTP}
            containerStyle={tailwind('w-36 mt-8')}
            loading={isLoading}
          />
        </View>
      </View>
    </View>
  );
}
