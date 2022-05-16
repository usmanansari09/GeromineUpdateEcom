/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable handle-callback-err */
import React, {useLayoutEffect, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Platform,
  Alert,
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  checkMultiple,
  openSettings,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import 'react-native-reanimated';
import {tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import Modal from 'react-native-modal';
import ShoppingAdd from '@/common/icons/ShoppingAdd';
import ExistingProducts from './components/ExistingProducts';
import DisplayPhoto from './components/DisplayPhoto';
import {Icon} from 'react-native-elements';
import {useModal} from '@/components/Modal';
import StackHeader from '@/components/StackHeader';
import SellingModal from '@/components/Modal/SellingModal';
import {FeaturedProducts} from '../components';

const REQUIRED_PERMISSIONS = Platform.select({
  ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE],
  android: [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO],
});
const PERMISSION_TEXT = {
  denied: {
    title: 'Camera and Audio permissions denied',
    message: 'Camera & Audio permission is requred to start a live stream',
  },
  blocked: {
    title: 'Camera and Audio permissions blocked',
    message:
      'Camera & Audio permission is requred to start a live stream,open settings to manually enable permissions',
  },
};
/**
 *
 * @typedef {Object} StatusSummaryType
 * @property {boolean} granted
 * @property {boolean} denied
 * @property {boolean} blocked
 */

/**
 *
 * @returns {Promise<StatusSummaryType>}
 */
const checkPermission = () => {
  return checkMultiple(REQUIRED_PERMISSIONS)
    .then(statuses => {
      return {
        granted:
          statuses[REQUIRED_PERMISSIONS[0]] === RESULTS.GRANTED &&
          statuses[REQUIRED_PERMISSIONS[1]] === RESULTS.GRANTED,
        denied:
          statuses[REQUIRED_PERMISSIONS[0]] === RESULTS.DENIED ||
          statuses[REQUIRED_PERMISSIONS[1]] === RESULTS.DENIED,
        blocked:
          statuses[REQUIRED_PERMISSIONS[0]] === RESULTS.BLOCKED ||
          statuses[REQUIRED_PERMISSIONS[1]] === RESULTS.BLOCKED,
      };
    })
    .catch(error => {
      // log to sentry
      //
      return {
        granted: false,
        denied: false,
        blocked: false,
      };
    });
};
/**
 *
 * @returns {Promise<StatusSummaryType>}
 */
const requestPermissions = () => {
  return requestMultiple(REQUIRED_PERMISSIONS)
    .then(statuses => {
      return {
        granted:
          statuses[REQUIRED_PERMISSIONS[0]] === RESULTS.GRANTED &&
          statuses[REQUIRED_PERMISSIONS[1]] === RESULTS.GRANTED,
        denied:
          statuses[REQUIRED_PERMISSIONS[0]] === RESULTS.DENIED ||
          statuses[REQUIRED_PERMISSIONS[1]] === RESULTS.DENIED,
        blocked:
          statuses[REQUIRED_PERMISSIONS[0]] === RESULTS.BLOCKED ||
          statuses[REQUIRED_PERMISSIONS[1]] === RESULTS.BLOCKED,
      };
    })
    .catch(err => {
      // log to sentry
      return {
        granted: false,
        denied: false,
        blocked: false,
      };
    });
};

/**
 *
 * @param {{navigation:StackNavigationProp<any>}} props
 */
export default function GoLive({navigation, route}) {
  const isSellLive = route?.params?.isSellLive || false;
  // console.log({isSellLive});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showFeatured, setShowFeatured] = useState(false);
  const childRef = useRef(null);
  const existingRef = useRef(null);

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              title: 'Sell Now',
              hasProduct: () => childRef.current.toggle(),
            }}
          />
        );
      },
    });
  }, [navigation]);

  const checkRequirements = async () => {
    const {granted, blocked, denied} = await checkPermission();
    // console.log('check permission result :>> ', granted);
    if (!granted) {
      return new Promise((res, rej) => {
        Alert.alert(
          PERMISSION_TEXT[denied ? 'denied' : 'blocked'].title,
          PERMISSION_TEXT[denied ? 'denied' : 'blocked'].message,
          [
            {
              text: 'Cancel',
              onPress: () => {
                res(false);
              },
            },
            {
              text: blocked ? 'Open Settings' : 'Request Permissions',
              onPress: async () => {
                let statuses = await requestPermissions();
                if (statuses.blocked) {
                  openSettings().catch(() =>
                    console.warn('cannot open settings'),
                  );
                } else if (statuses.denied) {
                  res(false);
                } else {
                  res(statuses);
                }
              },
            },
          ],
          {cancelable: false},
        );
      });
    } else {
      return true;
    }
  };
  const onPress = async (route, isSellLive) => {
    const granted = await checkRequirements();
    if (!granted) {
      Toast.show({
        type: 'info',
        text1: 'Cannot start live stream',
        text2:
          'To start a live stream your must grant Geronimo! camera and audio permissions',
      });
    } else if (selectedProducts.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'No products selected',
        text2: 'Please select products to include in your Live Selling',
      });
    } else {
      // console.log('selected products-----', selectedProducts?.length);
      navigation.navigate(route, {
        selected_products: selectedProducts,
        isSellLive,
      });
      // navigation.navigate("ShareStream", {
      //     previous_scree: "LiveScreen",
      // });
    }
  };

  return (
    <View style={tailwind('flex-1 bg-black')}>
      <ImageBackground
        source={require('@/assets/go-live-img.png')}
        // source={}
        style={tailwind('w-full h-full')}
        resizeMode="cover">
        <View style={tailwind('justify-end h-full w-full')}>
          <FeaturedProducts
            onSelect={() => {
              console.log('Feature Products onselect');
            }}
            show={showFeatured}
            products={selectedProducts}
          />
          {/*<View style={tailwind('justify-end t.shadow2xl h-full pb-4 px-6')}>*/}
          <StartStream
            onStartStream={() => onPress('StreamView', isSellLive)} //livescreen
            onShareStream={() => onPress('ShareStream')}
            navigation={navigation}
            isSellLive={isSellLive}
          />
          <View style={tailwind('flex-row mt-5')}>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('AddProduct')}
              style={tailwind(
                'border border-white rounded-lg p-1 justify-center  items-center flex-1',
              )}>
              <ShoppingAdd style={tailwind('text-white w-8 h-8')} />
              <Text
                style={tailwind('text-white text-sm font-bold text-center')}>
                {'Add\nNew Product'}
              </Text>
            </TouchableOpacity> */}
            <ExistingProducts
              ref={existingRef}
              onChange={setSelectedProducts}
              selectedProducts={selectedProducts}
              setShowFeatured={setShowFeatured}
            />
            {/* <DisplayPhoto /> */}
          </View>
        </View>
        <SellingModal
          ref={childRef}
          onAddNewProduct={() => {
            // setShowFeatured(false);
            setTimeout(() => {
              navigation.navigate('AddProduct', {
                setSelectedProducts: setSelectedProducts,
                setShowFeatured: setShowFeatured,
              });
            }, 500);
          }}
          onExistingproduct={() => {
            setShowFeatured(false);
            setTimeout(() => {
              existingRef.current.toggle();
            }, 1000);
          }}
          navigation={navigation}
        />
      </ImageBackground>
    </View>
  );
}

