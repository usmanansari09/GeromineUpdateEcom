import {useIsFocused} from '@react-navigation/core';
import {useQuery} from 'react-query';
import API from '../API';
const {AuthContext} = require('@/common/contexts/AuthContext');
const {useContext} = require('react');

export default function useCartCount() {
  const {accessToken, userId: id, isSignedIn} = useContext(AuthContext);
  const isFocused = useIsFocused();
  return useQuery(
    // ["profile", id, "cart"],
    ['cart', 'count'],
    () =>
      API(accessToken)
        .get(`cart/my-cart`, {})
        .then(res => res.data?.payload?.cart?.product_list?.length || 0)
        .catch(err => {
          throw new Error(err);
        }),
    {
      enabled: isSignedIn && isFocused,
    },
  );
}
