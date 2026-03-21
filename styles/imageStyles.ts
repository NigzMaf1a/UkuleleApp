import { StyleSheet } from "react-native";
import { scale } from "./responsive";

export const imageStyles = StyleSheet.create({

  responsiveImage: {

    width: "100%",

    height: undefined,

    aspectRatio: 1.5,

    resizeMode: "cover"
  },

  avatar: {

    width: scale(48),

    height: scale(48),

    borderRadius: scale(24)
  },
  imgCont:{}
});
