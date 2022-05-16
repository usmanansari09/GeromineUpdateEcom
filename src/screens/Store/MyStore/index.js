/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from 'react';
import {
  View,
  Alert,
  Text,
  Image,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Platform,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  RouteProp,
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {getColor, tailwind} from '@/common/tailwind';
import Button from '@/components/Button';
import {Avatar, Icon} from 'react-native-elements';
import ShoppingAdd from '@/common/icons/ShoppingAdd';
import GoLiveIcon from '@/common/icons/GoLiveIcon';

import {AuthContext} from '@/common/contexts/AuthContext';
import API from '@/common/services/API';
import Skeleton from '@/components/Skeleton';
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import StorProduct from '@/components/Product';
import StorModal from '@/components/Modal/Modal';
import CustomAlert from '@/components/Modal/CustomAlert';
import {TextInput} from 'react-native-gesture-handler';

import Modal from 'react-native-modal';
var ImagePicker = require('react-native-image-picker');
// const useProducts = () => {
//   const {userId, accessToken} = useContext(AuthContext);
//   const isFocused = useIsFocused();
//   return useInfiniteQuery(
//     ['user', userId, 'products'],
//     async ({pageParam = 1}) => {
//       return API(accessToken)
//         .get(`profile/${userId}/products?page=${pageParam}`)
//         .then(res => res.data)
//         .catch(err => {
//           throw new Error(err);
//         });
//     },
//     {
//       enabled: isFocused && userId.length !== 0,
//     },
//   );
// };

/**
 *
 * @param {{navigation:StackNavigationProp<any>,route:RouteProp<any>}} props
 */
// eslint-disable-next-line react-hooks/rules-of-hooks

export default function MyStore({navigation, route}) {
  const {accessToken, isSignedIn} = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [Description, setDescription] = useState('');
  const [isDescLoading, setIsDescLoading] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(false);
  const [images, setImages] = useState('');
  const {width} = useWindowDimensions();
  // const [showNotifications, toggleNotifications] = useReducer(s => !s, false);
  if (!isSignedIn) {
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

        setImages(response.assets[0]);
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

  const cbModal = data => {
    console.log('===>', data);
    setShowModal(data);
    console.log('===>', data);
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: HeaderLeft,
      headerRight: HeaderRight,
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'black',
      },
      style: {
        paddingBottom: 50,
      },
    });
    // getProducts();
    getUser();
  }, [isSignedIn]);
  const getUser = () => {
    API(accessToken)
      .get('user')
      .then(response => {
        // console.log('==Success', response);
        if (response.status === 200) {
          setUserData(response.data.payload.user);
          setDescription(response.data.payload.user.store_description);
        }
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);

        console.log('0000', JSON.parse(JSON.stringify(error)));
      });
  };

  const getProducts = () => {
    API(accessToken)
      .get('product')
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
  useFocusEffect(
    React.useCallback(() => {
      getProducts();
    }, []),
  );

  const addDescription = () => {
    if (Description) {
      setIsDescLoading(true);
      const formdata = new FormData();
      formdata.append('store_description', Description);
      console.log('formData is', formdata);
      API(accessToken)
        .patch('user', formdata)
        .then(response => {
          console.log('Success ==>', response);
          if (response.status === 200) {
            CustomAlert('Alert', response.data.message, () => {
              setShowModal(false);
            });
          }
          setIsDescLoading(false);
        })
        .catch(error => {
          setIsDescLoading(false);
          console.log('0000', error.response.data);
        });
    } else {
      alert('Description is required');
    }

    // console.log('popop=>>>>', productsData);
  };

  const addCoverPhoto = () => {
    if (images) {
      setIsDescLoading(true);
      const formdata = new FormData();
      formdata.append('cover[]', {
        uri: images.uri,
        name: 'photo.jpg',
        type: images.type,
      });
      console.log('formData is', formdata);
      API(accessToken)
        .patch('user', formdata)
        .then(response => {
          console.log('Success ==>', response);
          if (response.status === 200) {
            CustomAlert('Alert', response.data.message, () => {
              setShowModal(false);
            });
          }
          setIsDescLoading(false);
        })
        .catch(error => {
          setIsDescLoading(false);
          console.log('0000', error.response.data);
        });
    } else {
      alert('Description is required');
    }
  };
  const DataModel = () => {
    return (
      <Modal
        style={{flex: 1, justifyContent: 'flex-end'}}
        isVisible={showModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
          <ScrollView>
            {!showDescription && !coverPhoto ? (
              <View style={tailwind('bg-white rounded-3xl p-4 justify-end')}>
                <View>
                  <TouchableOpacity style={Styles.modelBtn}>
                    <Text
                      style={tailwind(
                        'text-black self-center text-2xl ml-6  mb-4',
                      )}>
                      {/* {data?.data?.message} */}
                      Use Options
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setShowDescription(true)}
                    style={Styles.modelBtn}>
                    <Text
                      style={[
                        tailwind(' text-black text-2xl font-bold mb-4'),
                        {borderBottomColor: 'gray', borderBottomWidth: 1},
                      ]}>
                      {/* {data?.data?.message} */}
                      Edit Store Description
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setCoverPhoto(true);
                    }}>
                    <Text
                      style={tailwind(
                        'self-center text-black text-2xl font-bold ml-6 mb-4',
                      )}>
                      {/* {data?.data?.message} */}
                      Change Cover Photo
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                {coverPhoto ? (
                  <>
                    <View
                      style={tailwind('bg-white rounded-3xl p-10 justify-end')}>
                      <View style={Styles.modelBtn}>
                        <Text
                          style={[
                            tailwind(' text-black text-2xl font-bold'),
                            {borderBottomColor: 'gray', borderBottomWidth: 1},
                          ]}>
                          {/* {data?.data?.message} */}
                          Edit Cover Photo
                        </Text>

                        <Text
                          style={tailwind(
                            ' text-black mb-1 text-base self-center',
                          )}>
                          upload cover photo for your store
                        </Text>
                        <Text
                          style={tailwind(
                            ' text-black mb-4 text-base self-center',
                          )}>
                          choice cover photo
                        </Text>
                        <TouchableOpacity
                          onPress={() => pickImage()}
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
                            {images.uri ? (
                              <Image
                                source={{uri: images.uri}}
                                style={tailwind('w-80 h-40 mt-2')}
                                resizeMode={'stretch'}
                              />
                            ) : (
                              <Icon
                                size={55}
                                name="camera"
                                type="material-community"
                                style={tailwind('text-black text-3xl')}
                              />
                            )}
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        addCoverPhoto();
                        setShowModal(false);
                        setShowDescription(false);
                      }}
                      style={tailwind(
                        'bg-white mt-3 rounded-3xl items-center justify-center',
                      )}>
                      {isDescLoading ? (
                        <ActivityIndicator style={tailwind(' py-4')} />
                      ) : (
                        <Text style={tailwind(' font-bold text-xl py-3')}>
                          Save
                        </Text>
                      )}
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <View
                      style={tailwind('bg-white rounded-3xl p-4 justify-end')}>
                      <View style={Styles.modelBtn}>
                        <Text
                          style={[
                            tailwind(' text-black text-2xl font-bold'),
                            {borderBottomColor: 'gray', borderBottomWidth: 1},
                          ]}>
                          {/* {data?.data?.message} */}
                          Edit Store Description
                        </Text>
                        <Text
                          style={tailwind(
                            ' text-black mb-1 text-base self-center',
                          )}>
                          Tell your buyers about your store and what
                        </Text>
                        <Text
                          style={tailwind(
                            ' text-black mb-1 text-base self-center',
                          )}>
                          you're selling
                        </Text>
                      </View>
                      <TextInput
                        value={Description}
                        onChangeText={text => setDescription(text)}
                        multiline={true}
                        style={[Styles.modelBtn, {height: hp(8), padding: 15}]}
                      />
                      <View style={Styles.lastTxt}>
                        <Text>{80 - Description?.length}</Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        addDescription();
                        setShowModal(false);
                        setShowDescription(false);
                      }}
                      style={tailwind(
                        'bg-white mt-3 rounded-3xl items-center justify-center',
                      )}>
                      {isDescLoading ? (
                        <ActivityIndicator style={tailwind(' py-4')} />
                      ) : (
                        <Text style={tailwind(' font-bold text-xl py-3')}>
                          Save
                        </Text>
                      )}
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                setShowDescription(false);
                setCoverPhoto(false);
              }}
              style={tailwind(
                'bg-white mt-3 mb-5 rounded-3xl items-center justify-center',
              )}>
              {isDescLoading ? (
                <ActivityIndicator style={tailwind(' py-4')} />
              ) : (
                <Text style={tailwind(' font-bold text-xl py-3')}>Cancel</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    );
  };
  if (isLoading) {
    return (
      <Skeleton>
        <View style={tailwind('px-4 py-2 flex-row')}>
          {Array.from({length: 3}, (_, index) => (
            <View
              key={index}
              style={[
                tailwind('w-24 h-40 rounded-xl'),
                tailwind(index > 0 ? 'ml-4' : ''),
              ]}
            />
          ))}
        </View>
      </Skeleton>
    );
  }

  return (
    <View style={tailwind('flex-1')}>
      <ImageBackground
        source={
          !userData?.cover_pic || !userData?.profile_pic
            ? require('@/assets/my-store-bg.png')
            : {
                uri: userData?.cover_pic
                  ? userData.cover_pic?.absolute_path
                  : userData?.profile_pic?.absolute_path,
              }
        }
        style={tailwind('w-full flex-1 pt-0 pb-0 justify-between ')}
        resizeMode="cover">
        <ScrollView>
          <View
            style={[
              Styles.topRatings,
              tailwind('bg-black bg-opacity-50 px-5 py-3'),
            ]}>
            {/* <StorModal
            isSuccess={showModal}
            cbSuccess={cbModal}
            DataModal={DataModel}
          /> */}
            <DataModel />
            <View style={Styles.leftRatings}>
              <TouchableOpacity
                onPress={() => navigation.navigate('My Products')}>
                <Text style={Styles.toptxt}>10</Text>
                <Text style={Styles.toptxt2}>Followers</Text>
              </TouchableOpacity>
              <View>
                <Text style={Styles.toptxt}>10</Text>
                <Text style={Styles.toptxt2}>Following</Text>
              </View>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={Styles.toptxt}>9</Text>
                  <Icon
                    name="tag"
                    type="material-community"
                    size={13}
                    color={'white'}
                    style={{transform: [{rotate: '90deg'}], marginTop: 6}}
                  />
                </View>
                <Text style={Styles.toptxt2}>Items Sold</Text>
              </View>
            </View>
            <TouchableOpacity
              hitSlop={{left: 50, right: 50, top: 50, bottom: 50}}
              onPress={() => {
                // setShowModal(true);
              }}
              style={Styles.rightView}>
              <Icon
                color={'white'}
                size={30}
                // style={{marginLeft: 10}}
                name="dots-horizontal"
                type="material-community"
              />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: hp(-7.5)}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('My Products')}
              style={[
                tailwind('bg-black bg-opacity-60 px-5 py-1'),
                {marginTop: '18%'},
              ]}>
              <Text style={tailwind('text-3xl text-white font-bold uppercase')}>
                My Products
              </Text>
            </TouchableOpacity>

            <View style={{marginTop: hp(1)}}>
              {productsData?.products?.length > 0 ? (
                <FlatList
                  horizontal={true}
                  data={productsData?.products}
                  renderItem={({item}) => (
                    <StorProduct
                      key={item}
                      imagepath={item?.images[0]?.absolute_path}
                    />
                  )}
                  ListHeaderComponent={() => <View style={{width: 15}}></View>}
                  ListFooterComponent={() => <View style={{width: 10}}></View>}
                  keyExtractor={item => item.id}
                />
              ) : (
                // eslint-disable-next-line react/self-closing-comp
                <View style={{height: hp('18')}}></View>
              )}
            </View>
          </View>

          <View style={{marginTop: hp(1)}}>
            {productsData?.products?.length > 0 ? (
              <FlatList
                horizontal={true}
                data={productsData?.products}
                renderItem={({item}) => (
                  <StorProduct /* key={item?._id} */ imagepath={item?.images} />
                )}
                ListHeaderComponent={() => <View style={{width: 15}}></View>}
                ListFooterComponent={() => <View style={{width: 10}}></View>}
                keyExtractor={item => item._id}
              />
            ) : (
              <Text style={Styles.bottomTxt}>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English.
              </Text>
            )}
          </View>

          <View style={Styles.bottomView}>
            {Description ? (
              <Text style={Styles.bottomTxt}> {Description}</Text>
            ) : (
              <Text style={Styles.bottomTxt}>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English.
              </Text>
            )}
          </View>
          <View style={tailwind('flex-wrap justify-center px-1 mb-4')}>
            <View style={tailwind('flex-row')}>
              <View style={tailwind('flex-col w-1/2 ml-2 mr-2')}>
                <Button
                  onPress={() => navigation.navigate('AddProduct')}
                  style={tailwind('flex-row self-stretch w-full')}
                  theme="white"
                  icon={
                    <ShoppingAdd style={tailwind('w-6 mr-1 h-10 text-black')} />
                  }
                  size="sm"
                  titleStyle={tailwind(' text-black text-base font-bold ')}
                  title="Add New Product"
                />
                {/* DO NOT REMOVE
                            <TouchableOpacity
                                onPress={() => navigation.navigate("AddProduct")}
                                style={tailwind("flex-row")}
                            >
                                <ShoppingAdd
                                    style={tailwind("w-5 h-5 text-black")}
                                />
                                <Text
                                    style={tailwind(
                                        "mt-1 mr-2 text-black uppercase font-bold text-xs"
                                    )}
                                >
                                    Add New Product
                                </Text>
                            </TouchableOpacity> */}
              </View>
              <View style={tailwind('flex-col w-40 ml-3')}>
                <Button
                  onPress={() => navigation.navigate('LiveStream')}
                  style={tailwind('flex-row self-stretch w-full')}
                  theme="white"
                  icon={
                    <GoLiveIcon
                      sss={tailwind('mr-3')}
                      style={tailwind('w-10 text-black h-10')}
                    />
                  }
                  size="sm"
                  titleStyle={tailwind('text-base mr-2 text-black')}
                  title="    Go Live"
                />
                {/* <TouchableOpacity
                                onPress={() => navigation.navigate("LiveStream")}
                                style={tailwind("bg-white flex-1 justify-center rounded-xl flex-row items-center p-2")}
                            >
                                <GoLiveIcon
                                    containerStyle={tailwind("mr-2")}
                                    style={tailwind("w-5 text-black h-5")}
                                />
                                <Text
                                    style={tailwind(
                                        "text-black uppercase font-bold text-xs"
                                    )}
                                >
                                    Go Live
                                </Text>
                            </TouchableOpacity> */}
              </View>
            </View>
            {/* <ChangeCoverPhoto /> */}
            <View style={tailwind('self-center w-40 m-3')}>
              <Button
                onPress={() => getProducts()}
                style={tailwind('flex-row h-14 self-stretch w-full')}
                theme="white"
                icon={
                  <Icon
                    name="tag"
                    type="material-community"
                    size={28}
                    color={'black'}
                    style={{transform: [{rotate: '90deg'}], marginTop: 2}}
                  />
                }
                size="sm"
                titleStyle={tailwind('text-base ml-3 mr-5 text-black')}
                title="Sell Live"
              />
            </View>
          </View>
          {/* <ChangeCoverPhoto /> */}
          <View style={tailwind('self-center w-40 m-3')}>
            <Button
              onPress={() => {}}
              style={tailwind('flex-row h-14 self-stretch w-full')}
              theme="white"
              icon={
                <Icon
                  name="tag"
                  type="material-community"
                  size={28}
                  color={'black'}
                  style={{transform: [{rotate: '90deg'}], marginTop: 2}}
                />
              }
              size="sm"
              titleStyle={tailwind('text-base ml-3 mr-5 text-black')}
              title="Sell Live"
            />
          </View>
          {/* <AnimatePresence>
          {showNotifications && (
            <View style={tailwind('absolute inset-0 ')}>
              <Notification toggleView={toggleNotifications} />
            </View>
          )}
        </AnimatePresence> */}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

