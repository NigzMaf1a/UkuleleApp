import { ToastAndroid } from "react-native";

type ToastType = "info" | "success" | "danger" | "warn";

export default function toaster(message: string, toast_type: ToastType): void {

    let formattedMessage: string;

    switch (toast_type) {

        case "info":
            formattedMessage = `🔵 INFO: ${message}`;
            break;

        case "success":
            formattedMessage = `🟢 SUCCESS: ${message}`;
            break;

        case "danger":
            formattedMessage = `🔴 ERROR: ${message}`;
            break;

        case "warn":
            formattedMessage = `🟡 WARNING: ${message}`;
            break;

        default:
            formattedMessage = message;
    }

    ToastAndroid.show(formattedMessage, ToastAndroid.SHORT);
}