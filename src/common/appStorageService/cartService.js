import {getKeyValue, saveKey, deleteValue} from '@/common/SecureStore';
import CartProvider, {CartContext} from '@/common/contexts/CartContext';
import {useContext} from 'react';

const KEY = '@cartStorage';

export async function addToCart(product, qty = 0) {
  let result = await getKeyValue(KEY);
  let cart = [];
  let found;
  if (result) {
    try {
      result = JSON.parse(result);
      console.log({result});
      found = result?.find(el => el?.product?._id === product?._id);
      if (found) {
        result = result?.map(el => {
          if (el?.product?._id === product?._id) {
            return {
              product: product,
              quantity:
                product?.quantity > el.quantity ? el.quantity + 1 : el.quantity,
            };
          }
          return el;
        });
        let res = await saveKey(KEY, JSON.stringify(result));
      } else {
        result?.push({
          product: product,
          quantity: 1,
        });
      }
      let res = await saveKey(KEY, JSON.stringify(result));
    } catch (error) {
      console.log({error});
    }
  } else {
    cart?.push({
      product: product,
      quantity: 1,
    });
    let res = await saveKey(KEY, JSON.stringify(cart));

    console.log({res}, {result});
  }
}

export async function getCart() {
  try {
    let result = await getKeyValue(KEY);

    result = JSON.parse(result);

    // console.log('get cart', result);
    return result;
  } catch (error) {
    console.log({error});
  }
  return [];
}

export async function productExists(product) {
  try {
    let result = await getKeyValue(KEY);

    result = JSON.parse(result);
    return result?.find(el => el?.product?._id === product?._id) ? true : false;
  } catch (error) {
    console.log({error});
  }
  return false;
}

export async function clearCart() {
  try {
    return await saveKey(KEY, JSON.stringify([]));
  } catch (error) {
    console.log({error});
  }
  return [];
}

export async function deleteFromCart(product) {
  let result = await getKeyValue(KEY);
  let cart = [];
  let found;
  if (result) {
    try {
      result = JSON.parse(result);
      // console.log({result});
      result = result?.filter(el => el?.product?._id !== product?._id);
      let res = await saveKey(KEY, JSON.stringify(result));
    } catch (error) {}
  }
}

export async function quantityMutateCart(product, qty) {
  let result = await getKeyValue(KEY);
  let cart = [];
  let found;
  if (result) {
    try {
      result = JSON.parse(result);
      console.log({result});
      result = result?.map(el => {
        if (el?.product?._id === product?._id) {
          return {
            product: product,
            quantity: qty,
            //   product?.quantity > el.quantity
            //     ? el.quantity + qty
            //     : el.quantity === 1
            //     ? el.quantity
            //     : el.quantity,
          };
        }
        return el;
      });
      let res = await saveKey(KEY, JSON.stringify(result));
    } catch (error) {}
  }
}
