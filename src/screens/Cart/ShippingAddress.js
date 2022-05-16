import {AuthContext} from '@/common/contexts/AuthContext';
import {getColor, tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import {
  useIsFocused,
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
  ImageBackgroundComponent,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/Ionicons';
import {useQuery} from 'react-query';
import API from '@/common/services/API';
import StackHeader from '@/components/StackHeader';
import Feather from 'react-native-vector-icons/Feather';
import {set} from 'date-fns';
import {ScrollView} from 'react-native-gesture-handler';
import {getKeyValue} from '@/common/SecureStore';

export default function ShippingAddress({navigation, route}) {
  const [color, setColor] = useState(false);
  const [show, setShow] = useState(false);

  const [selected, setSelected] = useState('');

  let selectShippingAddr = route?.params?.selectShippingAddr;
  let shippingAddr = route?.params?.shippingAddr;

  // console.log(selectShippingAddr);
  const {accessToken} = useContext(AuthContext);

  const {data, isLoading, isError, refetch} = useQuery(
    'buyer_shipping_addr',
    () => API(accessToken).get('user/checkout/getShippingAddresses'),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              title: 'SHIPPING ADDRESS',
              iconName: 'arrow-back-outline',
            }}
          />
        );
      },
    });
    getAddressID();
  }, [navigation]);
  const getAddressID = async () => {
    let shippingID = await getKeyValue('@defaultAddressID');
    console.log('shiping Id', shippingID);
    setSelected(shippingID);
  };

  // const {isLoading, isError, isSuccess, error, refetch} =
  // useShippingAddress();
  // const addresses = data?.data;

  return (
    <ScrollView>
      <View style={tailwind('p-6 flex-1 bg-gray-100')}>
        {/* {isLoading ? ( */}
        <View style={tailwind('flex-1')}>
          {data?.data?.payload?.shippingAddresses?.map((item, index) => {
            return (
              <View style={[tailwind('py-2')]} key={index}>
                <TouchableOpacity
                  onPress={() => {
                    setSelected(pre => {
                      if (pre === item?._id) {
                        selectShippingAddr();
                        return '';
                      } else {
                        selectShippingAddr(item);
                        // setTimeout(() => {
                        navigation.canGoBack() && navigation.goBack();
                        // }, 200);
                        return item?._id;
                      }
                    });
                  }}
                  style={[
                    tailwind(
                      `${
                        selected === item?._id
                          ? 'bg-white rounded-lg'
                          : 'bg-gray-100 border-2 rounded-lg'
                      }`,
                    ),
                  ]}>
                  <View style={tailwind('p-3')}>
                    <Text style={tailwind('font-bold text-base')}>
                      {item.name}
                    </Text>

                    <View style={tailwind('flex-row justify-between')}>
                      <View style={tailwind('')}>
                        <Text
                          numberOfLines={4}
                          style={[tailwind('text-base'), {width: 200}]}>
                          {item.address} {item.state}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[tailwind('text-base'), {width: 200}]}>
                          {item.country}
                        </Text>
                      </View>
                      {selected === item?._id && (
                        <View style={tailwind('justify-center')}>
                          <Feather
                            style={tailwind('')}
                            name={'check'}
                            size={35}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
          {/* <SkeletonPlaceholder>
          {Array.from({length: 5}, (_, index) => (
            <View
              key={index}
              style={[
                tailwind('h-20 rounded-lg'),
                tailwind(index > 0 ? 'mt-4' : ''),
              ]}
            />
          ))}
        </SkeletonPlaceholder> */}
        </View>
        {/* ) : isSuccess ? ( */}
        <AddressList
        // addresses={addresses}
        />
        {/* ) : isError ? ( */}
        {/* <View style={tailwind('flex-1 items-center justify-center')}>
        <Text style={tailwind('text-black text-center text-base')}>
          There was an error while loading your shipping address,try again
        </Text>
        <Button
          containerStyle={tailwind('mt-4')}
          title="Try Again"
          size="sm"
          theme="primary"
          // onPress={refetch}
        />
      </View> */}
        {/* ) : null} */}
      </View>
    </ScrollView>
  );
}
function AddressList({addresses = []}) {
  const {navigate} = useNavigation();
  const route = useRoute();
  const [selected, setSelected] = useState(0);
  const renderItem = ({item, index}) => {
    // return (
    //   <TouchableOpacity
    //     key={index}
    //     onPress={() => setSelected(item.id)}
    //     style={[
    //       tailwind(
    //         'bg-white rounded-lg px-4 py-5 flex-row items-center justify-between',
    //       ),
    //       tailwind(`${index !== 0 ? 'mt-4' : ''}`),
    //       tailwind(
    //         `${selected === item.id ? 'border-0' : 'border-2 border-black'}`,
    //       ),
    //     ]}>
    //     <View style={tailwind('flex-1')}>
    //       <Text style={tailwind('text-black font-bold text-base')}>
    //         {item?.name || ''}
    //       </Text>
    //       <Text style={tailwind('text-black text-xs w-1/2')}>
    //         {item.address}, {item.state} {item.zip_cod} {item.country}
    //       </Text>
    //     </View>
    //     {selected === item.id && (
    //       <Icon
    //         name="checkmark-outline"
    //         size={32}
    //         style={tailwind('text-brand-primary')}
    //       />
    //     )}
    //   </TouchableOpacity>
    // );
  };
  // if (addresses.length === 0) {
  //   return (
  //     <View style={tailwind('justify-center items-center flex-1')}>
  //       <Text style={tailwind('text-black text-base text-center')}>
  //         No Shipping Address Added
  //       </Text>
  //       <Button
  //         title="Add Shipping Address"
  //         theme="primary"
  //         size="sm"
  //         icon={{
  //           type: 'ionicon',
  //           name: 'add-outline',
  //           size: 32,
  //           color: getColor('white'),
  //         }}
  //         onPress={() => navigate(`${route}/add`)}
  //       />
  //     </View>
  //   );
  // }
  return (
    <Button
      onPress={() => navigate('AddShippingAddress')}
      containerStyle={[
        tailwind('mx-2 py-6 justify-center items-center '),
        {paddingHorizontal: Platform.OS === 'ios' ? 50 : 20},
      ]}
      title="Add New Address"
      size="md"
      titleStyle={tailwind('text-black')}
      theme="white"
      type="outline"
      buttonStyle={{
        borderColor: getColor('black'),
        ...tailwind('border-2'),
      }}
      icon={{
        type: 'ionicons',
        name: 'add-circle-outline',
        size: 42,
      }}
    />
    // <FlatList
    //   // data={addresses}
    //   renderItem={renderItem}
    //   keyExtractor={(item, index) => `${index}`}
    //   showsVerticalScrollIndicator={false}
    //   ListFooterComponent={
    //     <Button
    //       onPress={() => navigate('AddShippingAddress')}
    //       containerStyle={tailwind('px-16 mx-2 absolute ')}
    //       title="Add New Address"
    //       size="md"
    //       titleStyle={tailwind('text-black')}
    //       theme="white"
    //       type="outline"
    //       buttonStyle={{
    //         borderColor: getColor('black'),
    //         ...tailwind('border-2'),
    //       }}
    //       icon={{
    //         type: 'ionicons',
    //         name: 'add-circle-outline',
    //         size: 42,
    //       }}
    //     />
    //   }
    // />
  );
}
