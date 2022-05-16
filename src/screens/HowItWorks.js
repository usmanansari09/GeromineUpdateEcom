/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Image} from 'react-native-elements';
import {AppContext} from '@/common/contexts/AppContext';
import {getColor, tailwind} from '@/common/tailwind';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import StackHeader from '@/components/StackHeader';

export default function HowItWorks({route}) {
  const navigation = useNavigation();

  const {currentScreen} = useContext(AppContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return <StackHeader props={{...props, title: 'How it works'}} />;
      },
    });
  }, [navigation]);
  return (
    <ScrollView>
      <View style={tailwind('flex-1')}>
        <View style={tailwind('flex-row')}>
          <View style={tailwind('p-10 bg-white bg-pink-500 w-full')}>
            <Text style={tailwind('text-white text-xl font-bold text-center')}>
              SEE IT. CLICK IT. BUY IT.
            </Text>
            <Text
              style={[
                tailwind('font-black text-base font-bold text-center mt-3'),
                {lineHeight: 20},
              ]}>
              {
                'A whole new universe of shopping is now at\nyour fingertips. Geronimo has created\nshopping everywhere and\nanywhere you go, any time, any place.\nYou can sell. You can buy. You can browse.\nYou can live Stream and Live Chat.\nAND GETTING STARTED EASY-PEASY.'
              }
               {' '}
            </Text>
          </View>
          {/* <View style={tailwind('flex-1 p-3 bg-black')}>
          <Text style={tailwind('text-white text-lg font-bold text-center')}>
            FOR BUYERS:
          </Text>
          <Text style={tailwind('text-white text-base font-bold text-center')}>
            Buyers see someone wearing a product they like. NEW or PRE-OWNED.
            Buyer launches the Geronimo! app and that product appears on their
            mobile device. Buyer gets the product info and buys it on the spot.
            Product is shipped to buyer. Now Buyer can also choose to become a
            Seller and join the circular economy.
          </Text>
        </View> */}
        </View>

        <View style={tailwind(' flex-row h-full w-full')}>
          <View style={tailwind('flex-1 bg-white p-3 w-1/2 h-full')}>
            <View>
              <Text
                style={tailwind(
                  'text-black uppercase text-lg font-bold text-center',
                )}>
                {'Selling on\nGeronimo:'}
              </Text>

              <View style={tailwind('flex-row')}>
                <Text style={tailwind('text-black text-base mt-4')}>1.</Text>
                <Text style={tailwind('text-black text-base mt-4')}>
                  Download the free GERONIMO APP, register and create a profile.
                </Text>
              </View>

              {/* <Text style={tailwind('text-black text-base font-normal mt-4')}>
                2. Setup your personal store. Connect your PayPal and your
                social media accounts.
              </Text> */}

              <View style={tailwind('flex-row')}>
                <Text style={tailwind('text-black text-base mt-4')}>2.</Text>
                <Text style={tailwind('text-black text-base mt-4')}>
                  Setup your personal store. Connect your PayPal and your social
                  media accounts.
                </Text>
              </View>

              {/* <Text style={tailwind('text-black text-base font-normal mt-4')}>
                3. Now, just list your products for sale and START SELLING!
              </Text> */}

              <View style={tailwind('flex-row')}>
                <Text style={tailwind('text-black text-base mt-4')}>3.</Text>
                <Text style={tailwind('text-black text-base mt-4')}>
                  Now, just list your products for sale and START SELLING!
                </Text>
              </View>

              <Text style={tailwind('text-black text-base mt-4')}>
                {
                  'Wear your product out and about -- and anywhere and everywhere you go, Geronimo users who SEE you can buy your product. Right there on the spot. You can also Stream Live on the go with one click -- Buyers everywhere can watch your stream and buy your product. Your product is also available for sale in your personal Geronimo Store.'
                }
              </Text>
            </View>
          </View>

          <View style={tailwind('flex-1 bg-black p-3')}>
            <Text style={tailwind('text-white text-lg font-bold text-center')}>
              {'BUYING ON\nGERONIMO:'}
            </Text>

            <View style={tailwind('flex-row')}>
              <Text style={tailwind('text-white text-base mt-4')}>1.</Text>
              <Text style={tailwind('text-white text-base mt-4')}>
                Download the free GERONIMO APP, register and create a your
                Geronimo account.
              </Text>
            </View>

            {/* <Text style={tailwind('text-white text-base font-normal mt-4')}>
              1. Download the free GERONIMO APP, register and create a your
              Geronimo account.
            </Text> */}

            <View style={tailwind('flex-row')}>
              <Text style={tailwind('text-white text-base mt-4')}>2.</Text>
              <Text style={tailwind('text-white text-base mt-4')}>
                Connect your social media accounts.
              </Text>
            </View>
            {/* <Text style={tailwind('text-white text-base font-normal mt-4')}>
              2. Connect your social media accounts.
            </Text> */}

            <View style={tailwind('flex-row')}>
              <Text style={tailwind('text-white text-base mt-4')}>3.</Text>
              <Text style={tailwind('text-white text-base mt-4')}>
                START BUYING.
              </Text>
            </View>
            {/* <Text style={tailwind('text-white text-base font-normal mt-4')}>
              3. START BUYING.
            </Text> */}

            <Text style={tailwind('text-white text-base mt-4')}>
              {
                'If you see anyone, anytime, anywhere, wearing something you like, open the Geronimo app, the nearby product appears on your screen. Buy it on the spot using your registered PayPal account or your credit/debit card. Seller ships you the product. Buyers can also browser Geronimo sellers on the go everywhere. Or visit their personal stores. Or shop or watch Live Streamers for fun!'
              }
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
