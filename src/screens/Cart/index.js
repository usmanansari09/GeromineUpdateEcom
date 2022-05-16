import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useReducer,
} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  RouteProp,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import {useCartItems} from '@/common/services/hooks';
import StackHeader from '@/components/StackHeader';
// import Image from '@/components/Image';
import {ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from '@/common/contexts/AuthContext';
import {CartItemsList} from '@/components/Cart';
import CartProvider, {
  CartContext,
  fetchCart,
} from '@/common/contexts/CartContext';
import Product from '@/screens/Cart/components/Product';
import User from '@/screens/Cart/components/User';
import {
  addToCart,
  clearCart,
  getCart,
  deleteFromCart,
  quantityMutateCart,
} from '@/common/appStorageService/cartService';

export default function Cart({route, navigation}) {
  const [isEditing, setIsEditing] = useState(false);
  const {accessToken} = useContext(AuthContext);

  const {
    cartContext,
    updateCartContext,
    isLoading: isCartLoading,
  } = useContext(CartContext);

  const [isChanged, toggleChanged] = useReducer(s => !s, false);

  // console.log(
  //   `-------  Cart --------------`,
  //   cartContext?.product_list?.length,
  // );

  const [cart, setCart] = useState([]);

  const [cartEdit, setCartEdit] = useReducer(s => !s, false);

  // useEffect(() => {
  //   async function fetchMyCart() {
  //     let response = await getCart();
  //     setCart(response);
  //   }
  //   fetchMyCart();
  // }, [isChanged]);

  useFocusEffect(() => {
    async function fetchMyCart() {
      let response = await getCart();
      setCart(response);
    }
    fetchMyCart();
  });

  // useEffect(() => {
  //   async function fetchMyCart() {
  //     let response = await getCart();
  //     setCart(response);
  //   }
  //   fetchMyCart();
  // }, [useIsFocused()]);

  // if (prevLoadingState.current && !isCartLoading) {
  //   console.log('---------------- prevLoadingState -------------------------');
  // }

  // console.log(updateCartContext);

  let itemsCount = cart?.length || 0;

  let uniqShops = cart
    ?.map(el => el.product?.product_owner)
    ?.filter(
      (el, index) =>
        cart
          ?.map(el => el.product?.product_owner)
          .findIndex(obj => obj?._id == el?._id) == index,
    );

  // const userCart = cart?.reduce((acc, val) => {
  //   if (acc?.findIndex(el => el?._id === val?._id) === -1) {
  //     return [
  //       ...acc,
  //       {
  //         ...val.product?.product_owner,
  //         product: val?.product,
  //         quantity: val?.quantity,
  //       },
  //     ];
  //   } else {
  //   }
  // }, []);

  // console.log('--------------- Cart', userCart.length);
  // const isFocused = useIsFocused();
  // const {
  //   data: cartItems,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   isFetching,
  //   refetch,
  // } = useCartItems({});

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              title: 'MY CART',
              // iconName: 'close-outline',
              // backButtonShow: route.params ? false : true, //params should not be undefined
              // iconSize: 40,
              hasCartEdit: true,
              clearCart: clearMyCart,
            }}
          />
        );
      },
    });
  }, [navigation]);

  const deleteProduct = async item => {
    await deleteFromCart(item?.product);
    toggleChanged();
  };

  const clearMyCart = async () => {
    await clearCart();
    toggleChanged();
  };

  const updateQty = async (item, qty) => {
    await quantityMutateCart(item?.product, qty);
    toggleChanged();

    // setCart([
    //   ...cart,
    //   cart?.map(el => {
    //     if (el.product?._id === item?.product?._id) {
    //       return {...el, quantity: qty};
    //     } else {
    //       return el;
    //     }
    //   }),
    // ]);
  };

  const saveCart = () => {
    updateCartContext(cart);
    setIsChanged(false);
  };

  // if (cart?.product_list?.length === 0 && !isChanged) {
  //   return (
  //     <View style={tailwind('my-6 mt-8 mb-10 items-center')}>
  //       <Text style={tailwind('text-gray-500')}>
  //         You cart is empty at the moment.
  //       </Text>
  //     </View>
  //   );
  // }
  if (!cart?.length) {
    return (
      <View style={tailwind('flex-1 items-center mt-10')}>
        <Text style={tailwind('font-bold text-gray-500')}>
          No items in your cart
        </Text>
      </View>
    );
  } else {
    return (
      <ScrollView>
        <View style={tailwind('bg-gray-100 px-6 flex-1')}>
          <View style={tailwind('border-b border-gray-300 py-3')}>
            <Text style={tailwind('font-bold')}>
              {itemsCount + ' '}
              <Text style={tailwind('font-light text-gray-500')}>
                items from
              </Text>{' '}
              {uniqShops?.length}
              <Text style={tailwind('font-light text-gray-500')}> shops</Text>
            </Text>
          </View>
          {uniqShops?.map((user, index) => {
            return (
              <View
                key={user?._id}
                style={tailwind('border-b border-gray-300 ')}>
                {/* user */}
                <User user={user} cart={cart} />

                {cart
                  ?.filter(el => el.product.product_owner?._id === user?._id)
                  .map((item, innerIndex, arr) => {
                    // console.log('item ------------ ', item);
                    return (
                      <Product
                        item={item}
                        user={user}
                        cart={cart}
                        updateQty={updateQty}
                        deleteProduct={deleteProduct}
                        checkout={false}
                        // cartEdit={cartEdit}
                      />
                    );
                  })}
              </View>
            );
          })}

          <Button
            onPress={() => {
              navigation.navigate('cart/checkout');
            }}
            // onPress={() => updateCartContext()}
            title={'Checkout'}
            loading={isCartLoading}
            titleStyle={tailwind('text-xl')}
            theme="primary"
            size="sm"
            containerStyle={[
              tailwind('px-20 mb-24 mt-4'),
              {marginVertical: 5, top: 10},
            ]}
          />
        </View>
      </ScrollView>
    );
  }
}
