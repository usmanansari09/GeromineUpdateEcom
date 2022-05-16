import {useIsFocused} from '@react-navigation/core';
import {useQuery, UseQueryOptions} from 'react-query';
import API from '../API';
const {AuthContext} = require('@/common/contexts/AuthContext');
const {useContext} = require('react');

export default useCartItems =
  /**
   *
   * @param {UseQueryOptions} opts
   */
  (opts = {}) => {
    const {accessToken, userId: id} = useContext(AuthContext);
    const isFocused = useIsFocused();
    return useQuery(
      'cart',
      () =>
        API(accessToken)
          .get(`cart/my-cart`, {})
          .then(res => res.data)
          .catch(err => {
            throw new Error(err);
          }),
      {
        enabled: isFocused,
        ...opts,
      },
    );
  };
