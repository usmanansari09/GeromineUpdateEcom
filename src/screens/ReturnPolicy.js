import {tailwind} from '@/common/tailwind';
import React, {useLayoutEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import StackHeader from '@/components/StackHeader';

export default function ReturnPolicy() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => {
        return <StackHeader props={{...props, title: 'Return Policy'}} />;
      },
    });
  }, [navigation]);
  return (
    <ScrollView
      style={tailwind('bg-gray-200 px-6 pt-6')}
      contentContainerStyle={tailwind('pb-10')}>
      <Text style={tailwind('text-2xl text-gray-800 font-bold')}>
        Terms and Conditions
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Last updated: February 06, 2021
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Please read these terms and conditions carefully before using Our
        Service.
      </Text>

      <Text style={tailwind('mt-4 text-2xl text-gray-800 font-bold')}>
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

      <Text style={tailwind('mt-5 text-xl text-gray-800 font-bold')}>
        Definitions
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        For the purposes of these Terms and Conditions:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Application </Text>
        means the software program provided by the Company downloaded by You on
        any electronic device, named Geronimo!
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Application Store </Text>
        means the digital distribution service operated and developed by Apple
        Inc. (Apple App Store) or Google Inc. (Google Play Store) in which the
        Application has been downloaded.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Affiliate </Text>
        means an entity that controls, is controlled by or is under common
        control with a party, where "control" means ownership of 50% or more of
        the shares, equity interest or other securities entitled to vote for
        election of directors or other managing authority.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Account </Text>
        means a unique account created for You to access our Service or parts of
        our Service.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Country </Text>
        refers to: California, United States
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Company </Text>
        (referred to as either "the Company", "We", "Us" or "Our" in this
        Agreement) refers to Geronimo Live, llc, 449 N. Robertson Boulevard Los
        Angeles CA 90048.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Content </Text>
        refers to content such as text, images, or other information that can be
        posted, uploaded, linked to or otherwise made available by You,
        regardless of the form of that content.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Device </Text>
        means any device that can access the Service such as a computer, a
        cellphone or a digital tablet.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Feedback </Text>
        means feedback, innovations or suggestions sent by You regarding the
        attributes, performance or features of our Service.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Goods </Text>
        refer to the items offered for sale on the Service.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} In-app Purchase </Text>
        refers to the purchase of a product, item, service or Subscription made
        through the Application and subject to these Terms and Conditions and/or
        the Application Store's own terms and conditions.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Orders </Text>
        mean a request by You to purchase Goods from Us.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Promotions </Text>
        refer to contests, sweepstakes or other promotions offered through the
        Service.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} Service </Text>
        refers to the Application.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'} Terms and Conditions{' '}
        </Text>
        (also referred as "Terms") mean these Terms and Conditions that form the
        entire agreement between You and the Company regarding the use of the
        Service.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>
          {'\u2B24'} Third-party Social Media Service{' '}
        </Text>
        means any services or content (including data, information, products or
        services) provided by a third-party that may be displayed, included or
        made available by the Service.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        <Text style={tailwind('font-bold')}>{'\u2B24'} You</Text> means the
        individual accessing or using the Service, or the company, or other
        legal entity on behalf of which such individual is accessing or using
        the Service, as applicable.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        Acknowledgment
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        These are the Terms and Conditions governing the use of this Service and
        the agreement that operates between You and the Company. These Terms and
        Conditions set out the rights and obligations of all users regarding the
        use of the Service.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Your access to and use of the Service is conditioned on Your acceptance
        of and compliance with these Terms and Conditions. These Terms and
        Conditions apply to all visitors, users and others who access or use the
        Service.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        By accessing or using the Service You agree to be bound by these Terms
        and Conditions. If You disagree with any part of these Terms and
        Conditions then You may not access the Service.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You represent that you are over the age of 18. The Company does not
        permit those under 18 to use the Service.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Your access to and use of the Service is also conditioned on Your
        acceptance of and compliance with the Privacy Policy of the Company. Our
        Privacy Policy describes Our policies and procedures on the collection,
        use and disclosure of Your personal information when You use the
        Application or the Website and tells You about Your privacy rights and
        how the law protects You. Please read Our Privacy Policy carefully
        before using Our Service.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        Placing Orders for Goods
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        By placing an Order for Goods through the Service, You warrant that You
        are legally capable of entering into binding contracts.
      </Text>

      <Text style={tailwind('mt-5 text-xl text-gray-800 font-bold')}>
        Your Information
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        If You wish to place an Order for Goods available on the Service, You
        may be asked to supply certain information relevant to Your Order
        including, without limitation, Your name, Your email, Your phone number,
        Your credit card number, the expiration date of Your credit card, Your
        billing address, and Your shipping information.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You represent and warrant that: (i) You have the legal right to use any
        credit or debit card(s) or other payment method(s) in connection with
        any Order; and that (ii) the information You supply to us is true,
        correct and complete.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        By submitting such information, You grant us the right to provide the
        information to payment processing third parties for purposes of
        facilitating the completion of Your Order.
      </Text>

      <Text style={tailwind('mt-5 text-xl text-gray-800 font-bold')}>
        Order Cancellation
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We reserve the right to refuse or cancel Your Order at any time for
        certain reasons including but not limited to:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Goods availability
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Errors in the description or prices for Goods
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Errors in Your Order
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We reserve the right to refuse or cancel Your Order if fraud or an
        unauthorized or illegal transaction is suspected.
      </Text>

      <Text style={tailwind('mt-5 text-xl text-gray-800 font-bold')}>
        Your Order Cancellation Rights
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Any Goods you purchase can only be returned in accordance with these
        Terms and Conditions and Our Returns Policy.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Our Returns Policy forms a part of these Terms and Conditions. Please
        read our Returns Policy to learn more about your right to cancel Your
        Order.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Your right to cancel an Order only applies to Goods that are returned in
        the same condition as You received them. You should also include all of
        the products instructions, documents and wrappings. Goods that are
        damaged or not in the same condition as You received them or which are
        worn simply beyond opening the original packaging will not be refunded.
        You should therefore take reasonable care of the purchased Goods while
        they are in Your possession.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We will reimburse You no later than 14 days from the day on which We
        receive the returned Goods. We will use the same means of payment as You
        used for the Order, and You will not incur any fees for such
        reimbursement.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You will not have any right to cancel an Order for the supply of any of
        the following Goods:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} The supply of Goods made to Your specifications or clearly
        personalized.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} The supply of Goods which according to their nature are not
        suitable to be returned, deteriorate rapidly or where the date of expiry
        is over.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} The supply of Goods which are not suitable for return due to
        health protection or hygiene reasons and were unsealed after delivery.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} The supply of Goods which are, after delivery, according to
        their nature, inseparably mixed with other items.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} The supply of digital content which is not supplied on a
        tangible medium if the performance has begun with Your prior express
        consent and You have acknowledged Your loss of cancellation right.
      </Text>

      <Text style={tailwind('mt-5 text-xl text-gray-800 font-bold')}>
        Availability, Errors and Inaccuracies
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We are constantly updating Our offerings of Goods on the Service. The
        Goods available on Our Service may be mispriced, described inaccurately,
        or unavailable, and We may experience delays in updating information
        regarding our Goods on the Service and in Our advertising on other
        websites.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We cannot and do not guarantee the accuracy or completeness of any
        information, including prices, product images, specifications,
        availability, and services. We reserve the right to change or update
        information and to correct errors, inaccuracies, or omissions at any
        time without prior notice.
      </Text>

      <Text style={tailwind('mt-5 text-xl text-gray-800 font-bold')}>
        Prices Policy
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The Company reserves the right to revise its prices at any time prior to
        accepting an Order.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The prices quoted may be revised by the Company subsequent to accepting
        an Order in the event of any occurrence affecting delivery caused by
        government action, variation in customs duties, increased shipping
        charges, higher foreign exchange costs and any other matter beyond the
        control of the Company. In that event, You will have the right to cancel
        Your Order.
      </Text>

      <Text style={tailwind('mt-5 text-xl text-gray-800 font-bold')}>
        Payments
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        All Goods purchased are subject to a one-time payment. Payment can be
        made through various payment methods we have available, such as Visa,
        MasterCard, Affinity Card, American Express cards or online payment
        methods (PayPal, for example).
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Payment cards (credit cards or debit cards) are subject to validation
        checks and authorization by Your card issuer. If we do not receive the
        required authorization, We will not be liable for any delay or
        non-delivery of Your Order.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        In-app Purchases
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The Application may include In-app Purchases that allow you to buy
        products, services or Subscriptions.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        More information about how you may be able to manage In-app Purchases
        using your Device may be set out in the Application Store's own terms
        and conditions or in your Device's Help settings.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        In-app Purchases can only be consumed within the Application. If you
        make a In-app Purchase, that In-app Purchase cannot be cancelled after
        you have initiated its download. In-app Purchases cannot be redeemed for
        cash or other consideration or otherwise transferred.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        If any In-app Purchase is not successfully downloaded or does not work
        once it has been successfully downloaded, we will, after becoming aware
        of the fault or being notified to the fault by You, investigate the
        reason for the fault. We will act reasonably in deciding whether to
        provide You with a replacement In-app Purchase or issue You with a patch
        to repair the fault. In no event will We charge You to replace or repair
        the In-app Purchase. In the unlikely event that we are unable to replace
        or repair the relevant In-app Purchase or are unable to do so within a
        reasonable period of time and without significant inconvenience to You,
        We will authorize the Application Store to refund You an amount up to
        the cost of the relevant In-app Purchase. Alternatively, if You wish to
        request a refund, You may do so by contacting the Application Store
        directly.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You acknowledge and agree that all billing and transaction processes are
        handled by the Application Store from where you downloaded the
        Application and are governed by that Application Store's own terms and
        conditions.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        If you have any payment related issues with In-app Purchases, then you
        need to contact the Application Store directly.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        Promotions
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Any Promotions made available through the Service may be governed by
        rules that are separate from these Terms.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        If You participate in any Promotions, please review the applicable rules
        as well as our Privacy policy. If the rules for a Promotion conflict
        with these Terms, the Promotion rules will apply.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        User Accounts
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        When You create an account with Us, You must provide Us information that
        is accurate, complete, and current at all times. Failure to do so
        constitutes a breach of the Terms, which may result in immediate
        termination of Your account on Our Service.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You are responsible for safeguarding the password that You use to access
        the Service and for any activities or actions under Your password,
        whether Your password is with Our Service or a Third-Party Social Media
        Service.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You agree not to disclose Your password to any third party. You must
        notify Us immediately upon becoming aware of any breach of security or
        unauthorized use of Your account.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You may not use as a username the name of another person or entity or
        that is not lawfully available for use, a name or trademark that is
        subject to any rights of another person or entity other than You without
        appropriate authorization, or a name that is otherwise offensive, vulgar
        or obscene.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        Content
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Your Right to Post Content
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Our Service allows You to post Content. You are responsible for the
        Content that You post to the Service, including its legality,
        reliability, and appropriateness.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        By posting Content to the Service, You grant Us the right and license to
        use, modify, publicly perform, publicly display, reproduce, and
        distribute such Content on and through the Service. You retain any and
        all of Your rights to any Content You submit, post or display on or
        through the Service and You are responsible for protecting those rights.
        You agree that this license includes the right for Us to make Your
        Content available to other users of the Service, who may also use Your
        Content subject to these Terms.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You represent and warrant that: (i) the Content is Yours (You own it) or
        You have the right to use it and grant Us the rights and license as
        provided in these Terms, and (ii) the posting of Your Content on or
        through the Service does not violate the privacy rights, publicity
        rights, copyrights, contract rights or any other rights of any person.
      </Text>

      <Text style={tailwind('mt-5 text-xl text-gray-800 font-bold')}>
        Content Restrictions
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The Company is not responsible for the content of the Service's users.
        You expressly understand and agree that You are solely responsible for
        the Content and for all activity that occurs under your account, whether
        done so by You or any third person using Your account.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You may not transmit any Content that is unlawful, offensive, upsetting,
        intended to disgust, threatening, libelous, defamatory, obscene or
        otherwise objectionable. Examples of such objectionable Content include,
        but are not limited to, the following:
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Unlawful or promoting unlawful activity.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Defamatory, discriminatory, or mean-spirited content,
        including references or commentary about religion, race, sexual
        orientation, gender, national/ethnic origin, or other targeted groups.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Spam, machine – or randomly – generated, constituting
        unauthorized or unsolicited advertising, chain letters, any other form
        of unauthorized solicitation, or any form of lottery or gambling.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Containing or installing any viruses, worms, malware, trojan
        horses, or other content that is designed or intended to disrupt,
        damage, or limit the functioning of any software, hardware or
        telecommunications equipment or to damage or obtain unauthorized access
        to any data or other information of a third person.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Infringing on any proprietary rights of any party, including
        patent, trademark, trade secret, copyright, right of publicity or other
        rights.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Impersonating any person or entity including the Company and
        its employees or representatives.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Violating the privacy of any third person.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} False information and features.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The Company reserves the right, but not the obligation, to, in its sole
        discretion, determine whether or not any Content is appropriate and
        complies with this Terms, refuse or remove this Content. The Company
        further reserves the right to make formatting and edits and change the
        manner any Content. The Company can also limit or revoke the use of the
        Service if You post such objectionable Content. As the Company cannot
        control all content posted by users and/or third parties on the Service,
        you agree to use the Service at your own risk. You understand that by
        using the Service You may be exposed to content that You may find
        offensive, indecent, incorrect or objectionable, and You agree that
        under no circumstances will the Company be liable in any way for any
        content, including any errors or omissions in any content, or any loss
        or damage of any kind incurred as a result of your use of any content.
      </Text>

      <Text style={tailwind('mt-5 text-xl text-gray-800 font-bold')}>
        Content Backups
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Although regular backups of Content are performed, the Company do not
        guarantee there will be no loss or corruption of data.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Corrupt or invalid backup points may be caused by, without limitation,
        Content that is corrupted prior to being backed up or that changes
        during the time a backup is performed.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The Company will provide support and attempt to troubleshoot any known
        or discovered issues that may affect the backups of Content. But You
        acknowledge that the Company has no liability related to the integrity
        of Content or the failure to successfully restore Content to a usable
        state.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You agree to maintain a complete and accurate copy of any Content in a
        location independent of the Service.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        Copyright Policy
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Intellectual Property Infringement
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We respect the intellectual property rights of others. It is Our policy
        to respond to any claim that Content posted on the Service infringes a
        copyright or other intellectual property infringement of any person.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        If You are a copyright owner, or authorized on behalf of one, and You
        believe that the copyrighted work has been copied in a way that
        constitutes copyright infringement that is taking place through the
        Service, You must submit Your notice in writing to the attention of our
        copyright agent via email at DMCA@geronimolive.com and include in Your
        notice a detailed description of the alleged infringement.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You may be held accountable for damages (including costs and attorneys'
        fees) for misrepresenting that any Content is infringing Your copyright.
      </Text>

      <Text style={tailwind('mt-5 text-xl text-gray-800 font-bold')}>
        DMCA Notice and DMCA Procedure for Copyright Infringement Claims
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You may submit a notification pursuant to the Digital Millennium
        Copyright Act (DMCA) by providing our Copyright Agent with the following
        information in writing (see 17 U.S.C 512(c)(3) for further detail):
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} An electronic or physical signature of the person authorized
        to act on behalf of the owner of the copyright's interest.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} A description of the copyrighted work that You claim has been
        infringed, including the URL (i.e., web page address) of the location
        where the copyrighted work exists or a copy of the copyrighted work.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Identification of the URL or other specific location on the
        Service where the material that You claim is infringing is located.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} Your address, telephone number, and email address.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} A statement by You that You have a good faith belief that the
        disputed use is not authorized by the copyright owner, its agent, or the
        law.
      </Text>

      <Text style={tailwind('mt-4 ml-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} A statement by You, made under penalty of perjury, that the
        above information in Your notice is accurate and that You are the
        copyright owner or authorized to act on the copyright owner's behalf.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You can contact our copyright agent via email at DMCA@geronimolive.com.
        Upon receipt of a notification, the Company will take whatever action,
        in its sole discretion, it deems appropriate, including removal of the
        challenged content from the Service.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        Intellectual Property
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The Service and its original content (excluding Content provided by You
        or other users), features and functionality are and will remain the
        exclusive property of the Company and its licensors.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The Service is protected by copyright, trademark, and other laws of both
        the Country and foreign countries.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Our trademarks and trade dress may not be used in connection with any
        product or service without the prior written consent of the Company.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        Your Feedback to Us
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You assign all rights, title and interest in any Feedback You provide
        the Company. If for any reason such assignment is ineffective, You agree
        to grant the Company a non-exclusive, perpetual, irrevocable, royalty
        free, worldwide right and license to use, reproduce, disclose,
        sub-license, distribute, modify and exploit such Feedback without
        restriction.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        Links to Other Websites
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Our Service may contain links to third-party web sites or services that
        are not owned or controlled by the Company.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The Company has no control over, and assumes no responsibility for, the
        content, privacy policies, or practices of any third party web sites or
        services. You further acknowledge and agree that the Company shall not
        be responsible or liable, directly or indirectly, for any damage or loss
        caused or alleged to be caused by or in connection with the use of or
        reliance on any such content, goods or services available on or through
        any such web sites or services.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We strongly advise You to read the terms and conditions and privacy
        policies of any third-party web sites or services that You visit.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        Termination
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We may terminate or suspend Your Account immediately, without prior
        notice or liability, for any reason whatsoever, including without
        limitation if You breach these Terms and Conditions.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Upon termination, Your right to use the Service will cease immediately.
        If You wish to terminate Your Account, You may simply discontinue using
        the Service.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        Limitation of Liability
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Notwithstanding any damages that You might incur, the entire liability
        of the Company and any of its suppliers under any provision of this
        Terms and Your exclusive remedy for all of the foregoing shall be
        limited to the amount actually paid by You through the Service or 100
        USD if You haven't purchased anything through the Service.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        To the maximum extent permitted by applicable law, in no event shall the
        Company or its suppliers be liable for any special, incidental,
        indirect, or consequential damages whatsoever (including, but not
        limited to, damages for loss of profits, loss of data or other
        information, for business interruption, for personal injury, loss of
        privacy arising out of or in any way related to the use of or inability
        to use the Service, third-party software and/or third-party hardware
        used with the Service, or otherwise in connection with any provision of
        this Terms), even if the Company or any supplier has been advised of the
        possibility of such damages and even if the remedy fails of its
        essential purpose.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Some states do not allow the exclusion of implied warranties or
        limitation of liability for incidental or consequential damages, which
        means that some of the above limitations may not apply. In these states,
        each party's liability will be limited to the greatest extent permitted
        by law.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        "AS IS" and "AS AVAILABLE" Disclaimer
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The Service is provided to You "AS IS" and "AS AVAILABLE" and with all
        faults and defects without warranty of any kind. To the maximum extent
        permitted under applicable law, the Company, on its own behalf and on
        behalf of its Affiliates and its and their respective licensors and
        service providers, expressly disclaims all warranties, whether express,
        implied, statutory or otherwise, with respect to the Service, including
        all implied warranties of merchantability, fitness for a particular
        purpose, title and non-infringement, and warranties that may arise out
        of course of dealing, course of performance, usage or trade practice.
        Without limitation to the foregoing, the Company provides no warranty or
        undertaking, and makes no representation of any kind that the Service
        will meet Your requirements, achieve any intended results, be compatible
        or work with any other software, applications, systems or services,
        operate without interruption, meet any performance or reliability
        standards or be error free or that any errors or defects can or will be
        corrected.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Without limiting the foregoing, neither the Company nor any of the
        company's provider makes any representation or warranty of any kind,
        express or implied: (i) as to the operation or availability of the
        Service, or the information, content, and materials or products included
        thereon; (ii) that the Service will be uninterrupted or error-free;
        (iii) as to the accuracy, reliability, or currency of any information or
        content provided through the Service; or (iv) that the Service, its
        servers, the content, or e-mails sent from or on behalf of the Company
        are free of viruses, scripts, trojan horses, worms, malware, timebombs
        or other harmful components.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Some jurisdictions do not allow the exclusion of certain types of
        warranties or limitations on applicable statutory rights of a consumer,
        so some or all of the above exclusions and limitations may not apply to
        You. But in such a case the exclusions and limitations set forth in this
        section shall be applied to the greatest extent enforceable under
        applicable law.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        Governing Law
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        The laws of the Country, excluding its conflicts of law rules, shall
        govern this Terms and Your use of the Service. Your use of the
        Application may also be subject to other local, state, national, or
        international laws.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        Disputes Resolution
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        If You have any concern or dispute about the Service, You agree to first
        try to resolve the dispute informally by contacting the Company.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        For European Union (EU) Users
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        If You are a European Union consumer, you will benefit from any
        mandatory provisions of the law of the country in which you are resident
        in.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        United States Legal Compliance
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        You represent and warrant that (i) You are not located in a country that
        is subject to the United States government embargo, or that has been
        designated by the United States government as a "terrorist supporting"
        country, and (ii) You are not listed on any United States government
        list of prohibited or restricted parties.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        Severability and Waiver
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Severability
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        If any provision of these Terms is held to be unenforceable or invalid,
        such provision will be changed and interpreted to accomplish the
        objectives of such provision to the greatest extent possible under
        applicable law and the remaining provisions will continue in full force
        and effect.
      </Text>

      <Text style={tailwind('mt-4 text-xl text-gray-800 font-bold')}>
        Waiver
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        Except as provided herein, the failure to exercise a right or to require
        performance of an obligation under this Terms shall not effect a party's
        ability to exercise such right or require such performance at any time
        thereafter nor shall be the waiver of a breach constitute a waiver of
        any subsequent breach.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        Translation Interpretation
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        These Terms and Conditions may have been translated if We have made them
        available to You on our Service. You agree that the original English
        text shall prevail in the case of a dispute.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        Changes to These Terms and Conditions
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        We reserve the right, at Our sole discretion, to modify or replace these
        Terms at any time. If a revision is material We will make reasonable
        efforts to provide at least 30 days' notice prior to any new terms
        taking effect. What constitutes a material change will be determined at
        Our sole discretion.
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        By continuing to access or use Our Service after those revisions become
        effective, You agree to be bound by the revised terms. If You do not
        agree to the new terms, in whole or in part, please stop using the
        website and the Service.
      </Text>

      <Text style={tailwind('mt-5 text-2xl text-gray-800 font-bold')}>
        Contact Us
      </Text>

      <Text style={tailwind('mt-4 text-lg text-gray-800 font-semibold')}>
        If you have any questions about these Terms and Conditions, You can
        contact us:
      </Text>

      <Text
        style={tailwind('mt-4 ml-4 mb-4 text-lg text-gray-800 font-semibold')}>
        {'\u2B24'} By email: terms@geronimolive.com
      </Text>

      {/* <Text style={tailwind("text-lg text-black")}>
                These Terms of Use (these “Terms”) represent a binding agreement
                between Geronimo, a California limited liability company
                (sometimes referred to herein as “Geronimo,” “us” or “we”) and
                you, a user of online or mobile products or services that we
                offer in connection with the Geronimo App, whether now existing
                or hereafter developed, and which may include, without
                limitation, the website located at www.geronimolive.com (the
                “Sites“), the Geronimo mobile applications (together with any
                other mobile products offered in connection with Geronimo or any
                Site, the “Application”), and any entertainment content,
                software, applications, other content or services provided in
                connection with any Site or the Application (the “Content,” and
                collectively with the Sites and the Application, the
                “Services”).
            </Text>
            <View style={tailwind("mt-6")}>
                <Text style={tailwind("text-lg text-black font-bold")}>
                    1. BINDING EFFECT.
                </Text>
                <Text style={tailwind("text-lg text-black")}>
                    This is a binding agreement. By using the Sites, the
                    Application, or the other Services, you agree to abide by
                    these Terms, as they may be amended by Livby from time to
                    time in its sole discretion. We may, in our sole discretion,
                    amend or revise these Terms at any time, and by continuing
                    to use any Site, th
                </Text>
            </View> */}
    </ScrollView>
  );
}
