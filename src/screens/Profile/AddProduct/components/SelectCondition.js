import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tailwind from 'tailwind-rn';
import Ionicon from 'react-native-vector-icons/Ionicons';
import StackHeader from '@/components/StackHeader';
import {Icon} from 'react-native-elements';

export default function AddProductSelectCondition({navigation, route}) {
  const [selectedId, setSelectedId] = useState(route.params.condition);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              iconName: 'arrow-back-outline',
              title: 'Condition',
            }}
          />
        );
      },
    });
  }, [navigation]);

  let options = route.params.conditionOptions;

  const Item = ({item, onPress, backgroundColor, textColor, selected}) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedId(item.key);
        route.params.selectCondition(item.key);
        navigation.goBack();
      }}
      style={[tailwind('')]}>
      <View style={[tailwind('px-8 py-2'), {}]}>
        <Text style={[tailwind('text-xl font-normal text-gray-800')]}>
          {item.value}
        </Text>
        {item.key === selected ? (
          <Ionicon
            name="checkmark-sharp"
            style={[tailwind('absolute right-0 bottom-0 text-3xl right-6')]}
          />
        ) : null}
      </View>
      <View
        style={[
          {
            borderBottomColor: 'rgba(100, 100, 100, 0.2)',
            borderBottomWidth: 1,
          },
          tailwind(''),
        ]}
      />
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const backgroundColor = item.key === selectedId ? 'white' : 'white';
    const color = item.key === selectedId ? 'black' : 'black';

    return (
      <Item
        item={item}
        // onPress={() => setSelectedId(item.key)}
        // onPress={() => console.log('asd')}
        // backgroundColor={{backgroundColor}}
        // textColor={{color}}

        selected={selectedId}
      />
    );
  };

  return (
    <SafeAreaView style={[tailwind(''), {}]}>
      <FlatList
        style={tailwind('mt-2')}
        data={options}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 10
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
