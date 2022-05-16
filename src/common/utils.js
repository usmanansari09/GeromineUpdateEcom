import RNLocation from 'react-native-location';

export const ellipsis = (s, len) => {
  return s.length > len ? s.substring(0, len) + '..' : s;
};
export const getLocationPermission = () => {
  RNLocation.configure({
    distanceFilter: 0,
  });

  return RNLocation.requestPermission({
    ios: 'whenInUse', // or 'always'
    android: {
      detail: 'coarse',
    },
  }).then(async granted => {
    if (granted) {
      const loc = await RNLocation.getLatestLocation({timeout: 60000}).then(
        latestLocation => {
          return latestLocation;
        },
      );

      return loc;
    } else {
      return false;
    }
  });
};
