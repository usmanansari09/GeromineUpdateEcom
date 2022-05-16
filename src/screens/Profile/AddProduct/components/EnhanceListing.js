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
import {Icon} from 'react-native-elements';

export default function AddProductEnhanceListing({navigation, route}) {
  const type = route.params?.type;

  const [selectedId, setSelectedId] = useState(route.params.selectedId);

  let selectExtraDetails = route.params.selectExtraDetails;
  let extraDetails = route.params.extraDetails;

  const [selectColor, setSelectColor] = useState(extraDetails?.color || []);
  const [selectSource, setSelectSource] = useState(
    extraDetails?.style?.source || [],
  );
  const [selectStyle, setSelectStyle] = useState(
    extraDetails?.style?.style || [],
  );
  const [selectAge, setSelectAge] = useState(extraDetails?.style?.age || 0);

  let options = route.params.enhanceListing;
  let colors = options.color;
  let style = options.style;

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              iconName: 'arrow-back-outline',
              title:
                type !== 'searchFilter' ? 'Enhance Listing' : 'Select Color',
            }}
          />
        );
      },
    });
  }, [navigation]);
  useEffect(() => {
    selectExtraDetails({
      color: selectColor,
      style: {
        source: selectSource,
        age: selectAge,
        style: selectStyle,
      },
    });
  }, [selectColor, selectSource, selectAge, selectStyle]);

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
        if (type === 'searchFilter') {
          selectColor.find(el => {
            return el === item.key;
          })
            ? setSelectColor(selectColor.filter(el => el !== item.key))
            : selectColor.length === 1
            ? setSelectColor([item.key])
            : setSelectColor([item.key]);
        } else {
          selectColor.find(el => {
            return el === item.key;
          })
            ? setSelectColor(selectColor.filter(el => el !== item.key))
            : selectColor.length >= 2
            ? setSelectColor([item.key, selectColor[0]])
            : setSelectColor([item.key, ...selectColor]);
        }
      }}
      style={tailwind('z-0 ')}>
      <View key={item.key} style={tailwind('items-center m-2 -mt-1 z-0')}>
        <View style={tailwind('z-0')}>
          {!item.uri ? (
            <View style={tailwind('z-0')}>
              <View
                style={[
                  tailwind('p-4 m-2 rounded-full'),
                  {
                    backgroundColor: item.hex,
                    borderColor: item.hex,
                    borderWidth: 0.6,
                  },
                  // styles.shadow,
                ]}>
                {/* {selectColor} */}
              </View>
            </View>
          ) : (
            <View style={[tailwind('m-2 z-0')]}>
              <ImageBackground
                style={[tailwind('h-9 w-9')]}
                source={{uri: item.uri}}
              />
            </View>
          )}

          {selectColor?.find(el => {
            return el === item.key;
          }) ? (
            <View style={[tailwind('z-50 absolute pl-2.5 pt-1.5')]}>
              <View style={[tailwind('z-50')]}>
                <Ionicon
                  name="ios-checkmark-circle-sharp"
                  style={[tailwind('text-3xl text-white'), styles.shadow2]}
                />
              </View>
            </View>
          ) : null}
        </View>
        <View style={tailwind('z-0')}>
          <Text
            numberOfLines={1}
            style={[
              tailwind('w-12'),
              {alignSelf: 'center', textAlign: 'center'} /* , styles.shadow */,
            ]}>
            {item.value}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const RenderItemStyle = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        if (type === 'searchFilter') {
          selectStyle.find(el => {
            return el === item.key;
          })
            ? setSelectStyle(selectStyle.filter(el => el !== item.key))
            : selectStyle.length === 1
            ? setSelectStyle([item.key])
            : setSelectStyle([item.key]);
        } else {
          selectStyle.find(el => {
            return el === item.key;
          })
            ? setSelectStyle(selectStyle.filter(el => el !== item.key))
            : selectStyle.length === 3
            ? setSelectStyle([item.key, selectStyle[0], selectStyle[1]])
            : setSelectStyle([item.key, ...selectStyle]);
        }
      }}
      style={tailwind('z-0')}
      key={item.key}>
      {selectStyle.find(el => {
        return el === item.key;
      }) ? (
        <View style={tailwind('z-0 mt-2')}>
          <View
            style={tailwind(
              'rounded-xl mr-2 bg-gray-800 items-center justify-center border-2 border-black',
            )}>
            <Text style={tailwind('m-1 ml-4 mr-4 text-white font-semibold')}>
              {item.value}
            </Text>
          </View>
        </View>
      ) : (
        <View style={tailwind('z-0 mt-2')}>
          <View
            style={tailwind(
              'rounded-xl mr-2 bg-white items-center justify-center border-2 border-gray-400',
            )}>
            <Text style={tailwind('m-1 ml-4 mr-4 text-gray-500 font-semibold')}>
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
        if (type === 'searchFilter') {
          selectSource.find(el => {
            return el === item.key;
          })
            ? setSelectSource(selectSource.filter(el => el !== item.key))
            : selectSource.length >= 1
            ? setSelectSource([item.key])
            : setSelectSource([item.key]);
        } else {
          selectSource.find(el => {
            return el === item.key;
          })
            ? setSelectSource(selectSource.filter(el => el !== item.key))
            : selectSource.length >= 2
            ? setSelectSource([item.key, selectSource[0]])
            : setSelectSource([item.key, ...selectSource]);
        }
      }}
      style={tailwind('z-0')}
      key={item.key}>
      {selectSource.find(el => {
        return el === item.key;
      }) ? (
        <View style={tailwind('z-0 mt-2')}>
          <View
            style={tailwind(
              'rounded-xl mr-2 bg-gray-800 items-center justify-center border-2 border-black',
            )}>
            <Text style={tailwind('m-1 ml-4 mr-4 text-white font-semibold')}>
              {item.value}
            </Text>
          </View>
        </View>
      ) : (
        <View style={tailwind('z-0 mt-2')}>
          <View
            style={tailwind(
              'rounded-xl mr-2 bg-white items-center justify-center border-2 border-gray-400',
            )}>
            <Text style={tailwind('m-1 ml-4 mr-4 text-gray-500 font-semibold')}>
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
        selectAge === item.key ? setSelectAge(0) : setSelectAge(item.key);
      }}
      style={tailwind('z-0')}
      key={item.key}>
      <View style={tailwind('')}>
        {selectAge === item.key ? (
          <View style={tailwind('z-0 mt-2')}>
            <View
              style={tailwind(
                'rounded-xl mr-2 bg-gray-800 border-2 border-black',
              )}>
              <Text style={tailwind('m-1 ml-4 mr-4 text-white font-semibold')}>
                {item.value}
              </Text>
            </View>
          </View>
        ) : (
          <View style={tailwind('z-0 mt-2')}>
            <View
              style={tailwind(
                'rounded-xl mr-2 bg-white border-2 border-gray-400',
              )}>
              <Text
                style={tailwind('m-1 ml-4 mr-4 text-gray-500 font-semibold')}>
                {item.value}
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tailwind('flex-1 flex-wrap bg-gray-100 z-0')}>
      <ScrollView style={tailwind('z-0')} nestedScrollEnabled={true}>
        <View style={tailwind('z-0 mb-12')}>
          <View style={tailwind('mr-4 ml-4 mt-4 mb-3')}>
            <Text style={tailwind('text-2xl font-medium')}>
              {type === 'searchFilter' ? 'Select Color' : 'Set Color'}
            </Text>
            <Text style={tailwind('text-base text-gray-400')}>
              {type === 'searchFilter'
                ? 'What kind of color are you looking for?'
                : ''}
            </Text>
            <Text style={tailwind('absolute right-0 text-gray-500 italic')}>
              {type === 'searchFilter' ? '' : 'Select up to 2 colors'}
            </Text>
          </View>

          <View style={tailwind('mr-4 ml-4 z-0 flex-row flex-wrap')}>
            {/* {
            colors.map((el) => {
              return (
                <TouchableOpacity>
                  <View
                    key={el.key}
                    style={tailwind('items-center m-2 -mt-1')}
                  >
                    <View style={tailwind('')}>
                      <Text style={tailwind('rounded-full h-8 w-8 bg-red-400 m-2 text-center font-medium')}></Text>
                    </View>
                    <Text style={tailwind('text-')}>{el.value}</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          } */}

            {colors.map((el, index) => {
              return <RenderItemColor key={index} item={el} />;
            })}

            {/*<FlatList
              style={tailwind('z-0')}
              scrollEnabled={false}
              data={colors}
              renderItem={RenderItemColor}
              numColumns={5}
            />*/}
          </View>

          {type !== 'searchFilter' && (
            <View style={tailwind('mr-4 ml-4 mt-4 mb-3')}>
              <Text style={tailwind('text-2xl font-medium')}>
                {type === 'searchFilter' ? 'Select Style' : 'Set Style'}
              </Text>
              <View style={tailwind('ml-1')}>
                <Text style={tailwind('text-xl mt-4 text-gray-500 font-bold')}>
                  SOURCE
                </Text>
                <Text
                  style={tailwind(
                    'absolute right-0 top-0 text-gray-500 italic',
                  )}>
                  {type === 'searchFilter' ? '' : 'Select up to 2'}
                </Text>
                <Text style={tailwind('text-base text-gray-400')}>
                  {type === 'searchFilter'
                    ? 'What kind of item are you looking for?'
                    : ' What kind of item is this?'}
                </Text>

                <View style={tailwind('flex-row flex-wrap')}>
                  {/*<FlatList
                  style={tailwind('z-0')}
                  data={style.source}
                  renderItem={RenderItemSource}
                  numColumns={4}
                />*/}
                  {style.source.map((el, index) => {
                    return <RenderItemSource key={index} item={el} />;
                  })}
                </View>
              </View>

              <View style={tailwind('ml-1')}>
                <Text style={tailwind('text-xl mt-4 text-gray-500 font-bold')}>
                  AGE
                </Text>
                <Text
                  style={tailwind(
                    'absolute right-0 top-0 text-gray-500 italic',
                  )}>
                  {type === 'searchFilter' ? '' : 'Select up to 1'}
                </Text>
                <Text style={tailwind('text-base text-gray-400')}>
                  {type === 'searchFilter'
                    ? 'What era are you looking for?'
                    : 'When was this item made?'}
                </Text>

                <View style={tailwind('flex-row flex-wrap')}>
                  {/*<FlatList
                  style={tailwind('z-0')}
                  data={style.age}
                  renderItem={RenderItemAge}
                  scrollEnabled={false}
                  numColumns={5}
                />*/}

                  {style.age.map((el, index) => {
                    return <RenderItemAge key={index} item={el} />;
                  })}
                </View>
              </View>

              <View style={tailwind('ml-1')}>
                <View>
                  <Text
                    style={tailwind('text-xl mt-4 text-gray-500 font-bold')}>
                    STYLE
                  </Text>
                  <Text
                    style={tailwind(
                      'absolute right-0 bottom-0 text-gray-500 italic',
                    )}>
                    {type === 'searchFilter' ? '' : 'Select up to 3'}
                  </Text>
                </View>
                <Text style={tailwind('text-base text-gray-400')}>
                  {type === 'searchFilter'
                    ? 'What style are you looking for?'
                    : 'What is the style?'}
                </Text>

                <View style={tailwind('flex-row flex-wrap')}>
                  {/*<FlatList
                  keyExtractor={item => item.key}
                  style={tailwind('z-0')}
                  data={style.style}
                  scrollEnabled={false}
                  renderItem={RenderItemStyle}
                  numColumns={4}
                />*/}
                  {style.style.map((el, index) => {
                    return <RenderItemStyle key={index} item={el} />;
                  })}
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
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
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    // shadowRadius: 0.5,
    // elevation:s 5,
  },
  shadow2: {
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 0.7,
    // elevation: 5,
  },
});
