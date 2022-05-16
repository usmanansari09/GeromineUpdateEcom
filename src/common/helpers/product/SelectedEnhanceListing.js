import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import tailwind from 'tailwind-rn';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Anticons from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import StackHeader from '@/components/StackHeader';
import enhanceListing from '../../rawdata/product/enhanceListing.json';

export default function SelectedEnhanceListing({
  navigation,
  route,
  product,
  disabled,
}) {
  let _enhanceListing = JSON.parse(JSON.stringify(enhanceListing));
  const selected = JSON.parse(JSON.stringify(product?.extraDetails));
  _enhanceListing.style.source = enhanceListing.style.source.reduce(
    (acc, val) => {
      return selected?.style?.source?.includes(val?.key)
        ? [...acc, val]
        : [...acc];
    },
    [],
  );
  _enhanceListing.style.style = enhanceListing.style.style.reduce(
    (acc, val) => {
      return selected?.style?.style?.includes(val?.key)
        ? [...acc, val]
        : [...acc];
    },
    [],
  );

  _enhanceListing.color = enhanceListing.color.reduce((acc, val) => {
    return selected?.color?.includes(val?.key) ? [...acc, val] : [...acc];
  }, []);

  _enhanceListing.style.age = enhanceListing.style.age.reduce((acc, val) => {
    return selected?.style?.age === val?.key ? [...acc, val] : [...acc];
  }, []);

  // console.log(`asdasd`, JSON.stringify(enhanceListing.color))
  let extraDetails = _enhanceListing;

  const [selectColor, setSelectColor] = useState(extraDetails?.color || []);
  const [selectSource, setSelectSource] = useState(
    extraDetails?.style?.source || [],
  );
  const [selectStyle, setSelectStyle] = useState(
    extraDetails?.style?.style || [],
  );
  const [selectAge, setSelectAge] = useState(extraDetails?.style?.age || 0);

  let options = _enhanceListing;
  let colors = options?.color;
  let style = options?.style;

  //   useEffect(() => {
  //     selectExtraDetails({
  //       color: selectColor,
  //       style: {
  //         source: selectSource,
  //         age: selectAge,
  //         style: selectStyle,
  //       },
  //     });
  //   }, [selectColor, selectSource, selectAge, selectStyle]);

  const Item = ({
    item,
    onPress,
    backgroundColor,
    textColor,
    selected,
    isSub,
  }) => (
    <TouchableOpacity style={[styles.item, backgroundColor]}></TouchableOpacity>
  );

  const RenderItemColor = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        // selectColor.find(el => {
        //     // return el === item.key;
        // })
        //     ? setSelectColor(selectColor.filter(el => el !== item.key))
        //     : selectColor.length >= 2
        //         ? setSelectColor([item.key, selectColor[0]])
        //         : setSelectColor([item.key, ...selectColor]);
      }}
      disabled={disabled}
      style={tailwind('z-0 mb-2')}>
      <View key={item.key} style={tailwind('z-0 mr-1')}>
        <View style={tailwind('z-0')}>
          <View
            style={[
              tailwind('rounded-xl bg-white border border-gray-900'),
              {backgroundColor: item.hex},
            ]}>
            {item.value === 'Navy' ||
            item.value === 'Black' ||
            item.value === 'Red' ||
            item.value === 'Brown' ||
            item.value === 'Burgundy' ||
            item.value === 'Purple' ||
            item.value === 'Blue' ? (
              <Text style={[tailwind('py-1 px-4 font-bold text-white')]}>
                {item.value}
              </Text>
            ) : (
              <Text style={[tailwind('py-1 px-4 font-bold')]}>
                {item.value}
              </Text>
            )}
          </View>
        </View>
        {/* <View style={tailwind('z-0')}>
                    {!item?.uri ? (
                        <View style={tailwind('z-0')}>
                            <Text
                                style={[
                                    tailwind('h-8 w-8 m-2 rounded-full'),
                                    { backgroundColor: item.hex },
                                    styles.shadow,
                                ]}>
                            </Text>
                        </View>
                    ) : (
                        <View style={[tailwind('m-2 z-0'), styles.shadow]}>
                            <ImageBackground
                                style={[tailwind('h-8 w-8')]}
                                source={{ uri: item.uri }}
                            />
                        </View>
                    )}

                    {selectColor?.find(el => {
                        return el === item.key;
                    }) ? (
                        <View style={[tailwind('z-50 absolute')]}>
                            <View style={[tailwind('z-50'), styles.shadow]}>
                                <View style={tailwind('z-50')}>
                                    <Ionicon
                                        name="ios-checkmark-circle-sharp"
                                        style={[tailwind('text-4xl text-white'), styles.shadow]}
                                    />
                                </View>
                            </View>
                        </View>
                    ) : null}
                </View> */}
      </View>
    </TouchableOpacity>
  );

  const RenderItemStyle = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        // selectStyle.find(el => {
        //     return el === item.key;
        // })
        //     ? setSelectStyle(selectStyle.filter(el => el !== item.key))
        //     : selectStyle.length === 3
        //         ? setSelectStyle([item.key, selectStyle[0], selectStyle[1]])
        //         : setSelectStyle([item.key, ...selectStyle]);
      }}
      disabled={disabled}
      style={tailwind('z-0 mb-2')}
      key={item.key}>
      {selectStyle.find(el => {
        return el === item.key;
      }) ? (
        <View style={tailwind('z-0 mr-1')}>
          <View
            style={tailwind('rounded-xl bg-gray-800 border border-gray-900')}>
            <Text style={tailwind('py-1 px-4 text-white')}>{item.value}</Text>
          </View>
        </View>
      ) : (
        <View style={tailwind('z-0 mr-1')}>
          <View style={tailwind('rounded-xl bg-white border border-gray-900')}>
            <Text style={tailwind('py-1 px-4 text-gray-900 font-bold')}>
              {item.value}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const RenderItemSource = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        // selectSource?.find(el => {
        //     return el === item?.key;
        // })
        //     ? setSelectSource(selectSource?.filter(el => el !== item?.key))
        //     : selectSource?.length >= 2
        //         ? setSelectSource([item?.key, selectSource[0]])
        //         : setSelectSource([item?.key, ...selectSource]);
      }}
      disabled={disabled}
      style={tailwind('z-0 mr-1 mb-2')}
      key={item?.key}>
      {selectSource?.find(el => {
        return el === item?.key;
      }) ? (
        <View style={tailwind('z-0')}>
          <View
            style={tailwind('rounded-xl bg-gray-800 border border-gray-400')}>
            <Text style={tailwind('m-2 text-white')}>{item.value}</Text>
          </View>
        </View>
      ) : (
        <View style={tailwind('z-0')}>
          <View style={tailwind('rounded-xl bg-white border border-gray-900')}>
            <Text style={tailwind('py-1 px-4 font-bold text-gray-900')}>
              {item.value}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const RenderItemAge = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        // selectAge === item.key ? setSelectAge(0) : setSelectAge(item.key);
      }}
      disabled={disabled}
      style={tailwind('z-0')}
      key={item.key}>
      <View style={tailwind('mb-2')}>
        {selectAge === item.key ? (
          <View style={tailwind('z-0')}>
            <View
              style={tailwind('rounded-xl bg-gray-800 border border-gray-900')}>
              <Text style={tailwind('text-white font-bold font-normal')}>
                {item.value}
              </Text>
            </View>
          </View>
        ) : (
          <View style={tailwind('z-0 mr-1')}>
            <View
              style={tailwind('rounded-xl bg-white border border-gray-900')}>
              <Text style={tailwind('py-1 px-4 font-bold text-gray-900 ')}>
                {item.value}
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={tailwind('flex-row flex-wrap')}>
        {colors?.map((el, index) => {
          return <RenderItemColor key={index} item={el} />;
        })}

        {style?.source?.map((el, index) => {
          return <RenderItemSource key={index} item={el} />;
        })}
        {style?.age?.map((el, index) => {
          return <RenderItemAge key={index} item={el} />;
        })}

        {style?.style?.map((el, index) => {
          return <RenderItemStyle key={index} item={el} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  shadow: {
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
