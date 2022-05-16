import React, {createContext, useEffect, useReducer} from 'react';
import {deleteValue} from '../SecureStore';
import {useAuthStore} from '../stores';
import shallow from 'zustand/shallow';

/**
 * @type {React.Context<TAuthContext>}
 */
export const AuthContext = createContext();
export default function AuthProvider({children}) {
  const credentials = useAuthStore(
    s => ({
      isSignedIn: s.isSignedIn,
      accessToken: s.accessToken,
      userId: s.userId,
    }),
    shallow,
  );

  return (
    <AuthContext.Provider value={credentials}>{children}</AuthContext.Provider>
  );
}
