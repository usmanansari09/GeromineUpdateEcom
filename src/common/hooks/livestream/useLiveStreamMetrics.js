import wowza from '@/common/services/wowza';
import {useQuery, UseQueryOptions} from 'react-query';

/**
 *
 * @param {number|string} id
 * @param {UseQueryOptions} opts
 * @returns number
 */
const useStreamMetrics = (id, opts) => {
  const {data} = useQuery(
    'livestream-views',
    () =>
      wowza(`/live_streams/${id}/stats`)
        .get('', {})
        .then(res => res.data.live_stream.unique_views.value),
    {
      enabled: !!id,
      refetchInterval: 5000,
      ...opts,
    },
  );

  return data ? data : 0;
};
export default useStreamMetrics;
