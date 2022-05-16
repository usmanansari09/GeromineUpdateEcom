import {tailwind} from '@/common/tailwind';
import Input from '@/components/Input';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Image} from 'react-native-elements';

export default function SearchProduct({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  useEffect(() => {
    if (searchQuery == 'Gucci') {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchQuery]);
  return (
    <View style={tailwind('p-6 flex-1 bg-black')}>
      <View style={tailwind('flex-row justify-between items-center')}>
        <Text
          style={tailwind(
            'uppercase font-bold text-white text-2xl text-center mt-5',
          )}>
          Search
        </Text>
        <Icon
          onPress={navigation.goBack}
          name="close-outline"
          size={40}
          style={tailwind('text-white self-end')}
        />
      </View>
      <Input
        containerStyle={tailwind('mt-10')}
        placeholder="What are you looking for?"
        size="sm"
        onChangeText={setSearchQuery}
        rightIcon={
          <Icon
            name="search-outline"
            size={32}
            style={tailwind('text-brand-primary')}
          />
        }
        onEndEditing={() => navigation.navigate('results', {q: searchQuery})}
      />
      {showResults ? (
        <View style={tailwind('mt-3')}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Search_ProductDetails')}
            style={tailwind(`flex-row items-center`)}>
            <Image
              source={require('@/assets/gucci-shirt.png')}
              style={tailwind('')}
              containerStyle={tailwind(
                'bg-white w-20 h-20 rounded-lg overflow-hidden',
              )}
            />
            <Text
              style={tailwind('text-lg text-gray-400 uppercase w-1/2 ml-3')}>
              GUCCI MENS T-SHIRT
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={tailwind('text-white text-lg font-bold')}>
            Popular Searches
          </Text>
          <View style={tailwind('mt-3')}>
            {Array.from({length: 3}).map((_, index) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Search_ProductDetails')}
                key={index}
                style={tailwind(
                  `${index !== 0 ? 'mt-4' : ''} flex-row items-center`,
                )}>
                <Image
                  source={require('@/assets/product-view-placeholder.png')}
                  style={tailwind('')}
                  containerStyle={tailwind(
                    'bg-white w-20 h-20 rounded-lg overflow-hidden',
                  )}
                />
                <Text
                  style={tailwind(
                    'text-lg text-gray-400 uppercase w-1/2 ml-3',
                  )}>
                  Louis Vuitton Riverside Bag
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
