import {tailwind} from '@/common/tailwind';
import React from 'react';
import {View, Text} from 'react-native';
// import SendBird from "sendbird";

// /**
//  *
//  * @param {{message:SendBird.AdminMessage}} props
//  * @returns
//  */
export default function AdminMessage({message, position, timestamp, theme}) {
  return (
    <View style={[position, tailwind('mb-3 w-full ')]}>
      <View style={[position, tailwind('flex-row ')]}>
        <View style={[tailwind('flex-row '), {maxWidth: '75%', width: '100%'}]}>
          <View
            style={[tailwind('px-3 py-2 rounded-xl flex-1'), theme.background]}>
            <View style={tailwind('flex-row items-center')}>
              <Text style={[tailwind('text-sm font-bold'), theme.user]}>
                Geronimo Admin
              </Text>
              <View
                style={tailwind('w-1 mx-1 h-1 bg-brand-primary rounded-full')}
              />
              <Text style={[tailwind('text-sm'), theme.time]}>{timestamp}</Text>
            </View>
            <Text style={[tailwind('text-sm'), theme.message]}>{message}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
