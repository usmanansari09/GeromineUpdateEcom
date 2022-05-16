import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Button from '../Button';
import Modal from 'react-native-modal';
import Input from '../Input';
import {getColor, tailwind} from '@/common/tailwind';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
// import SendBirdDesk from 'sendbird-desk';

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  //   /**
  //    * @type {[supportTicket:SendBirdDesk.Ticket]}
  //    */
  const [supportTicket, setSupportTicket] = useState(null);
  function handlePress() {
    // SendBirdDesk.Ticket.create(
    //   'Sample Test Ticket',
    //   'Geronimo Seller',
    //   (ticket, error) => {
    //     if (error) {
    //       // Handle error.
    //       console.log('error :>> ', error);
    //       return;
    //     }
    //     // The ticket is created.
    //     // The customer and agents can chat with each other by sending a message through the ticket.channel.sendUserMessage() or sendFileMessage().
    //     // The ticket.channel property indicates the group channel object within the ticket.
    //     console.log('ticket :>> ', ticket);
    //     setSupportTicket(supportTicket);
    //   },
    // );
  }
  return (
    <View style={tailwind('absolute pb-4 top-0 right-0')}>
      <Modal
        isVisible={isOpen}
        onBackButtonPress={() => setIsOpen(false)}
        swipeDirection={['down']}
        onSwipeComplete={() => setIsOpen(false)}>
        <View style={tailwind('flex-1 bg-white overflow-hidden rounded-2xl')}>
          <View
            style={tailwind(
              'bg-brand-primary flex-row items-center px-4 py-2 justify-between',
            )}>
            <Text style={tailwind('text-white text-lg font-bold')}>
              Support Chat
            </Text>
            <Icon
              type="ionicon"
              name="close-outline"
              color={getColor('white')}
              style={tailwind('text-lg')}
              onPress={() => setIsOpen(false)}
            />
          </View>
          <View style={tailwind('flex-1')}>
            <Text>Content</Text>
            <Button onPress={handlePress} title="Create Ticket" />
          </View>
          <View>
            <Input containerStyle={tailwind('mb-0')} />
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={{
          ...tailwind(
            'bg-brand-primary rounded-full w-14 h-14 items-center justify-center',
          ),
        }}>
        <Icon
          type="ionicon"
          size={32}
          color={getColor('white')}
          name="chatbubble-ellipses-outline"
        />
      </TouchableOpacity>
    </View>
  );
}
