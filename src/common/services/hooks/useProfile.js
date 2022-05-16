// import {AuthContext} from '@/common/contexts/AuthContext';
// import {useIsFocused} from '@react-navigation/core';
// import {useContext} from 'react';
// import {useQuery} from 'react-query';
// import API from '../API';

// /**
//  *
//  * @param {number|string} id - id of user
//  * @returns
//  */
// export default function useProfile(id = '') {
//   const {accessToken, userId, isSignedIn} = useContext(AuthContext);
//   const isFocused = useIsFocused();
//   const user_id = id || userId;
//   return useQuery(
//     ['profile', user_id],
//     () => {
//       console.log('in API Calll -----------');
//       return API(accessToken)
//         .get(`user/`, {})
//         .then(res => res.data);
//     },

//     {
//       onError: err => {
//         console.log('user profile data error:>> ', err.response?.data);
//       },
//       enabled: true,
//     },
//   );
// }
import {AuthContext} from '@/common/contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/core';
import {useContext} from 'react';
import {useQuery} from 'react-query';
import API from '../API';

/**
 *
 * @param {number|string} id - id of user
 * @returns
 */
// export default function useProfile(id = null, opts) {
//   const {accessToken} = useContext(AuthContext);
//   const isFocused = useIsFocused();
//   return useQuery(
//     ['user', id],
//     () =>
//       API(accessToken)
//         .get(`user/`)
//         .then(res => {
//           console.log(
//             `ressssssssssssssssssssssssssssssssssssssssssssssssssssssss`,
//             res.data.payload,
//           );
//           return res.data;
//         })
//         .catch(err => {
//           throw new Error(err);
//         }),
//     {enabled: isFocused},
//   );
// }
export default function useProfile() {
  const {accessToken} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  return useQuery(
    ['user'],
    () =>
      API(accessToken)
        .get(`user/`)
        .then(res => {
          // console.log('useprofile res is -', res);
          return res?.data;
        })
        .catch(err => {
          if (
            err?.response?.data?.message &&
            err?.response?.data?.message === 'User does not exists.'
          ) {
            navigation.replace('Logout');
          }
          // console.log(
          //   'error in useprofile',
          //   JSON.stringify(err?.response?.data?.message || err),
          // );
        }),
    {
      onError: err => {
        // console.log(
        //   `user profile data error:>> token: ${accessToken}`,
        //   err.response?.data,
        // );
      },
    },
    {enabled: true},
  );
}
