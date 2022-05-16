/* eslint-disable react-native/no-inline-styles */
import React, {
  useContext,
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
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
// import Modal from '@/components/Modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import * as ImagePicker from "expo-image-picker";
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useMutation, UseMutationOptions} from 'react-query';

import {tailwind} from '@/common/tailwind';
// import schema from './schema/EditProduct2';
import API from '@/common/services/API';
import {RouteProp, useNavigation} from '@react-navigation/native';
// import useUpdateEffect from '@/common/hooks/useUpdateEffect';
import {Input, Button, Text} from '@/components/index';
import {AuthContext} from '@/common/contexts/AuthContext';
import Toast from 'react-native-toast-message';
import {ScrollView} from 'react-native-gesture-handler';
// import axios from 'axios';
// import DropDownPicker from 'react-native-dropdown-picker';
const ImagePicker = require('react-native-image-picker');
import CustomAlert from '@/components/Modal/CustomAlert';
import categoryOptions from './../../../common/rawdata/product/categoryOptions.json';
import enhanceListing from './../../../common/rawdata/product/enhanceListing.json';
import {Icon} from 'react-native-elements';
import StackHeader from '@/components/StackHeader';
import FormLabelText from '@/components/FormLabelText';
import TouchableFields from '../AddProduct/components/TouchableFields';

