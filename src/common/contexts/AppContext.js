import React, {createContext, LegacyRef, RefObject} from 'react';
import {StreamChat} from 'stream-chat';
import GToast from '@/components/Toast';
/**
 * @typedef TAppContext
 * @property {StreamChat} StreamChatClient
 * @property {RefObject<GToast>} ToastActions
 */

/**
 * @type {React.Context<TAppContext>}
 */
export const AppContext = createContext();

/**
 *
 * @param {{children:React.ReactNode,value:TAppContext}} props
 */
export default function AppProvider({children, value}) {
  return (
    <AppContext.Provider value={{...value}}>{children}</AppContext.Provider>
  );
}
