import { StyleSheet } from "react-native";
import { scale } from "./responsive";

export const modalStyles = StyleSheet.create({

  overlay: {

    flex: 1,

    backgroundColor: "rgba(0,0,0,0.5)",

    justifyContent: "center",

    alignItems: "center"
  },

  modal: {

    width: "90%",

    padding: scale(20),

    borderRadius: scale(12),

    backgroundColor: "#FFF"
  }

});
