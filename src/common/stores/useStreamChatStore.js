import create, {UseStore} from 'zustand';
import {StreamChat} from 'stream-chat';
import API from '../services/API';
import {STREAM_CHAT_API_KEY} from '@env';
import {getS3Image} from '../helpers';
import {getKeyValue} from '../SecureStore';
import useAuthStore from './useAuthStore';
console.log('STREAM_CHAT_API_KEY :>> ', STREAM_CHAT_API_KEY);

const STREAM_CHAT_INSTANCE = StreamChat.getInstance(STREAM_CHAT_API_KEY);
/**
 * @typedef TSteamChatStore
 * @property {StreamChat} STREAM_CHAT_CLIENT
 * @property {StreamChat} STREAM_CHAT_INSTANCE
 * @property {boolean} is_connected
 * @property { ()=>Promise<void>} connectUser
 * @property {()=>void} disconnect
 */

/**
 *@type {UseStore<TSteamChatStore>}
 */
const useStreamChatStore = create((set, get) => ({
  STREAM_CHAT_CLIENT: undefined,
  STREAM_CHAT_INSTANCE: STREAM_CHAT_INSTANCE,
  is_connected: undefined,
  connectUser: async () => {
    if (get().is_connected) return;
    try {
      let token = useAuthStore.getState().accessToken;
      let id = useAuthStore.getState().userId;
      const user = await API(token)
        .get(`profile/${id}`, {})
        .then(res => res.data);

      const connectedUser = await STREAM_CHAT_INSTANCE.connectUser(
        {
          id: user.id,
          name: user.full_name,
          image: getS3Image(user.image),
        },
        STREAM_CHAT_INSTANCE.devToken(user.id),
      );
      set({STREAM_CHAT_CLIENT: connectedUser, is_connected: true});
      console.log('connectedUser :>> ', connectedUser);
    } catch (error) {
      // TODO: handle errors
      console.log('stream chat connect error :>> ', error);
    }
  },
  disconnect: async () => {
    if (!get().is_connected) return;
    await STREAM_CHAT_INSTANCE?.disconnectUser(4000);
    set({STREAM_CHAT_CLIENT: undefined, is_connected: undefined});
  },
}));
export default useStreamChatStore;
