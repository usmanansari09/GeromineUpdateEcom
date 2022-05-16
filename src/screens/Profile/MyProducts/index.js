/* eslint-disable react-native/no-inline-styles */
import {getColor, tailwind} from '@/common/tailwind';
import React, {
  useContext,
  useEffect,
  useState,
  useLayoutEffect,
  useReducer,
} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  RouteProp,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Modal from 'react-native-modal';
import useProducts from '@/common/services/hooks/useProducts';
import Skeleton from '@/components/Skeleton';
import {useMutation, useQueryClient} from 'react-query';
import API from '@/common/services/API';
import {AuthContext} from '@/common/contexts/AuthContext';
import ProductList from '@/components/Products/ProductList';
import ProductImage from '@/components/Products/ProductImage';
import {Input, Button, Text} from '@/components/index';
import StackHeader from '@/components/StackHeader';

const useDeleteProduct = () => {
  const {accessToken} = useContext(AuthContext);
  return useMutation(id =>
    API(accessToken)
      .delete(`product/${id}/remove`)
      .then(res => res.data),
  );
};

export default function MyProducts({navigation, route}) {
  const {isSignedIn, accessToken} = useContext(AuthContext);
  const [productsData, setProductsData] = useState([]);
  const [arr, setArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [productsMeta, setProductsMeta] = useState({});

  const [edit, toggleEdit] = useReducer(s => !s, false);

  const [page, setPage] = useState(1);
  const [delId, setDelId] = useState();

  const [del, triggerDel] = useReducer(s => !s, false);

  // const {products, isSuccess, refetch} = useProducts();

  const queryClient = useQueryClient();
  const {
    mutate,
    isLoading: isDeletingProduct,
    isSuccess: isProductDeleted,
    reset,
  } = useDeleteProduct();

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setPage(1);
  //     getMyProducts();
  //   }, []),
  // );

  useFocusEffect(
    React.useCallback(() => {
      if (route?.params?.store) {
        console.log('store is', route?.params?.store?.username);
        setPage(1);
        getUserProducts(route.params.store._id);
        setIsLoading(false);
      } else {
        if (isSignedIn) {
          setPage(1);
          getMyProducts();
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  const triggerDelete = (id, name) => {
    if (id) {
      setDelId({id, name});
      triggerDel();
    }
  };

  const handleDelete = id => {
    API(accessToken)
      .delete('product/'.concat(id))
      .then(response => {
        setIsLoading(false);
        console.log('==del', response);
        if (response.status === 200) {
          triggerDel();
          const filteredProducts = productsData.filter(elem => elem._id !== id);
          setProductsData(filteredProducts);
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

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              iconName: 'arrow-back-outline',
              title: route?.params?.store
                ? `${route.params.store.full_name}`
                : 'My Store',
              hasSearch: true,
            }}
          />
        );
      },
    });
  }, [navigation]);

  const getUserProducts = id => {
    API()
      .get(`product/user/${id}?page=${page}`)
      .then(response => {
        setIsLoadingMore(false);
        setIsLoading(false);
        if (response.status === 200) {
          let {products, ...meta} = response?.data?.payload?.newProducts;
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

  const getMyProducts = () => {
    // setIsLoading(true);
    API(accessToken)
      .get(`product?page=${page}&size=20`)
      .then(response => {
        setIsLoadingMore(false);
        setIsLoading(false);
        console.log(
          'get products payload-----------> ',
          response?.data?.payload?.products?.length,
        );
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

  function DeleteModal(id) {
    return (
      <Modal isVisible={del}>
        <View
          style={tailwind(
            'bg-white rounded-3xl p-6 m-4 items-center justify-center',
          )}>
          <Text
            style={tailwind('text-black text-center text-lg mb-4 font-bold')}>
            {`Are you sure you want to delete ${delId?.name}?`}
          </Text>
          <Button
            onPress={() => {
              handleDelete(delId?.id);
            }}
            title={`Yes, I'm sure`}
            theme="primary"
            containerStyle={tailwind('w-8/12 mt-4')}
          />

          <Button
            onPress={triggerDel}
            title="Cancel"
            theme="black"
            containerStyle={tailwind('mt-3 w-8/12')}
          />
        </View>
      </Modal>
    );
  }
  return (
    <View style={tailwind('flex-1 bg-black')}>
      <DeleteModal />
      <View style={tailwind('flex-row justify-between')}>
        <Text style={tailwind('text-white font-extrabold px-2 text-lg py-1')}>
          {' '}
          ALL PRODUCTS{' '}
        </Text>
        {!route?.params?.store && (
          <TouchableOpacity onPress={toggleEdit}>
            {!edit ? (
              <View style={tailwind('border border-white rounded-xl mr-4')}>
                <Text style={tailwind('text-white px-2 py-1')}>
                  {' '}
                  Edit My Products
                </Text>
              </View>
            ) : (
              <View
                style={tailwind(
                  'border border-white rounded-xl bg-white mr-4',
                )}>
                <Text style={tailwind('text-black font-bold px-4 py-1')}>
                  {' '}
                  Done
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
      {isLoading ? (
        // <Skeleton>
        //   <View style={tailwind('px-4 py-2')}>
        //     {Array.from({ length: 6 }, (_, index) => (
        //       <View
        //         key={index}
        //         style={[
        //           tailwind('h-20 rounded-xl'),
        //           tailwind(index > 0 ? 'mt-4' : ''),
        //         ]}
        //       />
        //     ))}
        //   </View>
        // </Skeleton>
        <View style={tailwind('items-center justify-center  flex-1')}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : !isLoading ? (
        <FlatList
          contentContainerStyle={tailwind('items-center ')}
          data={productsData}
          renderItem={({item, index}) => (
            <Product
              product={item}
              onDelete={triggerDelete}
              store={route?.params?.store}
              edit={edit}
            />
          )}
          numColumns={3}
          alwaysBounceHorizontal={false}
          keyExtractor={(item, index) => `${item._id}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (productsMeta?.hasNextPage) {
              if (route?.params?.store) {
                console.log('store is', route?.params?.store?.username);
                getUserProducts(route.params.store._id);
                setIsLoading(false);
              } else {
                getMyProducts();
              }

              setIsLoadingMore(true);
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
                {!route?.params?.store && (
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
                )}
                <View />
              </View>
            );
          }}
          // ListEmptyComponent={EmptyList}
          // {...flatListProps}
        />
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
            onPress={() => {}}
          />
        </View>
      ) : null}
      <Modal isVisible={isProductDeleted || isDeletingProduct}>
        <View style={tailwind('bg-white rounded-lg p-0')}>
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

function Product({product, onDelete, store, edit}) {
  // console.log('09090===>', product);
  const {navigate} = useNavigation();
  return (
    <View style={[tailwind('mt-2'), {padding: 6}]}>
      <TouchableOpacity
        onPress={() => navigate('ProductView', {product})}
        style={tailwind('bg-white p-3 rounded-2xl')}>
        {/* <TouchableOpacity onPress={() => navigate('ProductView', {product})}> */}
        <View>
          {edit && (
            <View style={tailwind('z-50 absolute -top-6 right-2')}>
              <TouchableOpacity
                onPress={() => onDelete(product?._id, product?.name)}>
                <Icon
                  style={tailwind('')}
                  containerStyle={tailwind('absolute z-50')}
                  name="circle-with-minus"
                  size={26}
                  type="entypo"
                  color={'red'}
                />
                <Icon
                  style={tailwind('')}
                  containerStyle={tailwind('absolute z-0')}
                  name="circle"
                  size={26}
                  type="fontawesome"
                  color={'white'}
                />
              </TouchableOpacity>
            </View>
          )}
          <ProductImage
            image={product?.images ? product.images[0] : null}
            containerStyle={{width: 80, height: 80}}
            resizeMode={'contain'}
          />
        </View>
        {/* </TouchableOpacity> */}
        {/* <View style={tailwind('flex-row flex-1 ml-3')}> */}
        {/* <View style={tailwind('flex-1')}>
            <Text style={tailwind('text-base font-bold text-black')}>
              {product.name}
            </Text>
            <Text numberOfLines={3}>{product.description}</Text>
          </View> */}

        {/* {!store ? (
            <View style={tailwind('ml-3 justify-between')}>
              <Icon
                onPress={() =>
                  navigate('EditProduct', {
                    productData: product,
                  })
                }
                type="ionicon"
                name="create-outline"
                size={32}
                color={getColor('black')}
              />
              <DeletProduct onConfirm={() => onDelete(product._id)} />
            </View>
          ) : null}
        </View> */}
      </TouchableOpacity>
    </View>
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
            onPress={() => setIsOpen(false)}
          />
        </View>
      </Modal>
    </View>
  );
}
