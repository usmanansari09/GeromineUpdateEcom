import {getColor, tailwind} from '@/common/tailwind';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
  StyleProp,
  Modal,
  ViewStyle,
  ActivityIndicator,
  Text,
} from 'react-native';
import {Image} from 'react-native-elements';
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
import DEFAULT_IMAGE from '@/assets/product-view-placeholder.png';
const DEFAULT_HEIGHT = windowHeight / 2;
const slideList = Array.from({length: 4}).map((_, i) => {
  return {
    id: i,
    image: DEFAULT_IMAGE,
    title: `This is the title! ${i + 1}`,
    subtitle: `This is the subtitle ${i + 1}!`,
    backgroundColor: i % 2 === 0 ? 'red' : 'blue',
  };
});

function Slide({slide, height, width, sold}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <View
      style={{
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'white',
      }}>
      {/*<Modal animationType={'fade'} transparent={true}*/}
      {/*       visible={showModal}*/}
      {/*       onRequestClose={() => { console.log("Modal has been closed.") }}*/}
      {/*>*/}
      {/*  <View style={tailwind('h-full w-full')}*/}

      <Image
        onPress={() => setShowModal(!showModal)}
        source={{uri: slide?.absolute_path}}
        style={[
          tailwind(''),
          {
            height: '100%',
            width: width,
            backgroundColor: `${sold ? 'rgba(0, 0, 0, 0.4)' : ''}`,
          },
        ]}
        resizeMode="contain"
        PlaceholderContent={
          <ActivityIndicator size="large" color={getColor('brand-primary')} />
        }
        placeholderStyle={tailwind('bg-white')}
      />
      {sold && (
        <Text style={tailwind('absolute z-50 text-white font-bold text-3xl')}>
          SOLD
        </Text>
      )}

      {/*  </View>*/}
      {/*</Modal>*/}
    </View>
  );
}

/**
 *
 * @param {{height:number,images:Array,containerStyle:StylProps<ViewStyle>}} props
 */
export default function Carousel({
  height = DEFAULT_HEIGHT,
  images = [],
  containerStyle = {},
  sold = false,
}) {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState(images?.length !== 0 ? images : []);
  // console.log(`slies in carousel`, slides)
  const [carouselDimensions, setcarouselDimensions] = useState({});

  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback(
    /**
     *
     * @param {NativeSyntheticEvent<NativeScrollEvent>} event
     */
    event => {
      const slideSize = event.nativeEvent.layoutMeasurement.width;
      const index = event.nativeEvent.contentOffset.x / slideSize;
      const roundIndex = Math.round(index);
      const distance = Math.abs(roundIndex - index);

      // Prevent one pixel triggering setIndex in the middle
      // of the transition. With this we have to scroll a bit
      // more to trigger the index change.
      const isNoMansLand = 0.4 < distance;

      if (roundIndex !== indexRef.current && !isNoMansLand) {
        setIndex(roundIndex);
      }
    },
    [],
  );

  // Use the index
  useEffect(() => {
    // console.warn(index);
  }, [index]);
  // Use the index

  useEffect(() => {
    setSlides(images);
  }, [images]);

  const renderItem = ({item}) => (
    <Slide
      slide={item}
      height={height}
      width={carouselDimensions.width}
      sold={sold}
    />
  );
  /**
   *
   * @param {LayoutChangeEvent} event
   */
  function calculateDimensions(event) {
    setcarouselDimensions(event.nativeEvent.layout);
  }
  return (
    <View style={[containerStyle]}>
      <FlatList
        onLayout={calculateDimensions}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}`}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
      {slides.length > 1 && (
        <Pagination length={slides.length} currentSlide={index} />
      )}
    </View>
  );
}
function Pagination({length, currentSlide}) {
  return (
    <View
      style={tailwind(
        'items-center absolute bottom-0 justify-center inset-x-0 p-3',
      )}>
      <View style={tailwind('flex-row')}>
        {Array.from({length}).map((_, index) => (
          <View
            key={index}
            style={[
              tailwind('w-3 h-3 rounded-full border border-black'),
              tailwind(`${index !== 0 ? 'ml-1' : ''}`),
              tailwind(`${currentSlide === index ? 'bg-black' : 'bg-white'}`),
            ]}
          />
        ))}
      </View>
    </View>
  );
}
