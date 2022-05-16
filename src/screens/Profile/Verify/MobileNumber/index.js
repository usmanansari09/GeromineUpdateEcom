import React, {
  ComponentProps,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import {View, Text, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import * as yup from 'yup';
import {tailwind} from '@/common/tailwind';
import {Input} from 'react-native-elements';
import {VALIDATION} from '@/common/validation-messages';
import Button from '@/components/Button';
import axios from 'axios';
import {useForm, Controller} from 'react-hook-form';
import API from '@/common/services/API';
import {useProfile} from '@/common/services/hooks';
import {yupResolver} from '@hookform/resolvers/yup';
import {AuthContext} from '@/common/contexts/AuthContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
const schema = yup.object().shape({
  email: yup.string().email(VALIDATION.email).required(VALIDATION.required),
});

const Stack = createStackNavigator();
export default function MobileNumberScreen({navigation}) {
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

function EnterNumber({navigation, ...phone}) {
  const {data} = useProfile();
  const [isLoading, setisLoading] = useState(false);
  const {accessToken} = useContext(AuthContext);
  const [phoneNo, setPhoneNo] = useState(data?.payload.user?.phone?.phone);

  const {errors, control} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const [requestError, setRequestError] = useState(null);

  const sendOtp = async () => {
    if (phoneNo === '') {
      alert('Please Enter Phone Number');
    } else {
      setisLoading(true);
      API(accessToken)
        .get('auth/verify-phone')
        .then(function (response) {
          if (response.status === 200) {
            if (response.status === 200) {
              setisLoading(false);

              Alert.alert('Alert', response.data.message, [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.navigate('EnterPhoneCode', {phone: phoneNo});
                  },
                },
              ]);
              // navigation.navigate('ForgotPassword');
            }
            // navigation.replace('HomeScreen');
          }

          // Alert.alert('Alert', response);
        })
        .catch(reason => {
          if (reason.response.status === 400) {
            alert(reason.response.data.message);
          }
          setisLoading(false);
        });
    }
  };

  return (
    <View style={tailwind('bg-black flex-1')}>
      <Text style={tailwind('text-lg text-gray-600 text-center mt-8')}>
        Please enter your mobile number and we’ll send you a reset code
      </Text>
      <View style={tailwind('items-center mt-8')}>
        <Controller
          control={control}
          name="Phone Number"
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <Input
              // onChangeText={text => setEmail(text)}
              onBlur={onBlur}
              value={phoneNo}
              clear
              type="underline"
              label="Phone Number"
              editable={false}
              keyboardType="phone-pad"
              errorMessage={errors?.email?.message}
              inputStyle={tailwind('text-white font-normal')}
              defaultValue=""
              autoCapitalize="none"
            />
          )}
        />
        <Button
          onPress={() => sendOtp()}
          title={'Verify'}
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
  const {data} = useProfile();
  const {accessToken} = useContext(AuthContext);
  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();
  const [one, setOne] = useState();
  const [two, setTwo] = useState();
  const [three, setThree] = useState();
  const [four, setFour] = useState();
  const [newPassword, setNewPassword] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [phoneNo, setPhoneNo] = useState(data?.payload.user?.phone?.phone);
  const veriftOTP = async () => {
    setisLoading(true);
    let params = {
      code: one + two + three + four,
    };
    API(accessToken)
      .post('auth/verify-phone', params)
      .then(res => {
        setisLoading(true);
        if (res.status === 200) {
          navigation.goBack();
        }
      })
      .catch(reason => {
        if (reason.response.status === 400) {
          alert(reason.response.data.message);
        }
        navigation.goBack();
        setisLoading(false);
      });
  };
  const sendOtp = async () => {
    setisLoading(true);
    API(accessToken)
      .get('auth/verify-phone')
      .then(function (response) {
        if (response.status === 200) {
          if (response.status === 200) {
            setisLoading(false);

            Alert.alert('Alert', response.data.message, [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('EnterPhoneCode', {phone: phoneNo});
                },
              },
            ]);
            // navigation.navigate('ForgotPassword');
          }
          // navigation.replace('HomeScreen');
        }

        // Alert.alert('Alert', response);
      })
      .catch(reason => {
        if (reason.response.status === 400) {
          alert(reason.response.data.message);
        }
        setisLoading(false);
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
      <Text style={tailwind('text-lg text-gray-600 text-center mt-8')}>
        Enter 4 digit code we have sent to {phoneNo}
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
            title={'Verify'}
            size="md"
            theme={'primary'}
            containerStyle={tailwind('mt-8')}
            onPress={veriftOTP}
            containerStyle={tailwind('w-36 mt-8')}
            loading={isLoading}
          />
        </View>
        <View style={tailwind('flex-row py-3 justify-center')}>
          <Text
            style={tailwind('text-white text-gray-400 text-lg font-normal')}>
            {' '}
            Don't receive the code?{' '}
          </Text>
          <TouchableOpacity onPress={() => sendOtp()}>
            <Text style={tailwind('text-brand-primary text-lg font-normal')}>
              {' '}
              Resend code{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
