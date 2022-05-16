import React, { useState } from "react";
import { View, Text } from "react-native";
import ZendeskChat from "react-native-zendesk-chat";
import { WebView } from "react-native-webview";
import Modal from "react-native-modal";
import Button from "./Button";
const CHAT_KEY = "oyxpKqlKvwwYfDtRGrVE73fdCVVZbOJf";
export default function SupportChat() {
    const [showChat, setShowChat] = useState(false);
    const chatHTML = () => {
        let user = {
            name: "Gero Test",
            email: "gero@mail.com",
            phone: "0123498434",
        };
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Chat | ${"TEst"}</title>
          <!-- Start of Zendesk Widget script -->
          <script id="ze-snippet"
            src="https://static.zdassets.com/ekr/snippet.js?key=${CHAT_KEY}"> </script>
          <!-- End of Zendesk Widget script -->
          <style type="text/css">html { background: #fff; }</style>
        </head>
        <body>
        <script>
        document.addEventListener( 'DOMContentLoaded', function( event ) {
           zE('webWidget', 'prefill', {
           name: { value: "${user.name}", readOnly: true },
           email: { value: "${user.email}", readOnly: true },
            phone: { value: "${user.phone}", readOnly: true }
           });
           zE('webWidget', 'identify', { name: "${user.name}", email: "${
            user.email
        }" });
          zE('webWidget', 'open');
          zE('webWidget:on', 'close', () => window.ReactNativeWebView.postMessage("close"));
        });
        </script>
        </body>
        </html>`;
    };
    // function handlePress() {
    //     ZendeskChat.startChat({
    //         name: "Test",
    //         email: "test@mail.com",
    //         phone: "123455678",
    //         tags: ["tag1", "tag2"],
    //         department: "Your department",
    //         // The behaviorFlags are optional, and each default to 'true' if omitted
    //         behaviorFlags: {
    //             showAgentAvailability: true,
    //             showChatTranscriptPrompt: true,
    //             showPreChatForm: true,
    //             showOfflineForm: true,
    //         },
    //         localizedDismissButtonTitle: "Dismiss",
    //     });
    // }
    return (
        <View style={{ position: "absolute", top: 0, padding: 16 }}>
            {/* <Button title="Zendesk Support Chat" onPress={handlePress} /> */}
            <Button
                title="Zendesk Support Chat"
                onPress={() => setShowChat(true)}
            />
            <Modal
                isVisible={showChat}
                onBackButtonPress={() => setShowChat(false)}
            >
                <WebView
                    useWebKit
                    style={{ flex: 1 }}
                    hideKeyboardAccessoryView
                    source={{ html: chatHTML() }}
                    showsVerticalScrollIndicator={false}
                    applicationNameForUserAgent={"You App"}
                    onMessage={({ nativeEvent }) => {
                        nativeEvent.data === "close" &&
                            this.setState({ showChat: false });
                    }}
                    onError={(erorr) => console.log("error :>> ", error)}
                    originWhitelist={["about:blank"]}
                    // shouldStartLoadWithRequestHandler={({ url }) => url.startsWith("about:blank")}
                />
            </Modal>
        </View>
    );
}
