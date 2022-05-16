import {AuthContext} from '@/common/contexts/AuthContext';
import {getColor, tailwind} from '@/common/tailwind';
import React, {useContext, useState, useLayoutEffect} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {useProfile} from '@/common/services/hooks';
import {useMutation} from 'react-query';
import Toast from 'react-native-toast-message';
import API from '@/common/services/API';
import StackHeader from '@/components/StackHeader';

// const DUMMY_DATA = Array.from({length: 17}, (_, index) => ({
//   image: `https://picsum.photos/1440/2842?random=${index}`,
// }));

const DUMMY_DATA = [
  {image: 'https://i.imgur.com/SYgoZml.png', type: 'product'},
  {image: 'https://i.imgur.com/qi3muPv.png', type: 'product'},
  {image: 'https://i.imgur.com/JNFfOHB.jpg', type: 'cover'},
  {image: 'https://i.imgur.com/FhRADpj.png', type: 'product'},
  {image: 'https://i.imgur.com/ldrsfq1.png', type: 'product'},
  {image: 'https://i.imgur.com/orb9nkC.png', type: 'product'},
  {image: 'https://i.imgur.com/ltbfVoi.png', type: 'product'},
  {image: 'https://i.imgur.com/h3Si9oP.png', type: 'product'},
  {image: 'https://i.imgur.com/eQolbYI.png', type: 'product'},
  {image: 'https://i.imgur.com/swEZGEM.jpg', type: 'cover'},
  {image: 'https://i.imgur.com/psKFann.png', type: 'product'},
  {image: 'https://i.imgur.com/FfVGS2b.jpg', type: 'profile'},
  {image: 'https://i.imgur.com/6JzPheR.png', type: 'product'},
  {image: 'https://i.imgur.com/u9yGPo3.png', type: 'product'},
  {image: 'https://i.imgur.com/JHxGe5v.jpg', type: 'cover'},
  {image: 'https://i.imgur.com/0Rvwx9K.png', type: 'product'},
  {image: 'https://i.imgur.com/gYysKY0.jpg', type: 'profile'},
  {image: 'https://i.imgur.com/fdX2tc9.jpg', type: 'cover'},
  {image: 'https://i.imgur.com/EmCALUD.png', type: 'product'},
  {image: 'https://i.imgur.com/Icj2VmL.jpg', type: 'cover'},
  {image: 'https://i.imgur.com/W6smLfA.jpg', type: 'profile'},
  {image: 'https://i.imgur.com/8OeQQvC.jpg', type: 'profile'},
  {image: 'https://i.imgur.com/Wl886Fu.jpg', type: 'profile'},
  {image: 'https://i.imgur.com/9jKX4mT.jpg', type: 'profile'},
  {image: 'https://i.imgur.com/dfeHagf.jpg', type: 'profile'},
  {image: 'https://i.imgur.com/M2NRxnh.jpg', type: 'profile'},
  {image: 'https://i.imgur.com/mx4HdEf.jpg', type: 'profile'},
  {image: 'https://i.imgur.com/EyLy47M.jpg', type: 'profile'},
  // {image: 'https://i.imgur.com/rJg8JdK.jpg', type: 'cover'},
];

const {width} = Dimensions.get('window');
const numColumns = 3;

const useUpdatePhoto = opts => {
  const {accessToken} = useContext(AuthContext);
  return useMutation(
    formData =>
      API(accessToken).post(`store/${opts.storeId}/change-cover`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    opts,
  );
};

export default function DisplayPhotoGallery({navigation, route}) {
  const {selectImage, type} = route?.params;
  const HeaderLeft = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          left: 15,
          width: 250,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.canGoBack() && navigation.goBack();
          }}>
          <Icon type="ionicon" name="arrow-back" color="white" size={32} />
        </TouchableOpacity>
        <Text
          style={tailwind(
            'uppercase text-white mt-1 font-bold text-xl text-center',
          )}>
          Photo Gallery
        </Text>
      </View>
    );
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: HeaderLeft,
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'black',
      },
      style: {
        paddingBottom: 50,
      },
    });
  }, []);
  const [selectedIndex, setSelectedIndex] = useState();
  // const {data: user} = useProfile();
  /* const {mutate, isLoading, isSuccess} = useUpdatePhoto({
    storeId: user?.store_id,
    onError: err => {
      console.log('update photo error :>> ', err);
      Toast.show({
        text1: 'There was an error while setting your cover photo, try again',
        type: 'error',
      });
    },
    onSuccess: response => {
      console.log('update photo successfully');
      Toast.show({text1: 'Cover photo set', type: 'success'});
    },
  });
  function updateCoverPhoto(photo) {
    if (isLoading) return;

    const formData = new FormData();
    formData.append('image', photo);
    mutate(formData);
  } */

  const renderItem = ({item, index}) => {
    const isSelected = selectedIndex === index;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedIndex(index);

          selectImage(item);
          navigation.goBack();

          // updateCoverPhoto(item.image);
        }}
        style={{
          ...tailwind('rounded-3xl overflow-hidden m-2 relative'),
          ...{
            flex: 1 / numColumns,
            // shadowOffset: {width: 0, height: 1},
            // shadowOpacity: 0.1,
            // shadowRadius: 3,
            // elevation: 5,
          },
          ...(isSelected
            ? tailwind('border-3 border-black')
            : tailwind('border-0')),
        }}>
        <Image
          source={{uri: item?.image}}
          resizeMode="cover"
          style={tailwind('w-full h-32')}
        />
        {isSelected && (
          <Icon
            type="ionicon"
            name="checkmark-circle"
            size={40}
            color={getColor('brand-primary')}
            containerStyle={tailwind('absolute pb-1 inset-x-0 bottom-0')}
          />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={tailwind('flex-1 bg-gray-100 px-3 py-2')}>
      <FlatList
        numColumns={numColumns}
        data={type ? DUMMY_DATA.filter(el => el.type === type) : DUMMY_DATA}
        renderItem={renderItem}
        keyExtractor={(_, index) => `${index}`}
      />
    </View>
  );
}
