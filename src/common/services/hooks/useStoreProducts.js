import {useContext} from 'react';
import {useQuery, UseQueryOptions} from 'react-query';
import {AuthContext} from '../../contexts/AuthContext';
import API from '../API';

/**
 *
 * @param {number} id
 * @param {UseQueryOptions} opts
 * @returns
 */
const useStoreProducts = (id, opts) => {
  const {isSignedIn, accessToken} = useContext(AuthContext);
  return useQuery(
    ['store', id, 'products'],
    () =>
      API(accessToken)
        .get(`store/${id}/products`)
        .then(res => res.data),
    {
      enabled: isSignedIn && !!id,
      ...opts,
    },
  );
};
export default useStoreProducts;
