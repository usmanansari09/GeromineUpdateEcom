import React, {
  ReactNode,
  useContext,
  useReducer,
  useState,
  useEffect,
} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleProp,
  TextStyle,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import {Input, Button} from '@/components/index';
import {
  StackHeaderProps,
  StackHeaderLeftButtonProps,
} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {getColor, tailwind} from '@/common/tailwind';
import {Avatar, Icon, Image} from 'react-native-elements';
import {useCartCount} from '@/common/services/hooks';
import Menu from '@/assets/menu.png';
import ToastUpcomingFeature from '@/common/helpers/ToastUpcomingFeature';
import CartProvider, {
  CartContext,
  fetchCart,
} from '@/common/contexts/CartContext';

const DEFAULT_HEADER_ACTIONS = {
  hasCart: false,
  hasSearch: false,
  hasFilter: false,
  hasUser: false,
  hasGoLive: false,
  hasProduct: false,
};
const HEADER_PADDING = Platform.select({
  ios: tailwind('pt-1'),
  android: tailwind('pt-4'),
});
/**
 *
 * @param {{headerRight:ReactNode,headerRightOrder:'normal'|'reverse',headerActions:{hasCart:boolean,hasSearch:boolean,hasUser:false}}& StackHeaderProps} props
 */
export default function StackHeader({
  headerRight: HeaderRightComponent = null,
  headerRightOrder = 'normal',
  headerActions = DEFAULT_HEADER_ACTIONS,
  ...headerProps
}) {
  const {
    navigation,
    title,
    iconName,
    iconSize,
    backButtonShow,
    hasCart,
    hasGoLive,
    hasSearch,
    hasFilter,
    hasUser,
    isHome,
    hasGBlog,
    bellIcon,
    isChat,
    hasProduct,
    hasGoLive_params,

    hasCartEdit,
    clearCart,

    hasSearchFilter,
    setOpenFilterModal,
  } = headerProps.props;

  const [visibleHasGoLiveModal, toggleHasGoLiveModal] = useReducer(
    s => !s,
    false,
  );

  const changeHasGoLiveModal = () => {
    toggleHasGoLiveModal();
  };

  const insets = useSafeAreaInsets();

  const headerActionsConfig = {
    ...DEFAULT_HEADER_ACTIONS,
  };
  const handleBackPress = () => {
    navigation.canGoBack() && navigation.goBack();
  };
  const containerStyle = {
    ...tailwind('bg-black'),
    paddingTop:
      insets.top > 0
        ? insets.top + HEADER_PADDING.paddingTop
        : HEADER_PADDING.paddingTop,
    ...tailwind(' pb-4 px-3 flex-row items-center justify-between'),
  };

  return (
    <View style={containerStyle}>
      <View style={tailwind('flex-row items-center')}>
        {!backButtonShow && (
          <TouchableOpacity onPress={handleBackPress}>
            <Icon
              name={iconName ? iconName : 'arrow-back-outline'}
              type="ionicon"
              color="white"
              size={iconSize ? iconSize : 32}
              style={tailwind('text-xl pt-1')}
              buttonStyle={tailwind('pr-2')}
            />
          </TouchableOpacity>
        )}
        {isHome && (
          <TouchableOpacity
            hitSlop={{left: 50, right: 50}}
            onPress={() => {
              navigation.navigate('FlyOutMenu');
            }}>
            <Image
              source={Menu}
              style={tailwind('w-5 h-5 m-2 ml-0 mt-3')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        {/* )} */}

        <Text
          style={{
            ...tailwind('uppercase text-white mt-1 ml-1 font-bold text-med-xl'),
          }}>
          {title}
        </Text>
      </View>
      <View style={tailwind('flex-row items-center')}>
        {headerActionsConfig.hasBuyChips && (
          <Button
            title="Buy Chips"
            titleStyle={tailwind('uppercase text-white')}
            onPress={() =>
              navigation.navigate('Buy Chips', {
                screen: 'Buy',
              })
            }
            type="outline"
            buttonStyle={{
              borderColor: getColor('white'),
              ...tailwind('rounded-md'),
            }}
          />
        )}
        {hasGBlog && (
          <TouchableOpacity
            style={tailwind('justify-center ml-1 mr-1')}
            onPress={() => navigation.navigate('GBlog')}>
            {/* <Icon
            name="newspaper-outline"
            color="white"
            type="ionicon"
            size={26}
            style={{ transform: [{ rotateY: '180deg' }] }}
          /> */}

            <Image
              style={{
                width: 24,
                height: 24,
              }}
              resizeMode="contain"
              source={require('@/assets/logo3b-white.png')}
            />
          </TouchableOpacity>
        )}
        {headerActionsConfig.hasCart && <UserCart screenTitle={title} />}
        {headerActionsConfig.hasSearch && (
          <HeaderAction
            name="search-outline"
            // route={'SearchScreen'}
            route={''}
            screen={'title'}
          />
        )}

        {headerActionsConfig.hasCamera && (
          <HeaderAction
            name="videocam-outline"
            route={'SearchScreen'}
            screen={'title'}
          />
        )}
        {headerActionsConfig.hasFilter && (
          <HeaderAction
            name="filter"
            type="antdesign"
            route={'SearchScreen'}
            screen={'title'}
          />
        )}
        {headerActionsConfig.hasUser && <UserProfile />}

        {headerActionsConfig.hasGoLive && (
          <HeaderAction
            name="videocam-outline"
            size={36}
            route={'LiveStream'}
          />
        )}
        {HeaderRightComponent !== null && headerRightOrder === 'reverse' && (
          <HeaderRightComponent navigation={navigation} />
        )}

        {/* nadeem */}
        {hasCart && <UserCart screenTitle={title} />}
        {hasSearch && (
          <HeaderAction
            name="search-outline"
            // route={'SearchScreen'}
            route={''}
            screen={'title'}
          />
        )}
        {hasFilter && (
          <HeaderAction
            name="filter"
            type="antdesign"
            route={'SearchScreen'}
            screen={'title'}
          />
        )}
        {hasUser && <UserProfile />}
        {(hasGoLive &&
          (hasGoLive_params ? (
            <HeaderAction
              name="videocam-outline"
              color={'green-400'}
              route={['LiveStream', 'ViewStream']}
              params={{
                stream_key: hasGoLive_params._id,
                channel_name: hasGoLive_params.channel_name,
                user: hasGoLive_params.user,
                products: hasGoLive_params.product,
              }}
            />
          ) : (
            <View>
              <HeaderAction
                functionCall={changeHasGoLiveModal}
                color={'gray-500'}
                name="videocam-outline"
                size={36}
              />
              <Modal isVisible={visibleHasGoLiveModal}>
                <View
                  style={tailwind(
                    'bg-white rounded-2xl p-4 items-center justify-center',
                  )}>
                  <Text
                    style={tailwind(
                      'text-black text-center text-lg mb-4 font-bold',
                    )}>
                    No livestream available for this product
                  </Text>
                  <Button
                    title="Close"
                    theme="black"
                    onPress={() => {
                      // setIsSuccess(false);
                      setTimeout(() => {
                        // navigation.goBack();
                        toggleHasGoLiveModal();
                      }, 200);
                    }}
                    containerStyle={tailwind('mt-2 w-1/2')}
                  />
                </View>
              </Modal>
            </View>
          ))) ||
          (hasGoLive && (
            <HeaderAction name="videocam-outline" route={'LiveStream'} />
          ))}

        {bellIcon && (
          <TouchableOpacity
            onPress={() => ToastUpcomingFeature({position: 'bottom'})}>
            <Icon
              name="bell"
              color="white"
              type="feather"
              size={24}
              style={tailwind('pl-2')}
            />
          </TouchableOpacity>
        )}
        {isChat && (
          <TouchableOpacity
            style={[tailwind('ml-1 mr-1')]}
            onPress={() => ToastUpcomingFeature({position: 'bottom'})}>
            {/* <View
              style={[
                tailwind(
                  'flex-row border-white px-2 rounded-lg justify-center',
                ),
                {borderWidth: 1, paddingTop: 4, paddingBottom: 4},
              ]}> */}
            <Icon
              name="chat-bubble-outline"
              color="white"
              type="MaterialIcons"
              size={26}
              style={[tailwind('mr-1'), {transform: [{rotateY: '180deg'}]}]}
            />
            {/* <Text style={[tailwind('font-bold text-white'), {fontSize: 16}]}>
                CHAT
              </Text> */}
            {/* </View> */}
          </TouchableOpacity>
        )}

        {hasCartEdit && (
          <TouchableOpacity style={[tailwind('')]} onPress={clearCart}>
            <View style={[{paddingTop: 4}]}>
              <Text
                style={[tailwind('font-normal text-white'), {fontSize: 16}]}>
                Clear
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {hasProduct && (
          <TouchableOpacity style={[tailwind('')]} onPress={hasProduct}>
            <View style={[{paddingTop: 4}]}>
              <Text style={[tailwind('font-bold text-white'), {fontSize: 16}]}>
                ADD PRODUCT
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {hasSearchFilter && (
          <TouchableOpacity
            style={[tailwind('')]}
            onPress={() => {
              setOpenFilterModal(true);
            }}>
            <View
              style={[
                tailwind(''),
                {borderWidth: 1, paddingTop: 4, paddingBottom: 4},
              ]}>
              <Icon
                name="filter"
                color="white"
                type="feather"
                size={26}
                style={[tailwind(''), {transform: [{rotateY: '0deg'}]}]}
              />
              <Text
                style={[
                  tailwind('absolute bottom-0 -left-1 text-white bg-black'),
                  {fontSize: 8},
                ]}>
                Filter
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* end */}
      </View>
    </View>
  );
}
function HeaderAction({
  name,
  type = 'ionicon',
  size = 32,
  route,
  color,
  params,
  screen,
  functionCall,
}) {
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        // console.log({route});
        // console.log({params});
        if (route?.length === 2) {
          navigate(route[0], {
            screen: route[1],
            params,
          });
        } else if (route) {
          navigate(route, params);
        } else if (functionCall) {
          functionCall();
        } else if (route === '') {
          ToastUpcomingFeature({position: 'bottom'});
        }
      }}
      style={tailwind('ml-2')}>
      <Icon
        name={name}
        type={type}
        size={size}
        color={color ? getColor(color) : getColor('white')}
      />
    </TouchableOpacity>
  );
}
const UserCart = ({screenTitle}) => {
  const {cartContext, fetchCart} = useContext(CartContext);
  fetchCart();
  return (
    <View style={tailwind('ml-2')}>
      <HeaderAction
        name="cart-outline"
        route={'HomeScreen'}
        params={{screen: 'ShoppingCart'}}
        screen={screenTitle}
      />
      {cartContext > 0 && (
        <View
          style={tailwind(
            'absolute right-0 top-0 p-1 -mr-1 -mt-2 bg-brand-primary w-5 h-5 border border-black rounded-full items-center justify-center',
          )}>
          <Text style={[tailwind('text-white absolute'), {fontSize: 9}]}>
            {cartContext > 9 ? '9+' : cartContext || 0}
          </Text>
        </View>
      )}
    </View>
  );
};
function UserProfile() {
  return (
    <View style={tailwind('items-center')}>
      <Avatar
        source={{
          uri: 'https://source.unsplash.com/mEZ3PoFGs_k',
        }}
        rounded
      />
      <Text style={tailwind('text-xs text-gray-300')}>Sally</Text>
    </View>
  );
}
