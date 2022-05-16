import React, {useState, useEffect, createContext, useContext} from 'react';
import {AuthContext} from '@/common/contexts/AuthContext';
import API from '../services/API';
import {getCart} from '@/common/appStorageService/cartService';

const functionTemplate = () => {};

const cart = {
  user: null,
  product_list: null,
  updated_at: null,
  total: 0,
  updateStatus: functionTemplate,
};

export const CartContext = createContext(0);

// export const fetchCart = async accessToken => {
//   try {
//     // const loadTokens = useAuthStore(s => s.getToken);
//     // console.log({loadTokens});
//     const res = await API(accessToken).get(`cart/my-cart`);
//     console.log('my Cart --------------', res?.data?.payload?.cart);
//     return res?.data?.payload?.cart;
//   } catch (err) {
//     return {
//       user: null,
//       product_list: [],
//       updated_at: null,
//       total: 0,
//     };
//   }
// };

export const addProductToCart = async (accessToken, product) => {
  try {
    const res = await API(accessToken).post(`cart/add-product`, {
      product: product?._id ? product._id : product,
    });
    console.log('Add to Cart CartContext: ', res?.data?.payload?.cart);
    return res?.data?.payload?.cart;
  } catch (error) {
    if (error?.response?.data?.payload) {
      // console.error(error?.response?.data?.payload);
    }
  }
};

export const saveCart = async (accessToken, cart) => {
  try {
    const res = await API(accessToken).post(`cart/update-cart`, {
      products: cart,
    });
    // console.error('saveCart CartContext: ------------------- ', res?.data?.payload?.cart);
    return res?.data?.payload?.cart;
  } catch (error) {
    if (error?.response?.data?.payload) {
      // console.error(error?.response?.data?.payload);
    }
  }
};

export default function CartProvider({children}) {
  let {isSignedIn, accessToken} = useContext(AuthContext);
  const [cartContext, setCartContext] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const updateCartContext = cart => {
    setIsLoading(true);
    // console.log('updateCartContext ------------------', cart);
    // setCartContext(cart);

    let updatedCart = cart?.product_list?.map(el => {
      return {
        product: el?.product?._id,
        quantity: el?.quantity,
      };
    });

    // console.log('updatedCart ------------- ', JSON.stringify(updatedCart));

    updateCart(updatedCart);
  };

  const addToCart = async product => {
    setIsLoading(true);
    let cart = await addProductToCart(accessToken, product);

    console.log('addtocart: --------------', cart);
    setCartContext(cart);
    setIsLoading(false);
    fetchCart();
    return true;
  };

  const updateCart = async updatedCart => {
    const cart = await saveCart(accessToken, updatedCart);

    // console.log('updateCart: ', {cart});

    setCartContext(cart);
    setIsLoading(false);
  };

  useEffect(() => {
    const populateContext = cart => setCartContext(cart);

    async function fetchData() {
      const cart = await getCart();
      populateContext(cart?.length || 0);
    }

    fetchData();
  }, [accessToken, isSignedIn]);

  const fetchCart = async () => {
    const populateContext = cart => setCartContext(cart);

    async function fetchData() {
      const cart = await getCart();
      populateContext(cart?.length || 0);
    }

    fetchData();
  };

  // useEffect(() => {
  //   if (cartContext?.updateStatus === functionTemplate) {
  //     console.log(`if (cartContext?.updateStatus === functionTemplate)`);
  //     updateCartContext({
  //       updateStatus: value => updateCartContext({status: value}),
  //     });
  //   }
  // }, [cartContext?.updateStatus]);

  return (
    <CartContext.Provider
      value={{cartContext, updateCartContext, fetchCart, addToCart, isLoading}}>
      {children}
    </CartContext.Provider>
  );
}
