import {getColor, tailwind} from '@/common/tailwind';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  Alert,
} from 'react-native';
import {Image} from 'react-native-elements';
import Input from '@/components/Input';
import Icon from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import * as ImagePicker from 'expo-image-picker';
import Button from '@/components/Button';
import schema from './editProductSchema';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import {useQuery} from 'react-query';
import API from '@/common/services/API';
import {AuthContext} from '@/common/contexts/AuthContext';
import {getS3Image} from '@/common/helpers';
import {setDisplayName} from 'recompose';

const ImagePicker = require('react-native-image-picker');

// const useProduct = (id = null) => {
//   const {accessToken} = useContext(AuthContext);
//   const isFocused = useIsFocused();
//   return useQuery(
//     ['product', id],
//     () =>
//       API(accessToken)
//         .get(`product/${id}/details`, {})
//         .then(res => res)
//         .catch(err => {
//           throw new Error(err);
//         }),
//     {enabled: (isFocused && id !== null) || id !== undefined},
//   );
// };
/**
 *
 * @param {{navigation:StackNavigationProp<any>,route:RouteProp<any,any>}} props
 * @returns {React.FC}
 */
export default function EditProduct({navigation, route}) {
  const {accessToken} = useContext(AuthContext);
  const {id} = route.params;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState();
  const [brand, setBrand] = useState('');
  const [data, setData] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [images, setImages] = useState([]);
  const {control, errors, reset} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const ProductDetail = () => {
    API(accessToken)
      .get(`product/` + id)
      .then(res => {
        console.log(
          'response in Edit Product -=-=-=-=-=>>>>',
          res.data?.payload?.product?.images,
        );
        setName(res.data.payload.product.name);
        setDescription(res.data.payload.product.description);
        setSize(res.data.payload.product.size);
        setBrand(res.data.payload.product.brand);
        setCondition(res.data.payload.product.condition);
        setPrice(res.data.payload.product.price);
        setImages(res.data.payload.product);
        console.log(
          'seted states == > ',
          res.data.payload.product,
          name,
          description,
          brand,
          images,
        );
      })
      .catch(err => {
        // throw new Error(err);
        console.log(err);
      });
  };
  // const {isLoading, isSuccess, isError, error} = useProduct(id);
  console.log('=====---->data', data);
  useEffect(() => {
    ProductDetail();
  }, []);

  const addNewProduct = () => {
    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('category', 'wearable');
    formdata.append('description', description);
    formdata.append('price', price);
    formdata.append('type', 'cloth');
    formdata.append('brand', 'ger');
    formdata.append('size', size);
    formdata.append('quality', 'quality');
    formdata.append('extraDetails', 'detail');
    formdata.append('file[]', images);
    // console.log('Getting array from child', formdata);
    API(accessToken)
      .post('product', formdata)
      .then(response => {
        if (response.status === 200) {
          // setProductsData(response?.data?.payload);
          console.log('==Success', response);
        }
        // setIsLoading(false);
      })
      .catch(error => {
        // setIsLoading(false);

        console.log('0000', JSON.parse(JSON.stringify(error)));
      });
  };
  const getImagesArray = data => {
    setImages(data);
    console.log(`Getting array from child  ${data}, ${images}`);
  };
  if (isLoading) {
    return (
      <View style={tailwind('flex-1 items-center justify-center')}>
        <ActivityIndicator size="large" color={getColor('brand-primary')} />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={tailwind('flex-1 bg-gray-100')}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tailwind('p-6')}>
        <Controller
          control={control}
          render={({onBlur, onChange, value}) => (
            <Media
              onBlur={onBlur}
              onChange={onChange}
              error={errors?.images?.message}
              value={value}
              getArray={getImagesArray}
              ImgArray={images}
            />
          )}
          name="images"
          defaultValue={[]}
        />

        <View>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                label="Product Name"
                theme="secondary"
                clear={true}
                type="underline"
                onBlur={onBlur}
                value={name}
                onChangeText={text => setName(text)}
                errorMessage={errors?.name?.message}
              />
            )}
            name="name"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                label="Description"
                theme="secondary"
                clear={true}
                type="underline"
                onBlur={onBlur}
                value={description}
                onChangeText={text => setDescription(text)}
                errorMessage={errors?.description?.message}
              />
            )}
            name="description"
            defaultValue=""
          />
        </View>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              containerStyle={tailwind('mt-4')}
              labelStyle={{fontWeight: '800'}}
              label="Size"
              theme="secondary"
              type="underline"
              clear
              onBlur={onBlur}
              value={size}
              onChangeText={text => setSize(text)}
              errorMessage={errors?.price?.message}
            />
          )}
          name="price"
          defaultValue=""
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              containerStyle={tailwind('mt-4')}
              labelStyle={{fontWeight: '800'}}
              label="Brand"
              theme="secondary"
              type="underline"
              clear
              onBlur={onBlur}
              value={brand}
              onChangeText={text => setBrand(text)}
              errorMessage={errors?.price?.message}
            />
          )}
          name="price"
          defaultValue=""
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              containerStyle={tailwind('mt-4')}
              label="Condition"
              labelStyle={{fontWeight: '800'}}
              theme="secondary"
              type="underline"
              clear
              onBlur={onBlur}
              value={condition}
              onChangeText={text => setCondition(text)}
              errorMessage={errors?.price?.message}
            />
          )}
          name="price"
          defaultValue=""
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              containerStyle={tailwind('mt-4')}
              label="Item Price"
              labelStyle={{fontWeight: '800'}}
              theme="secondary"
              keyboardType={'numeric'}
              type="underline"
              clear
              onBlur={onBlur}
              value={price}
              onChangeText={text => setPrice(text)}
              errorMessage={errors?.price?.message}
            />
          )}
          name="price"
          defaultValue=""
        />
        <Button
          containerStyle={tailwind('mt-4 items-center')}
          buttonStyle={tailwind('px-12')}
          loading={isLoading}
          onPress={() => addNewProduct()}
          theme="primary"
          size="md"
          title="Save"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
