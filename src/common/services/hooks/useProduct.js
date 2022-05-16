import {AuthContext} from '@/common/contexts/AuthContext';
import {useIsFocused} from '@react-navigation/core';
import {useContext} from 'react';
import {useQuery} from 'react-query';
import API from '../API';

export default function useProduct(id = null, opts) {
  const {accessToken} = useContext(AuthContext);
  const isFocused = useIsFocused();
  return useQuery(
    ['product', id],
    () =>
      API(accessToken)
        .get(`product/${id}`)
        .then(res => {
          // console.log(`ressssssssssssssssssssssssssssssssssssssssssssssssssssssss`, res.data.payload)
          return res.data.payload?.product;
        })
        .catch(err => {
          throw new Error(err);
        }),
    {enabled: isFocused && (id !== null || id !== undefined), ...opts},
  );
}
