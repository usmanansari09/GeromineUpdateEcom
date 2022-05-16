import {useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';
const S3_PATH = 'https://gero-staging.s3.ap-southeast-1.amazonaws.com';
/**
 *
 * @returns {(path)=>(string)}
 */
export default function useS3Images() {
  const { userId } = useContext(AuthContext);
  const getFile = (path = '') => {
    if (!path) throw Error('Path not specified');
    return `${S3_PATH}/${path}`;
    // return `${S3_PATH}/profiles/${userId}/images/${path}`;
  };
  return getFile;
}
