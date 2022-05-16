import React from 'react';
import {Alert} from 'react-native';
const CustomAlert = (title = 'Alert', desc, onPress) => {
  return Alert.alert(title, desc, [{text: 'OK', onPress: onPress}]);
};
export default CustomAlert;
