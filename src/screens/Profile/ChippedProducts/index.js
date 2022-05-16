import {tailwind} from '@/common/tailwind';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'react-native-elements';

import Filter from './components/Filter';
export default function ChippedProducts({navigation}) {
  return (
    <View style={tailwind('flex-1 bg-white')}>
      <View style={tailwind('h-1/2')}>
        <View
          style={tailwind(
            ' absolute inset-y-0 justify-center self-center z-10',
          )}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductView')}
            style={tailwind(
              'w-44 h-44 bg-brand-primary border-2 rounded-full items-center justify-center',
            )}>
            <Image
              source={require('@/assets/chipped-center.png')}
              style={tailwind('w-3/4 h-3/4')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={tailwind('flex-row flex-1')}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductView')}
            style={tailwind(
              'flex-1 bg-white border items-center justify-center',
            )}>
            <Image
              source={require('@/assets/chipped-1.png')}
              style={tailwind('w-36 h-36')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductView')}
            style={tailwind(
              'flex-1 bg-white border items-center justify-center',
            )}>
            <Image
              source={require('@/assets/chipped-2.png')}
              style={tailwind('w-36 h-36')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={tailwind('flex-row flex-1')}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductView')}
            style={tailwind(
              'flex-1 bg-white border items-center justify-center',
            )}>
            <Image
              source={require('@/assets/chipped-3.png')}
              style={tailwind('w-36 h-36')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductView')}
            style={tailwind(
              'flex-1 bg-white border items-center justify-center',
            )}>
            <Image
              source={require('@/assets/chipped-4.png')}
              style={tailwind('w-36 h-36')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={tailwind("flex-row p-1 bg-black items-center")}>
                <TouchableOpacity>
                    <Icon
                        name="chevron-back-outline"
                        type="ionicon"
                        size={32}
                        color="white"
                        containerStyle={tailwind(
                            "border-2 w-12 h-12 justify-center items-center border-white rounded-full"
                        )}
                    />
                </TouchableOpacity>
                <View
                    style={tailwind(
                        "flex-row items-center flex-1 p-2 justify-center"
                    )}
                >
                    <Text
                        style={{
                            ...tailwind("text-white font-bold"),
                            ...{ fontSize: 64, lineHeight: 64 },
                        }}
                    >
                        5
                    </Text>
                    <View>
                        <Text
                            style={{
                                ...tailwind("text-white text-2xl uppercase"),
                                ...{ lineHeight: 30 },
                            }}
                        >
                            Items
                        </Text>
                        <Text
                            style={{
                                ...tailwind("text-white text-2xl uppercase"),
                                ...{ lineHeight: 24 },
                            }}
                        >
                            Found
                        </Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Icon
                        name="chevron-forward-outline"
                        type="ionicon"
                        size={32}
                        color="white"
                        containerStyle={tailwind(
                            "border-2 w-12 h-12 justify-center items-center border-white rounded-full"
                        )}
                    />
                </TouchableOpacity>
            </View> */}
      <TouchableOpacity
        style={tailwind('flex-row justify-center bg-white p-3')}>
        <Icon name="search-outline" type="ionicon" size={32} color="black" />
        <Text style={tailwind('text-4xl uppercase text-black')}>
          Search Again
        </Text>
      </TouchableOpacity>
      <FilterSearch />
    </View>
  );
}
function FilterSearch() {
  const [show, setShow] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={tailwind('bg-black p-3')}
        onPress={() => setShow(true)}>
        <Text style={tailwind('text-4xl uppercase text-white text-center')}>
          filter
        </Text>
      </TouchableOpacity>
      <Filter show={show} onClose={() => setShow(false)} />
    </>
  );
}
