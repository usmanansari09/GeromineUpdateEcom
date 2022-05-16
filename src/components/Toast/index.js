import { tailwind } from "@/common/tailwind";
import React from "react";
import { View, Text } from "react-native";
import Toast, {
    ToastProps,
    BaseToast,
    AnyObject as ToastConfig,
} from "react-native-toast-message";
const toastStyles = {
    success: {
        container: tailwind("bg-green-200  "),
        text: tailwind("text-green-800"),
    },
    error: {
        container: tailwind("bg-red-200  "),
        text: tailwind("text-red-800"),
    },
    warning: {
        container: tailwind("bg-yellow-200  "),
        text: tailwind("text-yellow-800"),
    },
    neutral: {
        container: tailwind("bg-gray-200 "),
        text: tailwind("text-gray-600"),
    },
};

/**
 * @typedef TToastType
 * @property {'success'|'error'|'warning'|'neutral'} type
 */

/**
 * @type {ToastConfig}
 */
const toastConfig = {
    /* 
      overwrite 'success' type, 
      modifying the existing `BaseToast` component
    */
    success: ({ text1, props, ...rest }) => (
        <BaseToast
            {...rest}
            style={{
                borderColor: "none",
                borderLeftWidth: 0,
                ...tailwind("h-10 px-3 "),
            }}
            text1={text1}
            text1Style={tailwind("text-base font-bold text-gray-400")}
        />
    ),
    error: ({ text1, props, ...rest }) => (
        <BaseToast
            {...rest}
            style={{
                borderColor: "none",
                borderLeftWidth: 0,
                ...tailwind("h-10 px-3 bg-red-100"),
            }}
            text1={text1}
            text1Style={tailwind("text-base font-bold text-red-400 ")}
        />
    ),
    info: ({ text1, props, ...rest }) => (
        <BaseToast
            {...rest}
            style={{
                borderColor: "none",
                borderLeftWidth: 0,
                ...tailwind("h-20 px-3"),
            }}
            text1={text1}
            text1Style={tailwind("text-base font-bold text-gray-400")}
            text2Style={tailwind("text-xs font-bold text-gray-500")}
        />
    ),
};
export default toastConfig;
