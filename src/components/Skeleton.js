import {tailwind} from '@/common/tailwind';
import MaskedView from '@react-native-community/masked-view';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Animated, View, LayoutRectangle, ViewStyle, Text} from 'react-native';
import Button from '@/components/Button';
export default function Skeleton({isLoading = true, children}) {
  /**
   * @type {[layout:LayoutRectangle]}
   */
  const [layout, setLayout] = useState(null);
  const [position, setPosition] = useState(new Animated.Value(0));
  const [opacity, setOpacity] = useState(new Animated.Value(0));

  const show = () => {
    Animated.timing(position, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const hide = () => {
    Animated.timing(position, {
      toValue: 50,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    // isLoading ? show() : hide();
    show();
  }, [isLoading]);

  const getChildren = useCallback(element => {
    return React.Children.map(element, (child, index) => {
      /**
       * @type {ViewStyle}
       */
      let style = child.props.style;

      if (child.props.children) {
        return (
          <View key={index} style={style}>
            {getChildren(child.props.children)}
          </View>
        );
      } else {
        return (
          <View key={index} style={tailwind('relative')}>
            <View
              style={[
                style,
                {
                  overflow: 'hidden',
                },
                tailwind('bg-gray-200'),
              ]}
            />
          </View>
        );
      }
    });
  }, []);
  // if (!isLoading) return null;

  if (layout?.width === undefined && layout?.height === undefined) {
    return (
      <View
        onLayout={event => {
          setLayout(event.nativeEvent.layout);
        }}>
        {getChildren(children)}
      </View>
    );
  }
  return (
    <View>{getChildren(children)}</View>
    // <MaskedView
    //     style={{
    //         height: layout.height,
    //         width: layout.width,
    //     }}
    //     maskElement={
    //         <View
    //             style={{
    //                 backgroundColor: "transparent",
    //             }}
    //         >
    //             {getChildren(children)}
    //         </View>
    //     }
    // >
    //     <View style={tailwind("bg-gray-200 flex-1")} />
    //     {/* <Animated.View
    //         style={[
    //             {
    //                 flex: 1,
    //                 height: "100%",
    //                 // transform: [
    //                 //     {
    //                 //         translateY: position,
    //                 //     },
    //                 // ],
    //                 // opacity: opacity,
    //             },
    //         ]}
    //     >
    //         {getChildren(children)}
    //     </Animated.View> */}
    // </MaskedView>
  );
}
