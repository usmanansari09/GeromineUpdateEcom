import axios, {AxiosInstance} from 'axios';
/**
 *
 * @param {string} token
 * @returns AxiosInstance
 */
export default function API(token) {
  return axios.create({
    baseURL: 'https://api.geronimolive.com/api/',
    // baseURL: 'http://18.223.121.158/api/',
    // baseURL: 'http://192.168.137.1:3000/api/',
    headers: {
      ...(token ? {Authorization: `${token}`} : {}),
      'Content-Type': 'application/json',
    },
  });
}
