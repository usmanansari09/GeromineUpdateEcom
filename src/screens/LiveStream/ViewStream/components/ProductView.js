import {tailwind} from '@/common/tailwind';
import BottomSheet from '@/components/BottomSheet';
import Button from '@/components/Button';
import React, {useState, useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import ProductImages from '@/components/Carousel';
const TEMP_IMAGE = require('@/assets/live-stream-featured-product.png');
import {Icon} from 'react-native-elements';
import ToastUpcomingFeature from '@/common/helpers/ToastUpcomingFeature';
import {CartContext} from '@/common/contexts/CartContext';
import {
  addToCart,
  deleteFromCart,
  productExists,
} from '@/common/appStorageService/cartService';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Modal from '@/components/Modal';
import {useReducer} from 'react';
const carouselContent = Array.from({length: 4}).map(() => ({
  image: TEMP_IMAGE,
}));

export default function ProductView({
  onClose,
  show,
  product,
  isSellLive,
  toggleExitModal,
  user,
  setToggleProductView,
}) {
  const {cartContext, fetchCart} = useContext(CartContext);
  const [prodExistsinCart, setProdExistsinCart] = useState(false);
  const naviation = useNavigation();

  useFocusEffect(() => {
    product.product_owner = user;
    const exists = async () => {
      if (await productExists(product)) {
        setProdExistsinCart(true);
      } else {
        setProdExistsinCart(false);
      }
    };
    exists();
  });
  // useEffect(() => {
  //   const exists = async () => {
  //     if (await productExists(product)) {
  //       setProdExistsinCart(true);
  //     } else {
  //       setProdExistsinCart(false);
  //     }
  //   };
  //   exists();
  // }, [cartContext]);

  return (
    <BottomSheet
      isVisible={show}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      hasBackdrop={false}
      scrollHorizontal={true}>
      <View style={tailwind('p-6 bg-black bg-opacity-80 rounded-t-3xl')}>
        <Icon
          type="ionicon"
          name="close"
          size={32}
          color="white"
          onPress={onClose}
          containerStyle={tailwind('self-end')}
        />
        <ProductImages
          height={144}
          images={
            product?.images?.length > 0
              ? product?.images
              : [{absolute_path: 'https://i.imgur.com/E9Dzd0e.png'}]
          }
          containerStyle={tailwind('rounded-2xl overflow-hidden')}
        />
        {/* <Image
                    source={require("@/assets/live-stream-featured-product.png")}
                    style={tailwind("h-36")}
                    resizeMode="cover"
                /> */}
        <View style={tailwind('flex-row justify-between mt-2')}>
          <Text
            style={tailwind('text-white text-2xl font-bold')}
            numberOfLines={1}>
            {product?.name}
          </Text>
          <View>
            <Text style={tailwind('text-white text-3xl font-bold')}>
              {`$${product?.price}`}
            </Text>
            <Text
              style={[
                tailwind('text-white text-lg font-bold'),
                {textDecorationLine: 'line-through'},
              ]}>
              {`$${product?.discount || 0}`}
            </Text>
          </View>
        </View>
        <Text style={tailwind('text-white text-xs')} numberOfLines={3}>
          {product?.description}
        </Text>
        {/* <ProductSizes /> */}
        <View style={tailwind('flex-row mt-5')}>
          <Button
            title={prodExistsinCart ? 'Remove Cart' : 'Add to Cart'}
            // titleStyle={tailwind(`${prodExistsinCart ? 'h-7 text-xs' : ''}`)}
            style={tailwind('text-center justify-center')}
            theme="primary"
            size="md"
            containerStyle={tailwind('flex-1 h-full')}
            onPress={async () => {
              let exists = await productExists(product);
              console.log({exists});
              if (exists) {
                await deleteFromCart(product);
                setProdExistsinCart(false);
              } else {
                setProdExistsinCart(true);
                await addToCart(product);
              }
              fetchCart();
            }}
          />
          <Button
            title="Buy Now"
            theme="primary"
            size="md"
            containerStyle={tailwind('flex-1 ml-4')}
            onPress={async () => {
              await addToCart(product);
              fetchCart();
              // setTimeout(() => {
              setToggleProductView();
              // }, 2000);
              setTimeout(() => {
                toggleExitModal();
              }, 1000);

              // naviation.navigate('HomeScreen', {screen: 'ShoppingCart'});
            }}
          />
        </View>
      </View>
    </BottomSheet>
  );
}
/**
 *
 * @param {{onPress:Function,style:StyleProp<ViewStyle>}} props
 */
function ProductSizes({onPress, style}) {
  const [selected, setSelected] = useState(null);
  const sizes = ['S', 'M', 'L', 'XL'];
  return (
    <View style={style}>
      <Text style={[tailwind('text-base font-bold text-white')]}>Size</Text>
      <View style={tailwind('flex-row mt-2')}>
        {sizes.map((size, index) => (
          <View
            key={index}
            style={tailwind(`${index !== 0 ? 'ml-2' : ''} flex-1`)}>
            <ProductSize
              title={size}
              onClick={setSelected}
              selected={selected === size}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
/**
 *
 * @param {{title:String,selected:Boolean,onClick:Function}} props
 */
function ProductSize({title, selected, onClick}) {
  return (
    <TouchableOpacity onPress={() => onClick(title)}>
      <View
        style={tailwind(
          `${
            selected ? 'bg-white' : 'bg-transparent'
          } text-lg border-2 border-white rounded-lg px-4 py-2`,
        )}>
        <Text
          style={tailwind(
            `${selected ? 'text-black' : 'text-white'} text-center font-bold`,
          )}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
