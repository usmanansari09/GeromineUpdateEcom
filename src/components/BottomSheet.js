import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import {tailwind} from '@/common/tailwind';

const {height} = Dimensions.get('screen');
const MAX_HEIGHT = height / 2;

/**
 *
 * @param {{maxHeight:number,containerStyle:StyleProp<ViewStyle>,isVisible:boolean,children:ReactChildren}& ModalProps} props
 */
function BottomSheet({
  maxHeight: containerHeight,
  containerStyle,
  isVisible,
  children,
  ...modalProps
}) {
  const [listHeight, setlistHeight] = useState(undefined);
  const [maxHeight, setMaxHeight] = useState(
    containerHeight ? containerHeight : MAX_HEIGHT,
  );

  useEffect(() => {
    setMaxHeight(containerHeight);
  }, [containerHeight]);

  function onLayout(event) {
    setlistHeight(event.nativeEvent.layout.height);
  }
  function setContainerHeight() {
    return listHeight < maxHeight ? listHeight : maxHeight;
  }
  return (
    <Modal
      isVisible={isVisible}
      // swipeDirection={["down"]}
      {...modalProps}
      style={tailwind('justify-end m-0')}>
      <View style={[containerStyle, tailwind('rounded-3xl')]}>{children}</View>
    </Modal>
  );
}

BottomSheet.defaultProps = {
  modalProps: {},
  maxHeight: 0,
  containerStyle: {},
  isVisible: false,
};

export default BottomSheet;
