/* eslint-disable react-native/no-inline-styles */
import {getColor, tailwind} from '@/common/tailwind';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import Modal from 'react-native-modal';
import useProducts from '@/common/services/hooks/useProducts';
import {useMutation, useQueryClient} from 'react-query';
import API from '@/common/services/API';
import {AuthContext} from '@/common/contexts/AuthContext';
import ProductImage from '@/components/Products/ProductImage';
import {Button, Text, Skeleton} from '@/components/index';
import StackHeader from '@/components/StackHeader';
import Filter from '@/screens/Profile/ChippedProducts/components/Filter';
import {getLocationPermission} from '@/common/utils';

const useDeleteProduct = () => {
  const {accessToken} = useContext(AuthContext);
  return useMutation(id =>
    API(accessToken)
      .delete(`product/${id}/remove`)
      .then(res => res.data),
  );
};

export default function NearbyProducts({route, navigation}) {
  // console.log('NearbyProducts navigation.getState():\n\n', navigation.getState())
  const {accessToken} = useContext(AuthContext);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [productsMeta, setProductsMeta] = useState({});

  const [page, setPage] = useState(1);

  const [openFilterModal, setOpenFilterModal] = useState(false);

  const {products, isSuccess, refetch} = useProducts();

  const [category, setCategory] = useState(0);
  const [distance, setDistance] = useState(200);
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [condition, setCondition] = useState('');
  const [color, setColor] = useState('');

  const [searchQuery, setSearchQuery] = useState({});

  const queryClient = useQueryClient();

  // console.log({category}, {distance}, {price}, {brand}, {condition}, {color});

  const {
    mutate,
    isLoading: isDeletingProduct,
    isSuccess: isProductDeleted,
    reset,
  } = useDeleteProduct();

  useFocusEffect(
    React.useCallback(() => {
      setPage(1);
      getProducts();
    }, []),
  );

  const handleDelete = id => {
    API(accessToken)
      .delete('product/'.concat(id))
      .then(response => {
        setIsLoading(false);
        console.log('==del', response);
        if (response.status === 200) {
          console.log(`Product getting deleted: id:${id}`, response);
          getProducts();
        }
      })
      .catch(error => {
        setIsError(true);
        console.log('0000', JSON.parse(JSON.stringify(error)));
      });
  };

  useEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              title: 'Nearby Products',
              // hasSearch: true,
              hasSearchFilter: true,
              setOpenFilterModal: setOpenFilterModal,
            }}
          />
        );
      },
    });
    getProducts();
  }, [navigation]);

  const getProducts = async isFilter => {
    setIsLoading(true);
    console.log({isFilter});

    const location = await getLocationPermission();
    console.log('getLocationPermission is--------------------', location);
    console.log({category}, {distance}, {price}, {brand}, {condition}, {color});
    API()
      .post(`product/nearby?page=${page}&size=${30}`, {
        query: {category, distance, price, brand, condition, color},
        location: location, // Original

        /* Mock Location */
        // location: {
        //   latitude: 34.096365,
        //   longitude: -118.391647,
        // },
        /* / Mock */
      })
      .then(response => {
        console.log(response?.data?.payload);
        setIsLoadingMore(false);
        setIsLoading(false);
        if (response.status === 200) {
          let {products, ...meta} = response?.data?.payload;
          isFilter
            ? setProductsData([...products])
            : setProductsData([/* ...productsData, */ ...products]);
          setProductsMeta(meta);
          setPage(page + 1);
        }
      })
      .catch(error => {
        // setIsError(true);
        console.log('Myproducts API Error:----------> ', JSON.stringify(error));
      });
  };
  /*  */
  /* Filter Modal Functions */
  /*  */
  const filterModalClose = () => {
    setOpenFilterModal(false);
    setIsLoading(true);
    getProducts((isFilter = true));
  };

  const filterModalOpen = () => setOpenFilterModal(true);

  const changeDistance = value => {
    setDistance(value || 200);
    // console.log('change distance value', value);
  };

  const changeCategory = value => {
    navigation.navigate('NearbyProducts');
    filterModalOpen();
    setCategory(value);
    // console.log('change category value', value);
  };

  const changePrice = value => {
    setPrice(value);
    // console.log('change Price value', value);
  };

  const changeBrand = value => {
    setBrand(value);
    // console.log('change Brand value', value);
  };

  const changeCondition = value => {
    setCondition(value);
    // console.log('change Condition value', value);
  };

  const changeColor = value => {
    setColor(value);
    // console.log('change Color value', value);
  };

  function searchProducts() {}

  return (
    <View style={tailwind('flex-1 bg-gray-100')}>
      {isLoading ? (
        <Skeleton>
          <View style={tailwind('px-4 py-2')}>
            {Array.from({length: 10}, (_, index) => (
              <View
                key={index}
                style={[
                  tailwind('h-20 rounded-xl'),
                  tailwind(index > 0 ? 'mt-4' : ''),
                ]}
              />
            ))}
          </View>
        </Skeleton>
      ) : !isLoading ? (
        <View
        // style={tailwind('items-center justify-center')}
        >
          <Filter
            navigation={navigation}
            show={openFilterModal}
            onClose={filterModalClose}
            openModal={filterModalOpen}
            category={category}
            changeCategory={changeCategory}
            distance={distance}
            changeDistance={changeDistance}
            price={price}
            changePrice={changePrice}
            brand={brand}
            changeBrand={changeBrand}
            condition={condition}
            changeCondition={changeCondition}
            color={color}
            changeColor={changeColor}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            searchProducts={searchProducts}
            getProducts={getProducts}
          />
          {isLoading ? (
            <View style={tailwind('items-center justify-center flex-1')}>
              <ActivityIndicator size="large" color="red" />
            </View>
          ) : (
            <FlatList
              style={tailwind('')}
              contentContainerStyle={tailwind('items-center justify-center')}
              data={productsData}
              renderItem={({item, index}) => (
                <ProductGrid product={item} onDelete={handleDelete} />
              )}
              alwaysBounceHorizontal={false}
              keyExtractor={(item, index) => `${item._id}`}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={true}
              // ListEmptyComponent={() => {
              //   return (
              //     <View style={tailwind('flex-1 items-center justify-center')}>
              //       <Text style={tailwind('text-black text-lg text-center')}>
              //         No products found.
              //       </Text>
              //     </View>
              //   );
              // }}
              numColumns={2}
              horizontal={false}
              onEndReached={() => {
                if (productsMeta?.hasNextPage) {
                  setIsLoadingMore(true);
                  getProducts();
                }
              }}
              onEndReachedThreshold={0.5}
              ListFooterComponent={() => {
                return isLoadingMore ? (
                  <View style={tailwind('h-full pb-16')}>
                    <ActivityIndicator
                      size="large"
                      color={getColor('brand-primary')}
                    />
                  </View>
                ) : (
                  <View style={tailwind('my-6 mt-8 mb-10 items-center')}>
                    {!productsMeta?.hasNextPage ? (
                      // <Button
                      //   buttonStyle={tailwind('px-8 py-3')}
                      //   loading={isLoading}
                      //   onPress={() => navigation.navigate('AddProduct')}
                      //   titleStyle={tailwind('font-bold')}
                      //   theme="primary"
                      //   size="md"
                      //   title="Add New Product"
                      //   containerStyle={tailwind(
                      //     'w-full items-center justify-center',
                      //   )}
                      // />
                      <Text style={tailwind('text-gray-500')}>
                        {productsData?.length || 'No'} products found.
                      </Text>
                    ) : (
                      <View />
                    )}
                  </View>
                );
              }}
              // ListEmptyComponent={EmptyList}
              // {...flatListProps}
            />
          )}
        </View>
      ) : // <ProductList
      //   products={productsData.products}
      //   ProductComponent={productsData => (
      //     <Product product={productsData.products} onDelete={handleDelete} />
      //   )}
      //   flatListProps={{
      //     ListFooterComponent: ListFooter,
      //   }}
      // />
      isError ? (
        <View style={tailwind(' justify-center items-center flex-1')}>
          <Text style={tailwind('text-lg text-black text-center')}>
            There was an error while loading your added products
          </Text>
          <Button
            title="Retry"
            theme="primary"
            containerStyle={tailwind('w-1/3')}
            size="sm"
            onPress={refetch}
          />
        </View>
      ) : null}
      <Modal isVisible={isProductDeleted || isDeletingProduct}>
        <View style={tailwind('bg-white rounded-lg p-6')}>
          {isDeletingProduct && (
            <Text style={tailwind('text-lg text-black text-center font-bold')}>
              Deleting Product
            </Text>
          )}
          {isProductDeleted && (
            <>
              <Text
                style={tailwind(
                  'text-lg text-black text-center mb-4 font-bold',
                )}>
                Product Deleted
              </Text>
              <Button
                title="Close"
                theme="primary"
                containerStyle={tailwind('items-center')}
                onPress={reset}
              />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

/**
 *
 * @param {{onDelete:(id:number)=>void}} props
 * @returns
 */
function ProductGrid({product, onDelete}) {
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      style={tailwind('px-1 py-2')}
      onPress={() => navigate('ProductView', {product})}>
      <View
        style={{
          ...tailwind('bg-white rounded-xl p-6'),
        }}>
        <ProductImage
          image={product?.images ? product.images[0] : null}
          containerStyle={tailwind('w-28 h-28')}
          resizeMode={'contain'}
        />
      </View>
    </TouchableOpacity>
  );
}

function ProductList({product, onDelete}) {
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      style={tailwind('mb-4 pr-6 pl-6')}
      onPress={() => navigate('ProductView', {product})}>
      <View
        style={{
          ...tailwind('bg-white p-3 pb-4 flex-row items-center rounded-xl'),
        }}>
        <ProductImage
          image={product?.images ? product.images[0] : null}
          containerStyle={tailwind('w-20 h-28')}
          resizeMode={'contain'}
        />

        <View style={tailwind('flex-1 ml-3')}>
          <View style={tailwind('flex-1 flex-row items-center')}>
            <Text style={tailwind('')}>Item: </Text>
            <Text style={tailwind('font-bold')}>{product.name}</Text>
          </View>

          <View style={tailwind('flex-1 flex-row items-center')}>
            <Text style={tailwind('')}>Buyer: </Text>
            <Text style={tailwind('font-bold text-black')}>User</Text>
          </View>

          <View style={tailwind('flex-1 flex-row items-center')}>
            <Text style={tailwind('')}>Price: </Text>
            <Text style={tailwind('font-bold text-black')}>
              ${product.price}
            </Text>
          </View>

          <View style={tailwind('flex-1 flex-row items-center')}>
            <Text style={tailwind('')}>Date Sold:</Text>
            {/* <Text style={tailwind('text-base font-bold text-black')}></Text> */}
          </View>

          <View style={tailwind('flex-1 flex-row items-center')}>
            <Text style={tailwind('')}>Date Delivered:</Text>
            {/* <Text style={tailwind('text-base font-bold text-black')}></Text> */}
          </View>

          {/*<View style={tailwind('ml-3 justify-between')}>
            <Icon
              onPress={() =>
                navigate('EditProduct', {
                  product,
                })
              }
              type="ionicon"
              name="create-outline"
              size={32}
              color={getColor('black')}
            />
            <DeletProduct onConfirm={() => onDelete(product._id)} />
          </View>*/}
        </View>
      </View>
    </TouchableOpacity>
  );
}
function ListFooter() {
  const {navigate} = useNavigation();
  return (
    <View style={tailwind('py-4 justify-center items-center')}>
      <Button
        title="Add New"
        theme="primary"
        size="md"
        onPress={() => navigate('AddProduct')}
      />
    </View>
  );
}

function DeletProduct({onConfirm}) {
  const [isOpen, setIsOpen] = useState(false);
  function handlePress() {
    setIsOpen(false);
    onConfirm();
  }
  return (
    <View style={tailwind('mt-2')}>
      <Icon
        onPress={() => setIsOpen(true)}
        type="ionicon"
        name="trash-outline"
        size={32}
        color={getColor('black')}
      />
      <Modal
        isVisible={isOpen}
        onBackButtonPress={() => setIsOpen(false)}
        // onBackButtonPress={() => {
        //   console.log(
        //     'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        //   );
        // }}
        onBackdropPress={() => setIsOpen(false)}>
        <View style={tailwind('bg-white rounded-2xl p-4')}>
          <Icon
            onPress={() => setIsOpen(false)}
            type="ionicon"
            name="close-outline"
            containerStyle={tailwind('absolute right-0 top-0 p-2')}
            size={32}
          />
          <Text
            style={tailwind(
              'text-lg text-black w-2/3 font-bold mb-4 text-center self-center',
            )}>
            Are you sure you want to delete this product?
          </Text>
          <Button
            title="Confirm"
            size="md"
            theme="primary"
            onPress={handlePress}
          />
          <Button
            title="Cancel"
            size="md"
            theme="primary"
            containerStyle={tailwind('mt-4')}
          />
        </View>
      </Modal>
    </View>
  );
}
