import create, {UseStore} from 'zustand';
import {deleteValue, getKeyValue, saveKey} from '../SecureStore';
/**
 * @typedef TAuthContext
 * @property {boolean} isSignedIn
 * @property {boolean} isFirstTime
 * @property {string} accessToken
 * @property {string|number} userId
 * @property {(token:string,id:number)=>void} login
 * @property {()=>void} logout
 * @property {()=>void} loadTokens
 */

/**
 *@type {UseStore<TAuthContext>}
 */
const useAuthStore = create((set, get) => ({
  isSignedIn: false,
  accessToken: undefined,
  userId: undefined,
  isFirstTime: undefined,

  login: async token => {
    await saveKey('access_token', token);
    set({
      isSignedIn: !!token,
      accessToken: token,
    });
  },
  // personId: async id => {
  //   await saveKey('user_id', id);
  //   set({
  //     userId: id,
  //   });
  // },

  setFirstTime: async () => {
    await saveKey('first_time', 'yes');
    set({
      isFirstTime: 'yes',
    });
  },
  getFirstAttempt: async () => {
    return await getKeyValue('first_time');
  },
  getToken: async () => {
    return await getKeyValue('access_token');
  },
  // getUserId: async () => {
  //   return await getKeyValue('user_id');
  // },
  logout: async () => {
    await deleteValue('access_token');
    // await deleteValue('user_id');
    set({
      isSignedIn: false,
      accessToken: null,
      // userId: null,
    });
  },
  loadTokens: async function () {
    if (get().isSignedIn) return;

    await Promise.all([getKeyValue('access_token'), getKeyValue('userId')])
      .then(function (values) {
        const [token, userId] = values;
        // console.log('secure storage values token -------:>> ', token, userId);
        if (token) {
          get().login(token);
          // get().personId(userId);
        } else {
          get().logout();
        }
      })
      .catch(async error => {
        // console.log('loadToken error :>> ', error);
        get().logout();
      });
  },
}));
export default useAuthStore;
