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
import Octicons from 'react-native-vector-icons/Octicons';
import StackHeader from '@/components/StackHeader';
import {Icon} from 'react-native-elements';

export default function AddProductSelectCategoryWomenswear({
  navigation,
  route,
}) {
  const [selectedId, setSelectedId] = useState(route.params.selectedId);
  // console.log(`AddProductSelectCategory Menswear ---------> `,route.params)

  let options =
    route.params
      .categoryOptions; /* .filter(el => el.key > 0 && el.key < 100) */

  // let subCategories = route.params.categoryOptions.filter(el => el.key % 100 === 0)

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              iconName: 'arrow-back-outline',
              title: 'womenswear',
            }}
          />
        );
      },
    });
  }, [navigation]);

  const Item = ({
    item,
    onPress,
    backgroundColor,
    textColor,
    selected,
    isSub,
  }) => (
    <TouchableOpacity
      onPress={() => {
        if (!isSub) {
          route.params.selectCategory(item.key);
          setSelectedId(item.key);
          route.params.resetSelected();
          navigation.pop(2);
        } else {
          console.log('not a sub');
        }
      }}
      style={[tailwind('')]}>
      <View style={tailwind('px-6')}>
        <Text style={[tailwind('pt-2 pb-2 text-xl font-normal text-gray-800')]}>
          {item.value}
        </Text>
        {isSub ? (
          <View>
            <Octicons
              name="chevron-right"
              style={[
                tailwind('absolute right-0 bottom-0 text-3xl text-gray-400'),
              ]}
            />
          </View>
        ) : item.key === selected ? (
          <View>
            <Ionicon
              name="checkmark-sharp"
              style={[tailwind('absolute right-0 bottom-0 text-3xl')]}
            />
          </View>
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

  const RenderItem = ({item, isSub}) => {
    const backgroundColor = item.key === selectedId ? 'white' : 'white';
    const color = item.key === selectedId ? 'black' : 'black';

    return (
      <Item
        item={item}
        isSub={isSub}
        // onPress={() => setSelectedId(item.key)}
        // onPress={() => console.log('asd')}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        selected={selectedId}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          style={tailwind('pt-4')}
          contentContainerStyle={{paddingBottom: 100}}
          data={options}
          renderItem={RenderItem}
          keyExtractor={item => item.key}
          extraData={selectedId}
        />
      </View>
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
});
