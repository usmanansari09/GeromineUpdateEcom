import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {getColor, tailwind} from '@/common/tailwind';
// import SendBirdDesk from "sendbird-desk";
import SupportConversation from './components/SupportMessages';

/**
 *
 * TODO:
 * []-throttle ticket creation
 */
export default function SupportChat() {
  // /**
  //  * @type {[supportTicket:SendBirdDesk.Ticket]}
  //  */
  const [supportTicket, setSupportTicket] = useState(null);

  // useEffect(() => {
  //     SendBirdDesk.Ticket.getOpenedList(0, (openedTickets, error) => {
  //         if (error) throw error;
  //         console.log("openedTickets :>> ", openedTickets);
  //         setSupportTicket(openedTickets[0]);
  //         // offset += tickets.length; for the next tickets.
  //     });
  // }, []);
  useEffect(() => {
    // Disabled Temporarily
    // SendBirdDesk.Ticket.create(
    //     "Test Ticket" + Date.now(),
    //     "Geronimo Seller",
    //     function (newTicket, error) {
    //         if (!error) {
    //             console.log("newTicket :>> ", newTicket);
    //             setSupportTicket(newTicket);
    //             return;
    //         }
    //         console.log("error creating new ticket :>> ", error);
    //     }
    // );
  }, []);

  return (
    <View style={tailwind('flex-1 bg-white')}>
      {supportTicket?.channel === undefined ? (
        <View style={tailwind('justify-center items-center flex-1')}>
          <ActivityIndicator size="large" color={getColor('brand-primary')} />
        </View>
      ) : (
        <SupportConversation
          channel={supportTicket?.channel}
          ticket={supportTicket}
        />
      )}
    </View>
  );
}
