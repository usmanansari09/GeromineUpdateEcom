import React, {useContext, useEffect, useLayoutEffect} from 'react';
import {View, FlatList, ScrollView, ActivityIndicator} from 'react-native';
import GChip from '@/assets/gero-chip.png';
import {Image} from 'react-native-elements';
import {getColor, tailwind} from '@/common/tailwind';
import {useQuery, UseQueryOptions} from 'react-query';
import {AuthContext} from '@/common/contexts/AuthContext';
import API from '@/common/services/API';
import {Button, Text} from '@/components/index';
import {useNavigation} from '@react-navigation/core';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import StackHeader from '@/components/StackHeader';

const usePurchasedChips =
  /**
   *
   * @param {UseQueryOptions} opts
   */
  opts => {
    const {userId, accessToken} = useContext(AuthContext);
    return useQuery(
      ['user', 'chips'],
      () =>
        API(accessToken)
          .get(`profile/${userId}/chips`)
          .then(res => res.data),
      opts,
    );
  };

/**
 *
 * @param {{route:RouteProp<any,any>,navigation:StackNavigationProp<any,any>}} param0
 * @returns
 */
export default function MyChips({route, navigation}) {
  const {
    data: chips,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = usePurchasedChips();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => <StackHeader {...props} headerRight={HeaderRight} />,
    });
  }, [navigation]);
  return (
    <View style={tailwind('flex-1  bg-gray-200')}>
      <View style={tailwind('p-6')}>
        {isLoading ? (
          <View style={tailwind('items-center justify-center')}>
            <ActivityIndicator color={getColor('brand-primary')} size="large" />
            <Text style={tailwind('text-center text-base text-gray-500')}>
              Loading Chips
            </Text>
          </View>
        ) : isError ? (
          <View>
            <Text style={tailwind('text-center text-base text-black')}>
              Failed to load your chips
            </Text>
            <Button title="Try again" theme="primary" onPress={refetch} />
          </View>
        ) : isSuccess ? (
          <PurchasedChips chips={chips} />
        ) : null}
      </View>
      <View style={tailwind('flex-1 items-center justify-center bg-white')}>
        <Text style={tailwind('text-base text-black')}>
          You have no registered products {'\n'} with these Geronimo chips yet
        </Text>
      </View>
    </View>
  );
}
function PurchasedChips({chips = []}) {
  const {navigate} = useNavigation();
  if (chips.length === 0) {
    return (
      <View>
        <Text style={tailwind('text-center text-black text-base mb-4')}>
          No purchased chips
        </Text>
        <Button
          title="Buy now"
          theme="primary"
          onPress={() => navigate('Buy Chips')}
        />
      </View>
    );
  }
  return (
    <FlatList
      horizontal
      data={chips}
      renderItem={({item: chip, index}) => (
        <View style={tailwind(`${index !== 0 ? 'ml-6' : ''}`)}>
          <View
            style={{
              ...tailwind(
                'w-36 h-36 bg-white rounded-lg items-center justify-center',
              ),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            <Image
              style={tailwind('w-28 h-28')}
              source={GChip}
              resizeMode="contain"
            />
          </View>
          <Text style={tailwind('text-xs text-black text-center mt-3')}>
            Serial Number
          </Text>
          <Text
            style={tailwind(
              'text-xs text-black text-center font-bold uppercase',
            )}>
            {chip.serial_number}
          </Text>
        </View>
      )}
      keyExtractor={(item, index) => `${index}`}
    />
  );
}
function HeaderRight() {
  const {navigate} = useNavigation();
  const handlePress = () => navigate('Register Chip');
  return (
    <View style={tailwind('flex-row items-center')}>
      <Button
        onPress={handlePress}
        title="Register my chip"
        type="outline"
        theme="black"
        size="sm"
        buttonStyle={tailwind('py-1 px-2 rounded-md')}
        titleStyle={tailwind('uppercase')}
      />
    </View>
  );
}
