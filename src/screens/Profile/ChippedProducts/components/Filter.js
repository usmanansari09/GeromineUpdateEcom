import {getColor, tailwind} from '@/common/tailwind';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Icon, Slider} from 'react-native-elements';
import Modal from 'react-native-modal';
import Button from '@/components/Button';
import categoryOptions from '@/common/rawdata/product/categoryOptions.json';
import enhanceListing from '@/common/rawdata/product/enhanceListing.json';
import conditionOptions from '@/common/rawdata/product/conditionOptions.json';

export default function Filter({
  navigation,
  show,
  onClose,
  distance,
  changeDistance,
  category,
  changeCategory,
  condition,
  changeCondition,
  brand,
  changeBrand,
  price,
  changePrice,
  color,
  changeColor,
  openModal,
  searchQuery,
  setSearchQuery,
  searchProducts,
  getProducts,
}) {
  // console.log({searchQuery}, {setSearchQuery});
  const [clear, setClear] = useState(false);
  return (
    <SafeAreaView>
      <Modal
        isVisible={show}
        onBackButtonPress={onClose}
        onSwipeComplete={() => onClose()}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        // swipeDirection={'down'}
      >
        <View style={tailwind('bg-white rounded-3xl h-full w-full p-2')}>
          <View style={tailwind('items-center justify-between flex-row')}>
            <TouchableOpacity
              onPress={() => {
                setClear(true);
                setTimeout(() => setClear(false), 400);
              }}
              style={tailwind('')}>
              <Text style={tailwind('font-bold ml-3 text-lg text-black')}>
                Clear all
              </Text>
            </TouchableOpacity>
            <View style={tailwind('justify-center items-center ')}>
              {/* <View
              style={[
                tailwind('mt-6 w-16'),
                {
                  borderBottomColor: '#AAAAAA',
                  borderBottomWidth: 6,
                  borderRadius: 100,
                },
              ]}
            /> */}
              <Text
                style={tailwind('text-center text-xl mt-2 mb-2 text-gray-500')}>
                Filter
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={tailwind('')}>
              <Icon
                name="ios-close"
                type="ionicon"
                size={36}
                color="black"
                containerStyle={tailwind('')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              tailwind('mt-2 w-full'),
              {
                borderBottomColor: '#CCCCCC',
                borderBottomWidth: 1,
                borderRadius: 100,
              },
            ]}
          />
          <ScrollView
            alwaysBounceVertical={false}
            bounces={false}
            showsVerticalScrollIndicator={false}>
            <View style={tailwind('px-3')}>
              <Distance
                distance={distance}
                clear={clear}
                changeDistance={changeDistance}
              />
              <Category
                navigation={navigation}
                category={category}
                clear={clear}
                changeCategory={changeCategory}
                onClose={onClose}
                openModal={openModal}
              />
              <Price
                changePrice={changePrice}
                clear={clear}
                price={price}
                onClose={onClose}
              />
              {/* <Brand brand={brand} changeBrand={changeBrand} /> */}

              <Condition
                condition={condition}
                clear={clear}
                changeCondition={changeCondition}
                conditionOptions={conditionOptions}
              />
              <Color
                navigation={navigation}
                changeColor={changeColor}
                onClose={onClose}
                clear={clear}
                color={color}
                openModal={openModal}
              />
              {/* <Sizes /> */}
              {/* <Gender /> */}
              <Button
                title={'View Products'}
                theme="primary"
                containerStyle={tailwind('items-center mt-4 mb-4')}
                // onPress={() => onPress()}
                onPress={() => {
                  onClose();
                  //   toggle(false);
                  //   onAddNewProduct();
                }}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
function Distance({navigation, changeDistance, distance, clear}) {
  const [value, setValue] = useState(distance || 0);

  useEffect(() => {
    console.log({clear});
    if (clear) {
      setValue(200);
      changeDistance(200);
    }
  }, [clear]);

  return (
    <View style={tailwind('mt-4')}>
      <Text style={tailwind('text-black text-2xl font-black')}>Distance</Text>
      <View>
        <Slider
          style={tailwind('mt-2')}
          value={value}
          minimumTrackTintColor={getColor('gray-800')}
          maximumTrackTintColor={getColor('gray-200')}
          trackStyle={{
            ...{height: 8, backgroundColor: 'orange'},
            ...tailwind('rounded-full'),
          }}
          thumbStyle={{
            height: 40,
            width: 40,
            backgroundColor: getColor('gray-800'),
          }}
          thumbProps={{
            children: (
              <View style={tailwind('flex flex-1 items-center justify-center')}>
                <Text style={tailwind('text-white font-black')}>
                  {Math.round(value)}
                </Text>
              </View>
            ),
          }}
          minimumValue={0}
          maximumValue={200}
          onValueChange={newValue => setValue(Math.round(newValue))}
          onSlidingComplete={value => changeDistance(Math.round(value))}
        />
        <View style={tailwind('flex-row justify-between')}>
          <Text style={tailwind('text-sm text-black font-bold')}>mi 0</Text>
          <Text style={tailwind('text-sm text-black font-bold')}>mi 200</Text>
        </View>
      </View>
      {/* <Text>{Math.round(value)}</Text> */}
    </View>
  );
}

function Category({
  navigation,
  changeCategory,
  onClose,
  openModal,
  category: _category,
  clear,
}) {
  // console.log('_category:', _category);
  const data = ['All Categories', 'Select Category'];
  const [selected, setSelected] = useState(_category);
  const [category, setCategory] = useState('');

  useEffect(() => {
    console.log({clear});
    if (clear) {
      setSelected('');
      changeCategory('');
    }
  }, [clear]);

  console.log({selected});
  function renderItem({item, index}) {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelected(prev => {
            if (prev === item.key) {
              changeCategory('');
              return '';
            } else {
              changeCategory(item.key);
              return item.key;
            }
          });
          // changeCategory(selected);
        }}
        // key={index}
        style={tailwind(
          `p-3 rounded-xl border-2 mr-2 mb-2 ${
            selected === item.key ? 'bg-black' : 'bg-white'
          }`,
        )}>
        <Text
          style={tailwind(
            `text-center text-sm font-bold ${
              selected === item.key ? 'text-white' : 'text-black'
            }`,
          )}>
          {item.value}
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={tailwind('mt-4')}>
      <Text style={tailwind('font-black text-2xl')}>Category</Text>
      <View style={tailwind('flex-row mt-4')}>
        <FlatList
          style={tailwind('py-2')}
          keyExtractor={item => item.key}
          data={categoryOptions?.filter(
            el => el.key === 100 || el.key === 200 || el.key < 100,
          )}
          renderItem={renderItem}
          horizontal={true}
        />
      </View>
    </View>
  );
}
function Price({changePrice, price, onClose, clear}) {
  // console.log('price', price);
  const [value, setValue] = useState(price);

  useEffect(() => {
    console.log({clear});
    if (clear) {
      setValue(0);
      changePrice(0);
    }
  }, [clear]);

  return (
    <View style={tailwind('mt-4')}>
      <Text style={tailwind('text-black text-2xl font-black')}>Price</Text>
      <View>
        <Slider
          style={tailwind('mt-2')}
          value={value}
          minimumTrackTintColor={getColor('gray-800')}
          maximumTrackTintColor={getColor('gray-200')}
          trackStyle={{
            ...{height: 8, backgroundColor: 'orange'},
            ...tailwind('rounded-full'),
          }}
          thumbStyle={{
            height: 40,
            width: 40,
            backgroundColor: getColor('gray-800'),
          }}
          thumbProps={{
            children: (
              <View style={tailwind('flex flex-1 items-center justify-center')}>
                <Text style={tailwind('text-white font-black')}>
                  {Math.round(value)}
                </Text>
              </View>
            ),
          }}
          minimumValue={0}
          maximumValue={10000}
          onValueChange={newValue => setValue(Math.round(newValue))}
          onSlidingComplete={value => changePrice(Math.round(value))}
        />
        <View style={tailwind('flex-row justify-between')}>
          <Text style={tailwind('text-sm text-black font-bold')}>$0</Text>
          <Text style={tailwind('text-sm text-black font-bold')}>$10000</Text>
        </View>
      </View>
      {/* <Text>{Math.round(value)}</Text> */}
    </View>
  );
}
// function Brand({brand, changeBrand}) {
//   const data = ['All Brands', 'Select Brand'];
//   const [selected, setSelected] = useState(brand ? data[1] : data[0]);

