import wowza from '@/common/services/wowza';
import {useEffect, useState} from 'react';
import {useQuery, UseQueryOptions} from 'react-query';

/**
 *
 * @typedef {"started"|"stopped"|"starting"|"stopping"|"resetting"} StreamState
 */

/**
 *
 * @param {string} id - id of wowza live stream instance
 * @param {UseQueryOptions} opts
 *
 * @returns
 */
const useStreamState = (id, opts = {}) => {
  /**
   * @type {[StreamState,React.Dispatch<React.SetStateAction<StreamState>>]}
   */
  const [streamState, setStreamState] = useState('');
  const {isError, error: stream_status_error} = useQuery(
    'stream-state',
    () =>
      wowza(`/live_streams/${id}/state`)
        .get('', {})
        .then(res => {
          setStreamState(res.data.live_stream.state);
        }),
    {
      enabled: !!id,
      refetchInterval: 1000,
      ...opts,
    },
  );

  useEffect(() => {
    isError && setStreamState('');
  }, [isError]);

  // useEffect(() => {
  //     console.log(
  //         "stream_status_error?.response?.error :>> ",
  //         stream_status_error?.response?.data
  //     );
  // }, [stream_status_error]);
  return {state: streamState, error: stream_status_error};
};
export default useStreamState;