function ProductsFooter() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('My Products')}
      style={tailwind('p-4 items-center justify-center flex-1 mr-8')}>
      <Icon
        type="ionicon"
        name="arrow-forward-circle-outline"
        color="white"
        size={48}
      />
      <Text style={tailwind('text-base text-white')}>View All</Text>
    </TouchableOpacity>
  );
}

// /**
//  *
//  * @param {{onNotificationPressed:Function}} props
//  */
function HeaderRight({onNotificationPressed}) {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
      <Icon
        name="newspaper-variant-multiple-outline"
        color="white"
        type="material-community"
        size={24}
      />

      <Icon
        name="notifications-outline"
        color="white"
        type="ionicon"
        size={24}
        style={tailwind('pl-2')}
      />
    </View>
  );
}
const HeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10,
      }}
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon
        type="ionicon"
        name="arrow-back"
        color="white"
        size={32}
        onPress={() => navigation.canGoBack() && navigation.goBack()}
      />

      <Text
        style={tailwind(
          'uppercase text-white mt-1 font-bold text-xl text-center',
        )}>
        My Store
      </Text>
    </TouchableOpacity>
  );
};
// function Notification({toggleView = () => {}}) {
//   const {height} = useWindowDimensions();
//   useEffect(() => {
//     const backAction = () => {
//       toggleView();
//       return true;
//     };
//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction,
//     );
//     return () => {
//       backHandler.remove();
//     };
//   }, []);
//   return (
//     <MotiView
//       from={{
//         translateY: -height,
//       }}
//       animate={{
//         translateY: 0,
//       }}
//       exit={{
//         translateY: -height,
//       }}
//       transition={{type: 'timing'}}
//       style={tailwind('bg-white flex-1')}>
//       <FlatList
//         data={Array.from({length: 16})}
//         contentContainerStyle={tailwind('p-4')}
//         renderItem={({_, index}) => (
//           <View
//             style={[
//               tailwind('border border-gray-200 bg-white rounded-lg p-4 mt-4'),
//             ]}>
//             <Text style={tailwind('font-bold text-base text-black')}>
//               Notification message
//             </Text>
//             <Text style={tailwind('mt-2 text-xs text-black')}>
//               Mon @ 12:30 PM
//             </Text>
//           </View>
//         )}
//         ListHeaderComponent={() => (
//           <View style={tailwind('flex-row items-center justify-between mb-4')}>
//             <Text style={tailwind('text-lg font-semibold')}>Notifications</Text>
//             <Pressable>
//               <Text style={tailwind('font-bold text-black')}>
//                 Mark All as read
//               </Text>
//             </Pressable>
//           </View>
//         )}
//         keyExtractor={(_, index) => `${index}`}
//       />
//     </MotiView>
//   );
// }
/**
 *
 * @param {{product:Object,style:StyleProp<ViewStyle>}} props
 */

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
    height: hp(12),
    marginTop: hp(18),
    opacity: 0.6,
    padding: 20,
  },
  bottomTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  rightView: {},
  leftRatings: {flexDirection: 'row'},
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
