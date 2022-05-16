import React, {createContext, useState} from 'react';
import {StreamChat, Channel} from 'stream-chat';
/**
 * @typedef TAppContext
 * @property {Function} setChannel
 * @property {Channel} channel
 */

/**
 * @type {React.Context<TAppContext>}
 */
export const StreamChatContext = createContext();
export default function StreamChatProvider({children, value}) {
  const [channel, setChannel] = useState();
  return (
    <StreamChatContext.Provider value={{setChannel, channel}}>
      {children}
    </StreamChatContext.Provider>
  );
}
