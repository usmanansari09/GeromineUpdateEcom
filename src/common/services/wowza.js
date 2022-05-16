import axios, {AxiosInstance} from 'axios';
import crypto from 'crypto-js';
import {WSC_ACCESS_KEY, WSC_API_KEY} from '@env';
// const HOST_PATH = `https://api.cloud.wowza.com`;
const HOST_PATH = `https://169.254.55.42:1935`;
const API_PATH = `/api/v1.6`;
/**
 *
 * @returns AxiosInstance
 */
export default function wowza(path = '') {
  //For security, never reveal API key in client-side code
  const baseURL = `${HOST_PATH}`;
  //   const baseURL = `${HOST_PATH}${API_PATH}${path}`;
  //   let timestamp = Math.round(new Date().getTime() / 1000);
  //   let hmacData = timestamp + ':' + `${API_PATH}${path}` + ':' + WSC_API_KEY;
  //   let signature = crypto
  //     .HmacSHA256(hmacData, WSC_API_KEY)
  //     .toString(crypto.enc.Hex);

  return axios.create({
    baseURL: baseURL,
    headers: {
      'wsc-access-key': WSC_ACCESS_KEY,
      'wsc-timestamp': 'timestamp',
      'wsc-signature': 'signature',
      'Content-Type': 'application/json',
    },
  });
}
