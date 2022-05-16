import {tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import React, {useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ImageCarousel from '@/components/Carousel';
import StackHeader from '@/components/StackHeader';
import {useProduct} from '@/common/services/hooks';
import Skeleton from '@/components/Skeleton';
import {useVisibeScreen} from '@/common/hooks';
import {getS3Image} from '@/common/helpers';

const CURRENCY_SIGN = {USD: '$'};
/**
 *
 * @param {{navigation:StackNavigationProp<any>,route:RouteProp<any,any>}} param0
 */
export default function ProductSellerView({navigation, route}) {
  const {id: productID} = route?.params || {};
  const {data: product, isError, isLoading, isSuccess} = useProduct(productID);
  const productImages = JSON.parse(product?.files || '[]').map(image => ({
    image: getS3Image(image),
  }));
  const {width, height} = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              title: product?.name.substring(0, 18) + '...' || 'Product Name',
            }}
          />
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    // Return home when no id specified
    // navigation.goBack();
  }, [productID]);
  useEffect(() => {
    console.log('productImages :>> ', productImages);
  }, [productImages]);
  if (isLoading) {
    return (
      <Skeleton isLoading={true}>
        <View style={tailwind('h-full')}>
          <View
            style={[
              {
                height: height / 3.5,
              },
            ]}
          />

          <View style={tailwind('px-4 py-2 flex-1 justify-between')}>
            <View style={tailwind('')}>
              <View style={tailwind('flex-row justify-between')}>
                <View
                  style={[
                    tailwind('h-8'),
                    {
                      width: width / 2,
                    },
                  ]}
                />
                <View
                  style={[
                    tailwind('h-8 '),
                    {
                      width: width / 3,
                    },
                  ]}
                />
              </View>
              <View style={tailwind('mt-4 ')}>
                {Array.from({length: 3}).map((_, index) => (
                  <View style={[tailwind('h-4 mt-2 w-full')]} key={index} />
                ))}
              </View>
            </View>
            <View style={[tailwind('h-12 rounded-lg  w-full')]} />
          </View>
        </View>
      </Skeleton>
    );
  }
  return (
    <ScrollView
      style={tailwind('bg-gray-100 flex-1')}
      showsVerticalScrollIndicator={false}>
      {isSuccess ? (
        <>
          <View style={[tailwind('w-full relative')]}>
            <ImageCarousel height={height / 3} images={productImages} />
            <Button
              onPress={() =>
                navigation.navigate('EditProduct', {
                  id: product.id,
                })
              }
              title="Edit"
              size="sm"
              containerStyle={tailwind('absolute top-0 right-0 m-2')}
              buttonStyle={tailwind('rounded-full')}
              theme="primary"
              icon={
                <Icon
                  name="create-outline"
                  size={16}
                  color="white"
                  style={tailwind('mr-2')}
                />
              }
            />
            <View style={tailwind('flex-row py-1 bg-white')}>
              <Text style={tailwind('text-black text-sm font-bold px-2')}>
                Share on:
              </Text>
              <TouchableNativeFeedback>
                <View style={tailwind('flex-row items-center')}>
                  <Icon
                    name="logo-facebook"
                    size={20}
                    color="red"
                    style={tailwind('mr-1')}
                  />
                  <Text
                    style={tailwind(
                      'uppercase font-bold text-blue-600 text-xs',
                    )}>
                    Facebook
                  </Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback style={tailwind()}>
                <View style={tailwind('flex-row items-center px-2')}>
                  <Icon
                    name="logo-twitter"
                    size={20}
                    color="red"
                    style={tailwind('mr-1')}
                  />
                  <Text
                    style={tailwind(
                      'uppercase font-bold text-blue-600 text-xs',
                    )}>
                    Twitter
                  </Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback>
                <View style={tailwind('flex-row items-center')}>
                  <Icon
                    name="logo-instagram"
                    size={20}
                    color="red"
                    style={tailwind('mr-1')}
                  />
                  <Text
                    style={tailwind(
                      'uppercase font-bold text-blue-600 text-xs',
                    )}>
                    Instagram
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={[{flex: 1}, tailwind('p-5')]}>
            <View style={tailwind('justify-between flex-row')}>
              <Text
                style={tailwind(
                  'text-2xl text-black w-2/3 uppercase font-bold',
                )}>
                {product.name}
              </Text>
              <Text style={tailwind('text-2xl text-brand-primary font-bold')}>
                {CURRENCY_SIGN[product.currency] + product.price}
              </Text>
            </View>
            <Text
              numberOfLines={7}
              style={tailwind('mt-5 text-base text-gray-500')}>
              {product.description}
            </Text>
            <View style={tailwind('mt-4')}>
              <Text style={tailwind('text-sm text-black font-bold')}>Size</Text>
              <Text style={tailwind('text-sm text-gray-500')}>
                Measuring 13.7’ x 9.4’ x 5.5’ (L x H x W) inches
              </Text>
            </View>
            <Button
              onPress={() => navigation.navigate('AddProduct')}
              title="Add Product"
              theme="primary"
              size="md"
              containerStyle={tailwind('mt-5')}
            />
          </View>
        </>
      ) : isError ? (
        <View>
          <Text>Error</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}