//   return (
//     <View style={tailwind('mt-4')}>
//       <Text style={tailwind('font-black text-2xl')}>Brand</Text>
//       <View style={tailwind('flex-row mt-2')}>
//         {data.map((item, index) => (
//           <TouchableOpacity
//             onPress={() => {
//               setSelected(prev => {
//                 if (prev === item) {
//                   return '';
//                 } else {
//                   changeBrand(index);
//                   return item;
//                 }
//               });
//             }}
//             key={index}
//             style={tailwind(
//               `p-3 rounded-xl border-2 ${index !== 0 ? 'ml-2' : ''} ${
//                 selected === item ? 'bg-black' : 'bg-white'
//               }`,
//             )}>
//             <Text
//               style={tailwind(
//                 `text-center text-sm font-bold ${
//                   selected === item ? 'text-white' : 'text-black'
//                 }`,
//               )}>
//               {item}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// }

function Condition({condition, changeCondition, conditionOptions, clear}) {
  const [selected, setSelected] = useState(condition);
  const data = conditionOptions;

  useEffect(() => {
    console.log({clear});
    if (clear) {
      setSelected('');
      changeCondition('');
    }
  }, [clear]);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelected(prev => {
            if (prev === item.key) {
              changeCondition('');
              return '';
            } else {
              changeCondition(item.key);
              return item.key;
            }
          });
        }}
        key={item.key}
        style={tailwind(
          `p-3 mt-2 mb-2 mr-2 rounded-xl border-2 ${
            selected === item.key ? 'bg-black' : 'bg-white'
          }`,
        )}>
        <Text
          style={tailwind(
            `text-center text-sm font-bold ${
              selected === item.key ? 'text-white' : 'text-black'
            }`,
          )}>
          {item.value}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tailwind('mt-4')}>
      <Text style={tailwind('font-black text-2xl')}>Condition</Text>
      <View style={tailwind('flex-wrap flex-row mt-2')}>
        <FlatList
          style={tailwind('py-2')}
          data={conditionOptions}
          keyExtractor={(item, index) => item.key}
          horizontal={true}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}
