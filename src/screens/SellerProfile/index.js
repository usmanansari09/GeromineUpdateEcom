import React, {useContext, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import StackHeader from '@/components/StackHeader';
import {Icon, Image} from 'react-native-elements';
import {getColor, tailwind} from '@/common/tailwind';
import {useProducts, useProfile} from '@/common/services/hooks';
import {getS3Image} from '@/common/helpers';
import Button from '@/components/Button';
import Skeleton from '@/components/Skeleton';
import {AuthContext} from '@/common/contexts/AuthContext';
import BottomSheet from '@/components/BottomSheet';
import ProductList from '@/components/Products/ProductList';
/**
 *
 * @param {{route:RouteProp<any,any>,navigation:StackNavigationProp<any,any>}} props
 * @returns
 */
export default function SellerProfile({route, navigation}) {
  const seller_id = route?.params?.id;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route?.params?.name
        ? route?.params?.name + "'s Profile"
        : 'Profile',
      header: props => (
        <StackHeader
          {...props}
          headerRight={HeaderRight}
          headerRightOrder="reverse"
        />
      ),
    });
  }, [navigation, route?.params?.name]);
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
  } = useProducts(seller_id);
  return (
    <View>
      <ProductList
        products={products?.pages}
        loading={isLoading}
        flatListProps={{
          contentContainerStyle: tailwind('px-6 py-4'),
          ListHeaderComponent: () => <ProfileHeader id={seller_id || ''} />,
          numColumns: 3,
        }}
      />
      {/* <Products seller_id={seller_id} /> */}
    </View>
  );
}
function ProfileHeader({id}) {
  const {data: profile, isLoading, isError, isSuccess} = useProfile(id);
  const {userId} = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <View>
      <View style={tailwind('flex-row items-center')}>
        <Image
          source={{
            uri: profile?.data?.image ? getS3Image(profile.data.image) : null,
          }}
          style={tailwind('w-20 h-20 rounded-full ')}
        />
        <View style={tailwind('ml-4')}>
          <Text style={tailwind('text-black text-base font-bold')}>
            {profile?.data?.full_name}
          </Text>
          <Text>@{profile?.data?.username}</Text>
          <Rating />
        </View>
      </View>
      <View style={tailwind('py-4 flex-row items-center justify-between')}>
        <View style={tailwind('flex-row items-center')}>
          <View style={tailwind('flex-row items-center mr-3')}>
            <View style={tailwind('h-2 w-2 bg-brand-primary rounded-full')} />
            <Text>Active Today</Text>
          </View>
          <View style={tailwind('flex-row items-center')}>
            <Icon
              type="ionicon"
              name="pricetag"
              color={getColor('black')}
              size={16}
            />
            <Text style={tailwind('text-black text-sm')}>18 Sold</Text>
          </View>
        </View>
        <View>
          <Button
            title="Emma's Store"
            size="sm"
            theme="black"
            titleStyle={tailwind('uppercase text-xs font-light')}
            icon={{
              type: 'font-awesome-5',
              name: 'store-alt',
              size: 12,
              color: getColor('white'),
            }}
            onPress={() => {
              if (userId == id) {
                // navigation.navigate("My Store");
                navigation.navigate('Seller Store');
              } else {
                navigation.navigate('Seller Store', {
                  id: id,
                  name: profile?.data?.full_name?.split(' ')?.[0],
                });
              }
            }}
          />
        </View>
      </View>
      <View style={tailwind('')}>
        <Text style={tailwind('mb-4')}>
          Description Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Doloremque, cumque magni quasi ipsa tempora ut dicta,
        </Text>
        <View>
          <Text
            style={tailwind('text-white bg-black p-2 rounded-md self-start')}>
            instagram/com/emma123
          </Text>
        </View>
      </View>
      <ProfileStats />
      <Text style={tailwind('text-lg text-black font-bold uppercase my-5')}>
        Products
      </Text>
    </View>
  );
}
function HeaderRight() {
  const [visible, setVisible] = useState(false);
  return (
    <View style={tailwind('pl-3')}>
      <Icon
        onPress={() => setVisible(true)}
        type="ionicon"
        name="ellipsis-horizontal"
        color={getColor('white')}
      />
      <BottomSheet isVisible={visible} containerStyle={tailwind('px-5 pb-5')}>
        <View style={tailwind('bg-white rounded-xl')}>
          <Button
            size="md"
            title="User Options"
            type="clear"
            titleStyle={tailwind('text-gray-400 font-light')}
          />
          <Button
            containerStyle={tailwind('border-t border-b border-gray-300')}
            size="md"
            title="Report User"
            type="clear"
            titleStyle={tailwind('text-black')}
          />
          <Button
            size="md"
            title="Block This user"
            type="clear"
            titleStyle={tailwind('text-brand-primary')}
          />
        </View>
        <Button
          onPress={() => setVisible(false)}
          title="Cancel"
          theme="white"
          size="md"
          containerStyle={tailwind('mt-4')}
          buttonStyle={tailwind('rounded-full')}
        />
      </BottomSheet>
    </View>
  );
}
function Products({seller_id}) {
  const {width} = useWindowDimensions();
  return (
    <View style={tailwind('mt-5')}>
      {isLoading ? (
        <View style={tailwind('')}>
          <Skeleton>
            <View style={tailwind('flex-row flex-1 flex-wrap')}>
              {Array.from({length: 6}).map((_, index) => (
                <View
                  style={[
                    tailwind('p-1'),
                    {
                      width: width / 3 - 16,
                    },
                  ]}
                  key={index}>
                  <View style={tailwind('rounded-xl h-40')} />
                </View>
              ))}
            </View>
          </Skeleton>
        </View>
      ) : isSuccess ? (
        <ProductList products={products.pages} />
      ) : isError ? (
        <View>
          <Text>Error</Text>
        </View>
      ) : null}
    </View>
  );
}
function ProfileStats() {
  return (
    <View style={tailwind('justify-between flex-row pt-4')}>
      <View style={tailwind('flex-row')}>
        <View>
          <Text style={tailwind('text-lg text-black font-bold')}>173</Text>
          <Text>Followers</Text>
        </View>
        <View style={tailwind('ml-2')}>
          <Text style={tailwind('text-lg text-black font-bold')}>173</Text>
          <Text>Followers</Text>
        </View>
      </View>
      <View style={tailwind('flex-row items-center')}>
        <Button
          title="Follow"
          theme="black"
          type="outline"
          titleStyle={tailwind('text-black')}
          buttonStyle={{
            borderColor: getColor('black'),
            borderWidth: 2,
            ...tailwind('pr-4 bg-white'),
          }}
          icon={{
            type: 'ionicon',
            name: 'add',
            color: getColor('black'),
          }}
        />
        <Icon
          onPress={() => {}}
          type="ionicon"
          name="chatbox-outline"
          size={32}
          containerStyle={tailwind('ml-2')}
        />
      </View>
    </View>
  );
}
function Rating() {
  return (
    <View style={tailwind('flex-row items-center')}>
      <View style={tailwind('flex-row')}>
        {Array.from({length: 5}).map((_, index) => (
          <Icon
            key={index}
            type="ionicon"
            name="star"
            color={getColor('brand-primary')}
            size={20}
          />
        ))}
      </View>
      <Text style={tailwind('text-brand-primary text-sm ml-1')}>(43)</Text>
    </View>
  );
}
