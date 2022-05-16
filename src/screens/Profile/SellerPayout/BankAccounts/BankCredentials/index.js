import {tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import Input from '@/components/Input';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Icon, Image} from 'react-native-elements';

export default function BankCredentials({route, navigation}) {
  const [isSuccess, setIsSuccess] = useState(false);
  return (
    <View style={tailwind('flex-1 bg-gray-100 p-6')}>
      {isSuccess ? (
        <View style={tailwind('flex-1 justify-between')}>
          <View>
            <Icon type="ionicon" name="checkmark-circle-outline" size={128} />
            <Text
              style={tailwind('text-black text-base  text-center font-bold')}>
              Your account is successfully connected to Geronimo App
            </Text>
          </View>
          <Button
            title="Continue"
            theme="black"
            size="md"
            onPress={() => navigation.navigate('bank-accounts')}
          />
        </View>
      ) : (
        <>
          <Image containerStyle={tailwind('h-32 bg-gray-200 mb-4')} />
          <View>
            <Input placeholder="Username" theme="secondary" type="outline" />
            <Input
              placeholder="Password"
              theme="secondary"
              type="outline"
              mode="password"
            />
            <Button
              title="Submit"
              onPress={() => setIsSuccess(true)}
              theme="black"
              size="md"
              containerStyle={tailwind('items-center')}
              buttonStyle={tailwind('px-6')}
            />
            <Button
              title="Reset Password"
              theme="secondary"
              type="clear"
              titleStyle={tailwind('text-gray-400 text-sm font-normal')}
              size="md"
              containerStyle={tailwind('items-center')}
            />
          </View>
        </>
      )}
    </View>
  );
}
