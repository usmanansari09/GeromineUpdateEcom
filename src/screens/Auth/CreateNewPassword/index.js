import React, {
  useContext,
  useEffect,
  useState,
  useLayoutEffect,
  useReducer,
} from 'react';
import {View, Text, Alert} from 'react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import * as yup from 'yup';
import {VALIDATION} from '@/common/validation-messages';
import {useMutation} from 'react-query';
import API from '@/common/services/API';
import {AuthContext} from '@/common/contexts/AuthContext';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {CommonActions} from '@react-navigation/native';

import {tailwind} from '@/common/tailwind';
import {Icon} from 'react-native-elements';
import StackHeader from '@/components/StackHeader';
import CustomModal from '@/components/Modal/CustomModal';

const resetAction = CommonActions.reset({
  index: 0,
  routes: [{name: 'SignIn'}],
});

const schema = yup.object().shape({
  email: yup.string().required(VALIDATION.required),
  password: yup.string().required(VALIDATION.required),
  code: yup.string().required(),
});
// const useChangePassword = opts => {
//   return useMutation(formData =>
//     API()
//       .post(`/auth/forget-password/change-password`, {...formData, token: opts})
//       .then(res => res.data),
//   );
// };
export default function CreateNewPassword({navigation, route}) {
  const {handleSubmit, errors, control} = useForm({
    resolver: yupResolver(schema),
  });
  const [isLoading, setisLoading] = useState(false);
  const [password, setPassword] = useState('');

  const [errorModal, toggleErrorModal] = useReducer(s => !s, false);
  const [errorModalMessage, setErrorModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              iconName: 'arrow-back-outline',
              title: 'CREATE A NEW PASSWORD',
            }}
          />
        );
      },
    });
  }, [navigation]);

  // const {mutate, isLoading, isSuccess, isError} = useChangePassword(
  //   route.params.token,
  // );
  // const [requestError, setRequestError] = useState(null);

  // function changePassword(values) {
  //   console.log('ovaluespt iss', values);

  //   if (isLoading) return;
  //   mutate(
  //     {...values, _method: 'POST'},
  //     {
  //       onError: err => {
  //         console.log('change password error :>> ', err?.response?.data);
  //         const serverErrors =
  //           err?.response?.data?.errors?.email?.[0] || 'Error encountered.';
  //         setRequestError(serverErrors);
  //       },
  //       onSuccess: data => {
  //         console.log('change password resp :>> ', data);

  //         navigation.dispatch(resetAction);
  //       },
  //     },
  //   );
  // }
  const changePassword = () => {
    setisLoading(true);

    if (password?.length < 6) {
      setErrorModalMessage('Your password is weak.');
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
      return;
    } else {
      let params = {
        token: route.params.token,
        password: password,
      };
      console.log('forgot password:', {params});
      setisLoading(true);
      API()
        .post('/auth/forget-password/change-password', params)
        .then(function (response) {
          console.log('forgot password response', response);
          if (response.status === 200) {
            setisLoading(false);

            // Alert.alert('Alert', response.data.message, [
            //   {
            //     text: 'OK',
            //     onPress: () => {
            //       navigation.dispatch(
            //         CommonActions.reset({
            //           index: 0,
            //           routes: [{name: 'SignIn'}],
            //         }),
            //       );
            //     },
            //   },
            // ]);
            setErrorModalMessage(
              'Your Password has been successfully changed.',
            );
            toggleErrorModal();
            setModalButtons([
              {
                text: 'Close',
                style: {},
                theme: 'primary',
                action: () => {
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{name: 'SignIn'}],
                    }),
                  );
                },
              },
            ]);
          }

          // Alert.alert('Alert', response);
        })
        .catch(response => {
          console.log('error in create password', response?.response);
          if (response?.response?.status === 400) {
            setisLoading(false);
            setErrorModalMessage(response?.response?.data?.message);
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
            setErrorModalMessage('An error occured.');
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
    <View style={tailwind('bg-black flex-1 px-7')}>
      <CustomModal
        show={errorModal}
        msg={errorModalMessage}
        toggle={toggleErrorModal}
        btn={modalButtons || []}
      />
      <View style={tailwind('')}>
        {/* <View
          style={{
            // flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          {navigation.canGoBack() && (
            <Icon
              type="ionicon"
              name="arrow-back"
              color="white"
              size={32}
              onPress={() => navigation.canGoBack() && navigation.goBack()}
            />
          )}
          <Text style={tailwind('text-white text-2xl font-bold uppercase')}>
            Create a new password
          </Text>
        </View> */}

        <View style={tailwind('mt-10 items-center')}>
          <Controller
            control={control}
            name="password"
            defaultValue={''}
            render={({onChange, onBlur}) => (
              <Input
                label="Password"
                // onChangeText={onChange}
                onChangeText={text => setPassword(text)}
                type="underline"
                mode="password"
                onBlur={onBlur}
                value={password}
                errorMessage={errors?.password?.message}
              />
            )}
          />
          <Button
            onPress={changePassword}
            title="Create"
            loading={isLoading}
            size="md"
            theme="primary"
            containerStyle={tailwind('w-36 mt-8')}
          />
        </View>
      </View>
    </View>
  );
}