export default function EditProduct({navigation, route}) {
  const {accessToken} = useContext(AuthContext);
  const Product = route.params?.productData;
  const scrollViewRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [images, setImages] = useState(Product.images);
  const [name, setName] = useState(Product.name);
  const [description, setDescription] = useState(Product.description);
  const [size, setSize] = useState(Product.size);
  const [brand, setBrand] = useState(Product.brand);
  const [category, setCategory] = useState(
    Number.parseInt(Product.category, 10),
  );
  const [condition, setCondition] = useState(
    Number.parseInt(Product.condition, 10),
  );
  // const [categoryLabel, setCategoryLabel] = useState('');
  const [price, setPrice] = useState(Product.price);
  const [quantity, setQuantity] = useState(Product.quantity);
  const [extraDetails, setExtraDetails] = useState(Product.extraDetails);
  const [shippingFee, setShippingFee] = useState(Product.shippingFee || 0);
  const [imagesToDel, setImagesToDel] = useState([]);
  const [extraDetailsLabel, setExtraDetailsLabel] = useState('');
  let [extraDetailsValue, setExtraDetailsValue] = useState('');

  const FIELD_INPUT_STYLE = tailwind('text-gray-500');

  // console.log(
  //   `route params of Edit Product: ------> `,
  //   route.params.product?.name,
  // );

  const {
    control,
    errors,
    handleSubmit,
    reset: resetForm,
  } = useForm({
    mode: 'onBlur',
    // resolver: yupResolver(schema),
  });
  // const {mutate, isError, reset} = useAddProducts({
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

  const deleteProduct = opts => {
    const {accessToken} = useContext(AuthContext);
    return useMutation(
      values => API(accessToken).delete(`product/${values}`),
      opts,
    );
  };

  const {
    mutate: mutateDeleteProduct,
    isLoading: isLoadingDeleteProduct,
    isError: isErrorDeleteProduct,
    isSuccess: isSuccessDeleteProduct,
  } = deleteProduct();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              iconName: 'arrow-back-outline',
              title: 'EDIT PRODUCT',
            }}
          />
        );
      },
    });
    getProduct();
  }, [navigation]);

  const getProduct = product => {
    setIsLoading(true);
    API(accessToken)
      .get(`product/${route.params.productData._id}`)
      .then(response => {
        setIsLoading(false);
        // console.log('Myproducts payload-----------> ', response?.data?.payload);
        if (response.status === 200) {
          // setProductsData(response?.data?.payload);
          route.params.product = response?.data?.payload?.product;
        }
      })
      .catch(error => {
        // setIsError(true);
        setIsLoading(false);
        console.log(
          'Myproducts Error: ----------> ',
          JSON.parse(JSON.stringify(error?.response?.data)),
        );
      });
  };
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

  const updateProduct = async () => {
    if (name && description && price && size) {
      const formdata = new FormData();
      images
        .filter(el => el)
        .map((item, i) => {
          if (item?.uri) {
            formdata.append('file', {
              uri: item.uri,
              type: 'image/jpeg',
              name: item.filename || `filename${i}.jpg`,
            });
          }
        });

      let _images = images.filter(el => !(el?.uri && el.uri));

      setIsLoading(true);
      formdata.append('name', name);
      formdata.append('description', description);
      formdata.append('price', price);
      // formdata.append('type', 'type');
      formdata.append('category', category);
      formdata.append('condition', condition);
      formdata.append('brand', brand);
      formdata.append('size', size);
      formdata.append('quantity', quantity);
      formdata.append('images', JSON.stringify(_images.filter(el => el)));
      formdata.append('extraDetails', JSON.stringify(extraDetails));
      formdata.append('imagesToDelete', JSON.stringify(imagesToDel));
      formdata.append('shippingFee', shippingFee);

      console.log('Getting array from child-----------', formdata);
      // API(accessToken)
      //   .post(`product/update/${Product._id}`, formdata)
      //   .then(function (response) {
      //     if (response.status === 200) {
      //       // setProductsData(response?.data?.payload);
      //       console.log('Update Product ----------------==Success', response.data);
      //       CustomAlert('Add Product', response.data.message, () =>
      //         navigation.goBack(),
      //       );
      //       setIsLoading(false);

      //       // setIsSuccess(true);
      //     }
      //   })
      //   .catch(function (error) {
      //     // setIsLoading(false);

      //     console.log('Update product Errorrrrrrrrrrrrr -----> ', {error});
      //     });

      try {
        const response = await API(accessToken).post(
          `product/update/${Product._id}`,
          formdata,
          {headers: {'Access-Control-Allow-Origin': '*'}},
        );
        console.log('Update Product ----------------==Success', response.data);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (error) {
        console.log('Update product Errorrrrrrrrrrrrr -----> ', {error});

        setIsSuccess(true);
        setIsLoading(false);
      }
    } else {
      Alert.alert(
        'Add Product',
        `All Fields are required Name: ${name}, Desc: ${description}, price:${price}, size:${size}`,
      );
    }
  };
  const getImagesArray = data => {
    setImages(data);
    console.log('Getting array from child', data, images);
  };

  /* Select condition */
  let conditionOptions = [
    {key: 1, value: 'Brand New'},
    {key: 2, value: 'Used - Excellent'},
    {key: 3, value: 'Used - Good'},
    {key: 4, value: 'Used - Fair'},
  ];

  const selectCondition = values => {
    setCondition(Number.parseInt(values, 10));
    console.log(`selectCondition in Addproduct`, values);
  };

  const selectCategory = values => {
    setCategory(Number.parseInt(values, 10));
    console.log(`selectCategory in Addproduct`, values);
  };

  const selectShippingFee = values => {
    setShippingFee(values);
    console.log('Set Shipping Fee', values);
  };

  const imagesToDelete = (data, index) => {
    setImagesToDel([...imagesToDel, data]);
    let _images = images;
    _images?.splice(index, 1);
    setImages(_images);
    // console.log('ImagesToDelete from child', data);
  };

  return (
    <KeyboardAvoidingView
      style={tailwind('flex-1 bg-blue-50')}
      behavior={Platform.OS === 'ios' ? 'padding' : 'null'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tailwind('')}
        ref={scrollViewRef}>
        <Modal
          style={tailwind('px-2')}
          isVisible={isSuccess || isSuccessDeleteProduct}
          onClose={() => {
            if (isSuccessDeleteProduct) {
              navigation.navigate('Seller Store');
            } else if (isSuccess) {
              setTimeout(() => {
                navigation.goBack();
              }, 200);
            }
            setIsSuccess(false);
          }}>
          <View
            style={[
              tailwind('bg-white rounded-xl p-8 items-center justify-center'),
            ]}>
            <Text
              style={tailwind(
                'text-black text-center text-med-xl mb-4 font-bold',
              )}>
              {isSuccessDeleteProduct
                ? 'Product has been deleted.'
                : 'Product has been updated.'}
            </Text>
            <Button
              title="Close"
              theme="primary"
              onPress={() => {
                if (isSuccessDeleteProduct) {
                  navigation.navigate('Seller Store');
                } else if (isSuccess) {
                  setTimeout(() => {
                    navigation.goBack();
                  }, 200);
                }
                setIsSuccess(false);
              }}
              containerStyle={[
                tailwind('w-2/3 px-8 '),
                {top: 20, paddingHorizontal: 10},
              ]}
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
                value={images || null}
                getArray={getImagesArray}
                imageDeletes={imagesToDelete}
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
                inputContainerStyle={FIELD_INPUT_STYLE}
                placeholder="Louis Vuitton Riverside Bag"
                theme="secondary"
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
            name={'description'}
          />
          {/* <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <ProductSizes
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            error={errors?.size?.message}
          />
        )}
        name="size"
        defaultValue="S"
      /> */}

          {/* <DropDownPicker
          open={sizeOpen}
          value={sizeValue}
          items={sizeItems}
          setOpen={setSizeOpen}
          setValue={setSize}
          setItems={setSizeItems}
          placeholder='Select the size'
          defaultIndex={0}
          containerStyle={{ height: 40 }}
          onChangeItem={item => console.log(item.label, item.value)}

        /> */}

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
            {/* <FontAwesomeIcon
              name="angle-right"
              style={{ marginTop: 40, right: 10, fontSize: 30 }}
            /> */}
          </View>

          {/* <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={tailwind('w-full h-full')}
              onPress={() =>
                navigation.navigate('Select Category', {
                  category,
                  selectCategory,
                  categoryOptions,
                })
              }>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <Input
                    containerStyle={tailwind('mt-4')}
                    labelStyle={{fontWeight: '800'}}
                    label="Category"
                    theme="secondary"
                    type="underline"
                    placeholder="Set Category"
                    clear
                    editable={false}
                    onBlur={onBlur}
                    value={
                      categoryOptions.find(el => el.key === category)?.label ||
                      categoryOptions.find(el => el.key === category)?.value
                    }
                    errorMessage={errors?.category?.message}
                    // value={categoryOptions.find(el => el.key === category)?.value}
                    // onChangeText={text => setBrand(text)}
                  />
                )}
                name={'category'}
              />
            </TouchableOpacity>
            <FontAwesomeIcon
              name="angle-right"
              style={{marginTop: 40, right: 10, fontSize: 30}}
            />
          </View> */}

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

          {/* <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={tailwind('w-full h-full')}
              onPress={() =>
                navigation.navigate('Select Condition', {
                  selectCondition,
                  condition,
                  conditionOptions,
                })
              }>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <Input
                    containerStyle={tailwind('mt-4')}
                    label="Condition"
                    labelStyle={{fontWeight: '800'}}
                    theme="secondary"
                    type="underline"
                    placeholder="Select Condition"
                    clear
                    editable={false}
                    onBlur={onBlur}
                    value={
                      conditionOptions.find(el => el.key === condition)?.value
                    }
                    // onChangeText={text => setCondition(text)}
                    errorMessage={errors?.condition?.message}
                  />
                )}
                name={'condition'}
              />
            </TouchableOpacity>
            <FontAwesomeIcon
              name="angle-right"
              style={{marginTop: 40, right: 10, fontSize: 30}}
            />
          </View> */}

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

          {/* <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                containerStyle={tailwind('mt-4')}
                label="Item Price"
                labelStyle={{fontWeight: '800'}}
                theme="secondary"
                keyboardType={'numeric'}
                type="underline"
                placeholder="$"
                clear={true}
                onBlur={onBlur}
                value={price}
                onChangeText={text => setPrice(text)}
                errorMessage={
                  !/\d+((,\d+)+)?(.\d+)?(.\d+)?(,\d+)?/.test(price) && price
                    ? 'Invalid Price'
                    : null
                }
              />
            )}
            name={'price'}
          /> */}

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
                  inputContainerStyle={[
                    tailwind('pl-2'),
                    {top: 1.5},
                    FIELD_INPUT_STYLE,
                  ]}
                  keyboardType={'numeric'}
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

          {/* <View style={{flexDirection: 'row'}}> */}
          {/* <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                containerStyle={tailwind('mt-4')}
                label="Quantity*"
                labelStyle={{fontWeight: '800'}}
                theme="secondary"
                keyboardType={'numeric'}
                type="underline"
                clear
                onBlur={onBlur}
                //value={price}
                //onChangeText={text => setPrice(text)}
                //errorMessage={errors?.price?.message}
              />
            )}
            name="price"
            defaultValue=""
          /> */}

          {/* <DropDownPicker
          items={[
            { label: '1', value: '1' },
            { label: '2', value: '2' },
          ]}
          defaultIndex={1}
          //containerStyle={{height: 40}}
          onChangeItem={item => console.log(item.label, item.value)}
        /> 
        
        */}
          {/* <FontAwesomeIcon
            name="angle-right"
            style={{marginTop: 40, right: 10, fontSize: 30}}
          />
        </View> */}

          {/* <View style={{flexDirection: 'row'}}>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <Input
                  containerStyle={tailwind('mt-4')}
                  label="Quantity"
                  labelStyle={{fontWeight: '800'}}
                  theme="secondary"
                  placeholder="Set Available Quantity"
                  keyboardType={'numeric'}
                  type="underline"
                  value={quantity.toString()}
                  onBlur={onBlur}
                  clear
                  onChangeText={text => setQuantity(text)}
                  //value={price}
                  //onChangeText={text => setPrice(text)}
                  //errorMessage={errors?.price?.message}
                />
              )}
              // name={quantity?.toString()}
            />
          </View> */}

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

          {/* <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={tailwind('w-full h-full')}
              onPress={() =>
                navigation.navigate('Enhance Listing', {
                  extraDetails,
                  selectExtraDetails,
                  enhanceListing,
                })
              }>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <Input
                    containerStyle={tailwind('mt-4')}
                    label="Extra Details"
                    labelStyle={{fontWeight: '800'}}
                    theme="secondary"
                    placeholder="Enhance your listing"
                    type="underline"
                    clear
                    editable={false}
                    onBlur={onBlur}
                    value={extraDetailsValue}
                    // onChangeText={text => setExtraDetails(text)}
                    //onChangeText={text => setPrice(text)}
                    //errorMessage={errors?.enhanceListing?.message}
                  />
                )}
                name={'extraDetails'}
              />
            </TouchableOpacity>
            <FontAwesomeIcon
              name="angle-right"
              style={{marginTop: 40, right: 10, fontSize: 30}}
            />
          </View> */}

          <TouchableFields
            fieldSize={18}
            value={
              extraDetailsLabel && extraDetailsLabel?.length > 30
                ? extraDetailsLabel?.substring(0, 30) + ' ...'
                : extraDetailsLabel
            }
            placeholder={'Enhance your listing'}
            label={
              <FormLabelText text={'Extra Details'} asteriskCondition={true} />
            }
            onPress={() =>
              navigation.navigate('Enhance Listing', {
                extraDetails,
                selectExtraDetails,
                enhanceListing,
              })
            }
          />

          {/* <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={tailwind('w-full h-full')}
              onPress={() =>
                navigation.navigate('Select Shipping Fee', {
                  shippingFee,
                  selectShippingFee,
                })
              }>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <Input
                    containerStyle={tailwind('mt-4')}
                    label="Shipping Fee"
                    labelStyle={{fontWeight: '800'}}
                    theme="secondary"
                    placeholder="$"
                    type="underline"
                    clear
                    editable={false}
                    value={shippingFee}
                    //errorMessage={errors?.price?.message}
                  />
                )}
                name="price"
                defaultValue=""
              />
            </TouchableOpacity>
            <FontAwesomeIcon
              name="angle-right"
              style={{marginTop: 40, right: 10, fontSize: 30}}
            />
          </View> */}

          <TouchableFields
            fieldSize={18}
            value={
              shippingFee === 0 || shippingFee === '0'
                ? 'Free Shipping'
                : `$ ${shippingFee}`
            }
            label={
              <FormLabelText text={'Shipping Fee'} asteriskCondition={true} />
            }
            onPress={() =>
              navigation.navigate('Select Shipping Fee', {
                shippingFee,
                selectShippingFee,
              })
            }
          />
        </View>
        <View
          style={tailwind(
            'mt-8 mb-10 items-center justify-center flex-row px-10',
          )}>
          <Button
            style={tailwind('')}
            buttonStyle={tailwind('py-3')}
            loading={isLoading}
            onPress={updateProduct}
            titleStyle={tailwind('font-bold')}
            theme="primary"
            size="md"
            title="Save"
            containerStyle={tailwind('w-6/12 mr-3')}
          />

          <Button
            buttonStyle={tailwind('py-3')}
            loading={isLoadingDeleteProduct}
            onPress={() => mutateDeleteProduct(Product?._id)}
            titleStyle={tailwind('font-bold')}
            theme="black"
            size="md"
            title="Delete"
            containerStyle={tailwind('w-6/12')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Media({onBlur, onChange, error, getArray, value, imageDeletes}) {
  // const [image, setImage] = useState({});
  // console.log(`EditProduct2 > Media, value -----> `, value);
  const {width} = useWindowDimensions();
  const [images, setImages] = useState(value);
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
    console.log('===>', images);
  };
  const openGallery = async index => {
    ImagePicker.launchImageLibrary({selectionLimit: 6}, response => {
      console.log('========> response', response);
      if (response.didCancel) {
        console.log('User cancelled image picker', images);
      } else if (response?.assets?.length > 1) {
        // const source = {uri: response.assets[0].uri};
        console.log(`image picker-------multi------`, response?.assets?.length);
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
        // const source = {uri: response.assets[0].uri};
        console.log('image array == >', response.assets[0].uri);

        let _images = [...images];

        if (_images[index]?.absolute_path) {
          imageDeletes(_images[index], index);
        }

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
        console.log('images Replaced by the New ==========> ', images);
      }
    });
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

        if (_images[index]?.absolute_path) {
          imageDeletes(_images[index], index);
        }

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
    console.log(`remove Image called`);
    let _images = [...images];
    if (_images && _images[index]?.absolute_path) {
      imageDeletes(_images[index], index);
    }

    _images?.splice(index, 1);
    setImages(_images);
  };

  return (
    <>
      <View style={tailwind('flex-row flex-wrap')}>
        {Array.from({length: 6}).map((image, index) => (
          <View key={index}>
            {images && (images[index]?.uri || images[index]?.absolute_path) ? (
              <TouchableOpacity
                onPress={() => removeImage(index)}
                style={tailwind('z-50 absolute top-1 right-3')}>
                {/* {
                  Toast.show({
                    type: 'error',
                    text1: 'remove Image icon',
                    visibilityTime: 1000,
                  })
                } */}
                <EntypoIcon
                  name="circle-with-cross"
                  style={tailwind('text-2xl text-gray-400')}
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
                      'h-full bg-white rounded-3xl items-center justify-center',
                    ),
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                  },
                ]}>
                {images &&
                (images[index]?.uri || images[index]?.absolute_path) ? (
                  <Image
                    source={{
                      uri: images[index]?.uri || images[index]?.absolute_path,
                    }}
                    style={[tailwind('w-20 h-32 rounded-3xl')]}
                    resizeMode={'center'}
                  />
                ) : (
                  <Ionicons
                    name="camera"
                    style={tailwind('text-black text-5xl')}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {error !== undefined && (
        <Text style={tailwind('mt-4 text-sm text-red-500')}>{error}</Text>
      )}
      <Text style={tailwind('my-6 text-center text-lg')}>
        {`Upload up to 6 images`}
      </Text>
    </>
  );
}
