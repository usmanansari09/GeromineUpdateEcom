/* eslint-disable react-native/no-inline-styles */
import React, {
  useEffect,
  useReducer,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import TwoBags from '@/common/icons/TwoBags';
import {tailwind} from '@/common/tailwind';
import BottomSheet from '@/components/BottomSheet';
import Button from '@/components/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import {useProducts} from '@/common/services/hooks';
import ProductList from '@/components/Products/ProductList';
import ProductImage from '@/components/Products/ProductImage';
import {useModal} from '@/components/Modal';
import {useFocusEffect} from '@react-navigation/native';

/**
 *
 * @param {{onChange:(products:number[])=>void,selected:number[]}} props
 * @returns
 */
function ExistingProducts(props, ref) {
  const {onChange = () => {}, selectedProducts, setShowFeatured} = props;

  const [visible, toggle] = useModal();
  const [selected, setSelected] = useState([]);
  const {data, isSuccess, isLoading, isError} = useProducts();
  useFocusEffect(
    React.useCallback(() => {
      if (data?.pages?.length > 0 && selectedProducts?.length > 0) {
        let newData = data.pages[0].payload.products;
        const selectedIds = newData.filter((item, index) => {
          if (index < selectedProducts.length) {
            return item._id === selectedProducts[index]._id;
          }
        });

        setSelected(selectedIds);
      }
    }, [data, selectedProducts]),
  );
  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    toggle: () => {
      toggle();
    },
  }));
  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }, []);

  function handleSelectedProduct(item) {
    const ifExist = selected.filter(i => i._id === item._id);
    if (ifExist.length > 0) {
      setSelected(prev => prev.filter(i => i._id !== item._id));
    } else {
      setSelected(prev => [...prev, item]);
    }
  }
  const handlePress = () => {
    toggle(false);
    onChange(selected);
    setTimeout(() => {
      setShowFeatured(true);
    }, 500);
  };

  return (
    <>
      {/* <TouchableOpacity
        onPress={toggle}
        style={tailwind(
          'border border-white rounded-lg mx-2 p-1 justify-center  items-center flex-1',
        )}>
        <TwoBags style={tailwind('text-white w-8 h-8')} />
        <Text style={tailwind('text-white text-xs font-bold text-center')}>
          Choose my
        </Text>
        <Text style={tailwind('text-white text-xs font-bold text-center')}>
          Existing Product
        </Text>
      </TouchableOpacity> */}
      <BottomSheet
        isVisible={visible}
        onBackdropPress={toggle}
        onBackButtonPress={toggle}
        backdropOpacity={0.6}
        containerStyle={tailwind('flex-1 my-10 mx-8')}>
        <View style={[tailwind('mb-3'), {flex: 1}]}>
          <Icon
            onPress={handlePress}
            name="close"
            style={tailwind('text-white text-4xl self-end mb-3\\.5')}
          />
          <ProductList
            products={data?.pages[0]?.payload?.products}
            loading={isLoading}
            error={isError}
            ProductComponent={({product}) => {
              return (
                <Product
                  product={product}
                  onSelect={handleSelectedProduct}
                  isSelected={selected}
                />
              );
            }}
          />
        </View>
        <View style={tailwind('w-full items-center')}>
          <Button
            title="Done"
            size="md"
            theme="primary"
            containerStyle={tailwind('mt-4 w-4/12')}
            onPress={handlePress}
          />
        </View>
      </BottomSheet>
    </>
  );
}

/**
 *
 * @param {{item:object, style:object, onSelect:Function, isSelected:boolean}} props
 */
function Product({product, onSelect, isSelected}) {
  const selectedNew = isSelected.filter(item => item._id === product._id);
  const [selected, setSelected] = useState(
    selectedNew.length > 0 ? true : false,
  );
  const handlePress = () => {
    onSelect(product);
    setSelected(prev => !prev);
  };

  return (
    <View
      style={[
        tailwind('flex-row rounded-2xl overflow-hidden mb-4 bg-white h-28'),
        {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        },
      ]}>
      <View style={tailwind('items-center justify-center')}>
        <ProductImage
          image={product?.images ? product?.images[0] : ''}
          resizeMode="contain"
          containerStyle={tailwind('w-24 h-24')}
        />
      </View>
      <View style={tailwind('flex-row flex-1 items-center bg-white pl-3')}>
        <View style={tailwind('flex-1')}>
          <View style={tailwind('flex-row')}>
            <Text numberOfLines={1} style={tailwind('text-3xl font-bold')}>
              ${product.price}
            </Text>
            {/* <Text
                            style={{
                                ...tailwind("text-black text-lg font-bold"),
                                textDecorationLine: "line-through",
                            }}
                        >
                            ${item.original_price}
                        </Text> */}
          </View>
          <Text style={tailwind('text-black text-xs font-bold')}>
            {product.name}
          </Text>
          <Text
            style={tailwind('text-gray-400 text-xs flex-shrink')}
            numberOfLines={2}>
            {product.description}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handlePress}
          style={[
            tailwind(
              'rounded-l-2xl px-2 items-center justify-center  bg-black ml-2 py-5',
            ),
            tailwind(`${selected ? 'px-3 py-2' : ''}`),
          ]}>
          {selected ? (
            <Icon
              name="checkmark-circle-outline"
              style={tailwind('text-3xl text-white')}
            />
          ) : (
            <Text style={tailwind('text-xs text-white font-bold uppercase')}>
              Select
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default forwardRef(ExistingProducts);