function StartStream({
  onStartStream = () => {},
  navigation,
  onShareStream = () => {},
  isSellLive,
}) {
  const [visible, toggle] = useModal();
  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }, []);

  return (
    <View style={tailwind('items-center justify-center')}>
      <Modal
        isVisible={visible}
        onBackButtonPress={toggle}
        onBackdropPress={toggle}>
        <View
          style={tailwind('bg-white rounded-2xl justify-center items-center')}>
          <Icon
            type="ionicon"
            name="close"
            // style={{width: 32, height: 32}}
            onPress={toggle}
            containerStyle={tailwind('items-end w-full pt-3 pr-3')}
          />
          <Text
            style={tailwind(
              'text-2xl px-8 text-black text-center font-bold mb-4',
            )}>
            Do you want to share your Live Stream?
          </Text>

          <Button
            title="Yes"
            theme="primary"
            containerStyle={tailwind('w-1/2 mb-4')}
            // onPress={() => onPress()}
            onPress={() => {
              onShareStream();
              setTimeout(() => {
                toggle(false);
              }, 2000);
            }}
          />
          <Button
            title="No, Thanks"
            theme="black"
            onPress={() => {
              toggle(false);
              setTimeout(() => {
                onStartStream();
              }, 500);
            }}
            containerStyle={tailwind('w-1/2 mb-4')}
          />
        </View>
      </Modal>
      <Button
        title={'Start Selling Now'}
        theme="primary"
        // size="md"
        onPress={() => onStartStream()}
        // onPress={() => toggle(true)}
        containerStyle={tailwind('w-8/12')}
      />
    </View>
  );
}
