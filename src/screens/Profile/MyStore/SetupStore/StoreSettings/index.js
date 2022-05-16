import React, {useEffect, useState, useContext, useLayoutEffect} from 'react';
import {SafeAreaView, Alert, View} from 'react-native';
import {AuthContext} from '@/common/contexts/AuthContext';
import {Icon, Image} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import {Text, Button, Input, Modal} from '@/components/index';
import {tailwind, getColor} from '@/common/tailwind';
import API from '@/common/services/API';
import {ChangeCoverPhoto} from '@/screens/Store/MyStore/components';
import StackHeader from '@/components/StackHeader';
import {useRefetchOnFocus} from '@/common/hooks';
import {useQueryClient} from 'react-query';

const STORE_LENGTH = 128;
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {useProfile} from '@/common/services/hooks';

export default function StoreSettings({navigation, route}) {
  const queryClient = useQueryClient();
  const query = useProfile();
  const {data: user} = query;
  useRefetchOnFocus(query);
  const {accessToken} = useContext(AuthContext);
  const [description, setDescription] = useState(
    user?.payload?.user?.store_description,
  );
  const [coverPhoto, setCoverPhoto] = useState(null);

  const [updateStoreSuccess, setUpdateStoreSuccess] = useState(false);
  const [updating, setUpdating] = useState(false);
  const {control, errors, handleSubmit, reset: resetForm} = useForm();

  useEffect(() => {}, [user]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              iconName: 'arrow-back-outline',
              title: 'Store Settings',
            }}
          />
        );
      },
    });
  }, [navigation]);
  function SuccessModal() {
    return (
      <Modal
        style={tailwind('px-2')}
        onClose={() => {
          // navigation.replace('Seller Store');
          setUpdateStoreSuccess(false);
        }}
        isVisible={updateStoreSuccess}>
        <View
          style={tailwind(
            'bg-white rounded-2xl p-4 items-center justify-center',
          )}>
          <Text
            style={tailwind('text-black text-center text-xl mb-6 font-bold')}>
            Store updated successfully!
          </Text>
          <Button
            title="Close"
            theme="primary"
            onPress={() => {
              navigation.goBack();
            }}
            containerStyle={tailwind('w-1/2')}
          />
        </View>
      </Modal>
    );
  }
  const updateStore = ({navigation}) => {
    setUpdating(true);
    const formdata = new FormData();
    formdata.append('store_description', description);
    ////////if photo comes from camera/gallery///////////
    if (coverPhoto?.uri) {
      formdata.append('cover[]', {
        uri: coverPhoto.uri.uri,
        type: coverPhoto.uri.type,
        name: 'coverPhoto.jpg',
      });
    }
    if (coverPhoto?.image) {
      formdata.append('cover', coverPhoto.image);
    }
    console.log('formData is----------', formdata);
    API(accessToken)
      .patch('user', formdata)
      .then(response => {
        console.log(
          `updateDescription success response ------> `,
          JSON.stringify(response?.data),
        );
        if (response.status == 200) {
          queryClient.invalidateQueries('user');
          setUpdateStoreSuccess(true);

          setUpdating(false);
        }
      })
      .catch(error => {
        setUpdating(false);
        // Alert.alert('error', JSON.stringify(error));
        console.log('updateProfile user error ----------> ', error),
          navigation.goBack();
      });
  };

  return (
    <KeyboardAwareScrollView
    // style={[tailwind('py-8 px-6 flex-1')]}
    >
      <ChangeCoverPhoto setCoverPhoto={setCoverPhoto} coverPhoto={coverPhoto} />
      <View style={tailwind('py-6 flex-1 px-6')}>
        <View>
          <View style={tailwind('mb-4')}>
            <Text style={tailwind('font-black text-lg')}>
              Store Description
            </Text>
          </View>
          <View style={tailwind('')}>
            <Text style={[tailwind('text-gray-800'), {fontSize: 16}]}>
              Tell your buyers about your store and what you're selling
            </Text>
          </View>

          <View style={tailwind('w-full')}>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <Input
                  containerStyle={tailwind('mt-10 w-full')}
                  labelStyle={{fontWeight: '800'}}
                  label=""
                  theme="secondary"
                  type="underline"
                  multiline={true}
                  placeholder="Enter your Description"
                  clear
                  style={[tailwind('text-gray-500'), {fontSize: 14}]}
                  onBlur={onBlur}
                  value={description}
                  onChangeText={text => {
                    if (
                      text?.length >= STORE_LENGTH &&
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
                tailwind(
                  `${
                    STORE_LENGTH - description?.length === 0
                      ? 'text-red-400'
                      : 'text-gray-400'
                  } text-right -mt-3`,
                ),
                {fontSize: 12},
              ]}>
              {STORE_LENGTH - description?.length}
              {STORE_LENGTH - description?.length < 2
                ? ' character left'
                : ' characters left'}
            </Text>
          </View>
        </View>

        <View style={tailwind('items-center mb-12')}>
          <Button
            onPress={updateStore}
            // onPress={() => navigation.navigate('PhotoGallery')}
            title="Save"
            theme="primary"
            size="smLg"
            loading={updating}
            containerStyle={[tailwind('mt-16 p-2 h-full'), {width: '50%'}]}
          />
        </View>
      </View>
      {SuccessModal()}
    </KeyboardAwareScrollView>
  );
}
