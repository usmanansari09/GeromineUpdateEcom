import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

const StorProduct = ({key, imagepath}) => {
  return (
    <TouchableOpacity
      // onPress={() => navigate('ProductView', {id: item.id, type: 'seller'})}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal: 4,
        padding: 5,
      }}>
      <Image
        source={{
          uri: imagepath && imagepath[0] ? imagepath[0].absolute_path : '',
        }}
        style={{height: 130, width: 85}}
        resizeMode={'cover'}
      />
    </TouchableOpacity>
  );
};
export default StorProduct;
