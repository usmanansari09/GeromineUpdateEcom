/* eslint-disable react-native/no-inline-styles */
import React, {
  useEffect,
  useLayoutEffect,
  useContext,
  useState,
  useRef,
  useReducer,
} from 'react';
import {
  View,
  ScrollView,
  TouchableNativeFeedback,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {getColor, tailwind} from '@/common/tailwind';
import ToastUpcomingFeature from '@/common/helpers/ToastUpcomingFeature';
import {useProduct, useProfile} from '@/common/services/hooks';
import {Carousel, Text, Button, Skeleton} from '@/components/index';
// import AddToCartButton from '@/components/Button/AddToCartButton';
import Toast from 'react-native-toast-message';
import {AuthContext} from '@/common/contexts/AuthContext';
import categoryOptions from '../../common/rawdata/product/categoryOptions.json';
// import enhanceListing from '../../common/rawdata/product/enhanceListing.json';
import conditionOptions from '../../common/rawdata/product/conditionOptions.json';
import defaultImage from '@/assets/G.png';
import SelectedEnhanceListing from '@/common/helpers/product/SelectedEnhanceListing';
import StackHeader from '@/components/StackHeader';
import TextParagraph from '@/components/TextParagraph/index';
import {useRefetchOnFocus} from '@/common/hooks';
import {Right} from 'stream-chat-react-native-core';
import {CartContext} from '@/common/contexts/CartContext';
import {addToCart, productExists} from '@/common/appStorageService/cartService';
// import currency from 'currency.js';

/**
 *
 * @param {{navigation:StackNavigationProp<any>,route:RouteProp<any,any>}} param0
 */
export default function ProductView({navigation, route}) {
  const {cartContext, fetchCart} = useContext(CartContext);
  const {data} = useProfile(AuthContext);
  const [show, setShow] = useState(true);
  const [changed, toggleChanged] = useReducer(s => !s, false);
  const [prodExistsinCart, setProdExistsinCart] = useState(false);

  const {_id: productID} = route.params.product || {};
  const query = useProduct(productID);
  const productData = query?.data;
  useRefetchOnFocus(query);

  const sold = productData?.quantity <= 0 ? true : false;

  useEffect(() => {
    fetchCart();
    const exists = async () => {
      if (await productExists(productData)) {
        setProdExistsinCart(true);
      }
    };
    exists();
  }, [changed]);

  const {isLoading: cartIsLoading} = useContext(CartContext);

  const images = productData?.images;
  let isSellersProduct = false;

  if (productData?.product_owner?._id) {
    isSellersProduct =
      productData?.product_owner?._id === data?.payload?.user?._id;
  } else {
    isSellersProduct = productData?.product_owner === data?.payload?.user?._id;
  }

  const {isError, isLoading} = useProduct(productID);

  const {width, height} = useWindowDimensions();

  // const {productImages} = JSON.parse(productData?.files || '[]').map(image => ({
  //   image: getS3Image(image),
  // }));

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              iconName: 'arrow-back-outline',
              title:
                productData?.name.length > 18
                  ? productData?.name.substring(0, 18) + '...'
                  : productData?.name || route?.params?.product?.name,
              hasCart: true,
              hasGoLive: true,
              hasGoLive_params: productData?.livestream,
            }}
          />
        );
      },
    });
    // console.log({productData: JSON.stringify(productData?.livestream)});
  }, [navigation, productData]);

  const prevLoadingState = useRef();

  useEffect(() => {
    prevLoadingState.current = cartIsLoading;
  }, [cartIsLoading]);

  if (prevLoadingState.current && !cartIsLoading) {
    navigation.navigate('HomeScreen', {screen: 'ShoppingCart'});
  }

  useEffect(() => {
    if (!productID && navigation.canGoBack) navigation.goBack();
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
  if (isError) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  const renderDesc = desc => {
    let clean = desc;

    if (clean.length > 100) {
      return clean.substring(0, 100) + '...';
    } else {
      return clean;
    }
  };

  const toggle = () => {
    setShow(!show);
  };
  return (
    <ScrollView style={tailwind('bg-gray-100')}>
      <View style={tailwind('w-full relative')}>
        {images && (
          <Carousel
            height={height / 3}
            images={images}
            sold={productData?.quantity <= 0 ? true : false}
          />
        )}
        {isSellersProduct ? (
          <Button
            onPress={() =>
              navigation.navigate('EditProduct', {
                productData,
              })
            }
            title="Edit"
            size="sm"
            containerStyle={tailwind('absolute top-0 right-0 m-2')}
            buttonStyle={tailwind('rounded-3xl bg-black')}
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
        ) : (
          <Button
            // onPress={() =>
            //   navigation.navigate('Product_BuyerChat', {
            //     product_name: 'Louis Vuitton Riverside Bag',
            //   })
            // }
            onPress={() => {
              Toast.show({
                type: 'info',
                text1: 'Upcoming feature',
                position: 'bottom',
              });
            }}
            title="Chat"
            size="sm"
            containerStyle={tailwind('absolute top-0 right-0 m-2')}
            buttonStyle={tailwind('rounded-full px-4')}
            theme="black"
            icon={
              <Icon
                name="chatbox-outline"
                size={20}
                color="white"
                style={tailwind('mr-2')}
              />
            }
          />
        )}

        <ShareProduct />
      </View>
      <View style={tailwind('p-5')}>
        <View style={tailwind('flex-row')}>
          <Text
            numberOfLines={1}
            // ellipsizeMode="clip"
            style={[
              tailwind(
                `text-black uppercase font-bold ${
                  width > 400 ? 'text-3xl' : 'text-2xl'
                }`,
              ),
              {width: `70%`},
            ]}>
            {productData.name}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              tailwind(
                `text-black font-bold text-right ${
                  width > 400 ? 'text-3xl' : 'text-2xl'
                }`,
              ),
              {width: '30%'},
            ]}>
            {/* {currency(product.price).format().trim()} */}
            {`$${productData.price}`}
            {/* {'2000.12'} */}
          </Text>
        </View>
        <Text
          style={[
            tailwind(`font-normal text-right text-gray-500 text-left`),
            {width: '50%'},
          ]}>
          {`Quantity: ${productData?.quantity}`}
        </Text>
        {/* {!isSellersProduct ? (
          // <TouchableOpacity
          //   style={tailwind('mt-6')}
          //   onPress={() => {
          //     navigation.navigate('Seller Store', {
          //       store: productData?.product_owner,
          //     });
          //   }}>
          //   <Text
          //     style={tailwind(
          //       'text-brand-primary uppercase font-bold text-lg',
          //     )}>
          //     See Seller's Store
          //   </Text>
          // </TouchableOpacity>
        ) : (
          <View />
        )} */}
        <View style={tailwind('mt-4')}>
          <TextParagraph
            style={tailwind(
              `text-gray-500 ${width > 400 ? 'text-xl' : 'text-lg'}`,
            )}
            text={
              show
                ? renderDesc(productData.description)
                : productData.description
            }
            linesToTruncate={show ? 3 : 200}
          />
          {productData.description.length > 100 && (
            <TouchableOpacity
              style={[
                tailwind('flex-row items-center'),
                {alignSelf: 'flex-start'},
              ]}
              onPress={toggle}>
              <Text>{show ? 'Show more' : 'Show less'} </Text>
              <EvilIcons
                name={'chevron-down'}
                size={30}
                style={{
                  transform: !show
                    ? [{rotateX: '180deg'}]
                    : [{rotateX: '0deg'}],
                  top: !show ? 2 : 0,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={tailwind('mt-4')}>
          <Text
            style={tailwind(
              `text-black font-bold ${width > 400 ? 'text-xl' : 'text-lg'}`,
            )}>
            Size
          </Text>
          <Text
            numberOfLines={1}
            style={tailwind(
              `ml-1 text-gray-500 ${width > 400 ? 'text-xl' : 'text-lg'}`,
            )}>
            {productData.size}
          </Text>
        </View>

        <View style={tailwind('mt-4')}>
          <Text
            style={tailwind(
              `text-black font-bold ${width > 400 ? 'text-xl' : 'text-lg'}`,
            )}>
            Brand
          </Text>
          <Text
            numberOfLines={1}
            style={tailwind(
              `ml-1 text-gray-500 ${width > 400 ? 'text-xl' : 'text-lg'}`,
            )}>
            {productData.brand}
          </Text>
        </View>

        <View style={tailwind('mt-4')}>
          <Text
            style={tailwind(
              `text-black font-bold ${width > 400 ? 'text-xl' : 'text-lg'}`,
            )}>
            Category
          </Text>
          <Text
            style={tailwind(
              `ml-1 text-gray-500 ${width > 400 ? 'text-xl' : 'text-lg'}`,
            )}>
            {categoryOptions.find(el => el.key == productData.category)
              ?.label ||
              categoryOptions.find(el => el.key == productData.category)
                ?.value ||
              productData.category}
          </Text>
        </View>

        <View style={tailwind('mt-4')}>
          <Text
            style={tailwind(
              `text-black font-bold ${width > 400 ? 'text-xl' : 'text-lg'}`,
            )}>
            Condition
          </Text>
          <Text
            style={tailwind(
              `ml-1 text-gray-500 ${width > 400 ? 'text-xl' : 'text-lg'}`,
            )}>
            {
              conditionOptions.find(el => el.key == productData?.condition)
                ?.value
            }
          </Text>
          <View style={tailwind('mt-4')}>
            <SelectedEnhanceListing product={productData} disabled={true} />
          </View>
        </View>
        <View style={tailwind('')} />

        <View style={tailwind('items-center flex-1 -mx-1 mt-4 mb-12 w-full')}>
          {!isSellersProduct && (
            <>
              {/*<AddToCartButton
                productId={productID}
                size="md"
                theme="primary"
                onError={message => {
                  Toast.show({
                    type: 'error',
                    text1: message,
                    position: 'bottom',
                  });
                }}
                onSuccess={message => {
                  Toast.show({
                    type: 'success',
                    text1: message,
                    position: 'bottom',
                  });
                }}
              />*/}

              <Button
                style={[tailwind('px-2 py-4'), {height: '100%', width: '100%'}]}
                onPress={async () => {
                  // addToCart(productData);
                  await addToCart(productData);
                  fetchCart();
                  navigation.navigate('CartStackView');
                }}
                disabled={sold}
                loading={cartIsLoading}
                disabledStyle={tailwind('bg-white border border-gray-500')}
                title={
                  sold ? 'Sold' : prodExistsinCart ? 'Go to Cart' : 'Buy Now'
                }
                theme="primary"
                size="md"
                containerStyle={[tailwind('w-6/12 h-full')]}
              />
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

function ShareProduct() {
  return (
    <View style={tailwind('flex-row p-3 bg-white')}>
      <Text style={tailwind('text-black text-sm font-bold px-2')}>
        Share on:
      </Text>
      <View style={tailwind('flex-1 flex-row justify-between')}>
        <TouchableNativeFeedback
          onPress={() =>
            Toast.show({
              type: 'info',
              text1: 'Upcoming feature',
              position: 'bottom',
            })
          }>
          <View style={tailwind('flex-row items-center')}>
            <FeatherIcon
              name="facebook"
              size={20}
              color={getColor('brand-primary')}
              style={tailwind('')}
            />
            <Text
              style={[
                tailwind('uppercase font-bold text-brand-primary'),
                {fontSize: 11},
              ]}>
              Facebook
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() =>
            Toast.show({
              type: 'info',
              text1: 'Upcoming feature',
              position: 'bottom',
            })
          }>
          <View style={tailwind('flex-row items-center px-2')}>
            <FeatherIcon
              name="twitter"
              size={20}
              color={getColor('brand-primary')}
              style={tailwind('')}
            />
            <Text
              style={[
                tailwind('uppercase font-bold text-yellow-900'),
                {fontSize: 11},
              ]}>
              Twitter
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() =>
            Toast.show({
              type: 'info',
              text1: 'Upcoming feature',
              position: 'bottom',
            })
          }>
          <View style={tailwind('flex-row items-center')}>
            <Icon
              name="logo-instagram"
              size={20}
              color={getColor('yellow-500')}
              style={tailwind('mr-1')}
            />
            <Text
              style={[
                tailwind('uppercase font-bold text-yellow-500'),
                {fontSize: 11},
              ]}>
              Instagram
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}
