/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {Image} from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import * as ImagePicker from "expo-image-picker";
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {tailwind} from '@/common/tailwind';
import schema from './schema/addProduct';
import API from '@/common/services/API';
// import useUpdateEffect from '@/common/hooks/useUpdateEffect';
import {Input, Button, Text} from '@/components/index';
import {AuthContext} from '@/common/contexts/AuthContext';
import {ScrollView} from 'react-native-gesture-handler';
// import axios from 'axios';
// import DropDownPicker from 'react-native-dropdown-picker';
const ImagePicker = require('react-native-image-picker');
import StackHeader from '@/components/StackHeader';
import CustomAlert from '@/components/Modal/CustomAlert';
import categoryOptions from './../../../common/rawdata/product/categoryOptions.json';
import enhanceListing from './../../../common/rawdata/product/enhanceListing.json';
import {TouchableWithoutFeedback} from 'react-native';
import SelectedEnhanceListing from '@/common/helpers/product/SelectedEnhanceListing';
import TouchableFields from './components/TouchableFields';
import FormLabelText from '@/components/FormLabelText';
/**
 *
 * @param {UseMutationOptions} opts
 * @returns
 */

export default function AddProduct({navigation, route}) {
  /**
   * @type {LegacyRef<View>}
   */
  const scrollViewRef = useRef();
  const {accessToken} = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState();
  const [extraDetails, setExtraDetails] = useState({});
  const [extraDetailsLabel, setExtraDetailsLabel] = useState('');
  const [shippingFee, setShippingFee] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const FIELD_INPUT_STYLE = tailwind('text-gray-500');

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              iconName: 'arrow-back-outline',
              title: ' Add Product',
            }}
          />
        );
      },
    });
  }, [navigation]);

  // let [extraDetailsValue, setExtraDetailsValue] = useState('');

  const [sizeOpen, setSizeOpen] = useState(false);
  const [sizeValue, setSizeValue] = useState(null);
  const [sizeItems, setSizeItems] = useState([
    {label: 'Small', value: 'Small'},
    {label: 'Medium', value: 'Medium'},
    {label: 'Large', value: 'Large'},
    {label: 'XL', value: 'XL'},
    {label: 'XXL', value: 'XXL'},
    {label: 'Jumbo', value: 'Jumbo'},
  ]);

  const {
    control,
    errors,
    handleSubmit,
    reset: resetForm,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  // const { mutate, isError, reset } = useAddProducts({
  //   onError: err => {
  //     //
  //     console.log('add product error :>> ', err);
  //     console.log('add product error :>> ', err?.response);
  //     scrollViewRef.current?.scrollToPosition(0, 0);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Error adding product, try again',
  //       visibilityTime: 2000,
  //     });
  //   },
  //   onSuccess: response => {
  //     //
  //     console.log('added product successfully :>> ', response);
  //     resetForm({});
  //   },
  // });

  // function addNewProduct(values) {
  //   console.log('Getting array from child', images);

  //   const formData = new FormData();
  //   formData.append('seller_id', userId);
  //   for (let [key, value] of Object.entries(values)) {
  //     if (key === 'images') {
  //       value.map((image, index) => formData.append(`images[${index}]`, image));
  //       // formData.append(`images`, value);
  //     } else {
  //       formData.append(key, value);
  //     }
  //   }
  //   console.log('FormData', formData);
  //   // mutate(formData);
  // }

  const addNewProduct = () => {
    if (name && description && price && size) {
      setIsLoading(true);
      const formdata = new FormData();
      formdata.append('name', name);
      formdata.append('description', description);
      formdata.append('price', price || 0);
      // formdata.append('type', 'type');
      formdata.append('category', category || '');
      formdata.append('condition', condition || '');
      formdata.append('brand', brand || '');
      formdata.append('size', size || '');
      formdata.append('quantity', quantity || 1);
      formdata.append('shippingFee', shippingFee || 0);
      // formdata.append('quality', quality);
      formdata.append('extraDetails', JSON.stringify(extraDetails));

      images
        .filter(el => el)
        .forEach((item, i) => {
          if (item?.uri) {
            formdata.append('file', {
              uri: item.uri,
              type: 'image/jpeg',
              name: item.filename || `filename${i}.jpg`,
            });
          }
        });

      API(accessToken)
        .post('product/addproduct', formdata)
        .then(response => {
          if (response.status === 200) {
            // setProductsData(response?.data?.payload);
            // navigation.navigate('EDIT PRODUCT');
            if (route?.params?.setSelectedProducts) {
              route.params.setSelectedProducts(prev => [
                ...prev,
                response.data.payload.product,
              ]);
              route.params.setShowFeatured(true);
            }
            console.log('==Success', isSuccess);

            setIsSuccess(true);
            setIsLoading(false);
            // setIsSuccess(true);
          }
        })
        .catch(error => {
          setIsLoading(false);
        });
    } else {
      Alert.alert(
        'Add Product Error',
        `${name ? '' : 'Name, '}${description ? '' : 'Description, '}${
          price ? '' : 'Price, '
        }${size ? '' : 'Size, '}are required.`,
      );
    }
  };
  const getImagesArray = data => {
    setImages(data);
  };

  useEffect(() => {}, [extraDetails]);

  let conditionOptions = [
    {key: 1, value: 'Brand New'},
    {key: 2, value: 'Used - Excellent'},
    {key: 3, value: 'Used - Good'},
    {key: 4, value: 'Used - Fair'},
  ];

  const selectCondition = values => {
    setCondition(Number.parseInt(values, 10));
  };

  const selectCategory = values => {
    setCategory(Number.parseInt(values, 10));
  };

  const selectExtraDetails = values => {
    console.log('extra details', values);
    setExtraDetails(values);
    let label = '';

    if (values?.color && values?.color[0]) {
      label =
        label +
        enhanceListing.color.find(el => el.key === values?.color[0]).value +
        ' ';
    }

    if (values?.color && values?.color[1]) {
      label =
        label +
        enhanceListing.color.find(el => el.key === values?.color[1]).value +
        ' ';
    }

    if (values?.style.age) {
      label =
        label +
        enhanceListing.style.age.find(el => el.key === values?.style.age)
          .value +
        ' ';
    }

    if (values?.style?.source && values?.style.source[0]) {
      label =
        label +
        enhanceListing.style.source.find(
          el => el.key === values?.style.source[0],
        ).value +
        ' ';
    }

    if (values?.style?.source && values?.style.source[1]) {
      label =
        label +
        enhanceListing.style.source.find(
          el => el.key === values?.style.source[1],
        ).value +
        ' ';
    }

    if (values?.style?.source && values?.style.source[2]) {
      label =
        label +
        enhanceListing.style.source.find(
          el => el.key === values?.style.source[2],
        ).value +
        ' ';
    }

    if (values?.style?.style && values?.style.style[0]) {
      label =
        label +
        enhanceListing.style.style.find(el => el.key === values?.style.style[0])
          .value +
        ' ';
    }

    if (values?.style?.style && values?.style.style[1]) {
      label =
        label +
        enhanceListing.style.style.find(el => el.key === values?.style.style[1])
          .value +
        ' ';
    }

    if (values?.style?.style && values?.style.style[2]) {
      label =
        label +
        enhanceListing.style.style.find(el => el.key === values?.style.style[2])
          .value +
        ' ';
    }

    if (values?.style?.style && values?.style.style[3]) {
      label =
        label +
        enhanceListing.style.style.find(el => el.key === values?.style.style[3])
          .value +
        ' ';
    }

    setExtraDetailsLabel(label);
  };

  const selectShippingFee = values => {
    setShippingFee(values);
    console.log('Set Shipping Fee', values);
  };
  // console.log('shippingFee is-------->>>', shippingFee);
  return (
    <KeyboardAvoidingView
      style={tailwind('flex-1')}
      behavior={Platform.OS === 'ios' ? 'padding' : 'null'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tailwind('')}
        ref={scrollViewRef}>
        <Modal isVisible={isSuccess}>
          <View
            style={tailwind(
              'bg-white rounded-2xl p-4 items-center justify-center',
            )}>
            <Text
              style={tailwind('text-black text-center text-lg mb-4 font-bold')}>
              Product added successfully
            </Text>
            <Button
              title="Close"
              theme="primary"
              onPress={() => {
                // setIsSuccess(false);
                setTimeout(() => {
                  navigation.goBack();
                }, 200);
              }}
              containerStyle={tailwind('w-1/2')}
            />
          </View>
        </Modal>
        <View style={tailwind('px-6 pt-6')}>
          <Controller
            control={control}
            render={({onBlur, onChange, value}) => (
              <Media
                onBlur={onBlur}
                onChange={onChange}
                error={errors?.images?.message}
                value={value}
                getArray={getImagesArray}
              />
            )}
            name="images"
            defaultValue={Array.from({length: 6}, () => ({
              uri: null,
              name: null,
              type: null,
            }))}
          />
        </View>
        <View style={tailwind('bg-white p-6')}>
          <Controller
            control={control}
            name="name"
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <Input
                labelStyle={tailwind('')}
                label={
                  <FormLabelText
                    text={'Product Name'}
                    asteriskCondition={name}
                  />
                }
                onBlur={onBlur}
                placeholder="Louis Vuitton Riverside Bag"
                theme="secondary"
                inputContainerStyle={FIELD_INPUT_STYLE}
                type="underline"
                clear
                value={name}
                inputStyle={tailwind('font-normal')}
                onChangeText={text => setName(text)}
                mandatory={true}
                errorMessage={
                  name?.length < 3 && name.length !== 0
                    ? 'Invalid Product Name'
                    : null
                }
              />
            )}
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                labelStyle={{fontWeight: '800'}}
                label={
                  <FormLabelText
                    text="Description"
                    asteriskCondition={description}
                  />
                }
                inputContainerStyle={FIELD_INPUT_STYLE}
                onBlur={onBlur}
                theme="secondary"
                type="underline"
                placeholder="Product description goes here"
                clear
                multiline={true}
                value={description}
                onChangeText={text => setDescription(text)}
                errorMessage={
                  description?.length < 10 && description.length !== 0
                    ? 'Description must be longer'
                    : null
                }
              />
            )}
            name="description"
          />

          <Controller
            style={tailwind('mt-4')}
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                containerStyle={tailwind('mt-4')}
                labelStyle={{fontWeight: '800'}}
                label={<FormLabelText text="Size" asteriskCondition={size} />}
                inputContainerStyle={FIELD_INPUT_STYLE}
                theme="secondary"
                type="underline"
                placeholder="Set Measurement (L x H x W)"
                clear
                onBlur={onBlur}
                value={size}
                onChangeText={text => setSize(text)}
                errorMessage={
                  size?.length < 3 && size?.length !== 0 ? 'Invalid Size' : null
                }
              />
            )}
            name={'size'}
          />

          <View style={{flexDirection: 'row'}}>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <Input
                  containerStyle={tailwind('mt-4')}
                  labelStyle={{fontWeight: '800'}}
                  label={
                    <FormLabelText text="Brand" asteriskCondition={brand} />
                  }
                  inputContainerStyle={FIELD_INPUT_STYLE}
                  theme="secondary"
                  type="underline"
                  placeholder="Enter Brand"
                  clear
                  onBlur={onBlur}
                  value={brand}
                  onChangeText={text => setBrand(text)}
                  errorMessage={
                    brand?.length < 4 && brand?.length !== 0
                      ? 'Invalid Brand Name'
                      : null
                  }
                />
              )}
              name={'brand'}
            />
          </View>

          <TouchableFields
            value={
              categoryOptions.find(el => el.key === category)?.label ||
              categoryOptions.find(el => el.key === category)?.value
            }
            placeholder={'Set Category'}
            fieldSize={18}
            label={
              <FormLabelText text="Category" asteriskCondition={category} />
            }
            onPress={() =>
              navigation.navigate('Select Category', {
                category,
                selectCategory,
                categoryOptions,
              })
            }
          />

          <TouchableFields
            value={conditionOptions.find(el => el.key === condition)?.value}
            placeholder={'Select Condition'}
            label={
              <FormLabelText text="Condition" asteriskCondition={condition} />
            }
            fieldSize={18}
            onPress={() =>
              navigation.navigate('Select Condition', {
                selectCondition,
                condition,
                conditionOptions,
              })
            }
          />

          <View style={{bottom: 15}}>
            <Text
              style={{
                top: 78,
                fontSize: 20,
                color: '#ACACAC',
                paddingBottom: 5,
              }}>
              $
            </Text>

            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <Input
                  containerStyle={[tailwind('mt-4')]}
                  label={
                    <FormLabelText
                      text={'Item Price'}
                      asteriskCondition={price}
                    />
                  }
                  // labelStyle={{fontWeight: '800'}}
                  // inputStyle={{paddingLeft: 15}}
                  theme="secondary"
                  inputContainerStyle={[tailwind('pl-2'), FIELD_INPUT_STYLE]}
                  keyboardType={'numeric'}
                  inputStyle={{top: 3.5}}
                  type="underline"
                  clear={true}
                  onBlur={onBlur}
                  value={price}
                  placeholder=""
                  onChangeText={text => setPrice(text)}
                  errorMessage={
                    !/\d+((,\d+)+)?(.\d+)?(.\d+)?(,\d+)?/.test(price) && price
                      ? 'Invalid Price'
                      : null
                  }
                />
              )}
              name={'price'}
            />
          </View>

          <View style={{flexDirection: 'row', bottom: 10}}>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <Input
                  containerStyle={tailwind('mt-4')}
                  label={
                    <FormLabelText
                      text={'Quantity'}
                      asteriskCondition={quantity}
                    />
                  }
                  labelStyle={{fontWeight: '800'}}
                  theme="secondary"
                  inputContainerStyle={FIELD_INPUT_STYLE}
                  placeholder="Set Available Quantity"
                  inputStyle
                  keyboardType={'numeric'}
                  type="underline"
                  value={quantity}
                  onBlur={onBlur}
                  clear
                  onChangeText={text => setQuantity(text)}
                  //value={price}
                  //onChangeText={text => setPrice(text)}
                  //errorMessage={errors?.price?.message}
                />
              )}
              name={'quantity'}
            />
          </View>

          <TouchableFields
            fieldSize={18}
            value={
              extraDetailsLabel && extraDetailsLabel?.length > 30
                ? extraDetailsLabel?.substring(0, 30) + ' ...'
                : extraDetailsLabel
            }
            placeholder={'Enhance your listing'}
            label={
              <FormLabelText
                text={'Extra Details'}
                asteriskCondition={extraDetailsLabel}
              />
            }
            onPress={() =>
              navigation.navigate('Enhance Listing', {
                extraDetails,
                selectExtraDetails,
                enhanceListing,
              })
            }
          />

          <TouchableFields
            fieldSize={18}
            value={shippingFee}
            // placeholder={'$'}
            value={shippingFee === 0 ? 'Free Shipping' : `$ ${shippingFee}`}
            label={
              <FormLabelText
                text={'Shipping Fee'}
                asteriskCondition={shippingFee}
              />
            }
            onPress={() =>
              navigation.navigate('Select Shipping Fee', {
                shippingFee,
                selectShippingFee,
              })
            }
          />
        </View>

        <View style={tailwind('my-6 mt-8 mb-10 items-center')}>
          <Button
            buttonStyle={tailwind('px-12 py-3')}
            loading={isLoading}
            onPress={addNewProduct}
            titleStyle={tailwind('font-bold')}
            theme="primary"
            size="md"
            title="Save"
            containerStyle={tailwind('w-52 items-center justify-center')}
          />
        </View>
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

  return (
    <View>
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
 * @param {{onBlur:Function,onChange:Function}} props
 */
function Media({onBlur, onChange, error, getArray, value}) {
  const [imageUrl, setImageUrl] = useState([]);
  const {width} = useWindowDimensions();
  const {accessToken} = useContext(AuthContext);
  const [images, setImages] = useState([]);

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
    requestPermission().then(result => {
      console.log('Permission request...........');
    });
  }, []);
  const options = {
    title: 'Select Avatar',
    // quality: 1,
    maxWidth: 250,
    maxHeight: 250,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const pickImage = async index => {
    Alert.alert('Please Select', '', [
      {
        text: 'Camera',
        onPress: () => {
          openCamera(index);
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          openGallery(index);
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancle presed'),
      },
    ]);
    console.log('Images Length--------> ', images?.length, '           ', {
      images,
    });
  };
  const openGallery = async index => {
    ImagePicker.launchImageLibrary(
      {selectionLimit: 6, mediaType: 'photo'},
      response => {
        // console.log('========> response', response);
        if (response.didCancel) {
          console.log('User cancelled image picker', images?.length);
        } else if (response?.assets?.length > 1) {
          // const source = {uri: response.assets[0].uri};
          console.log(
            `image picker-------multi------`,
            response?.assets?.length,
          );
          // let _images = [...images];
          let _images = response?.assets?.map((el, index) => {
            return {
              type: el.type,
              uri: el.uri,
              name: el.fileName || el.id || el.uri,
            };
          });

          setImages([...images, ..._images].slice(0, 6));
          getArray([...images, ..._images]?.slice(0, 6));
        } else {
          console.log(`image picker------one-------`, response.assets);
          let _images = [...images];
          _images[index] = {
            uri: response.assets[0].uri,
            name: 'photo.jpg',
            type: response.assets[0].type,
          };
          setImages(_images);
          getArray([
            ...images,
            {
              uri: response.assets[0].uri,
              name: 'photo.jpg',
              type: response.assets[0].type,
            },
          ]);
        }
      },
    );
  };
  const openCamera = async index => {
    await ImagePicker.launchCamera(options, result => {
      console.log('camera result is ', result);
      if (result.didCancel === true) {
        () => {
          return null;
        };
        return null;
      } else {
        let _images = [...images];
        _images[index] = {
          uri: result.assets[0].uri,
          name: 'photo.jpg',
          type: result.assets[0].type,
        };
        setImages(_images);

        getArray([
          ...images,
          {
            uri: result.assets[0].uri,
            name: 'photo.jpg',
            type: result.assets[0].type,
          },
        ]);
        // onChange(result.assets[0]);
      }
    });
  };

  const removeImage = async index => {
    console.log('index is----->>>', index);
    let _images = [...images];
    _images?.splice(index, 1);
    setImages(_images);
  };

  return (
    <>
      <View style={tailwind('flex-row flex-wrap')}>
        {Array.from({length: 6}).map((image, index) => (
          <View style={tailwind('z-0')} key={index}>
            {images[index]?.uri ? (
              <TouchableOpacity
                onPress={() => removeImage(index)}
                style={tailwind('z-50 absolute top-1 -right-1 w-10 h-10')}>
                {/* {
                  Toast.show({
                    type: 'error',
                    text1: 'remove Image icon',
                    visibilityTime: 1000,
                  })
                } */}
                <EntypoIcon
                  name="circle-with-cross"
                  style={tailwind('z-50 text-2xl text-gray-300')}
                />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              key={index}
              onPress={() => pickImage(index)}
              style={{
                ...tailwind('p-1 z-0'),
                width: width / 3 - 16,
                height: width / 3 + 16,
              }}>
              <View
                style={[
                  {
                    ...tailwind(
                      'z-0 h-full bg-white rounded-3xl items-center justify-center',
                    ),
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                    elevation: 5,
                  },
                ]}>
                {images[index]?.uri ? (
                  <Image
                    source={{uri: images[index].uri}}
                    style={[tailwind('z-0 w-24 h-36 rounded-3xl')]}
                    resizeMode={'contain'}
                  />
                ) : (
                  <Icon name="camera" style={tailwind('text-black text-5xl')} />
                )}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {error !== undefined && (
        <Text style={tailwind('mt-4 text-sm text-red-500')}>{error}</Text>
      )}
      <Text style={tailwind('my-6 text-center text-gray-400 text-lg')}>
        {'Upload up to 6 images'}
      </Text>
    </>
  );
}
