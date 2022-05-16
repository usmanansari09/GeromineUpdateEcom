/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import SellerNavigation from '@/navigation/SellerNavigation';
import LiveStreamNavigation from './LiveStreamNavigation';
import SearchNavigation from './SearchNavigation';
import StoreNavigation from './StoreNavigation';
import MessagesNavigation from './MessagesNavigation';
import SupportCenterNavigation from './SupportCenterNavigation';
import ProductChat from '@/screens/Product/ProductChat';
import Profile from '@/screens/Profile';
import Welcome from '@/screens/Welcome';
// // // // Auth
import {AuthScreens} from './AuthNavigation';

import StackHeader from '@/components/StackHeader';

import AddProduct from '@/screens/Profile/AddProduct';
import BuyChips from '@/screens/BuyChips';
import DisplayPhotoGallery from '@/screens/LiveStream/GoLive/DisplayPhotoGallery';
import EditProduct from '@/screens/Profile/EditProduct2';
import FlyOutMenu from '@/screens/FlyOutMenu';
import HowItWorks from '@/screens/HowItWorks';
import Contact from '@/screens/Seller/ContactUs';
import PrivacyPolicy from '@/screens/PrivacyPolicy';
import TermsOfUse from '@/screens/TermsOfUse';
import ReturnPolicy from '@/screens/ReturnPolicy';
import Logout from '@/screens/Auth/Logout';
import MyCart from '@/navigation/PurchaseNavigation';
import MyChips from '@/screens/Profile/MyChips';
import MyProducts from '@/screens/Profile/MyProducts';
// import MyStore from '@/screens/Store/MyStore';
import Product from '@/screens/Product';
import ProductSellerView from '@/screens/Product/ProductSellerView';

import SellerProfile from '@/screens/SellerProfile';
import SellerStore from '@/screens/Profile/MyStore';

import SplashScreen from 'react-native-splash-screen';
import GBlog from '@/screens/Blog/GBlog';

import AgoraLive from '@/screens/Store/Live/GoLive';
import ProfileNavigation from './ProfileNavigation';
import EditProfile from '@/screens/Profile/EditProfile2';

import AddProductSelectCondition from '@/screens/Profile/AddProduct/components/SelectCondition';
import AddProductSelectCategory from '@/screens/Profile/AddProduct/components/SelectCategory';
import AddProductSelectCategoryMenswear from '@/screens/Profile/AddProduct/components/SelectCategoryMenswear';
import AddProductSelectCategoryWomenswear from '@/screens/Profile/AddProduct/components/SelectCategoryWomenswear';
import AddProductEnhanceListing from '@/screens/Profile/AddProduct/components/EnhanceListing';
import AddProductShippingFee from '@/screens/Profile/AddProduct/components/SelectShippingFee';
import Verify from '../screens/Profile/Verify';
import NearbyProducts from '../screens/Profile/NearbyProducts';
import NearbyProductsGrid from '../screens/Profile/NearbyProducts/Grid';
import SalesHistory from '@/screens/Profile/SalesHistory';
import PurchaseHistory from '@/screens/Profile/PurchaseHistory';
import OrderView from '@/screens/Profile/OrderView';

// import ChippedProducts from '@/screens/Profile/ChippedProducts';
// import ShopNearbyChippedProducts from '../screens/Seller/Home/components/ShopNearbyChippedProducts';

/**
 * File Code: w_idx
 * This is the Welcome screen which shows at the very beginning
 */
