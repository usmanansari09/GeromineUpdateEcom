import create, {UseStore} from 'zustand';
import {saveKey, deleteValue, getKeyValue} from '../SecureStore';
import {Channel} from 'stream-chat';
/**
 * @typedef TLiveStreamStore
 * @property {Channel} channel
 * @property {(channel:Channel)=>void} setChannel
 * @property {(cid:string)=>void} loadChannel
 */

/**
 *@type {UseStore< TLiveStreamStore>}
 */
const useLiveStreamStore = create(set => ({
  channel: undefined,
  setChannel: ch => {
    if (!ch) return;
    set({channel: ch});
  },
  loadChannel: async (token, id) => {
    console.log('login token :>> ', token);
    console.log('login id :>> ', id);
    await saveKey('access_token', token);
    await saveKey('user_id', `${id}`);
    let savedKey = await getKeyValue('user_id');
    console.log('savedKey :>> ', savedKey);
    set({
      isSignedIn: !!token && !!id,
      accessToken: token,
      userId: id,
    });
  },
}));
export default useLiveStreamStore;
