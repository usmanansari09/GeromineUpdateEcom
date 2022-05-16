import axios, {AxiosInstance} from 'axios';
import {SENDBIRD_SECONDARY_API_KEY} from '@env';
/**
 *
 * @returns AxiosInstance
 */
export default function SendBirdAPI() {
  return axios.create({
    baseURL: `https://api-DCD9BD01-D27F-429B-A77D-AA972CF7ECDA.sendbird.com/v3/`,
    headers: {
      'Content-Type': ' application/json; charset=utf8',
      'Api-Token': SENDBIRD_SECONDARY_API_KEY,
    },
  });
}