function Color({navigation, color, changeColor, onClose, clear}) {
  const data = ['All Colors', 'Select Color'];
  const [selectColor, setSelectColor] = useState(color);
  const [selected, setSelected] = useState(
    color?.color ||
      color?.style?.age ||
      color?.style?.source ||
      color?.style?.style,
  );
  // console.log({color});
  // console.log({selectColor});

  useEffect(() => {
    console.log({clear});
    if (clear) {
      setSelectColor('');
      changeColor('');
    }
  }, [clear]);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectColor(prev => {
            if (prev === item.key) {
              changeColor('');
              return '';
            } else {
              changeColor(item.key);
              return item.key;
            }
          });
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
                      // borderColor: item.hex,
                      borderColor: getColor('gray-200'),
                      borderWidth: 1,
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

            {selectColor === item.key ? (
              <View style={[tailwind('z-50 absolute inset-0 mt-3')]}>
                <Icon
                  type="ionicon"
                  color={
                    item.value === 'White' || item.value === 'Cream'
                      ? 'gray'
                      : 'white'
                  }
                  name="ios-checkmark-circle-sharp"
                  style={[tailwind('text-3xl text-white'), styles.shadow2]}
                />
              </View>
            ) : null}
          </View>
          <View style={tailwind('z-0')}>
            <Text
              numberOfLines={1}
              style={[
                tailwind('w-12'),
                {
                  alignSelf: 'center',
                  textAlign: 'center',
                } /* , styles.shadow */,
              ]}>
              {item.value}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={tailwind('mt-4')}>
      <Text style={tailwind('font-black text-2xl')}>Color</Text>
      <View style={tailwind('flex-wrap flex-row mt-2')}>
        <FlatList
          style={tailwind('py-2')}
          data={enhanceListing?.color}
          keyExtractor={(item, index) => item.key}
          horizontal={true}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}
function Sizes() {
  const [selected, setSelected] = useState('');
  const data = ['SM', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  return (
    <View style={tailwind('mt-4')}>
      <Text style={tailwind('text-black text-xl font-bold')}>Size</Text>
      <View style={tailwind('flex-row flex-wrap -m-1 pt-2')}>
        {data.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setSelected(prev => {
                if (prev === item) {
                  return '';
                } else {
                  return item;
                }
              });
            }}
            key={index}
            style={{
              ...tailwind(
                `p-2 m-1 rounded-lg border-2 ${
                  selected === item ? 'bg-brand-primary' : 'bg-white'
                }`,
              ),
              ...{width: `${100 / 3 - 4}%`},
            }}>
            <Text
              style={tailwind(
                `text-center text-sm font-bold ${
                  selected === item ? 'text-white' : 'text-black'
                }`,
              )}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
function Gender() {
  const [selected, setSelected] = useState('');
  const data = [
    {title: 'Male', icon: 'man'},
    {title: 'Female', icon: 'woman'},
  ];
  return (
    <View style={tailwind('mt-4')}>
      <Text style={tailwind('text-black text-xl font-bold')}>Gender</Text>
      <View style={tailwind('flex-row flex-wrap -m-1 pt-2')}>
        {data.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setSelected(prev => {
                if (prev === item.title) {
                  return '';
                } else {
                  return item.title;
                }
              });
            }}
            key={index}
            style={{
              ...tailwind(
                `p-2 m-1 flex-row items-center rounded-lg border-2 ${
                  selected === item.title ? 'bg-brand-primary' : 'bg-white'
                }`,
              ),
              ...{width: `${100 / 3 - 4}%`},
            }}>
            <Icon
              name={item.icon}
              type="ionicon"
              size={20}
              color={`${selected === item.title ? 'white' : 'black'}`}
            />
            <Text
              style={tailwind(
                `text-center text-sm font-bold ${
                  selected === item.title ? 'text-white' : 'text-black'
                }`,
              )}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
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
