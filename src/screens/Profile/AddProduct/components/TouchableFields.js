/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import index from '@/navigation/';
import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

/**
 *
 * @param {UseMutationOptions} opts
 * @returns
 */

export default function TouchableFields(props) {
  const {onPress, value, label, placeholder, labelSize, fieldSize} = props;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={{marginVertical: 10}}>
          <Text style={StyleSheet.flatten(styles.label(labelSize))}>
            {label}
          </Text>
          <Text style={StyleSheet.flatten(styles.value(fieldSize))}>
            {value ? value : placeholder}
          </Text>
        </View>
        <View>
          <FontAwesomeIcon name="angle-right" style={styles.icon} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // top: 5,
    bottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  label: value => ({
    fontSize: value ? value : 16,
    lineHeight: 24,
    fontWeight: '700',
    marginVertical: 10,
  }),
  value: value => ({
    fontSize: value ? value : 20,
    color: 'rgb(156, 163, 175)',
    marginVertical: 3,
    // paddingLeft: index === 10 ? value : 20,
  }),
  icon: {marginTop: 40, fontSize: 30},
});
