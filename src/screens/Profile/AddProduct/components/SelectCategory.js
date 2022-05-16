import React, {useEffect, useState} from 'react';
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
import {Icon} from 'react-native-elements';
import {useLayoutEffect} from 'react';
import StackHeader from '@/components/StackHeader';

export default function AddProductSelectCategory({navigation, route}) {
  const [selectedId, setSelectedId] = useState(route.params.category);
  // console.log(`AddProductSelectCondition ---------> `,route.params)

  // console.log(`route.params.category: `, route.params.category)
  let options =
    route.params
      .categoryOptions; /* .filter(el => el.key > 0 && el.key < 100) */

  let subCategories = route.params.categoryOptions.filter(
    el => el.key % 100 === 0,
  );

  let selectCategory = route.params.selectCategory;

  // console.log(`sub categories -------> `, subCategories)

  const resetSelected = () => {
    setSelectedId(0);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              iconName: 'arrow-back-outline',
              title: 'Category',
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
          selectCategory(item.key);
          setSelectedId(item.key);
          navigation.goBack();
        } else {
          let categoryOptions = route.params.categoryOptions.filter(
            el => el.key > item.key && el.key < item.key + 100,
          );
          if (item.key === 100)
            navigation.navigate('Select Category Menswear', {
              selectedId,
              selectCategory,
              resetSelected,
              categoryOptions,
            });
          else if (item.key === 200)
            navigation.navigate('Select Category Womenswear', {
              selectedId,
              selectCategory,
              resetSelected,
              categoryOptions,
            });
        }
      }}
      style={[tailwind('rounded')]}>
      <View style={tailwind('px-8')}>
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
      <View style={tailwind('')}>
        <FlatList
          style={tailwind('')}
          data={options}
          contentContainerStyle={{paddingBottom: 100}}
          renderItem={({item, index}) => {
            if (item.key % 100 === 0) {
              return <RenderItem item={item} isSub={true} />;
            }
            if (item.key > 0 && item.key < 100) {
              return <RenderItem item={item} isSub={false} />;
            }
          }}
          keyExtractor={item => item.key}
          extraData={selectedId}
          bounces={true}
          scrollEventThrottle={16}
          overScrollMode="always"
          scrollToOverflowEnabled={true}
          alwaysBounceVertical={true}
          contentOffset={{x: 0, y: 1000}}
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
    marginVertical: 4,
    marginHorizontal: 16,
  },
});
