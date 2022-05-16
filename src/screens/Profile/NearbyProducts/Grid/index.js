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
import Filter from '@/screens/Profile/ChippedProducts/components/Filter';

const useDeleteProduct = () => {
  const {accessToken} = useContext(AuthContext);
  return useMutation(id =>
    API(accessToken)
      .delete(`product/${id}/remove`)
      .then(res => res.data),
  );
};
/**
 *
 * @param {{onConfirm:(id:number)=>void}} props
 * @returns
 */

/**
 *
 * @param {{route:RouteProp<any,any>,navigation:StackNavigationProp<any>}} props
 * @returns
 */
export default function NearbyProductsGrid({route, navigation}) {
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
  const [distance, setDistance] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [condition, setCondition] = useState('');
  const [color, setColor] = useState('');

  const queryClient = useQueryClient();
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

    // setProductsData([]);
    // if (isLoading) return;

    // const updatedProducts =

    // console.log('page---', productsData?.products),
    // const abc = productsData?.products.filter(val => val.id !== id)
    // console.log('page---', productsData?.products),
    // productsData?.products?.map(page => {
    //   console.log('page---', page);
    //   if (page._id !== id) {
    //     setArr([...arr, page]);
    //   }
    // setProductsData(arr);

    // [
    //   ...productsData,
    // productsData?.products?.filter(val => {
    //   if (val.id !== id) {
    //     console.log(id);
    //   }
    // });
    // ];
    // });
  };
  // console.log('good', productsData);
  // setProductsData(productsData);
  // mutate(id, {
  //   onError: err => {
  //     console.log(`err?.response.data`, err?.response?.data);
  //   },
  //   onSuccess: () => {
  //     queryClient.setQueryData(['products'], data => {
  //       return {
  //         pages: updatedProducts,
  //         pageParams: data.pageParams,
  //       };
  //     });
  //   },
  // });
  function HeaderRight({onNotificationPressed}) {
    return (
      <View style={[tailwind('flex-row'), {right: 15}]}>
        <TouchableOpacity onPress={() => setOpenFilterModal(true)}>
          <View
            style={{right: 6}}
            // style={tailwind('mr-12')}
          >
            <Icon
              name="view-list"
              color="white"
              type="MaterialCommunityIcons"
              size={28}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View
          // style={tailwind('mr-12')}
          // style={{ right: 15 }}
          >
            <Icon
              name="md-search-outline"
              color="white"
              type="ionicon"
              size={26}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  const HeaderLeft = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'center',
          left: 15,
          width: 250,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            type="ionicon"
            name="arrow-back"
            color="white"
            size={32}
            // onPress={() => /* navigation.canGoBack() &&  */navigation.goBack()}
          />
        </TouchableOpacity>
        <Text
          style={tailwind('uppercase text-white mt-1 ml-1 font-bold text-xl')}>
          Nearby Products
        </Text>
      </View>
    );
  };
  useEffect(() => {
    // if (Platform.OS === 'android') {
    //   requestPermissionLocation().then(value => {
    //     if (value) {
    //       Geolocation.getCurrentPosition(
    //         position => {
    //           console.log('location pos:', position);
    //         },
    //         error => {
    //           // See error code charts below.
    //           console.log('location error: ', error.code, error.message);
    //         },
    //         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    //       );
    //     }
    //     console.log('Location requested!', value);
    //   });
    // }
    navigation.setOptions({
      headerLeft: HeaderLeft,
      headerRight: HeaderRight,
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'black',
        // paddingHorizontal: 15,
        // width: '100%',
      },
    });
    getProducts();
  }, []);

  const getProducts = () => {
    API()
      .post(`product/nearby?page=${page}`)
      .then(response => {
        setIsLoadingMore(false);
        setIsLoading(false);
        if (response.status === 200) {
          let {products, ...meta} = response?.data?.payload;
          // console.log(`metaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`, meta)
          setProductsData([...productsData, ...products]);
          setProductsMeta(meta);
          setPage(page + 1);
        }
      })
      .catch(error => {
        // setIsError(true);
        console.log(
          'Myproducts API Error: ----------> ',
          JSON.stringify(error),
        );
      });
  };
  /*  */
  /* Filter Modal Functions */
  /*  */
  filterModalClose = () => setOpenFilterModal(false);

  filterModalOpen = () => setOpenFilterModal(true);

  changeDistance = value => {
    setDistance(value);
    console.log('change distance value', value);
  };

  changeCategory = value => {
    navigation.navigate('NearbyProducts');
    filterModalOpen();
    setCategory(value);
    console.log('change category value', value);
  };

  changePrice = value => {
    setPrice(value);
    console.log('change Price value', value);
  };

  changeBrand = value => {
    setBrand(value);
    console.log('change Brand value', value);
  };

  changeCondition = value => {
    setCondition(value);
    console.log('change Condition value', value);
  };

  changeColor = value => {
    setColor(value);
    console.log('change Color value', value);
  };

  /*  */

  /* Location Request */
  const requestPermissionLocation = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      if (
        granted['android.permission.ACCESS_BACKGROUND_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED ||
        granted['android.permission.ACCESS_FINE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED ||
        granted['android.permission.ACCESS_COARSE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        // console.log("Location permission granted.");
        return true;
      } else {
        // console.log("Location permission denied. reason:", granted);
        return false;
      }
    } catch (err) {
      console.warn('nearby Loc error: ', err);
    }
  };

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
        <View>
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
          />
          <FlatList
            style={tailwind('pt-4')}
            data={productsData}
            renderItem={({item, index}) => (
              <Product product={item} onDelete={handleDelete} />
            )}
            alwaysBounceHorizontal={false}
            keyExtractor={(item, index) => `${item._id}`}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
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
                  {/*{!productsMeta?.hasNextPage ? (
                  <Button
                    buttonStyle={tailwind('px-8 py-3')}
                    loading={isLoading}
                    onPress={() => navigation.navigate('AddProduct')}
                    titleStyle={tailwind('font-bold')}
                    theme="primary"
                    size="md"
                    title="Add New Product"
                    containerStyle={tailwind(
                      'w-full items-center justify-center',
                    )}
                  />
                ) : (
                  <View />
                )}*/}
                </View>
              );
            }}
            // ListEmptyComponent={EmptyList}
            // {...flatListProps}
          />
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
function Product({product, onDelete}) {
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
        onBackButtonPress={() => {
          console.log(
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          );
        }}
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