export default function index({}) {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <Stack.Navigator
      detachInactiveScreens={false}
      options={{
        header: props => <StackHeader {...props} />,
      }}
      initialRouteName={'AuthScreens'}>
      {/* <Stack.Screen
        name="AddProduct SelectCondition"
        options={{
          headerActions: {
            hasSearch: false,
          },
        }}
        component={SelectCondition}
      /> */}

      <Stack.Group>
        {/* Showing Authentication Screens */}
        {Object.entries({
          ...AuthScreens,
        }).map(([name, component]) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component.screen}
            options={component.options}
          />
        ))}

        {/* Showing the HowItWorks Screen */}
        <Stack.Screen
          // options={{headerShown: false}}
          name={'HowItWorks'}
          component={HowItWorks}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name={'LiveStream'}
          component={LiveStreamNavigation}
        />

        {/* <Stack.Screen name="Seller Store" component={SellerStore} /> */}

        <Stack.Screen
          name={'Seller Store'}
          // options={{headerShown: false}}
          component={SellerStore}
        />

        <Stack.Screen
          name="Sales History"
          options={{
            headerActions: {
              hasSearch: true,
            },
          }}
          component={SalesHistory}
        />

        {/* <Stack.Screen
        options={{headerShown: false}}
        name={'HomeScreen'}
        component={SellerNavigation}
      /> */}

        {/* <Stack.Screen
        name="FlyOutMenu"
        options={{
          headerShown: false,
        }}
        component={FlyOutMenu}
      /> */}

        <Stack.Screen
          options={{headerShown: false}}
          name={'Welcome'}
          component={Welcome}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name={'HomeScreen'}
          component={SellerNavigation}
        />

        {/* <Stack.Screen
        options={{headerShown: false}}
        name={'LiveStream'}
        component={LiveStreamNavigation}
      /> */}
        {/* <Stack.Screen name={'Product_BuyerChat'} component={ProductChat} /> */}

        <Stack.Screen
          name={'ProfileScreens'}
          options={{headerShown: false}}
          component={ProfileNavigation}
        />

        {/* Profile/MyStore/ */}
        <Stack.Screen
          name={'StoreNavigation'}
          options={{headerShown: false, headerTransparent: false}}
          component={StoreNavigation}
        />

        {/* <Stack.Screen
          name={'SearchScreen'}
          options={{headerShown: false}}
          component={SearchNavigation}
        /> */}

        <Stack.Screen
          name="Edit Profile"
          options={{title: 'Edit Profile'}}
          component={EditProfile}
        />
        <Stack.Screen
          name="Purchase History"
          options={{
            title: 'Purchase\nHistory',
            headerActions: {
              hasBuyChips: true,
              hasSearch: true,
            },
          }}
          component={PurchaseHistory}
        />
        <Stack.Screen
          name="OrderView"
          options={{
            title: 'Oreder View',
          }}
          component={OrderView}
        />

        {/* <Stack.Screen
          name={'MessagesScreen'}
          options={{headerShown: false}}
          component={MessagesNavigation}
        /> */}

        {/* <Stack.Screen
          options={{headerShown: false}}
          name={'SupportCenter'}
          component={SupportCenterNavigation}
        /> */}

        {/* <Stack.Screen
          name={'Buy'}
          options={{
            headerActions: {
              hasCart: true,
              hasSearch: true,
            },
            title: 'Buy Chips',
          }}
          component={BuyChips}
        /> */}

        <Stack.Screen
          name={'PhotoGallery'}
          options={{title: 'Photo gallery'}}
          component={DisplayPhotoGallery}
        />
        <Stack.Screen
          name="Logout"
          options={{headerShown: false}}
          component={Logout}
        />

        {/* Duplicate routes for handling route directl tied to other tabs to avoid messing up
                    the history for each tab , and to preserve order of naviation to each tab
                     */}
        {/* My Store */}
        {/* <Stack.Screen name="My Store" component={MyStore} /> */}
        <Stack.Screen name="GoLive" component={AgoraLive} />
        <Stack.Screen
          name="My Products"
          options={{
            headerActions: {
              hasSearch: true,
            },
          }}
          component={MyProducts}
        />
        <Stack.Screen name="My Chips" component={MyChips} />

        {/* View Product */}
        {/* <Stack.Screen
          name="ProductView"
          options={{
            headerActions: {
              hasCart: true,
              hasSearch: true,
            },
          }}
          component={ProductView}
        /> */}

        <Stack.Screen
          name="SellerProfile"
          options={{
            headerActions: {
              hasCart: true,
            },
          }}
          component={SellerProfile}
        />
        <Stack.Screen
          name="EditProduct"
          options={{title: 'Edit Product'}}
          component={EditProduct}
        />

        <Stack.Screen
          name="AddProduct"
          options={{title: 'Add New Product'}}
          component={AddProduct}
        />

        <Stack.Screen
          name="Select Condition"
          options={{
            title: 'Select Condition',
            headerActions: {
              hasSearch: false,
            },
          }}
          component={AddProductSelectCondition}
        />

        <Stack.Screen
          name="Select Category"
          options={{
            title: 'Select Category',
            headerActions: {
              hasSearch: false,
            },
          }}
          component={AddProductSelectCategory}
        />

        <Stack.Screen
          name="Select Category Menswear"
          options={{
            title: 'Menswear',
            headerActions: {
              hasSearch: false,
            },
          }}
          component={AddProductSelectCategoryMenswear}
        />

        <Stack.Screen
          name="Enhance Listing"
          options={{
            title: 'ENHANCE LISTING',
            headerActions: {
              hasSearch: false,
            },
          }}
          component={AddProductEnhanceListing}
        />

        <Stack.Screen
          name="Select Category Womenswear"
          options={{
            title: 'Womenswear',
            headerActions: {
              hasSearch: false,
            },
          }}
          component={AddProductSelectCategoryWomenswear}
        />

        <Stack.Screen
          name="Select Shipping Fee"
          options={{
            title: 'Shipping Fee',
            headerActions: {
              hasSearch: false,
            },
          }}
          component={AddProductShippingFee}
        />

        <Stack.Screen
          name="ProductView"
          options={{
            title: 'Product',
            headerActions: {
              hasSearch: false,
            },
          }}
          component={Product}
        />

        <Stack.Screen
          name="ProductSellerView"
          options={{
            title: 'Product',
            headerActions: {
              hasSearch: false,
            },
          }}
          component={ProductSellerView}
        />

        {/* Cart */}
        <Stack.Screen
          name="CartStackView"
          options={{
            headerShown: false,
          }}
          component={MyCart}
        />

        <Stack.Screen
          name="Verify"
          options={{
            title: 'Verify',
          }}
          component={Verify}
        />

        <Stack.Screen
          name="NearbyProducts"
          options={{
            title: 'Nearby Products',
          }}
          component={NearbyProducts}
        />

        <Stack.Screen name="FlyOutMenu" component={FlyOutMenu} />
        <Stack.Screen name="Contact Us" component={Contact} />
        <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} />
        <Stack.Screen name="Terms of Use" component={TermsOfUse} />
        <Stack.Screen name="Return Policy" component={ReturnPolicy} />
        <Stack.Screen name="How it Works" component={HowItWorks} />
        <Stack.Screen name="GBlog" component={GBlog} />
        <Stack.Screen
          name="User Profile"
          options={{title: 'My Profile'}}
          component={Profile}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
