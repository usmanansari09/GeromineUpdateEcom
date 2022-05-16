import {tailwind} from '@/common/tailwind';
import React, {useLayoutEffect} from 'react';
import Menu from '@/assets/menu.png';

import {TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import StackHeader from '@/components/StackHeader';
import { View } from 'moti';

export default function PrivacyPolicy() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return <StackHeader props={{...props, iconName:'close-sharp' ,title: 'Privacy Policy'}} />;
      },
    });
  }, [navigation]);
  return (
    <ScrollView style={tailwind('bg-gray-200 px-5 pt-8')}>
      <Text style={tailwind('text-2xl text-gray-800 font-bold')}>
        Privacy Policy
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Last updated: February 06, 2021
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        This Privacy Policy describes Our policies and procedures on the
        collection, use and disclosure of Your information when You use the
        Service and tells You about Your privacy rights and how the law protects
        You.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We use Your Personal data to provide and improve the Service. By using
        the Service, You agree to the collection and use of information in
        accordance with this Privacy Policy.
      </Text>

      <Text style={tailwind('mt-6 text-2xl text-gray-800 font-bold')}>
        Interpretation and Definitions
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Interpretation
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The words of which the initial letter is capitalized have meanings
        defined under the following conditions. The following definitions shall
        have the same meaning regardless of whether they appear in singular or
        in plural.
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Definitions
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        For the purposes of this Privacy Policy:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Account</Text> means a
        unique account created for You to access our Service or parts of our
        Service.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Affiliate</Text> means an
        entity that controls, is controlled by or is under common control with a
        party, where "control" means ownership of 50% or more of the shares,
        equity interest or other securities entitled to vote for election of
        directors or other managing authority.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Application</Text> means
        the software program provided by the Company downloaded by You on any
        electronic device, named Geronimo!
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Business</Text>, for the
        purpose of the CCPA (California Consumer Privacy Act), refers to the
        Company as the legal entity that collects Consumers' personal
        information and determines the purposes and means of the processing of
        Consumers' personal information, or on behalf of which such information
        is collected and that alone, or jointly with others, determines the
        purposes and means of the processing of consumers' personal information,
        that does business in the State of California.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Company</Text> (referred
        to as either "the Company", "We", "Us" or "Our" in this Agreement)
        refers to Geronimo Live, llc, 449 N. Robertson Boulevard Los Angeles, CA
        90048.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Consumer</Text>, for the
        purpose of the CCPA (California Consumer Privacy Act), means a natural
        person who is a California resident. A resident, as defined in the law,
        includes (1) every individual who is in the USA for other than a
        temporary or transitory purpose, and (2) every individual who is
        domiciled in the USA who is outside the USA for a temporary or
        transitory purpose.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Country</Text> refers to:
        California, United States
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Device</Text> means any
        device that can access the Service such as a computer, a cellphone or a
        digital tablet.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Do Not Track</Text> (DNT)
        is a concept that has been promoted by US regulatory authorities, in
        particular the U.S. Federal Trade Commission (FTC), for the Internet
        industry to develop and implement a mechanism for allowing internet
        users to control the tracking of their online activities across
        websites.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Personal Data</Text> is
        any information that relates to an identified or identifiable
        individual.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        For the purposes of the CCPA, Personal Data means any information that
        identifies, relates to, describes or is capable of being associated
        with, or could reasonably be linked, directly or indirectly, with You.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Sale</Text>, for the
        purpose of the CCPA (California Consumer Privacy Act), means selling,
        renting, releasing, disclosing, disseminating, making available,
        transferring, or otherwise communicating orally, in writing, or by
        electronic or other means, a Consumer's personal information to another
        business or a third party for monetary or other valuable consideration.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Service</Text> refers to
        the Application.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Service Provider</Text>{' '}
        means any natural or legal person who processes the data on behalf of
        the Company. It refers to third-party companies or individuals employed
        by the Company to facilitate the Service, to provide the Service on
        behalf of the Company, to perform services related to the Service or to
        assist the Company in analyzing how the Service is used.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'} Third-party Social Media Service
        </Text>{' '}
        refers to any website or any social network website through which a User
        can log in or create an account to use the Service.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Usage Data</Text> refers
        to data collected automatically, either generated by the use of the
        Service or from the Service infrastructure itself (for example, the
        duration of a page visit).
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} You</Text> means the
        individual accessing or using the Service, or the company, or other
        legal entity on behalf of which such individual is accessing or using
        the Service, as applicable.
      </Text>

      <Text style={tailwind('mt-6 text-2xl text-gray-800 font-bold')}>
        Collecting and Using Your Personal Data
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Types of Data Collected
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Personal Data
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        While using Our Service, We may ask You to provide Us with certain
        personally identifiable information that can be used to contact or
        identify You. Personally identifiable information may include, but is
        not limited to:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Email address
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} First name and last name
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Phone number
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Address, State, Province, ZIP/Postal code, City
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Usage Data
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Usage Data
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Usage Data is collected automatically when using the Service.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Usage Data may include information such as Your Device's Internet
        Protocol address (e.g. IP address), browser type, browser version, the
        pages of our Service that You visit, the time and date of Your visit,
        the time spent on those pages, unique device identifiers and other
        diagnostic data.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        When You access the Service by or through a mobile device, We may
        collect certain information automatically, including, but not limited
        to, the type of mobile device You use, Your mobile device unique ID, the
        IP address of Your mobile device, Your mobile operating system, the type
        of mobile Internet browser You use, unique device identifiers and other
        diagnostic data.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We may also collect information that Your browser sends whenever You
        visit our Service or when You access the Service by or through a mobile
        device.
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Information from Third-Party Social Media Services
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The Company allows You to create an account and log in to use the
        Service through the following Third-party Social Media Services:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Google
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Facebook
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Twitter
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        If You decide to register through or otherwise grant us access to a
        Third-Party Social Media Service, We may collect Personal data that is
        already associated with Your Third-Party Social Media Service's account,
        such as Your name, Your email address, Your activities or Your contact
        list associated with that account.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You may also have the option of sharing additional information with the
        Company through Your Third-Party Social Media Service's account. If You
        choose to provide such information and Personal Data, during
        registration or otherwise, You are giving the Company permission to use,
        share, and store it in a manner consistent with this Privacy Policy.
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Use of Your Personal Data
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The Company may use Personal Data for the following purposes:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'} To provide and maintain our Service
        </Text>
        , including to monitor the usage of our Service.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'} To manage Your Account:{' '}
        </Text>
        to manage Your registration as a user of the Service. The Personal Data
        You provide can give You access to different functionalities of the
        Service that are available to You as a registered user.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'} For the performance of a contract:{' '}
        </Text>
        the development, compliance and undertaking of the purchase contract for
        the products, items or services You have purchased or of any other
        contract with Us through the Service.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} To contact You: </Text>
        To contact You by email, telephone calls, SMS, or other equivalent forms
        of electronic communication, such as a mobile application's push
        notifications regarding updates or informative communications related to
        the functionalities, products or contracted services, including the
        security updates, when necessary or reasonable for their implementation.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} To provide You </Text>
        with news, special offers and general information about other goods,
        services and events which we offer that are similar to those that you
        have already purchased or enquired about unless You have opted not to
        receive such information.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'} To manage Your requests:{' '}
        </Text>
        To attend and manage Your requests to Us.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'} For business transfers:{' '}
        </Text>
        We may use Your information to evaluate or conduct a merger,
        divestiture, restructuring, reorganization, dissolution, or other sale
        or transfer of some or all of Our assets, whether as a going concern or
        as part of bankruptcy, liquidation, or similar proceeding, in which
        Personal Data held by Us about our Service users is among the assets
        transferred.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'} For other purposes:{' '}
        </Text>
        We may use Your information for other purposes, such as data analysis,
        identifying usage trends, determining the effectiveness of our
        promotional campaigns and to evaluate and improve our Service, products,
        services, marketing and your experience.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We may share Your personal information in the following situations:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'} With Service Providers:{' '}
        </Text>
        We may share Your personal information with Service Providers to monitor
        and analyze the use of our Service, for payment processing, to contact
        You.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'} For business transfers:{' '}
        </Text>
        We may share or transfer Your personal information in connection with,
        or during negotiations of, any merger, sale of Company assets,
        financing, or acquisition of all or a portion of Our business to another
        company.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} With Affiliates: </Text>
        We may share Your information with Our affiliates, in which case we will
        require those affiliates to honor this Privacy Policy. Affiliates
        include Our parent company and any other subsidiaries, joint venture
        partners or other companies that We control or that are under common
        control with Us.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'} With business partners:{' '}
        </Text>
        We may share Your information with Our business partners to offer You
        certain products, services or promotions.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} With other users: </Text>
        when You share personal information or otherwise interact in the public
        areas with other users, such information may be viewed by all users and
        may be publicly distributed outside. If You interact with other users or
        register through a Third-Party Social Media Service, Your contacts on
        the Third-Party Social Media Service may see Your name, profile,
        pictures and description of Your activity. Similarly, other users will
        be able to view descriptions of Your activity, communicate with You and
        view Your profile.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'} With Your consent:{' '}
        </Text>
        We may disclose Your personal information for any other purpose with
        Your consent.
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Retention of Your Personal Data
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The Company will retain Your Personal Data only for as long as is
        necessary for the purposes set out in this Privacy Policy. We will
        retain and use Your Personal Data to the extent necessary to comply with
        our legal obligations (for example, if we are required to retain your
        data to comply with applicable laws), resolve disputes, and enforce our
        legal agreements and policies.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The Company will also retain Usage Data for internal analysis purposes.
        Usage Data is generally retained for a shorter period of time, except
        when this data is used to strengthen the security or to improve the
        functionality of Our Service, or We are legally obligated to retain this
        data for longer time periods.
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Transfer of Your Personal Data
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Your information, including Personal Data, is processed at the Company's
        operating offices and in any other places where the parties involved in
        the processing are located. It means that this information may be
        transferred to — and maintained on — computers located outside of Your
        state, province, country or other governmental jurisdiction where the
        data protection laws may differ than those from Your jurisdiction.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Your consent to this Privacy Policy followed by Your submission of such
        information represents Your agreement to that transfer.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The Company will take all steps reasonably necessary to ensure that Your
        data is treated securely and in accordance with this Privacy Policy and
        no transfer of Your Personal Data will take place to an organization or
        a country unless there are adequate controls in place including the
        security of Your data and other personal information.
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Disclosure of Your Personal Data
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Business Transactions
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        If the Company is involved in a merger, acquisition or asset sale, Your
        Personal Data may be transferred. We will provide notice before Your
        Personal Data is transferred and becomes subject to a different Privacy
        Policy.
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Law enforcement
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Under certain circumstances, the Company may be required to disclose
        Your Personal Data if required to do so by law or in response to valid
        requests by public authorities (e.g. a court or a government agency).
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Other legal requirements
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The Company may disclose Your Personal Data in the good faith belief
        that such action is necessary to:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Comply with a legal obligation
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Protect and defend the rights or property of the Company
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Prevent or investigate possible wrongdoing in connection with
        the Service
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Protect the personal safety of Users of the Service or the
        public
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Protect against legal liability
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Security of Your Personal Data
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The security of Your Personal Data is important to Us, but remember that
        no method of transmission over the Internet, or method of electronic
        storage is 100% secure. While We strive to use commercially acceptable
        means to protect Your Personal Data, We cannot guarantee its absolute
        security.
      </Text>

      <Text style={tailwind('mt-4 text-2xl text-gray-800 font-bold')}>
        Detailed Information on the Processing of Your Personal Data
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The Service Providers We use may have access to Your Personal Data.
        These third-party vendors collect, store, use, process and transfer
        information about Your activity on Our Service in accordance with their
        Privacy Policies.
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Analytics
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We may use third-party Service providers to monitor and analyze the use
        of our Service.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-bold')}>
        {'\u2B24'} Google Analytics
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Google Analytics is a web analytics service offered by Google that
        tracks and reports website traffic. Google uses the data collected to
        track and monitor the use of our Service. This data is shared with other
        Google services. Google may use the collected data to contextualize and
        personalize the ads of its own advertising network.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        You may opt-out of certain Google Analytics features through your mobile
        device settings, such as your device advertising settings or by
        following the instructions provided by Google in their Privacy Policy:
        https://policies.google.com/privacy
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        For more information on the privacy practices of Google, please visit
        the Google Privacy & Terms web page: https://policies.google.com/privacy
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Payments
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We may provide paid products and/or services within the Service. In that
        case, we may use third-party services for payment processing (e.g.
        payment processors).
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We will not store or collect Your payment card details. That information
        is provided directly to Our third-party payment processors whose use of
        Your personal information is governed by their Privacy Policy. These
        payment processors adhere to the standards set by PCI-DSS as managed by
        the PCI Security Standards Council, which is a joint effort of brands
        like Visa, Mastercard, American Express and Discover. PCI-DSS
        requirements help ensure the secure handling of payment information.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-bold')}>
        {'\u2B24'} Stripe
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Their Privacy Policy can be viewed at https://stripe.com/us/privacy
      </Text>

      <Text style={tailwind('mt-4 text-2xl text-gray-800 font-bold')}>
        CCPA Privacy
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        This privacy notice section for California residents supplements the
        information contained in Our Privacy Policy and it applies solely to all
        visitors, users, and others who reside in the State of California.
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Categories of Personal Information Collected
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We collect information that identifies, relates to, describes,
        references, is capable of being associated with, or could reasonably be
        linked, directly or indirectly, with a particular Consumer or Device.
        The following is a list of categories of personal information which we
        may collect or may have been collected from California residents within
        the last twelve (12) months.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Please note that the categories and examples provided in the list below
        are those defined in the CCPA. This does not mean that all examples of
        that category of personal information were in fact collected by Us, but
        reflects our good faith belief to the best of our knowledge that some of
        that information from the applicable category may be and may have been
        collected. For example, certain categories of personal information would
        only be collected if You provided such personal information directly to
        Us.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-bold')}>
        {'\u2B24'} Category A: Identifiers.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Examples: A real name, alias, postal address, unique personal
        identifier, online identifier, Internet Protocol address, email address,
        account name, driver's license number, passport number, or other similar
        identifiers.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Collected: Yes.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-bold')}>
        {'\u2B24'} Category B: Personal information categories listed in the
        California Customer Records statute (Cal. Civ. Code § 1798.80(e)).
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Examples: A name, signature, Social Security number, physical
        characteristics or description, address, telephone number, passport
        number, driver's license or state identification card number, insurance
        policy number, education, employment, employment history, bank account
        number, credit card number, debit card number, or any other financial
        information, medical information, or health insurance information. Some
        personal information included in this category may overlap with other
        categories.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Collected: Yes.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-bold')}>
        {'\u2B24'} Category C: Protected classification characteristics under
        California or federal law.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Examples: Age (40 years or older), race, color, ancestry, national
        origin, citizenship, religion or creed, marital status, medical
        condition, physical or mental disability, sex (including gender, gender
        identity, gender expression, pregnancy or childbirth and related medical
        conditions), sexual orientation, veteran or military status, genetic
        information (including familial genetic information).
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Collected: No.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-bold')}>
        {'\u2B24'} Category D: Commercial information.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Examples: Records and history of products or services purchased or
        considered.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Collected: Yes.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-bold')}>
        {'\u2B24'} Category E: Biometric information.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Examples: Genetic, physiological, behavioral, and biological
        characteristics, or activity patterns used to extract a template or
        other identifier or identifying information, such as, fingerprints,
        faceprints, and voiceprints, iris or retina scans, keystroke, gait, or
        other physical patterns, and sleep, health, or exercise data.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Collected: No.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-bold')}>
        {'\u2B24'} Category F: Internet or other similar network activity.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Examples: Interaction with our Service or advertisement.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Collected: Yes.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-bold')}>
        {'\u2B24'} Category G: Geolocation data.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Examples: Approximate physical location.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Collected: No.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-bold')}>
        {'\u2B24'} Category H: Sensory data.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Examples: Audio, electronic, visual, thermal, olfactory, or similar
        information.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Collected: No.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-bold')}>
        {'\u2B24'} Category I: Professional or employment-related information.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Examples: Current or past job history or performance evaluations.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Collected: No.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-bold')}>
        {'\u2B24'} Category J: Non-public education information (per the Family
        Educational Rights and Privacy Act (20 U.S.C. Section 1232g, 34 C.F.R.
        Part 99)).
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Examples: Education records directly related to a student maintained by
        an educational institution or party acting on its behalf, such as
        grades, transcripts, class lists, student schedules, student
        identification codes, student financial information, or student
        disciplinary records.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Collected: No.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-bold')}>
        {'\u2B24'} Category K: Inferences drawn from other personal information.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Examples: Profile reflecting a person's preferences, characteristics,
        psychological trends, predispositions, behavior, attitudes,
        intelligence, abilities, and aptitudes.
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        Collected: No.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Under CCPA, personal information does not include:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Publicly available information from government records
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Deidentified or aggregated consumer information
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Information excluded from the CCPA's scope, such as:
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Health or medical information covered by the Health Insurance
        Portability and Accountability Act of 1996 (HIPAA) and the California
        Confidentiality of Medical Information Act (CMIA) or clinical trial data
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Personal Information covered by certain sector-specific
        privacy laws, including the Fair Credit Reporting Act (FRCA), the
        Gramm-Leach-Bliley Act (GLBA) or California Financial Information
        Privacy Act (FIPA), and the Driver's Privacy Protection Act of 1994
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Sources of Personal Information
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We obtain the categories of personal information listed above from the
        following categories of sources:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Directly from You</Text>.
        For example, from the forms You complete on our Service, preferences You
        express or provide through our Service, or from Your purchases on our
        Service.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'} Indirectly from You
        </Text>
        . For example, from observing Your activity on our Service.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'} Automatically from You
        </Text>
        . For example, through cookies We or our Service Providers set on Your
        Device as You navigate through our Service.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'} From Service Providers
        </Text>
        . For example, third-party vendors to monitor and analyze the use of our
        Service, third-party vendors for payment processing, or other
        third-party vendors that We use to provide the Service to You.
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Use of Personal Information for Business Purposes or Commercial Purposes
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We may use or disclose personal information We collect for "business
        purposes" or "commercial purposes" (as defined under the CCPA), which
        may include the following examples:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} To operate our Service and provide You with our Service.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} To provide You with support and to respond to Your inquiries,
        including to investigate and address Your concerns and monitor and
        improve our Service.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} To fulfill or meet the reason You provided the information.
        For example, if You share Your contact information to ask a question
        about our Service, We will use that personal information to respond to
        Your inquiry. If You provide Your personal information to purchase a
        product or service, We will use that information to process Your payment
        and facilitate delivery.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} To respond to law enforcement requests and as required by
        applicable law, court order, or governmental regulations.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} As described to You when collecting Your personal information
        or as otherwise set forth in the CCPA.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} For internal administrative and auditing purposes.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} To detect security incidents and protect against malicious,
        deceptive, fraudulent or illegal activity, including, when necessary, to
        prosecute those responsible for such activities.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Please note that the examples provided above are illustrative and not
        intended to be exhaustive. For more details on how we use this
        information, please refer to the "Use of Your Personal Data" section.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        If We decide to collect additional categories of personal information or
        use the personal information We collected for materially different,
        unrelated, or incompatible purposes We will update this Privacy Policy.
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Disclosure of Personal Information for Business Purposes or Commercial
        Purposes
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We may use or disclose and may have used or disclosed in the last twelve
        (12) months the following categories of personal information for
        business or commercial purposes:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Category A: Identifiers
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Category B: Personal information categories listed in the
        California Customer Records statute (Cal. Civ. Code § 1798.80(e))
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Category D: Commercial information
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Category F: Internet or other similar network activity
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Please note that the categories listed above are those defined in the
        CCPA. This does not mean that all examples of that category of personal
        information were in fact disclosed, but reflects our good faith belief
        to the best of our knowledge that some of that information from the
        applicable category may be and may have been disclosed.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        When We disclose personal information for a business purpose or a
        commercial purpose, We enter a contract that describes the purpose and
        requires the recipient to both keep that personal information
        confidential and not use it for any purpose except performing the
        contract.
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Sale of Personal Information
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        As defined in the CCPA, "sell" and "sale" mean selling, renting,
        releasing, disclosing, disseminating, making available, transferring, or
        otherwise communicating orally, in writing, or by electronic or other
        means, a consumer's personal information by the business to a third
        party for valuable consideration. This means that We may have received
        some kind of benefit in return for sharing personal information, but not
        necessarily a monetary benefit.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Please note that the categories listed below are those defined in the
        CCPA. This does not mean that all examples of that category of personal
        information were in fact sold, but reflects our good faith belief to the
        best of our knowledge that some of that information from the applicable
        category may be and may have been shared for value in return.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We may sell and may have sold in the last twelve (12) months the
        following categories of personal information:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Category A: Identifiers
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Category B: Personal information categories listed in the
        California Customer Records statute (Cal. Civ. Code § 1798.80(e))
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Category D: Commercial information
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Category F: Internet or other similar network activity
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Share of Personal Information
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We may share Your personal information identified in the above
        categories with the following categories of third parties:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Service Providers
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Payment processors
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Our affiliates
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Our business partners
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Third party vendors to whom You or Your agents authorize Us
        to disclose Your personal information in connection with products or
        services We provide to You
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Sale of Personal Information of Minors Under 16 Years of Age
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We do not sell the personal information of Consumers We actually know
        are less than 16 years of age, unless We receive affirmative
        authorization (the "right to opt-in") from either the Consumer who is
        between 13 and 16 years of age, or the parent or guardian of a Consumer
        less than 13 years of age. Consumers who opt-in to the sale of personal
        information may opt-out of future sales at any time. To exercise the
        right to opt-out, You (or Your authorized representative) may submit a
        request to Us by contacting Us.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        If You have reason to believe that a child under the age of 13 (or 16)
        has provided Us with personal information, please contact Us with
        sufficient detail to enable Us to delete that information.
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Your Rights under the CCPA
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The CCPA provides California residents with specific rights regarding
        their personal information. If You are a resident of California, You
        have the following rights:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'} The right to notice.{' '}
        </Text>
        You have the right to be notified which categories of Personal Data are
        being collected and the purposes for which the Personal Data is being
        used.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'} The right to request.{' '}
        </Text>
        Under CCPA, You have the right to request that We disclose information
        to You about Our collection, use, sale, disclosure for business purposes
        and share of personal information. Once We receive and confirm Your
        request, We will disclose to You:
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} The categories of personal information We collected about You
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} The categories of sources for the personal information We
        collected about You
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Our business or commercial purpose for collecting or selling
        that personal information
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} The categories of third parties with whom We share that
        personal information
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} The specific pieces of personal information We collected
        about You
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} If we sold Your personal information or disclosed Your
        personal information for a business purpose, We will disclose to You:
      </Text>

      <Text style={tailwind('mt-4 ml-20 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} The categories of personal information categories sold
      </Text>

      <Text style={tailwind('mt-4 ml-20 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} The categories of personal information categories disclosed
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'}
          The right to say no to the sale of Personal Data (opt-out).{' '}
        </Text>
        You have the right to direct Us to not sell Your personal information.
        To submit an opt-out request please contact Us.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'}
          The right to delete Personal Data.{' '}
        </Text>
        You have the right to request the deletion of Your Personal Data,
        subject to certain exceptions. Once We receive and confirm Your request,
        We will delete (and direct Our Service Providers to delete) Your
        personal information from our records, unless an exception applies. We
        may deny Your deletion request if retaining the information is necessary
        for Us or Our Service Providers to:
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Complete the transaction for which We collected the personal
        information, provide a good or service that You requested, take actions
        reasonably anticipated within the context of our ongoing business
        relationship with You, or otherwise perform our contract with You.
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Detect security incidents, protect against malicious,
        deceptive, fraudulent, or illegal activity, or prosecute those
        responsible for such activities.
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Debug products to identify and repair errors that impair
        existing intended functionality.
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Exercise free speech, ensure the right of another consumer to
        exercise their free speech rights, or exercise another right provided
        for by law.
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Comply with the California Electronic Communications Privacy
        Act (Cal. Penal Code § 1546 et. seq.).
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Engage in public or peer-reviewed scientific, historical, or
        statistical research in the public interest that adheres to all other
        applicable ethics and privacy laws, when the information's deletion may
        likely render impossible or seriously impair the research's achievement,
        if You previously provided informed consent.
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Enable solely internal uses that are reasonably aligned with
        consumer expectations based on Your relationship with Us.
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Comply with a legal obligation.
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Make other internal and lawful uses of that information that
        are compatible with the context in which You provided it.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'}
          The right not to be discriminated against.{' '}
        </Text>
        You have the right not to be discriminated against for exercising any of
        Your consumer's rights, including by:
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Denying goods or services to You
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Charging different prices or rates for goods or services,
        including the use of discounts or other benefits or imposing penalties
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Providing a different level or quality of goods or services
        to You
      </Text>

      <Text style={tailwind('mt-4 ml-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Suggesting that You will receive a different price or rate
        for goods or services or a different level or quality of goods or
        services
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Exercising Your CCPA Data Protection Rights
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        In order to exercise any of Your rights under the CCPA, and if You are a
        California resident, You can contact Us:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} By email: privacypolicy@geromimolive.com
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Only You, or a person registered with the California Secretary of State
        that You authorize to act on Your behalf, may make a verifiable request
        related to Your personal information.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Your request to Us must:
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Provide sufficient information that allows Us to reasonably
        verify You are the person about whom We collected personal information
        or an authorized representative
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Describe Your request with sufficient detail that allows Us
        to properly understand, evaluate, and respond to it
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We cannot respond to Your request or provide You with the required
        information if we cannot:
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Verify Your identity or authority to make the request
      </Text>

      <Text style={tailwind('mt-4 ml-8 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} And confirm that the personal information relates to You
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We will disclose and deliver the required information free of charge
        within 45 days of receiving Your verifiable request. The time period to
        provide the required information may be extended once by an additional
        45 days when reasonable necessary and with prior notice.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Any disclosures We provide will only cover the 12-month period preceding
        the verifiable request's receipt.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        For data portability requests, We will select a format to provide Your
        personal information that is readily useable and should allow You to
        transmit the information from one entity to another entity without
        hindrance.
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Do Not Sell My Personal Information
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You have the right to opt-out of the sale of Your personal information.
        Once We receive and confirm a verifiable consumer request from You, we
        will stop selling Your personal information. To exercise Your right to
        opt-out, please contact Us.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The Service Providers we partner with (for example, our analytics or
        advertising partners) may use technology on the Service that sells
        personal information as defined by the CCPA law. If you wish to opt out
        of the use of Your personal information for interest-based advertising
        purposes and these potential sales as defined under CCPA law, you may do
        so by following the instructions below.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Please note that any opt out is specific to the browser You use. You may
        need to opt out on every browser that You use.
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Website
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You can opt out of receiving ads that are personalized as served by our
        Service Providers by following our instructions presented on the
        Service:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} The NAI's opt-out platform:
        http://www.networkadvertising.org/choices/
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} The EDAA's opt-out platform http://www.youronlinechoices.com/
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} The DAA's opt-out platform:
        http://optout.aboutads.info/?c=2&lang=EN
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The opt out will place a cookie on Your computer that is unique to the
        browser You use to opt out. If you change browsers or delete the cookies
        saved by your browser, You will need to opt out again.
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Mobile Devices
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Your mobile device may give You the ability to opt out of the use of
        information about the apps You use in order to serve You ads that are
        targeted to Your interests:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} "Opt out of Interest-Based Ads" or "Opt out of Ads
        Personalization" on Android devices
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} "Limit Ad Tracking" on iOS devices
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You can also stop the collection of location information from Your
        mobile device by changing the preferences on Your mobile device.
      </Text>

      <Text style={tailwind('mt-4 text-2xl text-gray-800 font-bold')}>
        "Do Not Track" Policy as Required by California Online Privacy
        Protection Act (CalOPPA)
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Our Service does not respond to Do Not Track signals.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        However, some third party websites do keep track of Your browsing
        activities. If You are visiting such websites, You can set Your
        preferences in Your web browser to inform websites that You do not want
        to be tracked. You can enable or disable DNT by visiting the preferences
        or settings page of Your web browser.
      </Text>

      <Text style={tailwind('mt-4 text-2xl text-gray-800 font-bold')}>
        Children's Privacy
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Our Service does not address anyone under the age of 13. We do not
        knowingly collect personally identifiable information from anyone under
        the age of 13. If You are a parent or guardian and You are aware that
        Your child has provided Us with Personal Data, please contact Us. If We
        become aware that We have collected Personal Data from anyone under the
        age of 13 without verification of parental consent, We take steps to
        remove that information from Our servers.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        If We need to rely on consent as a legal basis for processing Your
        information and Your country requires consent from a parent, We may
        require Your parent's consent before We collect and use that
        information.
      </Text>

      <Text style={tailwind('mt-4 text-2xl text-gray-800 font-bold')}>
        Your California Privacy Rights (California's Shine the Light law)
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Under California Civil Code Section 1798 (California's Shine the Light
        law), California residents with an established business relationship
        with us can request information once a year about sharing their Personal
        Data with third parties for the third parties' direct marketing
        purposes.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        If you'd like to request more information under the California Shine the
        Light law, and if You are a California resident, You can contact Us
        using the contact information provided below.
      </Text>

      <Text style={tailwind('mt-4 text-2xl text-gray-800 font-bold')}>
        California Privacy Rights for Minor Users (California Business and
        Professions Code Section 22581)
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        California Business and Professions Code section 22581 allow California
        residents under the age of 18 who are registered users of online sites,
        services or applications to request and obtain removal of content or
        information they have publicly posted.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        To request removal of such data, and if You are a California resident,
        You can contact Us using the contact information provided below, and
        include the email address associated with Your account.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Be aware that Your request does not guarantee complete or comprehensive
        removal of content or information posted online and that the law may not
        permit or require removal in certain circumstances.
      </Text>

      <Text style={tailwind('mt-4 text-2xl text-gray-800 font-bold')}>
        Links to Other Websites
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Our Service may contain links to other websites that are not operated by
        Us. If You click on a third party link, You will be directed to that
        third party's site. We strongly advise You to review the Privacy Policy
        of every site You visit.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We have no control over and assume no responsibility for the content,
        privacy policies or practices of any third party sites or services.
      </Text>

      <Text style={tailwind('mt-4 text-2xl text-gray-800 font-bold')}>
        Changes to this Privacy Policy
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We may update Our Privacy Policy from time to time. We will notify You
        of any changes by posting the new Privacy Policy on this page.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We will let You know via email and/or a prominent notice on Our Service,
        prior to the change becoming effective and update the "Last updated"
        date at the top of this Privacy Policy.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You are advised to review this Privacy Policy periodically for any
        changes. Changes to this Privacy Policy are effective when they are
        posted on this page.
      </Text>

      <Text style={tailwind('mt-4 text-2xl text-gray-800 font-bold')}>
        Contact Us
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        If you have any questions about this Privacy Policy, You can contact us:
      </Text>

      <Text
        style={tailwind('mt-4 ml-4 mb-12 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} By email: privacypolicy@geromimolive.com
      </Text>

      {/* OLD POLICIES */}
      {/* <Text style={tailwind("text-lg text-black font-bold")}>
                1. INTRODUCTION 1.1. PURPOSE OF POLICY.
            </Text>
            <Text style={tailwind("text-lg text-black pb-10")}>
                Geronimo (“Geronimo,” also referred to herein as “us” or “we”)
                is committed to respecting the privacy rights of visitors to and
                users of (a) the website located at www.geronimolive.com
                (together with any other Geronimo websites where we have posted
                this Privacy Policy, the “Sites”), and (b) the Geronimo
                application (together with any mobile products offered in
                connection with Geronimo application or any Site, the
                “Application”). As used in this Privacy Policy, “Services”
                refers to the Sites, any Application, and the content, software,
                and features that you can access and use from any of the
                foregoing. We created this Privacy Policy (this “Policy”) to
                give you confidence as you visit or use the Sites or the
                Application, and to demonstrate our commitment to fair
                information practices and the protection of privacy. This Policy
                is only applicable to the Sites, the Application, and the other
                Services. This Policy does not apply to any third-party websites
                that you may be able to access from the Sites or the
                Application, each of which may have data collection and use
                practices and policies that differ materially from this Policy,
                nor does it apply to any services that may be offered by our
                business partners, where your personally identifiable
                information is collected by anyone other than Livby. If you have
                any questions concerning the Sites, the Application, our other
                Services, this Policy, or anything related to any of the
                foregoing, we can be reached at the following email address:
                hello@livby.live
            </Text> */}
    </ScrollView>
  );
}
