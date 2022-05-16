import {tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  LegacyRef,
} from 'react';
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
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {AuthContext} from '@/common/contexts/AuthContext';
import API from '@/common/services/API';
import Toast from 'react-native-toast-message';
import {AppContext} from '@/common/contexts/AppContext';
import useCalculateVisibleScreen from '@/common/hooks/useVisibeScreen';

const CURRENCY_SIGN = {USD: '$'};
/**
 *
 * @param {{navigation:StackNavigationProp<any>,route:RouteProp<any,any>}} param0
 */
export default function ProductResult({navigation, route}) {
  const {id: productID = 10} = route?.params || {};
  const {data: product, isError, isLoading, isSuccess} = useProduct(10);
  const productImages = JSON.parse(product?.files || '[]').map(image => ({
    image: getS3Image(image),
  }));
  const {
    onLayout,
    dimensions: {height: currentHeight},
  } = useCalculateVisibleScreen();
  const {width, height} = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              title: product?.name.substring(0, 20) + '...' || 'Product Name',
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
      style={[tailwind('bg-white')]}
      onLayout={onLayout}
      contentContainerStyle={tailwind(height > currentHeight ? 'flex-1' : '')}
      scrollEnabled={height > currentHeight}>
      {isSuccess ? (
        <>
          <View style={[tailwind('w-full')]}>
            <ImageCarousel height={height / 3} images={productImages} />
          </View>
          <View style={[tailwind('p-5 bg-gray-100 justify-between flex-1')]}>
            <View>
              <View style={tailwind('justify-between flex-row')}>
                <Text
                  style={tailwind(
                    'text-2xl text-black w-2/3 uppercase font-bold',
                  )}>
                  {product.name}
                </Text>
                <Text style={tailwind('text-2xl text-black font-bold')}>
                  {CURRENCY_SIGN[product.currency] + product.price}
                </Text>
              </View>
              <Text
                numberOfLines={5}
                style={tailwind('mt-5 text-base text-gray-500')}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                corporis aut sint soluta tenetur aperiam doloremque. Eaque
                dolorum doloremque iure, corrupti, perferendis eos amet magni
                repellat, aut quibusdam minima sint. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. At corporis aut sint soluta
                tenetur aperiam doloremque. Eaque dolorum doloremque iure,
                corrupti, perferendis eos amet magni repellat, aut quibusdam
                minima sint. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. At corporis aut sint soluta tenetur aperiam doloremque.
                Eaque dolorum doloremque iure, corrupti, perferendis eos amet
                magni repellat, aut quibusdam minima sint. Lorem ipsum dolor sit
                amet consectetur adipisicing elit. At corporis aut sint soluta
                tenetur aperiam doloremque. Eaque dolorum doloremque iure,
                corrupti, perferendis eos amet magni repellat, aut quibusdam
                minima sint. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. At corporis aut sint soluta tenetur aperiam doloremque.
                Eaque dolorum doloremque iure, corrupti, perferendis eos amet
                magni repellat, aut quibusdam minima sint.
              </Text>
              <View style={tailwind('mt-4')}>
                <Text style={tailwind('text-sm text-black font-bold')}>
                  Size
                </Text>
                <Text style={tailwind('text-sm text-gray-500')}>
                  Measuring 13.7’ x 9.4’ x 5.5’ (L x H x W) inches
                </Text>
              </View>
            </View>
            <Button
              onPress={() => {}}
              title="Download to my store"
              theme="primary"
              size="md"
              containerStyle={tailwind('items-center')}
              buttonStyle={tailwind('px-4')}
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
