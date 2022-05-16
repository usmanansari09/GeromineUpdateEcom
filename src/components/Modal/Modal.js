import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import Button from '@/components/Button';
import Modal from 'react-native-modal';
import {getColor, tailwind} from '@/common/tailwind';
import {useState} from 'react';

const StorModal = ({isSuccess, cbSuccess, DataModal}) => {
  const [show, setShow] = useState(isSuccess);
  // console.log('isSuccess===>', isSuccess);
  return (
    <Modal style={{flex: 1, justifyContent: 'flex-end'}} isVisible={isSuccess}>
      <DataModal />
    </Modal>
  );
};
export default StorModal;
