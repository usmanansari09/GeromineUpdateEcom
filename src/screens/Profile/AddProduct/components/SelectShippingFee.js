import React, {useLayoutEffect, useState, useRef} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import tailwind from 'tailwind-rn';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Switch from '@/components/Switch';
import {Text} from '@/components/index';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Button from '@/components/Button';
import {Input} from 'react-native-elements';
import StackHeader from '@/components/StackHeader';

export default function AddProductShippingFee({navigation, route}) {
  const inputRef = useRef();
  const [shipping, setShipping] = useState(route?.params?.shippingFee || 0);
  const [feeDisabled, setFeeDisabled] = useState(
    route?.params?.shippingFee === 0,
  );

  let options = route.params.conditionOptions;

  const {
    control,
    errors,
    handleSubmit,
    reset: resetForm,
  } = useForm({
    mode: 'onBlur',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return <StackHeader props={{...props, title: 'Shipping Fee'}} />;
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={[tailwind('flex-1'), styles.container]}>
      <TouchableOpacity style={tailwind('p-6')}>
        <View style={tailwind('flex-row justify-between')}>
          <Text style={tailwind('text-xl text-gray-800  font-normal')}>
            Free Shipping
          </Text>
          <Switch
            onValueChange={value => {
              setFeeDisabled(value);
              value ? setShipping(0) : null;
              value
                ? route.params.selectShippingFee(0)
                : route.params.selectShippingFee(shipping);
            }}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderBottomColor: '#cccccc',
          borderBottomWidth: 1,
        }}
      />
      <View style={tailwind('flex-row justify-between items-center p-6 -mt-2')}>
        <Text
          style={tailwind(
            'text-xl text-gray-800 font-normal justify-start -mt-6',
          )}>
          Shipping Fee
        </Text>
        <View style={tailwind('flex-row w-20 justify-end')}>
          <Text
            style={{
              top: 9,
              left: 20,
              fontSize: 18,
              color: '#ACACAC',
            }}>
            $
          </Text>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                style={tailwind('text-gray-500 ml-4')}
                placeholder="0.00"
                // inputStyle={tailwind('font-normal')}
                disabled={feeDisabled}
                keyboardType="decimal-pad"
                ref={inputRef}
                value={shipping}
                onChangeText={text => {
                  if (Number.parseInt(text, 10) >= 999) {
                    setShipping('999');
                    route.params.selectShippingFee('999');
                  } else {
                    setShipping(text);
                    route.params.selectShippingFee(text);
                  }
                }}
                // errorMessage={errors?.description?.message}
              />
            )}
            name={shipping}
          />
        </View>
      </View>

      <View style={tailwind('my-6 mt-8 mb-10 items-center')}>
        <Button
          buttonStyle={tailwind('px-12 py-3')}
          // loading={isLoading}
          onPress={() => navigation.goBack()}
          titleStyle={tailwind('font-bold')}
          theme="primary"
          size="md"
          title="Save"
          containerStyle={tailwind('w-52 items-center justify-center')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 10
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
