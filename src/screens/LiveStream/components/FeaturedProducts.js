import React, {useEffect, useState, useContext} from 'react';
import {AnimatePresence, View as MotiView} from 'moti';
import {
  View,
  Pressable,
  UIManager,
  LayoutAnimation,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

import ProductImage from '@/components/Products/ProductImage';
import ProductList from '@/components/Products/ProductList';
import ProductView from '@/screens/LiveStream/LiveScreen/components/ProductView';
import ProductDetails from '@/screens/LiveStream/components/ProductDetails';
import {Text} from '@/components/index';
import {tailwind} from '@/common/tailwind';
import {Icon} from 'react-native-elements';
import cart from '@/assets/shopping-cart.png';
import 'react-native-reanimated';
import {
  addToCart,
  productExists,
  deleteFromCart,
} from '@/common/appStorageService/cartService';
import {CartContext} from '@/common/contexts/CartContext';
const flatListProps = {
  horizontal: true,
  contentContainerStyle: tailwind('mb-4'),
};
/**
 *
 * @param {{onSelect:(id:number)=>void,products:object[],show:boolean}} props
 * @returns
 */
export default function FeaturedProducts({
  onProductPress,
  products = [],
  show = false,
  isBuyer = false,
  user,
}) {
  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }, []);

  const {height, width} = useWindowDimensions();

  return (
    <View>
      <AnimatePresence>
        {show && (
          <MotiView
            from={{
              // translateX: 50,
              translateY: height,
            }}
            animate={{
              // translateX: 50,
              translateY: 0,
            }}
            exit={{
              // translateX: -50,
              translateY: height,
            }}
            transition={{type: 'timing'}}>
            <ProductList
              products={products}
              user={user}
              isPaginated={false}
              flatListProps={flatListProps}
              LoadingComponent={LoadingComponent}
              ProductComponent={({product}) => (
                <Product
                  product={product}
                  onPress={onProductPress}
                  isBuyer={isBuyer}
                  user={user}
                />
              )}
            />
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
}
function LoadingComponent() {
  return (
    <View
      style={tailwind(
        'h-14 items-center justify-center bg-gray-100 rounded-lg mb-4',
      )}>
      <Text style={tailwind('font-bold text-black')}>Loading</Text>
    </View>
  );
}
/**
 *
 * @param {{}} param0
 * @returns
 */
function Product({product, onPress = () => {}, isBuyer, user}) {
  const [selected, setSelected] = useState(false);
  const {cartContext, fetchCart} = useContext(CartContext);

  product.product_owner = user;
  useEffect(() => {
    const exists = async () => {
      if (await productExists(product)) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    };
    exists();
  }, [cartContext]);

  const handlePress = async () => {
    let exists = await productExists(product);
    if (exists) {
      await deleteFromCart(product);
    } else {
      await addToCart(product);
    }
    setSelected(prev => !prev);
    fetchCart();
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(product)}
      style={tailwind(' flex-row rounded-2xl bg-white overflow-hidden ml-4')}>
      <ProductImage
        image={product.images && product?.images[0]}
        containerStyle={tailwind('w-28 bg-white')}
      />
      <View style={tailwind('px-3 py-2 bg-gray-100')}>
        <Text style={tailwind('text-3xl text-black font-bold')}>
          ${product.price}
        </Text>
        <View>
          <Text style={tailwind('font-bold text-black text-base')}>
            {product.name}
          </Text>
          <Text
            numberOfLines={2}
            style={(tailwind('text-gray-400'), {width: 150})}>
            {product.description}
          </Text>
        </View>
      </View>
      {isBuyer && (
        <TouchableOpacity
          onPress={handlePress}
          style={tailwind('absolute right-0 bg-black top-4 p-2')}>
          {/* <Icon
          name="shopping-cart"
          type="feather"
          color="white"
          size={26}
          style={tailwind('p-2')}
          // buttonStyle={tailwind('pr-2')}
        /> */}

          {selected ? (
            <Icon
              name="checkmark-circle-outline"
              type="ionicon"
              color="white"
              size={30}
            />
          ) : (
            <Image style={{height: 30, width: 30}} source={cart} />
          )}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}
