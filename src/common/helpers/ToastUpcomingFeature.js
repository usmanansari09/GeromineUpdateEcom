import Toast from 'react-native-toast-message';

export default ToastUpcomingFeature = ({
  position = 'bottom',
  text1 = 'Upcoming Feature',
}) =>
  Toast.show({
    type: 'success',
    text1: text1,
    position: position || 'bottom',
    visibilityTime: 2000,
  });
