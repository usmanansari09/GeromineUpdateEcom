import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import DatePicker from "react-native-date-picker";
import Modal from "react-native-modal";
import Input from "@/components/Input";
import { tailwind } from "@/common/tailwind";
import useUpdateEffect from "@/common/hooks/useUpdateEffect";
import { format } from "date-fns";

const formattingToken = "MM/dd/yyyy";
export default function DateOfBirth({ onChange, onBlur, error }) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const formattedDate = date ? format(new Date(date), formattingToken) : "";
  useUpdateEffect(() => {
    const formatted = date ? format(new Date(date), formattingToken) : "";
    onChange(formatted);
  }, [date]);

  return (
    <View>
      <Modal
        isVisible={showDatePicker}
        onBackButtonPress={() => setShowDatePicker(false)}
        onBackdropPress={() => setShowDatePicker(false)}
      >
        <View style={tailwind("bg-white rounded-xl overflow-hidden")}>
          <DatePicker
            date={date}
            onDateChange={setDate}
            mode="date"
            maximumDate={new Date()}
          />
        </View>
      </Modal>
      <Pressable onPress={() => setShowDatePicker(true)}>
        <View pointerEvents="none">
          <Input
            label="Date of Birth"
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={error}
            editable={false}
            type="underline"
            value={formattedDate}
          />
        </View>
      </Pressable>
    </View>
  );
}
