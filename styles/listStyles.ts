import { StyleSheet } from "react-native";
import { scale } from "./responsive";

export const listStyles = StyleSheet.create({

  item: {

    width: "100%",

    paddingVertical: scale(14),

    borderBottomWidth: 1,

    borderBottomColor: "#EEE"
  }

});