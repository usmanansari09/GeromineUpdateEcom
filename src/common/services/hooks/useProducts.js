import {AuthContext} from '@/common/contexts/AuthContext';
import {useContext} from 'react';
import {useInfiniteQuery} from 'react-query';
import API from '../API';
import {useIsFocused} from '@react-navigation/core';

/**
 *
 * @param {number} id - id of seller
 * @returns
 */
export default function useProducts(id) {
  const {accessToken} = useContext(AuthContext);
  const isFocused = useIsFocused();

  // // let seller_id = id ? id : userId;
  // console.log('isFocused is ------', isFocused);

  return useInfiniteQuery(
    ['products'],
    async ({pageParam = 1}) => {
      // console.log('pageParam is ------', pageParam);

      return API(accessToken)
        .get(`product?page=${pageParam}&size=60`)
        .then(res => res.data)
        .catch(err => {
          throw new Error(err);
        });
    },
    {
      enabled: isFocused,
    },
  );
}
