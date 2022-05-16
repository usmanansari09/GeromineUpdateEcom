// import * as SecureStore from "expo-secure-store";
// import SInfo from 'react-native-sensitive-info';
// import SecureStorage, {
//   ACCESS_CONTROL,
//   ACCESSIBLE,
//   AUTHENTICATION_TYPE,
// } from 'react-native-secure-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const config = {
//   accessible: ACCESSIBLE.ALWAYS,
//   // authenticationPrompt: 'auth with yourself',
//   // service: 'example',
//   // authenticateType: AUTHENTICATION_TYPE.BIOMETRICS,
// };

export async function saveKey(key, value) {
  return AsyncStorage.setItem(key, value);
}

export async function getKeyValue(key) {
  let result = await AsyncStorage.getItem(key);
  return result;
}
export async function deleteValue(key) {
  let result = await AsyncStorage.removeItem(key);
  return result;
}