/**
 *
 * @param {{onChange:Function,onBlur:Function}} props
 */
function ProductSizes({onChange, onBlur, value}) {
  const [selected, setSelected] = useState(value);
  const sizes = ['S', 'M', 'L', 'XL'];

  useEffect(() => {
    onChange(selected);
    onBlur();
  }, [selected]);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <View style={tailwind('mb-4')}>
      <Text style={tailwind('text-base text-black font-bold')}>Size</Text>
      <View style={tailwind('flex-row mt-2')}>
        {sizes.map((size, index) => (
          <View
            key={index}
            style={tailwind(`${index !== 0 ? 'ml-2' : ''} flex-1`)}>
            <ProductSize
              title={size}
              onClick={setSelected}
              selected={selected === size}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
/**
 *
 * @param {{title:String,selected:Boolean,onClick:Function}} props
 */
function ProductSize({title, selected, onClick}) {
  return (
    <TouchableOpacity onPress={() => onClick(title)}>
      <View
        style={tailwind(
          `${
            selected ? 'bg-black' : 'bg-white'
          } text-lg border-2 border-black rounded-lg px-4 py-2`,
        )}>
        <Text
          style={tailwind(
            `${selected ? 'text-white' : 'text-black'} text-center font-bold`,
          )}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

/**
 *
 * @param {{onBlur:Function,onChange:Function,value:string[]}} props
 */
function Media({onBlur, onChange, error, getArray, ImgArray, value}) {
  // const [image, setImage] = useState({});
  const {width} = useWindowDimensions();
  const [images, setImages] = useState(value);
  console.log('Images in Media -==-=-=-=-=-=->>>>>>', images);
  // useEffect(() => {
  // }, [value]);

  useEffect(() => {
    const requestPermission = async () => {
      //   if (Platform.OS !== 'web') {
      //     const {status} =
      //       await ImagePicker.requestMediaLibraryPermissionsAsync();
      //     if (status !== 'granted') {
      //       alert('Sorry, we need camera roll permissions to make this work!');
      //     }
      //   }
    };
    requestPermission();
  }, []);
  const options = {
    title: 'Select Avatar',
    quality: 1,
    maxWidth: 250,
    maxHeight: 250,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const pickImage = async () => {
    Alert.alert('Please Select', '', [
      {
        text: 'Camera',
        onPress: () => {
          openCamera();
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          openGallery();
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancle presed'),
      },
    ]);
    console.log('===>', images);
  };
  const openGallery = async () => {
    ImagePicker.launchImageLibrary(options, response => {
      console.log('========> response', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        // const source = {uri: response.assets[0].uri};
        console.log('image array == >', response.assets[0].uri);

        setImages([
          ...images,
          {
            uri: response.assets[0].uri,
            name: 'photo.jpg',
            type: response.assets[0].type,
          },
        ]);
        getArray([
          ...images,
          {
            uri: response.assets[0].uri,
            name: 'photo.jpg',
            type: response.assets[0].type,
          },
        ]);
        console.log('images All aray=++++', images);
      }
    });
  };
  const openCamera = async () => {
    await ImagePicker.launchCamera(
      {
        mediaTypes: 'photo',
        aspect: [4, 3],
        quality: 1,
      },
      result => {
        console.log('camera result is ', result);
        if (result.didCancel === true) {
          () => {
            return null;
          };
          return null;
        } else {
          setImages(result.assets[0]);
          // onChange(result.assets[0]);
        }
      },
    );
  };

  return (
    <>
      <View style={tailwind('flex-row flex-wrap')}>
        {Array.from({length: 6}).map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => pickImage(index)}
            style={{
              ...tailwind('p-1'),
              width: width / 3 - 16,
              height: width / 3 + 16,
            }}>
            <View
              style={{
                ...tailwind(
                  'p-3 h-full bg-white rounded-2xl   items-center justify-center',
                ),
              }}>
              {/* {images[index]?.absolute_path ? (
                <Image
                  source={{
                    uri: images[index].absolute_path,
                  }}
                  style={tailwind('w-20 h-32')}
                  resizeMode={'contain'}
                />
              ) : (
                <Icon name="camera" style={tailwind('text-black text-3xl')} />
              )} */}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {error !== undefined && (
        <Text style={tailwind('mt-4 text-sm text-red-500')}>{error}</Text>
      )}
      <Text style={tailwind('my-6 text-center  text-lg ')}>
        Upload up to 6 image/s or video/s
      </Text>
    </>
  );
}
