import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Text, Button, Image} from '@/components/index';
import {tailwind} from '@/common/tailwind';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {useQuery} from 'react-query';
import {AuthContext} from '@/common/contexts/AuthContext';
import {getS3Image} from '@/common/helpers';
import API from '@/common/services/API';
import Skeleton from '@/components/Skeleton';
import Toast from 'react-native-toast-message';

const {width} = Dimensions.get('screen');

function StoreList({stores = []}) {
  const {isSignedIn} = useContext(AuthContext);
  const {navigate} = useNavigation();
  const {width} = useWindowDimensions();
  const handlePress = store => {
    if (!isSignedIn) {
      navigate('Seller Store', {store});
      //navigate("Register");
    } else {
      navigate('Seller Store', {store});
    }
  };

  if (stores.length === 0) {
    return (
      <View>
        <Text style={tailwind('text-center text-base text-gray-500')}>
          No Stores found
        </Text>
      </View>
    );
  }
  return (
    <View style={tailwind('-mt-1 ')}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={false}
        horizontal={true}>
        {stores.map(store => (
          <TouchableOpacity
            onPress={() => handlePress(store)}
            key={store._id}
            style={tailwind('p-0 mr-1')}>
            <Image
              source={
                store?.cover_pic ? {uri: store?.cover_pic?.absolute_path} : null
              }
              resizeMode="cover"
              containerStyle={{
                ...tailwind('w-24 h-28'),
              }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

function HeaderTextStyle() {
  if (width > 480) {
    return 'font-bold text-black uppercase text-3xl';
  } else if (width > 320) {
    return 'font-bold text-black uppercase text-med-xl';
  } else {
    return 'font-bold text-black uppercase text-base';
  }
}

export default function ShopSellerStores(props) {
  const navigation = useNavigation();
  const {dataToRender} = props;
  // const [isLoading, setisLoading] = useState([]);

  return (
    <View style={tailwind('justify-center items-center mt-2')}>
      <View style={tailwind('flex-row')}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('StoreNavigation', {screen: 'SellerStores'})
          }
          style={tailwind('bg-black justify-center items-center rounded-lg')}>
          <Text
            style={tailwind(
              `uppercase px-5 py-3 text-white font-bold text-xl`,
            )}>
            Shop seller stores
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tailwind('flex-row mt-1')}>
        <View style={tailwind('content-start py-5')}>
          {/* {isLoading ? (
            <Skeleton>
              <View style={tailwind('px-4 py-2 flex-row')}>
                {Array.from({length: 3}, (_, index) => (
                  <View
                    key={index}
                    style={[
                      tailwind('w-24 h-40 rounded-xl'),
                      tailwind(index > 0 ? 'ml-4' : ''),
                    ]}
                  />
                ))}
              </View>
            </Skeleton>
          ) : isError ? (
            <View style={tailwind(' justify-center items-center')}>
              <Text style={tailwind('text-lg text-white text-center')}>
                There was an error while loading your products
              </Text>
              <Button
                title="Retry"
                theme="primary"
                containerStyle={tailwind('w-1/3')}
                size="sm"
                onPress={refetch}
              />
            </View>
          ) : isSuccess ? ( */}
          <StoreList stores={dataToRender} />
          {/* ) : null} */}
        </View>
      </View>
    </View>
  );
}
