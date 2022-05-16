import React from "react";
import Modal from "react-native-modal";
import { View, Text, Alert } from "react-native";
import { Button } from "@/components/index";
import { tailwind } from "@/common/tailwind";
import { useNavigation } from "@react-navigation/native";;

export default function DialogBoxModal({...props}) {
    const navigation = useNavigation();
    return (
        <Modal isVisible={true} 
               style={tailwind("items-center justify-center")}
        >
            <View style={tailwind(props.modContainerStyle)}
            >
                {props.modLabel.map(label => 
                    <Text key={label[1]} style={tailwind(label[0])}>
                        {label[1]}
                    </Text>
                )}

                <Button
                    title={props.btn1Txt}
                    size={props.btn1Size}
                    theme={props.btn1Theme}
                    containerStyle={tailwind(props.btn1ContainerStyle)}
                    onPress={() => {
                        if (props.btn1NavScreenDone) {
                            navigation.navigate(props.btn1Nav);
                        } else {
                            Alert.alert(
                                "Feature In Progress",
                                "Geronimo Shoppers screen is still in development",
                                [
                                    {
                                        text: "OK",
                                    },
                                ]
                            );
                            //Toast.show({text1: props.btn1Nav, type: "error"});
                        }
                    }}
                />

                <Button
                    onPress={() => {
                        if (props.btn2NavScreenDone) {
                            navigation.navigate(props.btn2Nav);
                        } else {
                            Alert.alert(
                                "Feature In Progress",
                                "Geronimo Shoppers screen is still in development",
                                [
                                    {
                                        text: "OK",
                                    },
                                ]
                            );
                            //Toast.show({text1: props.btn2Nav});
                        }
                    }}
                    title={props.btn2Txt}
                    size={props.btn2Size}
                    theme={props.btn2Theme}
                    containerStyle={tailwind(props.btn2ContainerStyle)}
                />
            </View>
        </Modal>
    );
}