/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Modal,
  // Image,
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar, Icon, Image, Tooltip} from 'react-native-elements';
import {AuthContext} from '@/common/contexts/AuthContext';
import {tailwind, getColor} from '@/common/tailwind';
import Button from '@/components/Button';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ToastUpcomingFeature from '@/common/helpers/ToastUpcomingFeature';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ShoppingAdd from '@/common/icons/ShoppingAdd';
import API from '@/common/services/API';
import {BlurView} from '@react-native-community/blur';
import ProductImage from '@/components/Products/ProductImage';
import GoLiveIcon from '@/assets/live-stream-icon.png';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// import GoLiveIcon from '@/common/icons/GoLiveIcon';
import BackgroundImage from '@/assets/my-store-bg.png';

import Toast from 'react-native-toast-message';
import StackHeader from '@/components/StackHeader';
import {useProfile} from '@/common/services/hooks';
import {data} from 'autoprefixer';
const {width, height} = Dimensions.get('screen');
const PRODUCT = {
  image: require('@/assets/product-placeholder.png'),
};
const PRODUCTS = Array.from({length: 13}).map(() => PRODUCT);
/**
 *
 * @param {{navigation:StackNavigationProp<any>,route:RouteProp<any>}} props
 */
export default function MyStore({navigation, route}) {
  const {isSignedIn, accessToken} = useContext(AuthContext);
  const [productsData, setProductsData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [coverPic, setCoverPic] = useState();

  const [seller3DotModal, setSeller3DotModal] = useState(false);

  // const {data: user} = useProfile();

  useEffect(() => {
    const isChatShow = route?.params?.store ? true : false;
    navigation.setOptions({
      header: props => {
        return (
          <StackHeader
            props={{
              ...props,
              title: route?.params?.store
                ? `${route?.params?.store?.full_name?.split(' ')[0]}'s STORE`
                : `My STORE`,
              hasGBlog: true,
              isChat: isChatShow,
              bellIcon: !isChatShow,
            }}
          />
        );
      },
    });
    // getProducts();

    if (route?.params?.store) {
      // setIsLoading(false)
      setUserData(route.params.store);
      setCoverPic(route?.params?.store?.cover_pic);
    } else {
      // if (isSignedIn) {
      //   getUser();
      // }
    }
  }, [isSignedIn]);

  useFocusEffect(
    React.useCallback(() => {
      if (route?.params?.store) {
        getUserProducts(route.params.store._id);
        // setIsLoading(false);
      } else {
        if (isSignedIn) {
          getUser();
          getProducts();
        }
      }
    }, []),
  );

  const getUser = () => {
    console.log('get user called -----');
    API(accessToken)
      .get('user')
      .then(response => {
        // console.log('==Success', response);
        if (response.status === 200) {
          setUserData(response.data.payload.user);
          setCoverPic(response.data?.payload?.user?.cover_pic || null);
          setDescription(response.data.payload.user?.store_description || null);
        }
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        Alert.alert('Error', 'Product retrival error. Please contact Admin.');
        console.log('0000', JSON.parse(JSON.stringify(error)));
      });
  };

  const getUserProducts = id => {
    setIsLoading(true);
    API()
      .get(`product/user/${id}?page=1&size=20`)
      .then(response => {
        // console.log('==Success', response);
        if (response.status === 200) {
          setProductsData(response?.data?.payload);
        }
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(
          'getUserProducts ------------>  ',
          JSON.parse(JSON.stringify(error)),
        );
      });
  };

  const getProducts = () => {
    API(accessToken)
      .get('product/user?page=1&size=20')
      .then(response => {
        // console.log('==Success', response);
        if (response.status === 200) {
          setProductsData(response?.data?.payload);
        }
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);

        console.log('0000', JSON.parse(JSON.stringify(error)));
      });
  };

  const renderItem = ({item, index}) => (
    <Product item={item} style={tailwind(`${index === 0 ? '' : 'ml-2'}`)} />
  );

  function EmptyList() {
    return productsData?.products?.length === 0 ? (
      <View style={tailwind('justify-center items-center')}>
        <Text
          style={[
            tailwind('text-white text-lg text-center'),
            {
              textShadowColor: 'black',
              textShadowOffset: {width: 1, height: 1},
              textShadowRadius: 1,
              textAlign: 'center',
            },
          ]}>
          You have no products listed here.
        </Text>
      </View>
    ) : null;
  }

  function LoadingComponent() {
    return (
      <View style={tailwind('items-center justify-center flex-1')}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  // function ProductsFooter() {
  //   const navigation = useNavigation();

  //   if (
  //     productsData?.newProducts?.products.length &&
  //     productsData?.newProducts?.products.length > 3
  //   ) {
  //     return (
  //       <TouchableOpacity
  //         onPress={() =>
  //           navigation.navigate('My Products', {
  //             store: productsData?.route?.params?.store,
  //           })
  //         }
  //         style={tailwind('ml-1 p-4 items-center justify-center flex-1 mr-4')}>
  //         <Icon
  //           type="ionicon"
  //           name="arrow-forward-circle-outline"
  //           color="white"
  //           size={68}
  //         />
  //         <View
  //           style={{
  //             ...tailwind(''),
  //             shadowColor: '#6c6c6c',
  //             shadowOffset: {
  //               width: 0,
  //               height: 2,
  //             },
  //             shadowOpacity: 0.25,
  //             shadowRadius: 3.84,

  //             elevation: 50,
  //           }}>
  //           <Text
  //             style={[
  //               tailwind('text-base font-bold text-white'),
  //               Styles.textShadow,
  //             ]}>
  //             View All
  //           </Text>
  //         </View>
  //       </TouchableOpacity>
  //     );
  //   } else {
  //     return (
  //       <View
  //         onPress={() =>
  //           navigation.navigate('My Products', {store: route?.params?.store})
  //         }
  //         style={tailwind('ml-1 p-4 items-center justify-center flex-1')}>
  //         <View
  //           style={{
  //             ...tailwind(''),
  //             shadowColor: '#000000',
  //             shadowOffset: {
  //               width: 0,
  //               height: 2,
  //             },
  //             shadowOpacity: 0.25,
  //             shadowRadius: 3.84,

  //             elevation: 50,
  //           }}></View>
  //       </View>
  //     );
  //   }
  // }
  if (!isSignedIn && !route?.params?.store) {
    // useEffect(() => {
    navigation.setOptions({
      headerLeft: HeaderLeft,
      headerStyle: {
        backgroundColor: 'black',
      },
      style: {
        paddingBottom: 50,
      },
    });
    // getProducts();
    // }, [navigation]);

    return (
      <View style={tailwind('items-center justify-center flex-1 p-6')}>
        <View>
          <Text style={tailwind('text-lg text-black text-center pb-2')}>
            Create an account now to start using geronimo
          </Text>
          <Button
            onPress={() => {
              navigation.navigate('SignIn', {from: 'mystore'});
            }}
            title="Sign in"
            theme="primary"
            size="sm"
            containerStyle={tailwind('flex-shrink-0')}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={tailwind('flex-1 bg-black')}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          // style={tailwind('flex-1')}
          // source={BackgroundImage}
          source={
            coverPic?.absolute_path
              ? {uri: coverPic?.absolute_path}
              : BackgroundImage
          }
          style={{
            // flex: 1,
            height: 160,
            width: '100%',
          }}
          resizeMode="cover"
        />

        {/* <Seller3DotModal show={seller3DotModal} toggle={setSeller3DotModal} /> */}
        <View style={tailwind('px-4')}>
          {route?.params?.store && (
            <View style={tailwind('flex-row top-3 justify-between')}>
              <Text style={tailwind('text-xl text-white font-bold uppercase')}>
                {route?.params?.store?.full_name?.split(' ')[0] + ' '}

                <Icon
                  type="octicons"
                  name="verified"
                  size={20}
                  color={getColor('white')}
                />
              </Text>
              {/* <Image
                source={require('../../../components/images/figmaicon.png')}
                style={[tailwind('w-6 h-6')]}
              /> */}
              <View style={tailwind('flex-row')}>
                <Button
                  style={tailwind('mr-3')}
                  onPress={() => ToastUpcomingFeature({position: 'top'})}
                  title="Follow"
                  titleStyle={tailwind('text-sm font-medium')}
                  type="outline"
                  size="sm"
                  theme="black"
                  icon={
                    <Icon
                      type="ionicon"
                      name="add"
                      size={16}
                      color={getColor('white')}
                    />
                  }
                  containerStyle={tailwind('top-2')}
                  buttonStyle={tailwind(
                    ' py-0\\.5 rounded-full bg-transparent',
                  )}
                />
                <TouchableOpacity
                  style={tailwind(
                    'border-2 w-8 h-8 top-2 items-center justify-center ',
                  )}
                  onPress={() => {
                    // navigation.navigate('StoreNavigation', {
                    //   screen: 'StoreSettings',
                    // });
                  }}>
                  <View
                    style={tailwind(
                      'border-2 w-8 h-8 rounded-full items-center justify-center border-white',
                    )}>
                    <SimpleLineIcons
                      name={'options'}
                      size={15}
                      color={'white'}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {route?.params?.store && (
            <Text style={tailwind('text-gray-400 py-1 text-sm')}>
              by @{userData?.username}
            </Text>
          )}

          <View style={tailwind('flex-row py-2 pt-4 justify-between')}>
            <View style={Styles.leftRatings}>
              <TouchableOpacity
                onPress={() => ToastUpcomingFeature({position: 'top'})}>
                <Text
                  style={[
                    Styles.toptxt,
                    {
                      textShadowColor: 'black',
                      textShadowOffset: {width: 1, height: 1},
                      textShadowRadius: 2,
                    },
                  ]}>
                  {userData?.follower_count || 173}
                </Text>
                <Text
                  style={[
                    Styles.toptxt2,
                    {
                      textShadowColor: 'black',
                      textShadowOffset: {width: 1, height: 1},
                      textShadowRadius: 2,
                    },
                  ]}>
                  Followers
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => ToastUpcomingFeature({position: 'top'})}
                style={[tailwind('ml-4')]}>
                <View>
                  <Text
                    style={[
                      Styles.toptxt,
                      {
                        textShadowColor: 'black',
                        textShadowOffset: {width: 1, height: 1},
                        textShadowRadius: 2,
                      },
                    ]}>
                    {userData?.following_count || 170}
                  </Text>
                  <Text
                    style={[
                      Styles.toptxt2,
                      {
                        textShadowColor: 'black',
                        textShadowOffset: {width: 1, height: 1},
                        textShadowRadius: 2,
                      },
                    ]}>
                    Following
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {!route?.params?.store && (
              <TouchableOpacity
                style={tailwind('border-2 w-8 h-8 ')}
                onPress={() => {
                  navigation.navigate('StoreNavigation', {
                    screen: 'StoreSettings',
                  });
                }}>
                <View
                  style={tailwind(
                    'border-2 w-8 h-8 rounded-full items-center justify-center border-white',
                  )}>
                  <SimpleLineIcons name={'options'} size={15} color={'white'} />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View>
            {route?.params?.store ? (
              <View style={[tailwind('py-2 justify-center')]}>
                <View
                  style={[
                    tailwind(''),
                    {backgroundColor: 'rgba(0, 0, 0, 0.4)'},
                  ]}>
                  <Text
                    numberOfLines={4}
                    style={[
                      tailwind(
                        `font-medium text-sm ${
                          route?.params?.store?.store_description
                            ? 'text-white'
                            : 'text-gray-400'
                        } tracking-tighter`,
                      ),
                      {
                        textShadowColor: 'black',
                        textShadowOffset: {width: 0, height: 1},
                        textShadowRadius: 1,
                        textAlign: 'center',
                      },
                    ]}>
                    {route?.params?.store?.store_description
                      ? route?.params?.store?.store_description
                      : ' No store description provided'}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={[tailwind('py-3')]}>
                <View
                  style={[
                    tailwind(''),
                    {backgroundColor: 'rgba(0, 0, 0, 0.4)'},
                  ]}>
                  <Text
                    numberOfLines={5}
                    style={[
                      tailwind('font-medium text-lg text-white'),
                      {
                        textShadowColor: 'black',
                        textShadowOffset: {width: 0, height: 1},
                        textShadowRadius: 1,
                        justifyContent: 'flex-start',
                        // textAlign: 'center',
                      },
                    ]}>
                    {description
                      ? description
                      : ' No store description provided '}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View style={tailwind('flex-row justify-between items-center mb-4 ')}>
            <Text style={tailwind('text-white font-extrabold text-lg py-2')}>
              {route?.params?.store ? 'HOT PRODUCTS' : 'MY PRODUCTS'}
            </Text>
            {!route?.params?.store && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('My Products', {
                    store: productsData?.route?.params?.store,
                  })
                }
                style={tailwind(
                  'flex-row border-white border-2 py-1 px-4 rounded-xl ',
                )}>
                <Text style={tailwind('text-white text-base')}> View All </Text>
              </TouchableOpacity>
            )}
          </View>

          {isLoading ? (
            <LoadingComponent />
          ) : (
            <FlatList
              // bottom={!route?.params?.store ? 35 : 0}
              contentContainerStyle={tailwind('pl-8')}
              horizontal
              style={tailwind('-ml-6 -mr-6')}
              data={productsData?.newProducts?.products}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item._id}`}
              showsHorizontalScrollIndicator={false}
              // ListFooterComponent={ProductsFooter}
              ListEmptyComponent={EmptyList}
            />
          )}

          {!route?.params?.store ? (
            <View style={tailwind('w-full items-center mt-2')}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddProduct')}
                style={[
                  tailwind(
                    'flex-row border-white justify-center w-7/12 px-3 border-2 py-2 mt-4 rounded-2xl',
                  ),
                  // {marginHorizontal: 120},
                ]}>
                <Text style={tailwind('text-white text-base')}>
                  Add New Product
                </Text>
                <ShoppingAdd style={tailwind('w-6 h-6 text-white ml-1')} />
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}
          {route?.params?.store && (
            <Text
              style={tailwind('text-white font-extrabold text-lg top-3 py-4')}>
              {' '}
              NEW RELEASES{' '}
            </Text>
          )}
          {route?.params?.store && (
            <View>
              {isLoading ? (
                <LoadingComponent />
              ) : (
                <FlatList
                  contentContainerStyle={tailwind('pl-8')}
                  horizontal
                  style={tailwind('-ml-6 -mr-6')}
                  data={productsData?.hotProducts?.products}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => `${item._id}`}
                  showsHorizontalScrollIndicator={false}
                  // ListFooterComponent={ProductsFooter}
                  ListEmptyComponent={EmptyList}
                />
              )}
            </View>
          )}
          {route?.params?.store ? (
            <View style={tailwind('w-full items-center')}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('My Products', {
                    store: route?.params?.store,
                  })
                }
                style={[
                  tailwind(
                    'flex-row w-1/2 border-white justify-center border-2 my-8 py-1 rounded-lg ',
                  ),
                  // {marginHorizontal: 120},
                ]}>
                <Text style={tailwind('text-white text-lg font-bold')}>
                  View All Products
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}
        </View>
        {!route?.params?.store && (
          <View
            style={[
              tailwind('py-5 my-4 mb-10 inset-x-0 w-full'),
              {
                // backgroundColor: '#4F4847',
                backgroundColor: 'rgba(120,120,120, 1)',
              },
            ]}>
            <View style={[tailwind('justify-center items-center')]}>
              <Text
                style={[
                  tailwind('px-4 text-center text-white text-lg font-bold'),
                  {letterSpacing: 0.5},
                  Styles.textShadow,
                ]}>
                {
                  'Would you like to SELL LIVE or \n STREAM LIVE  to SELL your product?'
                }
              </Text>
            </View>
            <View style={[tailwind('items-center py-1')]}>
              <TouchableOpacity
                style={tailwind(
                  ' items-center flex-row rounded-2xl py-4 top-1 px-3 bg-white',
                )}
                onPress={() =>
                  navigation.navigate('LiveStream', {screen: 'Go Live'})
                }>
                <Icon type="feather" name="video" color="gray" size={25} />
                <Text
                  style={tailwind(
                    'text-med-xl text-black font-extrabold normal-case pl-2',
                  )}>
                  GO GERONIMO
                </Text>

                <Tooltip
                  // closeOnlyOnBackdropPress={true}
                  skipAndroidStatusBar={true}
                  popover={
                    <Text style={tailwind('text-white text-sm text-center')}>
                      {
                        'Go Geronimo lets you Sell your products Live \n to nearby Buyers using the Sell Live feature \n AND/OR \n You can Sell your products by adding Live Streaming \n Click on it and try it out!'
                      }
                    </Text>
                  }
                  height={150}
                  width={wp(95)}
                  overlayColor={'#00000099'}
                  // ColorValue={'#181211'}
                  backgroundColor={getColor('brand-primary')}>
                  <Icon
                    style={tailwind('pl-2')}
                    type="feather"
                    name="alert-circle"
                    color="gray"
                    size={22}
                  />
                </Tooltip>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

/**
 *
 * @param {{item:Object,style:StyleProp<ViewStyle>}} props
 */
function Product({item, style}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductView', {product: item})}>
      <View
        style={{
          ...tailwind('rounded-2xl p-2 bg-white w-28 h-28'),
          ...style,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 10,
        }}>
        <ProductImage
          image={item.images ? item.images[0] : null}
          resizeMode={'contain'}
          containerStyle={tailwind('w-full h-full')}
        />
      </View>
    </TouchableOpacity>
  );
}
function Seller3DotModal({show, toggle}) {
  return (
    <Modal
      visible={show}
      transparent={true}
      onBackButtonPress={() => toggle(false)}
      onSwipeComplete={() => toggle(false)}
      // animationIn="slideInUp"
      // animationOut="slideOutDown"
      swipeDirection={'down'}>
      <View
        style={[
          tailwind(
            'rounded-2xl p-6 flex-1 items-center justify-end w-full h-full',
          ),
          {backgroundColor: 'rgba(0,0,0,0.7)'},
        ]}>
        <View style={tailwind('bg-white w-full rounded-t-3xl')}>
          <Text style={tailwind('text-center text-gray-400 text-xl pt-5 pb-2')}>
            User Options
          </Text>
        </View>

        <View style={[tailwind('bg-gray-200 w-full'), {height: 1}]} />
        <View style={tailwind('bg-white w-full')}>
          <TouchableOpacity
            onPress={() => ToastUpcomingFeature({position: 'top'})}>
            <Text
              style={tailwind(
                'text-center text-gray-900 font-bold text-xl p-4',
              )}>
              Report User
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[tailwind('bg-gray-200 w-full'), {height: 1}]} />
        <View style={tailwind('bg-white w-full rounded-b-3xl')}>
          <TouchableOpacity
            onPress={() => ToastUpcomingFeature({position: 'top'})}>
            <Text
              style={tailwind(
                'text-center text-gray-500 font-bold text-brand-primary text-xl p-4',
              )}>
              Block This User
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tailwind('bg-white w-full mt-6 rounded-full')}>
          <TouchableOpacity onPress={() => toggle(false)}>
            <Text
              style={tailwind(
                'text-center text-gray-900 font-bold text-xl p-4',
              )}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const Styles = StyleSheet.create({
  topRatings: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    opacity: 20,
    height: 70,
  },
  bottomView: {
    backgroundColor: 'black',
    marginTop: hp(18),
    opacity: 0.5,
    padding: 20,
  },
  bottomTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  rightView: {},
  leftRatings: {
    flexDirection: 'row',
  },
  shadow: {
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  textShadow: {
    textShadowColor: 'rgb(80,80,80)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  toptxt: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: wp(1),
  },
  toptxt2: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
    marginHorizontal: wp(1),
  },
  modelBtn: {
    // height: '10%',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    // backgroundColor: 'red',
    // marginLeft: -20,
  },
  lastTxt: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  img: {
    height: 130,
    width: 100,
    borderRadius: 20,
    margin: 10,
    backgroundColor: 'white',
  },
});
