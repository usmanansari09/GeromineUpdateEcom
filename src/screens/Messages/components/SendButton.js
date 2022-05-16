import {tailwind} from "@/common/tailwind";
import React from "react";
import {Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useMessageInputContext} from "stream-chat-react-native";

const SendButtonWithContext = (props) => {
    const { disabled = false, sendMessage } = props;

    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={sendMessage}
            testID="send-button"
        >
            <View>
                <Text
                    style={tailwind(
                        "uppercase text-brand-primary text-base font-bold"
                    )}
                >
                    Send
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const areEqual = (prevProps, nextProps) => {
    const {
        disabled: prevDisabled,
        giphyActive: prevGiphyActive,
        sendMessage: prevSendMessage,
    } = prevProps;
    const {
        disabled: nextDisabled,
        giphyActive: nextGiphyActive,
        sendMessage: nextSendMessage,
    } = nextProps;

    const disabledEqual = prevDisabled === nextDisabled;
    if (!disabledEqual) return false;

    const giphyActiveEqual = prevGiphyActive === nextGiphyActive;
    if (!giphyActiveEqual) return false;

    return prevSendMessage === nextSendMessage;

    
};

const MemoizedSendButton = React.memo(SendButtonWithContext, areEqual);

/**
 * UI Component for send button in MessageInput component.
 */
export default function SendButton(props) {
    const { giphyActive, sendMessage } = useMessageInputContext();

    return (
        <MemoizedSendButton
            {...{ giphyActive, sendMessage }}
            {...props}
            {...{ disabled: props.disabled || false }}
        />
    );
}
